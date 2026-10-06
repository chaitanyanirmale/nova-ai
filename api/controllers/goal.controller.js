import Goal from "../models/goal.model.js";



export const createGoal = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Goal title is required",
      });
    }

    const goal = await Goal.create({
      title,
      description,
      user: req.userId,
    });

    res.status(201).json({
      success: true,
      message: "Goal created successfully",
      goal,
    });
  } catch (error) {
    console.error("Create goal error:", error.message);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}


export const getGoal = async (req, res) => {
  try {
    const goals = await Goal.find({
      user: req.userId,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      goals,
    });
  } catch (error) {
    console.error("Get goals error:", error.message);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}

export const updateGoal = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    const goal = await Goal.findOne({
      _id: req.params.id,
      user: req.userId,
    });

    if (!goal) {
      return res.status(404).json({
        success: false,
        message: "Goal not found",
      });
    }

    goal.title = title ?? goal.title;
    goal.description = description ?? goal.description;
    goal.status = status ?? goal.status;

    await goal.save();

    res.status(200).json({
      success: true,
      message: "Goal updated successfully",
      goal,
    });
  } catch (error) {
    console.error("Update goal error:", error.message);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}


export const deleteGoal = async (req, res) => {
  try {
    const goal = await Goal.findOneAndDelete({
      _id: req.params.id,
      user: req.userId,
    });

    if (!goal) {
      return res.status(404).json({
        success: false,
        message: "Goal not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Goal deleted successfully",
    });
  } catch (error) {
    console.error("Delete goal error:", error.message);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}