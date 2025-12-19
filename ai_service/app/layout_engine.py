import cv2
import numpy as np
import uuid
from pathlib import Path
from app.utils import rotate_image, inverse_rotate_points

OUTPUT_DIR = Path("outputs")
OUTPUT_DIR.mkdir(exist_ok=True)

# -------------------------------
# PANEL SIZE (in pixels)
# (scaled dynamically later)
# -------------------------------
PANEL_M = (1.8, 1.1)   # meters: L x W
SPACING_M = 0.2        # meters of spacing


# ---------------------------------------------
# Convert rooftop mask to a clean binary mask
# ---------------------------------------------
def clean_mask(mask):
    kernel = np.ones((15, 15), np.uint8)
    closed = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, kernel)
    filled = cv2.morphologyEx(closed, cv2.MORPH_CLOSE, kernel)
    return filled


# ---------------------------------------------
# Compute pixel-to-meter scale using rooftop
# heuristic (assumes typical drone/satellite img)
# ---------------------------------------------
def estimate_scale(mask):
    # Find the bounding rectangle of roof
    coords = np.column_stack(np.where(mask > 0))
    x, y, w, h = cv2.boundingRect(coords)

    # Heuristic: typical house rooftop width = 8–12m
    # We assume ~10m == width pixels
    estimated_meters = 10
    scale = estimated_meters / max(w, h)

    return scale


# ------------------------------------------------
# Fit panels within rotated rooftop mask
# ------------------------------------------------
def fit_panels(rotated_mask, panel_px, spacing_px):
    H, W = rotated_mask.shape

    panel_w, panel_h = panel_px
    spacing = spacing_px

    placements = []
    vis = cv2.cvtColor(rotated_mask, cv2.COLOR_GRAY2BGR)

    # Iterate through grid
    for y in range(0, H - panel_h, panel_h + spacing):
        for x in range(0, W - panel_w, panel_w + spacing):

            # Panel rectangle
            rect = rotated_mask[y:y+panel_h, x:x+panel_w]

            # Check if panel fully inside the roof
            if rect.shape[0] != panel_h or rect.shape[1] != panel_w:
                continue

            # Panel allowed only if all pixels are rooftop (white = 255)
            if np.all(rect > 200):
                placements.append((x, y, panel_w, panel_h))
                # Draw panel (green)
                cv2.rectangle(vis, (x, y), (x+panel_w, y+panel_h), (0, 255, 0), 2)

    # Save placement visualization
    file_id = uuid.uuid4().hex
    out_path = OUTPUT_DIR / f"{file_id}_panel_layout.png"
    cv2.imwrite(str(out_path), vis)

    return placements, str(out_path)


# ------------------------------------------------
# MAIN: generate full panel layout for the rooftop
# ------------------------------------------------
def generate_panel_layout(rooftop_mask, obstruction_mask, angle):
    # 1️⃣ Clean the rooftop
    rooftop_clean = clean_mask(rooftop_mask)

    # 2️⃣ Remove obstructions
    usable = rooftop_clean.copy()
    usable[obstruction_mask > 0] = 0

    # 3️⃣ Rotate rooftop to align horizontally
    rotated_mask, matrix = rotate_image(usable, angle)

    # 4️⃣ Estimate pixel-to-meter ratio
    scale = estimate_scale(rotated_mask)

    # Convert meter-based panel size → pixel size
    panel_w_px = int(PANEL_M[0] / scale)
    panel_h_px = int(PANEL_M[1] / scale)
    spacing_px = int(SPACING_M / scale)

    panel_px = (panel_w_px, panel_h_px)

    # 5️⃣ Fit panels inside rotated mask
    placements_rot, layout_path = fit_panels(rotated_mask, panel_px, spacing_px)

    # 6️⃣ Convert rotated placements back to real coordinates
    real_panel_positions = []
    for (x, y, w, h) in placements_rot:
        # 4 corners of panel before rotation
        corners = [
            (x, y),
            (x + w, y),
            (x + w, y + h),
            (x, y + h)
        ]

        real_corners = inverse_rotate_points(corners, matrix)

        real_panel_positions.append({
            "corners": real_corners,
            "width_px": w,
            "height_px": h,
            "angle": angle
        })

    # 7️⃣ Estimate system size (kW)
    panel_count = len(real_panel_positions)
    system_kw = round(panel_count * 0.35, 2)  # 350W panels
    monthly_kwh = round(system_kw * 120, 2)   # India avg solar yield

    return {
        "panel_positions": real_panel_positions,
        "total_panels": panel_count,
        "system_kw": system_kw,
        "monthly_kwh": monthly_kwh,
        "panel_layout_map_path": layout_path
    }
