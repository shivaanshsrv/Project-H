import torch
import os
from ultralytics import YOLO
from segment_anything import sam_model_registry
from pathlib import Path

MODEL_DIR = Path("models")
MODEL_DIR.mkdir(exist_ok=True)

YOLO_PATH = MODEL_DIR / "yolov8n.pt"
SAM_PATH = MODEL_DIR / "mobilesam.pth"


class AIModel:
    def __init__(self):
        print("\n==============================")
        print("[MODEL] Initializing AI Models")
        print("==============================")

        # ---------------------------
        # YOLOv8n LOADER
        # ---------------------------
        print("[MODEL] Loading YOLOv8n...")
        if not YOLO_PATH.exists():
            print("[DOWNLOAD] YOLOv8n not found. Downloading...")
        self.yolo = YOLO("yolov8n.pt")  # Ultralytics auto-downloads if missing
        print("[MODEL] YOLOv8n loaded ✓")

        # ---------------------------
        # MobileSAM LOADER
        # ---------------------------
        print("[MODEL] Loading MobileSAM...")

        if not SAM_PATH.exists():
            print("[DOWNLOAD] MobileSAM weights not found. Downloading...")
            torch.hub.download_url_to_file(
                "https://github.com/ChaoningZhang/MobileSAM/releases/download/weights/mobile_sam.pt",
                SAM_PATH
            )

        self.sam = sam_model_registry["vit_t"](checkpoint=str(SAM_PATH))
        self.sam.to("cpu")  # keep CPU mode for maximum compatibility

        print("[MODEL] MobileSAM loaded ✓")

        print("==============================")
        print("[MODEL] All models ready.")
        print("==============================\n")


ai_model = AIModel()
