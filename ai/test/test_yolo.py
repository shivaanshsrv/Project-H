import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))


import cv2
import numpy as np
from models.yolo_model import load_yolo_model, run_yolo_segmentation
from utils.image_preprocessing import preprocess_image

def test_yolo():
    print("=== Testing YOLO Segmentation ===")

    model = load_yolo_model()

    img = np.random.randint(0, 255, (640,640,3), dtype=np.uint8)
    img_proc = preprocess_image(img)

    results = run_yolo_segmentation(model, img_proc)

    print("Obstruction mask unique values:", np.unique(results["obstruction_mask"]))
    print("Shadow mask unique values:", np.unique(results["shadow_mask"]))

    print("YOLO Test Passed!\n")

if __name__ == "__main__":
    test_yolo()
