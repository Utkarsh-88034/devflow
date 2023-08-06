import {
  GraphQLID,
  GraphQLInputObjectType,
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

const AdditionalContextType = new GraphQLInputObjectType({
  name: "AdditionalContext",
  description: "Input type for additional context data",
  fields: {
    type: { type: GraphQLString },
    data: { type: GraphQLString },
    // Define other fields as needed
  },
});
export const newIssue = {
  type: IssueType,
  args: {
    title: { type: GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLNonNull(GraphQLString) },
    priority: { type: GraphQLString },
    assignee: { type: GraphQLID },
    status: { type: GraphQLString },
    reportedBy: { type: GraphQLID },
    project: { type: GraphQLNonNull(GraphQLID) },
    errorMessage: { type: GraphQLNonNull(GraphQLString) },
    stackTrace: { type: GraphQLNonNull(GraphQLString) },
    environment: { type: GraphQLNonNull(GraphQLString) },
    errorType: { type: GraphQLNonNull(GraphQLString) },
    errorLocation: { type: GraphQLNonNull(GraphQLString) },
    additionalContext: { type: GraphQLString },
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
