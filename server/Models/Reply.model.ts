import mongoose from "mongoose";
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    issueId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Issue",
    },
    userId: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
      },
    ],
    commentId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Comment",
    },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Issue", commentSchema);

export default Comment;
