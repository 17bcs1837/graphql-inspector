const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");

const userTypeDefs = require("./graphql/typedefs");
const userResolvers = require("./graphql/resolvers");

async function graphqlServer() {
  const app = express();

  const apolloServer = new ApolloServer({
    typeDefs: userTypeDefs,
    resolvers: userResolvers,
    introspection: true,
  });

  await apolloServer.start();

  app.use("/api/graphql", express.json(), expressMiddleware(apolloServer));

  app.listen(3000, () => {
    console.log(`GraphQL server running at http://localhost:3000/api/graphql`);
  });
}

graphqlServer();
