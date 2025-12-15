import { Analysis } from "../models/index.js";
import { sendToAIService } from "../services/index.js";
import { ApiResponse } from "../utils/index.js";
import { saveBase64Image } from "../utils/saveImage.js";

export const analyzeImageController = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json(new ApiResponse(400, null, "Image is required"));
        }

        // Send to AI microservice
        const aiResult = await sendToAIService(req.file);

        // Save output images to disk
        const rooftopMaskPath = saveBase64Image(aiResult.rooftop_mask, "masks", "roof");
        const obstructionMaskPath = saveBase64Image(aiResult.obstruction_mask, "masks", "obs");
        const heatmapPath = saveBase64Image(aiResult.heatmap, "heatmaps", "heat");

        // Save to DB with USER ID
        const saved = await Analysis.create({
            user: req.user._id,     // <-- THIS is the important part

            originalImage: req.file.path,
            rooftopMask: rooftopMaskPath,
            obstructionMask: obstructionMaskPath,
            heatmap: heatmapPath,

            panelCount: aiResult.panel_count,
            estimatedEnergy: aiResult.estimated_energy_watts,
            panels: aiResult.panels
        });

        return res.status(200).json(new ApiResponse(200, saved, "AI analysis saved successfully"));

    } catch (error) {
        next(error);
    }
};

// Get all analyses for this logged-in user
export const getAllAnalysis = async (req, res, next) => {
    try {
        const list = await Analysis.find({ user: req.user._id }).sort({ createdAt: -1 });
        return res.status(200).json(new ApiResponse(200, list));
    } catch (err) {
        next(err);
    }
};

// Get one analysis
export const getOneAnalysis = async (req, res, next) => {
    try {
        const item = await Analysis.findOne({
            _id: req.params.id,
            user: req.user._id
        });

        return res.status(200).json(new ApiResponse(200, item));
    } catch (err) {
        next(err);
    }
};
