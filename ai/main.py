from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2
import numpy as np
from flask.typing import ResponseReturnValue
import os
import uuid
from PIL import Image

# Import modules
from utils.image_preprocessing import preprocess_image
from utils.segmentation import run_segmentation
from utils.heatmap_generator import generate_heatmap
from services.panel_recommendation import recommend_panels

app = Flask(__name__)
CORS(app)

# -------------------------------------------------------------------
# ⭐ NEW: Save numpy image arrays to PNG and return file paths
# -------------------------------------------------------------------
def save_output_image(img_array, folder, prefix):
    os.makedirs(folder, exist_ok=True)
    filename = f"{prefix}-{uuid.uuid4().hex}.png"
    path = os.path.join(folder, filename)

    # Convert numpy → PIL → save
    image = Image.fromarray(img_array)
    image.save(path)

    return path


# Resize mask back to original resolution
def resize_mask(mask, target_shape):
    return cv2.resize(mask, (target_shape[1], target_shape[0]), interpolation=cv2.INTER_NEAREST)


@app.route("/process-image", methods=["POST"])
def process_image() -> ResponseReturnValue:
    try:
        if "image" not in request.files:
            return jsonify({"error": "No image provided"}), 400

        file = request.files["image"]

        img_bytes = np.frombuffer(file.read(), np.uint8)
        image = cv2.imdecode(img_bytes, cv2.IMREAD_COLOR)

        if image is None:
            return jsonify({"error": "Invalid or unreadable image file"}), 400

        original_h, original_w = image.shape[:2]

        # ------------------------------
        # MODEL PIPELINE
        # ------------------------------
        preprocessed = preprocess_image(image)
        segmentation_output = run_segmentation(preprocessed)

        rooftop_mask_640 = segmentation_output["rooftop_mask"]
        obstruction_mask_640 = segmentation_output["obstruction_mask"]

        rooftop_mask = resize_mask(rooftop_mask_640, (original_h, original_w))
        obstruction_mask = resize_mask(obstruction_mask_640, (original_h, original_w))

        heatmap = generate_heatmap(image, rooftop_mask, obstruction_mask)

        recommendations = recommend_panels(rooftop_mask, obstruction_mask, heatmap)

        # ------------------------------
        # ⭐ NEW: Save images to disk (no base64)
        # ------------------------------
        roof_path = save_output_image(rooftop_mask, "outputs/masks", "roof")
        obs_path = save_output_image(obstruction_mask, "outputs/masks", "obs")
        heat_path = save_output_image(heatmap, "outputs/heatmaps", "heat")

        # ------------------------------
        # ⭐ Return file paths instead of base64
        # ------------------------------
        return jsonify({
            "rooftop_mask_path": roof_path,
            "obstruction_mask_path": obs_path,
            "heatmap_path": heat_path,
            "recommendations": recommendations
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)
