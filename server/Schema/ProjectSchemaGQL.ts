import {
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";

import {
  createNewProject,
  deleteProject,
  getAllProjects,
  getProjectById,
} from "../Controller/project";
import { ProjectType } from "../Types/projectType";

//types

//Configs down

export const allProjects = {
  type: new GraphQLList(ProjectType),
  resolve() {
    return getAllProjects();
  },
};

export const projectById = {
  type: ProjectType,
  args: {
    id: { type: GraphQLID },
  },
  resolve(parent: any, args: any) {
    return getProjectById(args.id);
  },
};

export const newProject = {
  type: ProjectType,
  args: {
    name: { type: GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLNonNull(GraphQLString) },
    projectManagerId: { type: GraphQLNonNull(GraphQLID) },
    status: { type: GraphQLNonNull(GraphQLString) },
  },
  resolve(parent: any, args: any) {
    return createNewProject(args);
  },
};

export const deleteProjectById = {
  type: ProjectType,
  args: {
    id: { type: GraphQLNonNull(GraphQLID) },
  },
  resolve(parent: any, args: any) {
    return deleteProject(args.id);
  },
};
