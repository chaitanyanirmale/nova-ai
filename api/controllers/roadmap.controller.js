import Roadmap from "../models/roadmap.js";

export const getRoadmap = async (req, res) => {
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
};


export const deleteRoadmap = async (req, res) => {
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
}
