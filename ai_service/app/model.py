import torch
from pathlib import Path
from ultralytics import YOLO
from segment_anything import sam_model_registry, SamPredictor

MODEL_DIR = Path("models")
MODEL_DIR.mkdir(exist_ok=True)

YOLO_PATH = MODEL_DIR / "yolov8n.pt"
SAM_PATH = MODEL_DIR / "sam_vit_b.pth"   # NOTE: NOT mobile_sam.pt

class AIModel:
    def __init__(self):
        print("\n==============================")
        print("[MODEL] Initializing AI Models")
        print("==============================")

        # ---------------------------
        # YOLOv8
        # ---------------------------
        print("[MODEL] Loading YOLOv8n...")
        self.yolo = YOLO(str(YOLO_PATH))
        print("[MODEL] YOLOv8n loaded ✓")

        # ---------------------------
        # SAM (ViT-B — OFFICIAL)
        # ---------------------------
        print("[MODEL] Loading SAM ViT-B...")

        if not SAM_PATH.exists():
            raise FileNotFoundError(
                f"SAM weights not found at {SAM_PATH}\n"
                f"Download sam_vit_b.pth and place it in models/"
            )

        sam = sam_model_registry["vit_b"](checkpoint=str(SAM_PATH))
        sam.to("cpu")

        self.sam_predictor = SamPredictor(sam)

        print("[MODEL] SAM ViT-B loaded ✓")
        print("==============================")
        print("[MODEL] All models ready.")
        print("==============================\n")


ai_model = AIModel()
