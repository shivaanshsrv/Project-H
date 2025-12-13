import cv2
import numpy as np


def recommend_panels(rooftop_mask, obstruction_mask, heatmap):
    """
    Recommends solar panel placements on the rooftop.

    Returns:
        - list of panel rectangles with coordinates
        - estimated total energy output (simple simulation)
    """

    # ---- STEP 1: Compute usable rooftop area ----
    usable_mask = rooftop_mask.copy()
    usable_mask[obstruction_mask > 0] = 0  # remove obstruction areas

    # ---- STEP 2: Apply brightness threshold from heatmap ----
    # Panels only placed where sunlight is “strong”
    gray_heat = cv2.cvtColor(heatmap, cv2.COLOR_BGR2GRAY)
    sunlight_mask = np.where(gray_heat > 120, 255, 0).astype(np.uint8)

    usable_mask = np.where(sunlight_mask > 0, usable_mask, 0).astype(np.uint8)

    # ---- STEP 3: Define panel dimensions (in pixels) ----
    # Approx ratio 1:2 (height x width)
    PANEL_H = 20
    PANEL_W = 40

    # Add margin around roof edges
    padded_mask = usable_mask.copy()
    padded_mask[:10, :] = 0
    padded_mask[-10:, :] = 0
    padded_mask[:, :10] = 0
    padded_mask[:, -10:] = 0

    panels = []
    H, W = padded_mask.shape

    # ---- STEP 4: Simple sliding‑window placement ----
    for y in range(0, H - PANEL_H, PANEL_H):
        for x in range(0, W - PANEL_W, PANEL_W):

            # Extract window region
            roi = padded_mask[y:y + PANEL_H, x:x + PANEL_W]

            # Window must be fully usable (all white)
            if np.all(roi == 255):
                panels.append({
                    "x": x,
                    "y": y,
                    "width": PANEL_W,
                    "height": PANEL_H
                })

                # Mark region as filled to avoid overlapping panels
                padded_mask[y:y + PANEL_H, x:x + PANEL_W] = 0

    # ---- STEP 5: Estimate energy output ----
    # Simple formula:
    # Each panel = 300W peak (typical)
    energy_output = len(panels) * 300  # watts peak

    return {
        "panel_count": len(panels),
        "estimated_energy_watts": energy_output,
        "panels": panels
    }
