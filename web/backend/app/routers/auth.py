from fastapi import APIRouter, HTTPException
from app.schemas.auth import RegisterSchema, LoginSchema
from app.models.user import users_collection
from app.utils.password import hash_password, verify_password
from app.utils.jwt import create_token

router = APIRouter(prefix="/auth", tags=["Auth"])

@router.post("/register")
async def register(data: RegisterSchema):
    existing = await users_collection.find_one({"email": data.email})
    if existing:
        raise HTTPException(400, "User already exists")

    user = {
        "name": data.name,
        "email": data.email,
        "password": hash_password(data.password)
    }

    result = await users_collection.insert_one(user)

    return {
        "status": 201,
        "message": "User registered",
        "id": str(result.inserted_id)
    }


@router.post("/login")
async def login(data: LoginSchema):
    user = await users_collection.find_one({"email": data.email})
    if not user:
        raise HTTPException(400, "User not found")

    if not verify_password(data.password, user["password"]):
        raise HTTPException(400, "Incorrect password")

    token = create_token({"id": str(user["_id"])})

    return {
        "status": 200,
        "message": "Login successful",
        "token": token
    }
