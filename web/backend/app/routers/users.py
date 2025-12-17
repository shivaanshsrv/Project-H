from fastapi import APIRouter
from app.models.user import users_collection

router = APIRouter(prefix="/users", tags=["Users"])

@router.get("/")
async def get_users():
    users = []
    async for u in users_collection.find():
        users.append({
            "id": str(u["_id"]),
            "name": u["name"],
            "email": u["email"]
        })
    return users
