from fastapi import APIRouter, UploadFile, Depends
from datetime import datetime
from app.services.ai_service import send_to_ai_service
from app.utils.file import save_upload
from app.utils.jwt import get_current_user
from app.database import analysis_collection

router = APIRouter(prefix="/ai", tags=["AI"])


@router.post("/analyze")
async def analyze(
    image: UploadFile,
    user=Depends(get_current_user)
):
    # 1️⃣ Save image locally
    image_path = await save_upload(image)

    # 2️⃣ Call AI service
    analysis_result = await send_to_ai_service(image_path)

    # 3️⃣ Save analysis to MongoDB ✅
    doc = {
        "user_id": user["_id"],
        "image_path": image_path,
        "analysis": analysis_result,
        "created_at": datetime.utcnow(),
    }

    result = await analysis_collection.insert_one(doc)

    # 4️⃣ Return response
    return {
        "status": "success",
        "analysis_id": str(result.inserted_id),
        "analysis": analysis_result
    }
