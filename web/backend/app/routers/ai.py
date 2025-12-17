from fastapi import APIRouter, UploadFile, Depends
from app.services.ai_service import send_to_ai_service
from app.utils.file import save_upload
from app.utils.jwt import decode_token
from fastapi.security import HTTPBearer

router = APIRouter(prefix="/ai", tags=["AI"])
security = HTTPBearer()

def require_auth(auth=Depends(security)):
    token = auth.credentials
    return decode_token(token)

@router.post("/analyze")
async def analyze(image: UploadFile, user=Depends(require_auth)):
    file_path = await save_upload(image)
    result = await send_to_ai_service(file_path)
    return {"status": 200, "analysis": result}
