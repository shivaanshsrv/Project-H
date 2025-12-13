import cv2
import numpy as np

def preprocess_image(image):
    """
    Preprocess the input image before passing it to segmentation models.
    
    Steps:
    1. Convert BGR → RGB
    2. Resize while maintaining aspect ratio
    3. Normalize pixel values to [0, 1]
    4. Optional denoising
    """

    # ---- 1. Convert BGR (OpenCV default) → RGB ----
    rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

    # ---- 2. Resize image (keeping aspect ratio) ----
    target_size = 640  # Good for YOLO + SAM
    h, w = rgb.shape[:2]

    # Determine scale ratio
    scale = target_size / max(h, w)
    new_w, new_h = int(w * scale), int(h * scale)

    resized = cv2.resize(rgb, (new_w, new_h), interpolation=cv2.INTER_AREA)

    # ---- 3. Pad image to square shape (SAM-friendly) ----
    square_image = np.zeros((target_size, target_size, 3), dtype=np.uint8)
    pad_x = (target_size - new_w) // 2
    pad_y = (target_size - new_h) // 2

    square_image[pad_y:pad_y+new_h, pad_x:pad_x+new_w] = resized

    # ---- 4. Normalize to [0, 1] float ----
    normalized = square_image.astype(np.float32) / 255.0

    # ---- 5. Optional denoising (helps SAM) ----
    denoised = cv2.fastNlMeansDenoisingColored(
        (normalized * 255).astype(np.uint8), None, 5, 5, 7, 21
    ).astype(np.float32) / 255.0

    return denoised
