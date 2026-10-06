import mongoose from 'mongoose'

const roadmapStepSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    order: {
      type: Number,
      required: true,
    },

    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    _id: true,
  }
);

const roadmapSchema = new mongoose.Schema(
  {
    goal: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Goal",
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    summary: {
      type: String,
      default: "",
      trim: true,
    },

    steps: {
      type: [roadmapStepSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Roadmap = mongoose.model("Roadmap", roadmapSchema);

export default Roadmap;