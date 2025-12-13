import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))


import cv2
import numpy as np

from utils.image_preprocessing import preprocess_image
from utils.segmentation import run_segmentation
from utils.heatmap_generator import generate_heatmap
from services.panel_recommendation import recommend_panels

def test_full_pipeline():
    print("=== Testing FULL AI Pipeline ===")

    img = np.random.randint(0, 255, (640,640,3), dtype=np.uint8)

    # Step 1
    pre = preprocess_image(img)
    print("Preprocessing OK")

    # Step 2
    seg = run_segmentation(pre)
    print("Segmentation OK")

    # Step 3
    heatmap = generate_heatmap(img, seg["rooftop_mask"], seg["obstruction_mask"])
    print("Heatmap OK")

    # Step 4
    panels = recommend_panels(seg["rooftop_mask"], seg["obstruction_mask"], heatmap)
    print("Panel Recommendation OK")

    print("\nFull Pipeline Output:")
    print("Panels:", panels["panel_count"])
    print("Energy:", panels["estimated_energy_watts"], "W")

    print("\nFULL PIPELINE TEST PASSED!")

if __name__ == "__main__":
    test_full_pipeline()
