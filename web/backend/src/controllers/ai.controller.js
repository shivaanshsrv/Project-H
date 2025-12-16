import { Analysis } from "../models/index.js";
import { sendToAIService } from "../services/index.js";
import { ApiResponse } from "../utils/index.js";
import fs from "fs";

export const analyzeImageController = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json(new ApiResponse(400, null, "Image is required"));
    }

    const aiResult = await sendToAIService(req.file);

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
    return res.status(500).json({ status: 500, message: error.message });
  }
};

export const getAllAnalysis = async (req, res) => {
  try {
    const list = await Analysis.find({ user: req.user._id }).sort({ createdAt: -1 });
    return res.status(200).json(new ApiResponse(200, list));
  } catch (err) {
    return res.status(500).json({ status: 500, message: err.message });
  }
};

export const getOneAnalysis = async (req, res) => {
  try {
    const item = await Analysis.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    return res.status(200).json(new ApiResponse(200, item));
  } catch (err) {
    return res.status(500).json({ status: 500, message: err.message });
  }
};

export const deleteAnalysis = async (req, res) => {
  try {
    const analysis = await Analysis.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!analysis) {
      return res.status(404).json(new ApiResponse(404, null, "Analysis not found"));
    }

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

    await Analysis.deleteOne({ _id: analysis._id });

    return res.status(200).json(new ApiResponse(200, null, "Analysis deleted successfully"));
  } catch (err) {
    return res.status(500).json({ status: 500, message: err.message });
  }
};
