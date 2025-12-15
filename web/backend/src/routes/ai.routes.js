import { Router } from "express";
import { analyzeImageController } from "../controllers/index.js";
import { uploadSingle } from "../utils/fileUpload.js";

const router = Router();

router.post("/analyze", uploadSingle("image"), analyzeImageController);

export { router as aiRouter };
