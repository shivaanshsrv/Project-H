import cv2
import numpy as np

from models.sam_model import load_sam_model, run_sam
from models.yolo_model import load_yolo_model, run_yolo_segmentation


# Load models once - VERY IMPORTANT for performance
sam_model = load_sam_model()
yolo_model = load_yolo_model()


def run_segmentation(image):
    """
    Runs SAM + YOLO segmentation to detect:
    1. Rooftop mask (SAM)
    2. Obstruction mask (YOLOv8-seg)
    3. Shadow mask (YOLO or threshold)
    """

    # ---- 1. Rooftop Segmentation using SAM ----
    rooftop_mask = run_sam(sam_model, image)

    # ---- 2. Obstruction + Shadow Segmentation using YOLOv8 ----
    yolo_output = run_yolo_segmentation(yolo_model, image)

    obstruction_mask = yolo_output["obstruction_mask"]
    shadow_mask = yolo_output["shadow_mask"]

    # ---- 3. Combine YOLO masks into one image (optional) ----
    combined_obstruction_mask = np.clip(obstruction_mask + shadow_mask, 0, 255)

    # Ensure output masks are uint8
    rooftop_mask = rooftop_mask.astype(np.uint8)
    combined_obstruction_mask = combined_obstruction_mask.astype(np.uint8)

    return {
        "rooftop_mask": rooftop_mask,
        "obstruction_mask": combined_obstruction_mask,
        "shadow_mask": shadow_mask
    }
