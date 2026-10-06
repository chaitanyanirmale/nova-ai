import express from 'express'
import Roadmap from '../models/roadmap.js';
import Goal from '../models/goal.model.js';
import generateRoadmap from './aiservice.js';
import protect from '../middleware/auth.middleware.js';

const router = express.Router()

router.post("/roadmap/:goalId", protect, async (req, res) => {
  try {
    const goal = await Goal.findOne({
      _id: req.params.goalId,
      user: req.userId,
    });

    if (!goal) {
      return res.status(404).json({
        success: false,
        message: "Goal not found",
      });
    }

    const roadmapData = await generateRoadmap(goal);

    const roadmap = await Roadmap.create({
      goal: goal._id,
      user: req.userId,
      title: roadmapData.title,
      summary: roadmapData.summary,
      steps: roadmapData.steps,
    });

    res.status(201).json({
      success: true,
      message: "Roadmap generated successfully",
      roadmap,
    });
  } catch (error) {
    console.error("Generate roadmap error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to generate roadmap",
    });
  }
});

router.get("/:goalId", protect, async (req, res) => {
  try {
    const roadmap = await Roadmap.findOne({
      goal: req.params.goalId,
      user: req.userId,
    });

    if (!roadmap) {
      return res.status(404).json({
        success: false,
        message: "Roadmap not found",
      });
    }

    res.status(200).json({
      success: true,
      roadmap,
    });
  } catch (error) {
    console.error("Get roadmap error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch roadmap",
    });
  }
});

router.delete("/:goalId", protect, async (req, res) => {
  try {
    const roadmap = await Roadmap.findOneAndDelete({
      goal: req.params.goalId,
      user: req.userId,
    });

    if (!roadmap) {
      return res.status(404).json({
        success: false,
        message: "Roadmap not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Roadmap deleted successfully",
    });
  } catch (error) {
    console.error("Delete roadmap error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to delete roadmap",
    });
  }
});

export default router