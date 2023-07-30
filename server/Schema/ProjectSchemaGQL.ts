import {
  GraphQLID,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";

import { getAllProjects, getProjectById } from "../Controller/project";
import { UserType } from "./UserSchemaGQL";
import { getUserById } from "../Controller/user";

const ProjectType = new GraphQLObjectType({
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
  }),
});

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
