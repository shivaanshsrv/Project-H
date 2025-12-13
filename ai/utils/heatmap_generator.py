import cv2
import numpy as np


def generate_heatmap(image, rooftop_mask, obstruction_mask):
    """
    Generates a simple simulated sunlight exposure heatmap.

    Logic:
    1. Everything outside rooftop = 0 sunlight
    2. Rooftop gets base sunlight intensity
    3. Obstructions cast shadow → reduce sunlight
    4. Apply smoothing & convert to color heatmap
    """

    # Ensure masks are grayscale uint8
    rooftop_mask = rooftop_mask.astype(np.uint8)
    obstruction_mask = obstruction_mask.astype(np.uint8)

    # ---- Step 1: Create base sunlight map (full bright rooftop) ----
    base_sunlight = np.where(rooftop_mask > 0, 255, 0).astype(np.float32)

    # ---- Step 2: Reduce sunlight where obstructions exist ----
    # Shadow intensity reduces by 70%
    reduced_sunlight = base_sunlight.copy()
    reduced_sunlight[obstruction_mask > 0] *= 0.3

    # ---- Step 3: Apply distance-based sunlight falloff ----
    # The further from obstructions → more sunlight
    dist_transform = cv2.distanceTransform(
        (obstruction_mask == 0).astype(np.uint8), cv2.DIST_L2, 5
    )
    dist_norm = cv2.normalize(dist_transform, np.zeros_like(dist_transform), 0.6, 1.0, cv2.NORM_MINMAX)


    sunlight_sim = reduced_sunlight * dist_norm

    # ---- Step 4: Smooth heatmap for better visuals ----
    sunlight_sim = cv2.GaussianBlur(sunlight_sim, (31, 31), 0)

    # ---- Step 5: Convert sunlight level → colormap ----
    sunlight_uint8 = sunlight_sim.astype(np.uint8)

    heatmap_color = cv2.applyColorMap(sunlight_uint8, cv2.COLORMAP_JET)

    # ---- Step 6: Keep heatmap only where rooftop exists ----
    rooftop_mask_3d = cv2.cvtColor(rooftop_mask, cv2.COLOR_GRAY2BGR)

    heatmap_final = np.where(
        rooftop_mask_3d > 0,
        heatmap_color,
        np.zeros_like(heatmap_color)
    )

    return heatmap_final
