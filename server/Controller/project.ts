import Project from "../Models/Project.model";

export const getAllProjects = async () => {
  const res = await Project.find();
  return res;
};

export const getProjectById = async (id: string) => {
  const res = await Project.findById(id);
  return res;
};
