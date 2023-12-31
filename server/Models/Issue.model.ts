import mongoose from "mongoose";
const Schema = mongoose.Schema;

const issueSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Open",
    },
    priority: {
      type: String,
    },
    project: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Project",
    },
    assignee: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
    reportedBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
    comments: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Comment",
      },
    ],
    attachments: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Attachment",
      },
    ],
    errorMessage: {
      type: String,
    },
    stackTrace: {
      type: String,
    },
    environment: {
      type: String,
    },
    errorType: {
      type: String,
    },
    errorLocation: {
      type: String,
    },
    additionalContext: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Issue = mongoose.model("Issue", issueSchema);

export default Issue;
