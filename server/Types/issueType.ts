import {
  GraphQLID,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { getUserById } from "../Controller/user";
import { getProjectById } from "../Controller/project";
import { getIssueById } from "../Controller/issue";
import { UserType } from "./userType";
import { ProjectType } from "./projectType";

export const IssueType: GraphQLObjectType<any, any> = new GraphQLObjectType({
  name: "Issue",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    priority: { type: GraphQLString },
    assignee: {
      type: UserType,
      resolve: (parent: any, args: any) => {
        return getUserById(parent.assignee);
      },
    },
    reportedBy: {
      type: UserType,
      resolve: (parent: any, args: any) => {
        return getUserById(parent.reportedBy);
      },
    },
    project: {
      type: ProjectType,
      resolve: (parent: any, args: any) => {
        return getProjectById(parent.project);
      },
    },
  }),
});
