import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import typeDefs from "./typedefs.js";
import resolvers from "./resolvers/index.js";
import { dbConnection } from "./dbConnection.js";
import { auth } from "./auth.js";

await dbConnection();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  context: async ({ req, res }) => {
    const user = await auth(req);
    return { req, res, user };
  },
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
