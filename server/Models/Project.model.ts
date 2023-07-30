import mongoose from "mongoose";
const Schema = mongoose.Schema;

const projectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    projectManagerId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
    team: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
      },
    ],
    status: {
      type: String,
      enum: ["Not Started", "In Progress", "Completed"],
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    issues: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Issue",
    },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("Project", projectSchema);

export default Project;
