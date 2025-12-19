from fastapi import FastAPI, UploadFile, File
import cv2
import numpy as np
import uuid

from app.model import ai_model
from app.utils import draw_panels, compute_obstruction_mask

app = FastAPI()


@app.post("/analyze-roof")
async def analyze_roof(image: UploadFile = File(...)):
    # ---------- READ IMAGE ----------
    contents = await image.read()
    np_img = np.frombuffer(contents, np.uint8)
    img = cv2.imdecode(np_img, cv2.IMREAD_COLOR)

    if img is None:
        return {"error": "Invalid image"}

    h, w = img.shape[:2]

    # ---------- SAM SEGMENTATION ----------
    ai_model.sam_predictor.set_image(img)

    input_point = np.array([[w // 2, h // 2]])
    input_label = np.array([1])

    masks, _, _ = ai_model.sam_predictor.predict(
        point_coords=input_point,
        point_labels=input_label,
        multimask_output=False,
    )

    roof_mask = masks[0]

    # ---------- OBSTRUCTION MASK ----------
    obstruction_mask = compute_obstruction_mask(img)

    # ---------- PANEL SIZE (meters → pixels) ----------
    PANEL_W_M = 1.7   # panel width in meters
    PANEL_H_M = 1.0   # panel height in meters
    SCALE = 0.05      # meters per pixel (satellite approx)

    pw = int(PANEL_W_M / SCALE)
    ph = int(PANEL_H_M / SCALE)

    # ---------- PANEL PLACEMENT ----------
    panels = []
    for y in range(0, h - ph, ph):
        for x in range(0, w - pw, pw):
            roof_region = roof_mask[y:y + ph, x:x + pw]
            obs_region = obstruction_mask[y:y + ph, x:x + pw]

            if roof_region.mean() > 0.85 and obs_region.mean() < 0.1:
                panels.append({
                    "x": x,
                    "y": y,
                    "w": pw,
                    "h": ph
                })

    # ---------- ENERGY ESTIMATION (India) ----------
    PANEL_WATT = 400      # W per panel
    SUN_HOURS = 4.5      # India average

    panel_count = len(panels)
    system_kw = (panel_count * PANEL_WATT) / 1000
    monthly_kwh = system_kw * SUN_HOURS * 30
    yearly_kwh = monthly_kwh * 12

    # ---------- DRAW OVERLAY IMAGE ----------
    out_name = f"outputs/panels_{uuid.uuid4().hex}.png"
    overlay_path = draw_panels(img, panels, out_name)

    return {
        "panel_count": panel_count,
        "system_size_kw": round(system_kw, 2),
        "energy_kwh_per_month": round(monthly_kwh, 1),
        "energy_kwh_per_year": round(yearly_kwh, 1),
        "overlay_image": overlay_path,
        "panels": panels
    }
