import Post from "../../models/post.js";
import { auth } from "../../utils/auth.js";

const PostQuery = {
  posts: async () => {
    const posts = await Post.find().populate("author");
    return posts;
  },
  post: async (_, { id }) => {
    const post = await Post.findById(id).populate("author");
    return post;
  },
  getMyPosts: async (_, __, { user }) => {
    auth(user);
    const posts = await Post.find({ author: user.id }).populate("author");
    return posts;
  },
};

export default PostQuery;
