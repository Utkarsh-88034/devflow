import { allProjects, projectById } from "./ProjectSchemaGQL";
import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { allUsers, userById } from "./UserSchemaGQL";

//User

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: () => ({
    AllUsers: allUsers,
    User: userById,

    AllProjects: allProjects,
    ProjectById: projectById,
  }),
});

const query = new GraphQLSchema({ query: RootQuery });
export default query;
