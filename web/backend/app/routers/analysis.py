from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import FileResponse
from datetime import datetime
from bson import ObjectId
import os
from pathlib import Path

from app.database import analysis_collection
from app.utils.jwt import get_current_user

router = APIRouter(prefix="/analysis", tags=["Analysis"])

# BASE_DIR = Path(__file__).resolve().parents[3]
# ================================
# GET /analysis/my
# ================================
@router.get("/my")
async def get_my_analyses(user=Depends(get_current_user)):
    cursor = analysis_collection.find(
        {"user_id": user["_id"]},
        {"analysis": 0}  # exclude heavy AI output
    )

    analyses = []
    async for doc in cursor:
        doc["_id"] = str(doc["_id"])
        doc["user_id"] = str(doc["user_id"])
        analyses.append(doc)

    return analyses


# ================================
# GET /analysis/{id}/overlay
# ================================
BASE_DIR = Path(__file__).resolve().parents[3]

@router.get("/{analysis_id}/overlay")
async def get_overlay_image(
    analysis_id: str,
    user=Depends(get_current_user)
):
    try:
        analysis_obj_id = ObjectId(analysis_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid analysis ID")

    doc = await analysis_collection.find_one({
        "_id": analysis_obj_id,
        "user_id": user["_id"]
    })

    if not doc:
        raise HTTPException(status_code=404, detail="Analysis not found")

    overlay_url = doc["analysis"].get("overlay_image_url")
    if not overlay_url:
        raise HTTPException(status_code=404, detail="Overlay image not found")

    filename = overlay_url.replace("/overlay/", "")
    overlay_path = BASE_DIR / "ai_service" / "outputs" / filename

    if not overlay_path.exists():
        raise HTTPException(
            status_code=404,
            detail=f"Overlay image not found at {overlay_path}"
        )

    return FileResponse(str(overlay_path), media_type="image/png")