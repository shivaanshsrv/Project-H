import { sendToAIService } from "../services/index.js";
import { ApiResponse } from "../utils/index.js";

export const analyzeImageController = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json(new ApiResponse(400, null, "Image is required"));
        }

        const aiResult = await sendToAIService(req.file);

        return res.status(200).json(new ApiResponse(200, aiResult, "AI analysis successful"));
    } catch (error) {
        next(error);
    }
};
