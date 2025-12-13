import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))


import numpy as np
from services.panel_recommendation import recommend_panels

def test_panels():
    print("=== Testing Panel Recommendation ===")

    rooftop = np.ones((640,640), dtype=np.uint8) * 255
    obstruction = np.zeros((640,640), dtype=np.uint8)
    heatmap = np.random.randint(0, 255, (640,640,3), dtype=np.uint8)

    output = recommend_panels(rooftop, obstruction, heatmap)

    print("Panel count:", output["panel_count"])
    print("Estimated energy (W):", output["estimated_energy_watts"])
    print("Sample panel:", output["panels"][:1])

    print("Panel Recommendation Test Passed!\n")

if __name__ == "__main__":
    test_panels()
