import {
  GraphQLID,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { getAllUsers, getUserById } from "../Controller/user";

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

//types

//Configs down

export const allUsers = {
  type: new GraphQLList(UserType),
  resolve() {
    return getAllUsers();
  },
};

export const userById = {
  type: UserType,
  args: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
  },
  resolve(parent: any, args: any) {
    return getUserById(args.name);
  },
};
