console.time("analysis");

import { Analysis } from "../models/index.js";
import { sendToAIService } from "../services/index.js";
import { ApiResponse } from "../utils/index.js";
import { saveBase64Image } from "../utils/saveImage.js";
import fs from "fs";

export const analyzeImageController = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json(new ApiResponse(400, null, "Image is required"));
        }

        // Send to AI microservice
        const aiResult = await sendToAIService(req.file);

        // Save output images to disk
        const rooftopMaskPath = aiResult.rooftop_mask_path;
        const obstructionMaskPath = aiResult.obstruction_mask_path;
        const heatmapPath = aiResult.heatmap_path;


        // Save to DB with USER ID
        const saved = await Analysis.create({
                user: req.user._id,
                originalImage: req.file.path,

                rooftopMask: aiResult.rooftop_mask_path,
                obstructionMask: aiResult.obstruction_mask_path,
                heatmap: aiResult.heatmap_path,

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

export const deleteAnalysis = async (req, res, next) => {
    try {
        const analysis = await Analysis.findOne({
            _id: req.params.id,
            user: req.user._id
        });

        if (!analysis) {
            return res.status(404).json(new ApiResponse(404, null, "Analysis not found"));
        }

        // Delete images from disk
        const filesToDelete = [
            analysis.originalImage,
            analysis.rooftopMask,
            analysis.obstructionMask,
            analysis.heatmap
        ];

        filesToDelete.forEach((file) => {
            if (file && fs.existsSync(file)) {
                fs.unlinkSync(file);
            }
        });

        // Delete MongoDB document
        await Analysis.deleteOne({ _id: analysis._id });

        return res.status(200).json(
            new ApiResponse(200, null, "Analysis deleted successfully")
        );

    } catch (err) {
        next(err);
    }
};

console.timeEnd("analysis");

