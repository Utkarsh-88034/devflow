import {
  GraphQLID,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { getUserById } from "../Controller/user";
import { getProjectById } from "../Controller/project";
import { getIssueById } from "../Controller/issue";

export const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    userName: { type: GraphQLString },
    role: { type: GraphQLString },
  }),
});
