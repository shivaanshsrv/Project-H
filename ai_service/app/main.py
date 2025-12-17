from fastapi import FastAPI, UploadFile, File, HTTPException
from app.model import ai_model
from app.utils import (
    save_uploaded_image,
    save_mask,
    create_heatmap,
    auto_segment_rooftop,
    detect_obstructions
)
import cv2
import numpy as np

app = FastAPI(title="Project-H AI Microservice")

@app.post("/analyze")
async def analyze(image: UploadFile = File(...)):
    try:
        img_bytes = await image.read()
        img_path = save_uploaded_image(img_bytes)

        img = cv2.imread(img_path)
        if img is None:
            raise HTTPException(status_code=400, detail="Invalid image")

        # ------------------------------
        # 1️⃣ SAM Auto Rooftop Segmentation
        # ------------------------------
        rooftop_mask = auto_segment_rooftop(ai_model.sam, img)

        if rooftop_mask is None:
            return {
                "status": 200,
                "message": "No rooftop found",
                "rooftop_mask_path": None,
                "obstruction_mask_path": None,
                "heatmap_path": None,
                "panel_count": 0,
                "estimated_energy_watts": 0,
                "panels": []
            }

        rooftop_path = save_mask(rooftop_mask, "rooftop")

        # ------------------------------
        # 2️⃣ Detect Obstructions (basic logic)
        # ------------------------------
        obstruction_mask = detect_obstructions(rooftop_mask)
        obstruction_path = save_mask(obstruction_mask, "obstruction")

        # ------------------------------
        # 3️⃣ Heatmap from obstruction density
        # ------------------------------
        heatmap_path = create_heatmap(obstruction_mask)

        # ------------------------------
        # 4️⃣ Estimate panel count
        # ------------------------------
        rooftop_area = int(np.sum(rooftop_mask > 0))
        avg_panel_area = 15000  # you can adjust later

        panel_count = max(rooftop_area // avg_panel_area, 0)
        estimated_energy = panel_count * 350  # 350 W per panel

        # ------------------------------
        # 5️⃣ Return results
        # ------------------------------
        return {
            "status": 200,
            "message": "Analysis successful",
            "rooftop_mask_path": rooftop_path,
            "obstruction_mask_path": obstruction_path,
            "heatmap_path": heatmap_path,
            "panel_count": panel_count,
            "estimated_energy_watts": estimated_energy,
            "panels": []
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
