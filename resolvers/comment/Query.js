import Post from "../../models/post.js";
import Comment from "../../models/comment.js";

const CommentQuery = {
  comments: async () => {
    const posts = await Post.find().populate("author");
    return posts;
  },
  comment: async (_, { id }) => {
    const post = await Post.findById(id).populate("author");
    return post;
  },
  postComments: async (_, { postId }) => {
    const post = await Comment.find({ post: postId }).populate("author");
    return post;
  },
};

export default CommentQuery;
