import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    MONGO_URI: str = os.getenv("MONGO_URI", "")
    JWT_SECRET: str = os.getenv("JWT_SECRET", "supersecret")
    JWT_ALGO: str = "HS256"

settings = Settings()
