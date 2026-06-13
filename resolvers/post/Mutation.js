import { GraphQLError } from "graphql";
import Post from "../../models/post.js";
import { auth, isAuthor } from "../../utils/auth.js";

const PostMutation = {
  createPost: async (_, { post }, { user }) => {
    const { title, content } = post;
    console.log(user);
    if (!user) throw new GraphQLError("Unauthorized, please log in");

    const newPost = new Post({ title, content, author: user.id });
    await newPost.save();
    return newPost;
  },
  updatePost: async (_, { id, post }, { user }) => {
    auth(user);

    const postAuthor = await Post.findById(id);
    const isAuthorized = await isAuthor(postAuthor.author, user);
    if (!isAuthorized) throw new GraphQLError("Unauthorized, please log in");

    const { title, content } = post;
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { title, content },
      { new: true },
    );
    return updatedPost;
  },
  deletePost: async (_, { id }, { user }) => {
    auth(user);
    const postAuthor = await Post.findById(id);
    const isAuthorized = await isAuthor(postAuthor.author, user);
    if (!isAuthorized) throw new GraphQLError("Unauthorized, please log in");

    const deletedPost = await Post.findByIdAndDelete(id);
    return deletedPost;
  },
};

export default PostMutation;
