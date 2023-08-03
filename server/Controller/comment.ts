import Comment from "../Models/Comment.model";
import Issue from "../Models/Issue.model";

export const getAllComment = async () => {
  const res = await Comment.find();
  return res;
};

export const getCommentById = async (id: string) => {
  const res = await Comment.findById(id);
  return res;
};

export const createNewComment = async (args: any) => {
  const res = await Comment.create(args);
  const newIssue = await Issue.findByIdAndUpdate(
    args.issueId,
    {
      $push: { comments: res._id },
    },
    { new: true }
  );
  return res;
};

export const deleteComment = async (id: string) => {
  const res = await Comment.findByIdAndRemove(id);
};
