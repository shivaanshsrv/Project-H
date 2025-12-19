from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers.analysis import router as analysis_router
from app.routers.auth import router as auth_router
from app.routers.users import router as users_router
from app.routers.ai import router as ai_router

app = FastAPI(title="Project-H Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Register routers ONCE
app.include_router(auth_router)
app.include_router(users_router)
app.include_router(ai_router)
app.include_router(analysis_router)
