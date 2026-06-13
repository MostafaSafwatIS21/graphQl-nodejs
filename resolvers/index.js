import userMutation from "./user/Mutation.js";
import userQuery from "./user/Query.js";
import postMutation from "./post/Mutation.js";
import postQuery from "./post/Query.js";

const resolvers = {
  Query: {
    ...userQuery,
    ...postQuery,
  },
  Mutation: {
    ...userMutation,
    ...postMutation,
  },
};
export default resolvers;
