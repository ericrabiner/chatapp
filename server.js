require("dotenv").config();

const { ApolloServer, PubSub } = require("apollo-server");
const mongoose = require("mongoose");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const pubsub = new PubSub();

const PORT = process.env.port || 8080;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub }),
  engine: {
    reportSchema: true,
  },
});

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@buro.0gfrl.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`,
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }
  )
  .then(() => {
    console.log(`🚀 MongoDB Connected - db: ${process.env.MONGO_DATABASE}`);
    return server.listen({ port: PORT });
  })
  .then((res) => {
    console.log(`🚀 Server ready at ${res.url}`);
    console.log(`🚀 Subscriptions ready at ${res.subscriptionsUrl}`);
  })
  .catch((err) => {
    console.error(err);
  });
