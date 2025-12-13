from flask import Flask, request, jsonify
from flask_cors import CORS
import base64
import cv2
import numpy as np

# Import modules (we'll implement them later)
from utils.image_preprocessing import preprocess_image
from utils.segmentation import run_segmentation
from utils.heatmap_generator import generate_heatmap
from services.panel_recommendation import recommend_panels

app = Flask(__name__)
CORS(app)


@app.route("/process-image", methods=["POST"])
def process_image():
    try:
        # Validate request
        if "image" not in request.files:
            return jsonify({"error": "No image provided"}), 400

        file = request.files["image"]

        # Read image bytes
        img_bytes = np.frombuffer(file.read(), np.uint8)
        image = cv2.imdecode(img_bytes, cv2.IMREAD_COLOR)

        # Step 1 → Preprocess Image
        preprocessed = preprocess_image(image)

        # Step 2 → Segmentation (SAM + YOLO)
        segmentation_output = run_segmentation(preprocessed)

        rooftop_mask = segmentation_output["rooftop_mask"]
        obstruction_mask = segmentation_output["obstruction_mask"]

        # Step 3 → Generate Heatmap
        heatmap = generate_heatmap(image, rooftop_mask, obstruction_mask)

        # Step 4 → Panel Placement
        recommendations = recommend_panels(rooftop_mask, obstruction_mask, heatmap)

        # Convert masks to base64 for backend
        def encode(mask):
            _, buffer = cv2.imencode(".png", mask)
            return base64.b64encode(buffer).decode("utf-8")

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
