const typeDefs = `#graphql
type Mutation {
  register(user: UserInput): User
  login(email: String!, password: String!): String
  createPost(post:PostInput): Post
  updatePost(id: ID!, post: PostInput): Post
  deletePost(id: ID!): Post
  createComment(comment: CommentInput): Comment
  updateComment(id: ID!, comment: CommentInput): Comment
  deleteComment(id: ID!): Comment

}

type Query {
  users: [User]
  user(id: ID!): User
  posts: [Post]
  post(id: ID!): Post
  getMyPosts: [Post]
  comments: [Comment]
  comment(id: ID!): Comment
  postComments(postId: ID!): [Comment]

}

type User{
  _id: ID!
  name: String
  email: String
  password: String
}

type Post{
  _id: ID!
  title: String!
  content: String!
  author: User
}
input PostInput {
  title: String!
  content: String!
}

input UserInput {
  name: String!
  email: String!
  password: String!
}

type Comment {
  _id: ID!
  content: String!
  author: User
  post: Post
}

input CommentInput {
  content: String!
  post: ID!
}

`;

export default typeDefs;
