from fastapi import APIRouter, HTTPException, Response
from datetime import datetime
import uuid

from app.database import users_collection
from app.utils.password import hash_password, verify_password
from app.utils.jwt import create_access_token
from app.schemas.auth import RegisterSchema, LoginSchema

router = APIRouter(prefix="/auth", tags=["Auth"])


# ================= REGISTER =================
@router.post("/register")
async def register(data: RegisterSchema):
    existing = await users_collection.find_one({"email": data.email})

    if existing:
        raise HTTPException(status_code=400, detail="Email already exists")

    user = {
        "_id": uuid.uuid4().hex,
        "name": data.name,
        "email": data.email,
        "password_hash": hash_password(data.password),
        "created_at": datetime.utcnow().isoformat(),
    }

    await users_collection.insert_one(user)

    return {"message": "User registered successfully"}


# ================= LOGIN =================
@router.post("/login")
async def login(data: LoginSchema, response: Response):
    user = await users_collection.find_one({"email": data.email})

    if not user or not verify_password(data.password, user["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token({"user_id": user["_id"]})

    # 🔐 Set JWT as HttpOnly cookie
    response.set_cookie(
        key="access_token",
        value=token,
        httponly=True,
        secure=False,          # IMPORTANT: keep False for localhost
        samesite="lax",
        max_age=60 * 60 * 24,  # 1 day
        path="/",
    )

    return {"message": "Login successful"}


# ================= LOGOUT =================
@router.post("/logout")
async def logout(response: Response):
    response.delete_cookie(
        key="access_token",
        path="/",
    )

    return {"message": "Logged out successfully"}


# ================= DEBUG =================
@router.get("/debug/db")
async def debug_db():
    doc = {"test": "working"}
    await users_collection.insert_one(doc)
    return {"status": "inserted"}