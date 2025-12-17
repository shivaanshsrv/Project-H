import cv2
import numpy as np
import uuid
from pathlib import Path
from segment_anything import SamPredictor

OUTPUT_DIR = Path("outputs")
OUTPUT_DIR.mkdir(exist_ok=True)

def save_uploaded_image(file_bytes):
    file_id = uuid.uuid4().hex
    path = OUTPUT_DIR / f"{file_id}_input.jpg"
    with open(path, "wb") as f:
        f.write(file_bytes)
    return str(path)

def save_mask(mask, suffix):
    file_id = uuid.uuid4().hex
    path = OUTPUT_DIR / f"{file_id}_{suffix}.png"
    cv2.imwrite(str(path), mask)
    return str(path)

def create_heatmap(mask):
    heat = cv2.applyColorMap(mask, cv2.COLORMAP_JET)
    file_id = uuid.uuid4().hex
    path = OUTPUT_DIR / f"{file_id}_heatmap.png"
    cv2.imwrite(str(path), heat)
    return str(path)

def auto_segment_rooftop(sam_model, image):
    predictor = SamPredictor(sam_model)
    predictor.set_image(image)

    masks = predictor.generate(image)

    if len(masks) == 0:
        return None

    # Pick the largest mask = rooftop
    areas = [m["segmentation"].sum() for m in masks]
    idx = int(np.argmax(areas))

    segmentation = masks[idx]["segmentation"].astype(np.uint8) * 255
    return segmentation

def detect_obstructions(rooftop_mask):
    # Simple logic:
    # Dark holes or cut areas inside canopy → obstructions
    kernel = np.ones((25, 25), np.uint8)
    eroded = cv2.erode(rooftop_mask, kernel, iterations=1)
    obstruction_mask = rooftop_mask - eroded
    return obstruction_mask
