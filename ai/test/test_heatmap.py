import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import cv2
import numpy as np
from utils.heatmap_generator import generate_heatmap

def test_heatmap():
    print("=== Testing Heatmap Generator ===")

    img = np.random.randint(0, 255, (640,640,3), dtype=np.uint8)

    # Fake masks for testing
    rooftop_mask = np.ones((640,640), dtype=np.uint8) * 255
    obstruction_mask = np.zeros((640,640), dtype=np.uint8)

    heatmap = generate_heatmap(img, rooftop_mask, obstruction_mask)

    print("Heatmap shape:", heatmap.shape)
    print("Heatmap dtype:", heatmap.dtype)

    print("Heatmap Test Passed!\n")

if __name__ == "__main__":
    test_heatmap()
