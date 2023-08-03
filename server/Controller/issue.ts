import Issue from "../Models/Issue.model";
import Project from "../Models/Project.model";

export const getAllIssues = async () => {
  const res = await Issue.find();
  return res;
};

export const getIssueById = async (id: string) => {
  console.log(id);
  const res = await Issue.findById(id);
  return res;
};

export const createNewIssue = async (args: any) => {
  const res = await Issue.create(args);
  const newProject = await Project.findByIdAndUpdate(
    args.project,
    {
      $push: { issues: res._id },
    },
    { new: true }
  );
  return res;
};

export const deleteIssue = async (id: string) => {
  const res = await Issue.findByIdAndRemove(id);
};

export const getIssuesByProjectId = async (id: string) => {
  const res = await Issue.find({ project: id });
  return res;
};

export const getIssuesByQuery = async (arg: Object) => {
  const res = await Issue.find(arg);
  console.log(res);
  return res;
};
