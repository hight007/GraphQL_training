const { createServer, createPubSub } = require("@graphql-yoga/node");
const pubSub = createPubSub();

const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const Subscription = require("./resolvers/Subscription");
const users = require("./utils/users");

//require fs
const fs = require("fs");
//require path
const path = require("path");

const typeDefs = fs.readFileSync(
  path.join(__dirname, "schema.graphql"),
  "utf8"
);

const createServer_graphql = async (typeDefs) => {
  // Create your server
  const server = createServer({
    schema: {
      typeDefs,
      resolvers: {
        Query,
        Mutation,
        Subscription,
      },
    },
    context: {
      users,
      pubSub,
    },
  });

  const options = {
    port: 4000,
    endpoint: "/graphql",
  };
  // start the server and explore http://localhost:4000/graphql
  server.start();
};

//create server
createServer_graphql(typeDefs);
