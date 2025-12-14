from flask import Flask, request, jsonify
from flask_cors import CORS
import base64
import cv2
import numpy as np
from flask.typing import ResponseReturnValue

# Import modules
from utils.image_preprocessing import preprocess_image
from utils.segmentation import run_segmentation
from utils.heatmap_generator import generate_heatmap
from services.panel_recommendation import recommend_panels

app = Flask(__name__)
CORS(app)

def resize_mask(mask, target_shape):
    """Resize a 640x640 mask back to original image shape."""
    return cv2.resize(mask, (target_shape[1], target_shape[0]), interpolation=cv2.INTER_NEAREST)


@app.route("/process-image", methods=["POST"])
def process_image() -> ResponseReturnValue:
    try:
        if "image" not in request.files:
            return jsonify({"error": "No image provided"}), 400

        file = request.files["image"]

        img_bytes = np.frombuffer(file.read(), np.uint8)
        image = cv2.imdecode(img_bytes, cv2.IMREAD_COLOR)

        # -----------------------------------------------
        # ✅ FIX ADDED: Catch unreadable / invalid images
        # -----------------------------------------------
        if image is None:
            return jsonify({"error": "Invalid or unreadable image file"}), 400
        # -----------------------------------------------

        original_h, original_w = image.shape[:2]

        # Step 1: Preprocess for SAM & YOLO
        preprocessed = preprocess_image(image)

        # Step 2: Segmentation (output is 640x640)
        segmentation_output = run_segmentation(preprocessed)

        rooftop_mask_640 = segmentation_output["rooftop_mask"]
        obstruction_mask_640 = segmentation_output["obstruction_mask"]

        # Step 3: Resize masks back to original image size
        rooftop_mask = resize_mask(rooftop_mask_640, (original_h, original_w))
        obstruction_mask = resize_mask(obstruction_mask_640, (original_h, original_w))

        # Step 4: Generate heatmap using ORIGINAL image size
        heatmap = generate_heatmap(image, rooftop_mask, obstruction_mask)

        # Step 5: Panel recommendations
        recommendations = recommend_panels(rooftop_mask, obstruction_mask, heatmap)

        # Base64 encoder
        def encode(mask):
            success, buffer = cv2.imencode(".png", mask)
            buffer_bytes = buffer.tobytes()
            return base64.b64encode(buffer_bytes).decode("utf-8")

        return jsonify({
            "rooftop_mask": encode(rooftop_mask),
            "obstruction_mask": encode(obstruction_mask),
            "heatmap": encode(heatmap),
            "recommendations": recommendations
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)
