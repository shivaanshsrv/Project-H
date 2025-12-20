from motor.motor_asyncio import AsyncIOMotorClient
import os

MONGO_URI = os.getenv("MONGO_URI")
print("🔥 MONGO_URI =", MONGO_URI)

client = AsyncIOMotorClient(MONGO_URI)

db = client["ProjectH"]   
analysis_collection = db["analysis"]
users_collection = db["users"]
