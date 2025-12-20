from fastapi import APIRouter, Depends
from app.utils.jwt import get_current_user

router = APIRouter(tags=["Users"])

@router.get("/profile")
async def get_profile(user=Depends(get_current_user)):
    return {
        "id": str(user["_id"]),
        "name": user["name"],
        "email": user["email"],
        "created_at": user.get("created_at")
    }
