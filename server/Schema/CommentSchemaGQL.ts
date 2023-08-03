import {
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";

import {
  createNewComment,
  deleteComment,
  getCommentById,
} from "../Controller/comment";
import { CommentType } from "../Types/commentType";

//types

//Configs down

export const CommentById = {
  type: CommentType,
  args: {
    id: { type: GraphQLID },
  },
  resolve(parent: any, args: any) {
    return getCommentById(args.id);
  },
};

export const newComment = {
  type: CommentType,
  args: {
    content: { type: GraphQLNonNull(GraphQLString) },
    issueId: { type: GraphQLNonNull(GraphQLID) },
    userId: { type: GraphQLNonNull(GraphQLID) },
  },
  resolve(parent: any, args: any) {
    return createNewComment(args);
  },
};

export const deleteCommentById = {
  type: CommentType,
  args: {
    id: { type: GraphQLNonNull(GraphQLID) },
  },
  resolve(parent: any, args: any) {
    return deleteComment(args.id);
  },
};
