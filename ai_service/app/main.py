from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import FileResponse
import cv2
import numpy as np
import uuid
import json
import os

from app.model import ai_model
from app.utils import draw_panels, compute_obstruction_mask
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(title="Project-H AI Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --------------------------------------------------
# DIRECTORIES (ABSOLUTE + SAFE)
# --------------------------------------------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
ANALYSIS_DIR = os.path.join(BASE_DIR, "..", "outputs")
FEEDBACK_DIR = os.path.join(BASE_DIR, "..", "feedback")

os.makedirs(ANALYSIS_DIR, exist_ok=True)
os.makedirs(FEEDBACK_DIR, exist_ok=True)

# --------------------------------------------------
# HEALTH CHECK
# --------------------------------------------------
@app.get("/health")
def health():
    return {"status": "ok", "service": "ai_service"}

# --------------------------------------------------
# ANALYZE ROOF (MAIN API)
# --------------------------------------------------
@app.post("/analyze-roof")
async def analyze_roof(image: UploadFile = File(...)):
    contents = await image.read()
    np_img = np.frombuffer(contents, np.uint8)
    img = cv2.imdecode(np_img, cv2.IMREAD_COLOR)

    if img is None:
        raise HTTPException(status_code=400, detail="Invalid image")

    h, w = img.shape[:2]

    # ---------- SAM SEGMENTATION ----------
    ai_model.sam_predictor.set_image(img)

    point = np.array([[w // 2, h // 2]])
    label = np.array([1])

    masks, _, _ = ai_model.sam_predictor.predict(
        point_coords=point,
        point_labels=label,
        multimask_output=False,
    )

    roof_mask = masks[0]

    # ---------- OBSTRUCTION MASK ----------
    obstruction_mask = compute_obstruction_mask(img)

    # ---------- PANEL SIZE (meters → pixels) ----------
    PANEL_W_M = 1.7
    PANEL_H_M = 1.0
    SCALE = 0.05

    pw = int(PANEL_W_M / SCALE)
    ph = int(PANEL_H_M / SCALE)

    panels = []
    for y in range(0, h - ph, ph):
        for x in range(0, w - pw, pw):
            roof = roof_mask[y:y + ph, x:x + pw]
            obs = obstruction_mask[y:y + ph, x:x + pw]

            if roof.mean() > 0.85 and obs.mean() < 0.1:
                panels.append({"x": x, "y": y, "w": pw, "h": ph})

    # ---------- ENERGY ESTIMATION ----------
    PANEL_WATT = 400
    SUN_HOURS = 4.5

    panel_count = len(panels)
    system_kw = (panel_count * PANEL_WATT) / 1000
    monthly = system_kw * SUN_HOURS * 30
    yearly = monthly * 12

    # ---------- CONFIDENCE (heuristic) ----------
    confidence = round(min(1.0, panel_count / 25), 2)

    # --------------------------------------------------
    # SAVE OUTPUT (🔥 SINGLE SOURCE OF TRUTH ID)
    # --------------------------------------------------
    analysis_id = uuid.uuid4().hex

    overlay_path = os.path.join(ANALYSIS_DIR, f"{analysis_id}.png")
    json_path = os.path.join(ANALYSIS_DIR, f"{analysis_id}.json")

    draw_panels(img, panels, overlay_path)

    result = {
        "analysis_id": analysis_id,
        "panel_count": panel_count,
        "system_size_kw": round(system_kw, 2),
        "energy": {
            "monthly": round(monthly, 1),
            "yearly": round(yearly, 1),
        },
        "overlay_image_url": f"/overlay/{analysis_id}.png",
        "confidence": confidence,
    }

    with open(json_path, "w") as f:
        json.dump(result, f)

    return result

# --------------------------------------------------
# FETCH ANALYSIS JSON (DEBUG / INTERNAL)
# --------------------------------------------------
@app.get("/analysis/{analysis_id}")
def get_analysis(analysis_id: str):
    path = os.path.join(ANALYSIS_DIR, f"{analysis_id}.json")
    if not os.path.exists(path):
        raise HTTPException(status_code=404, detail="Analysis not found")

    with open(path) as f:
        return json.load(f)

# --------------------------------------------------
# SERVE OVERLAY IMAGE
# --------------------------------------------------
@app.get("/overlay/{analysis_id}.png")
def get_overlay(analysis_id: str):
    path = os.path.join(ANALYSIS_DIR, f"{analysis_id}.png")
    if not os.path.exists(path):
        raise HTTPException(status_code=404, detail="Image not found")

    return FileResponse(path, media_type="image/png")

# --------------------------------------------------
# FEEDBACK
# --------------------------------------------------
@app.post("/feedback")
async def feedback(data: dict):
    fid = uuid.uuid4().hex
    with open(os.path.join(FEEDBACK_DIR, f"{fid}.json"), "w") as f:
        json.dump(data, f)

    return {"status": "received"}

# --------------------------------------------------
# FRONTEND CONFIG
# --------------------------------------------------
@app.get("/config")
def config():
    return {
        "panel_watt": 400,
        "sun_hours": 4.5,
        "currency": "INR",
        "unit": "kWh",
    }
