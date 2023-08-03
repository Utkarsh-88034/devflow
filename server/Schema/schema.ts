import {
  allProjects,
  deleteProjectById,
  newProject,
  projectById,
} from "./ProjectSchemaGQL";
import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";
import { allUsers, registerUser, userById } from "./UserSchemaGQL";
import {
  allIssues,
  deleteIssueById,
  issueById,
  issueByQuery,
  newIssue,
} from "./IssueSchemaGQL";
import { CommentById, deleteCommentById, newComment } from "./CommentSchemaGQL";

//User

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: () => ({
    AllUsers: allUsers,
    User: userById,

    AllProjects: allProjects,
    ProjectById: projectById,

    AllIssues: allIssues,
    IssueById: issueById,
    IssueByQuery: issueByQuery,

    commentById: CommentById,
  }),
});

const mutations = new GraphQLObjectType({
  name: "Mutations",
  fields: {
    registerUser: registerUser,

    newProject: newProject,
    deleteProject: deleteProjectById,

    newIssue: newIssue,
    deleteIssue: deleteIssueById,

    newComment: newComment,
    deleteComment: deleteCommentById,
  },
});
const schema = new GraphQLSchema({ query: RootQuery, mutation: mutations });
export default schema;
