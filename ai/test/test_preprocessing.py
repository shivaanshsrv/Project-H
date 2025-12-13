import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import cv2
import numpy as np
from utils.image_preprocessing import preprocess_image


def test_preprocessing():
    print("=== Testing Preprocessing ===")

    # Create a dummy random image (640x640)
    img = np.random.randint(0, 255, (640,640,3), dtype=np.uint8)

    processed = preprocess_image(img)

    print("Original shape:", img.shape)
    print("Processed shape:", processed.shape)
    print("Processed dtype:", processed.dtype)
    print("Min/Max values:", processed.min(), processed.max())

    print("Preprocessing Test Passed!\n")

if __name__ == "__main__":
    test_preprocessing()
