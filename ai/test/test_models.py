import torch
import cv2
import numpy as np
import os

# -------------------------
# Test YOLOv8 Segmentation
# -------------------------
print("Testing YOLO model...")

try:
    from ultralytics import YOLO  #type: ignore
    yolo = YOLO("yolov8n-seg.pt")
    print("YOLOv8-Seg LOADED successfully! ✔")
except Exception as e:
    print("YOLO FAILED ❌")
    print(e)


# -------------------------
# Test SAM Model
# -------------------------
print("\nTesting SAM model...")

try:
    from models.sam_model import load_sam_model
    predictor = load_sam_model()
    print("SAM Model LOADED successfully! ✔")
except Exception as e:
    print("SAM FAILED ❌")
    print(e)

