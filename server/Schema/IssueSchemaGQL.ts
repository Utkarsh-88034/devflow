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

import {
  createNewIssue,
  deleteIssue,
  getAllIssues,
  getIssueById,
  getIssuesByQuery,
} from "../Controller/issue";
import { IssueType } from "../Types/issueType";

//types

//Configs down

export const allIssues = {
  type: new GraphQLList(IssueType),
  resolve() {
    return getAllIssues();
  },
};

export const issueById = {
  type: IssueType,
  args: {
    id: { type: GraphQLID },
  },
  resolve(parent: any, args: any) {
    return getIssueById(args.id);
  },
};

export const newIssue = {
  type: IssueType,
  args: {
    title: { type: GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLNonNull(GraphQLString) },
    priority: { type: GraphQLNonNull(GraphQLString) },
    assignee: { type: GraphQLNonNull(GraphQLID) },
    status: { type: GraphQLNonNull(GraphQLString) },
    reportedBy: { type: GraphQLNonNull(GraphQLID) },
    project: { type: GraphQLNonNull(GraphQLID) },
  },
  resolve(parent: any, args: any) {
    return createNewIssue(args);
  },
};

export const deleteIssueById = {
  type: IssueType,
  args: {
    id: { type: GraphQLNonNull(GraphQLID) },
  },
  resolve(parent: any, args: any) {
    return deleteIssue(args.id);
  },
};

export const issueByQuery = {
  type: new GraphQLList(IssueType),
  args: {
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    priority: { type: GraphQLString },
    assignee: { type: GraphQLID },
    status: { type: GraphQLString },
    reportedBy: { type: GraphQLID },
    project: { type: GraphQLID },
  },
  resolve(parent: any, args: any) {
    return getIssuesByQuery(args);
  },
};
