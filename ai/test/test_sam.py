import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import cv2
import numpy as np
from models.sam_model import load_sam_model, run_sam
from utils.image_preprocessing import preprocess_image

def test_sam():
    print("=== Testing SAM Model ===")

    predictor = load_sam_model()

    img = np.random.randint(0, 255, (640,640,3), dtype=np.uint8)
    img_proc = preprocess_image(img)

    mask = run_sam(predictor, img_proc)

    print("Mask shape:", mask.shape)
    print("Unique values:", np.unique(mask))

    print("SAM Test Passed!\n")

if __name__ == "__main__":
    test_sam()
