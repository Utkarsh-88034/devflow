import {
  GraphQLID,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { getUserById } from "../Controller/user";
import { getProjectById } from "../Controller/project";
import { getIssueById, getIssuesByProjectId } from "../Controller/issue";
import { UserType } from "./userType";
import { IssueType } from "./issueType";

export const ProjectType: GraphQLObjectType<any, any> = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    startDate: { type: GraphQLString },
    endDate: { type: GraphQLString },
    projectManager: {
      type: UserType,
      resolve: (parent: any, args: any) => {
        return getUserById(parent.projectManagerId);
      },
    },
    team: { type: new GraphQLList(UserType) },
    issues: {
      type: new GraphQLList(IssueType),
      resolve: (parent: any, args: any) => {
        return getIssuesByProjectId(parent._id);
      },
    },
  }),
});
