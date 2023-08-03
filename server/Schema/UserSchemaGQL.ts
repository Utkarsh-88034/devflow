import bcrypt from "bcryptjs";
import {
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { getAllUsers, getUserById, registerNewUser } from "../Controller/user";
import { UserType } from "../Types/userType";

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

export const registerUser = {
  type: UserType,
  args: {
    name: { type: GraphQLNonNull(GraphQLString) },
    email: { type: GraphQLNonNull(GraphQLString) },
    password: { type: GraphQLNonNull(GraphQLString) },
    userName: { type: GraphQLNonNull(GraphQLString) },
    role: { type: GraphQLNonNull(GraphQLString) },
  },
  resolve(parent: any, args: any) {
    return registerNewUser(args);
  },
};
