import cv2
import numpy as np
import uuid
from pathlib import Path
from segment_anything import SamPredictor
import cv2
import os

# -------------------------------
# Output folder
# -------------------------------
OUTPUT_DIR = Path("outputs")
OUTPUT_DIR.mkdir(exist_ok=True)


# ============================================================
# IMAGE + MASK SAVING UTILITIES
# ============================================================
def save_uploaded_image(file_bytes):
    file_id = uuid.uuid4().hex
    path = OUTPUT_DIR / f"{file_id}_input.jpg"

    with open(path, "wb") as f:
        f.write(file_bytes)

    return str(path)


def save_mask(mask, suffix):
    if mask is None:
        return None

    file_id = uuid.uuid4().hex
    path = OUTPUT_DIR / f"{file_id}_{suffix}.png"

    cv2.imwrite(str(path), mask)
    return str(path)


def create_heatmap(mask):
    if mask is None:
        return None

    heat = cv2.applyColorMap(mask, cv2.COLORMAP_JET)

    file_id = uuid.uuid4().hex
    path = OUTPUT_DIR / f"{file_id}_heatmap.png"

    cv2.imwrite(str(path), heat)

    return str(path)


# ============================================================
# MOBILESAM — AUTO ROOFTOP MASK (GRID PROMPTING)
# ============================================================
def auto_segment_rooftop(model, image):
    """
    MobileSAM does NOT have .generate(), so we simulate full-image segmentation
    using a grid of positive prompt points and select the largest mask region.
    """

    predictor = SamPredictor(model)
    predictor.set_image(image)

    H, W = image.shape[:2]
    step = max(60, min(H, W) // 12)    # adaptive grid density

    collected_masks = []

    for y in range(step, H, step):
        for x in range(step, W, step):
            pt = np.array([[x, y]])
            lb = np.array([1])

            masks, _, _ = predictor.predict(
                point_coords=pt,
                point_labels=lb,
                multimask_output=True
            )

            if masks is None:
                continue

            for m in masks:
                m = m.cpu().numpy().astype(np.uint8)
                collected_masks.append(m)

    if len(collected_masks) == 0:
        return None

    # Pick the largest mask by foreground pixels
    areas = [np.sum(m) for m in collected_masks]
    best_idx = int(np.argmax(areas))
    best_mask = collected_masks[best_idx]

    return best_mask * 255


# ============================================================
# ROOFTOP ORIENTATION DETECTION
# ============================================================
def extract_rooftop_angle(mask):
    coords = np.column_stack(np.where(mask > 0))
    if len(coords) == 0:
        return 0

    rect = cv2.minAreaRect(coords)
    angle = rect[2]

    # Normalize angle
    if angle < -45:
        angle += 90

    return angle


# ============================================================
# ROTATION UTILITIES
# ============================================================
def rotate_image(image, angle):
    H, W = image.shape[:2]
    center = (W // 2, H // 2)

    M = cv2.getRotationMatrix2D(center, angle, 1.0)
    rotated = cv2.warpAffine(image, M, (W, H))

    return rotated, M


def inverse_rotate_points(points, matrix):
    """
    Given a list of points (x,y) and the affine rotation matrix,
    return real-world coordinates by applying inverse rotation.
    """
    invM = cv2.invertAffineTransform(matrix)

    transformed = []
    for (x, y) in points:
        new_x = invM[0, 0] * x + invM[0, 1] * y + invM[0, 2]
        new_y = invM[1, 0] * x + invM[1, 1] * y + invM[1, 2]
        transformed.append((int(new_x), int(new_y)))

    return transformed


# ============================================================
# OBSTRUCTION DETECTION
# ============================================================
def detect_obstructions(rooftop_mask):
    """
    Simple morphological obstruction detection: finds “holes” inside rooftop.
    This isolates obstructions like tanks, AC units, chimneys, etc.
    """

    kernel = np.ones((40, 40), np.uint8)

    eroded = cv2.erode(rooftop_mask, kernel, iterations=1)
    diff = rooftop_mask - eroded

    return diff


def draw_panels(image, panels, out_path):
    img = image.copy()

    for p in panels:
        x, y, w, h = p["x"], p["y"], p["w"], p["h"]
        cv2.rectangle(
            img,
            (x, y),
            (x + w, y + h),
            (0, 255, 0),
            2
        )

    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    cv2.imwrite(out_path, img)
    return out_path


def compute_obstruction_mask(image):
    """
    Returns a binary mask where 1 = obstruction, 0 = usable
    """
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # ---------- 1. Shadow detection (dark regions) ----------
    shadow_mask = gray < 60  # threshold for dark shadows
    shadow_mask = shadow_mask.astype(np.uint8)

    # ---------- 2. Texture / structure detection ----------
    edges = cv2.Canny(gray, 80, 160)
    kernel = np.ones((5, 5), np.uint8)
    edges = cv2.dilate(edges, kernel, iterations=1)

    structure_mask = edges > 0
    structure_mask = structure_mask.astype(np.uint8)

    # ---------- Combine obstructions ----------
    obstruction_mask = cv2.bitwise_or(shadow_mask, structure_mask)

    return obstruction_mask