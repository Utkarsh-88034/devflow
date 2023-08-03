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
import { IssueType } from "./issueType";

export const CommentType = new GraphQLObjectType({
  name: "Comment",
  fields: () => ({
    id: { type: GraphQLID },
    content: { type: GraphQLString },
    user: {
      type: UserType,
      resolve: (parent: any, args: any) => {
        return getUserById(parent.userId);
      },
    },
    issue: {
      type: IssueType,
      resolve: (parent: any, args: any) => {
        return getIssueById(parent.issueId);
      },
    },
  }),
});
