import { GraphQLError } from "graphql";
import Post from "../../models/post.js";
import { auth, isAuthor } from "../../utils/auth.js";
import Comment from "../../models/comment.js";

const CommentMutation = {
  createComment: async (_, { postId, content }, { user }) => {
    auth(user);
    const newComment = new Comment({ content, author: user.id, post: postId });
    await newComment.save();
    return newComment;
  },
  updateComment: async (_, { id, content }, { user }) => {
    auth(user);
    const comment = await Comment.findById(id);
    const isAuthorized = await isAuthor(comment.author, user);
    if (!isAuthorized) throw new GraphQLError("Unauthorized");

    const updatedComment = await Comment.findByIdAndUpdate(
      id,
      { content },
      { new: true },
    );
    return updatedPost;
  },
  deleteComment: async (_, { id }, { user }) => {
    auth(user);
    const comment = await Comment.findById(id);
    const isAuthorized = await isAuthor(comment.author, user);
    if (!isAuthorized) throw new GraphQLError("Unauthorized");
    const deletedComment = await Comment.findByIdAndDelete(id);
    return deletedComment;
  },
};

export default CommentMutation;
