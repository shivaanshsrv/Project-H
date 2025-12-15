import { Router } from "express";
import { analyzeImageController, getAllAnalysis, getOneAnalysis } from "../controllers/index.js";
import { uploadSingle } from "../utils/fileUpload.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

// Protected route → requires login
router.post("/analyze", authMiddleware, uploadSingle("image"), analyzeImageController);

// Fetch analyses of only this user
router.get("/all", authMiddleware, getAllAnalysis);

router.get("/:id", authMiddleware, getOneAnalysis);

export { router as aiRouter };
