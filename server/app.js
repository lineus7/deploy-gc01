if (process.env.NODE_ENV !== "production") require(`dotenv`).config();
const { ApolloServer } = require(`@apollo/server`);
const { startStandaloneServer } = require(`@apollo/server/standalone`);
const { mongoConnect } = require("./config/config");
const { userTypeDefs, userResolvers } = require("./schema/user");
const { postTypeDefs, postResolvers } = require("./schema/post");
const { followTypeDefs, followResolvers } = require("./schema/follow");
const authentication = require("./middlewares/auth");

const server = new ApolloServer({
  typeDefs: [userTypeDefs, postTypeDefs, followTypeDefs],
  resolvers: [userResolvers, postResolvers, followResolvers],
  introspection: true,
});

(async () => {
  const { url } = await startStandaloneServer(server, {
    context: async ({ req, res }) => {
      await mongoConnect();
      return { authentication: () => authentication(req) };
    },
    listen: { port: process.env.PORT },
  });
  console.log(`🚀  Server ready at: ${url}`);
})();
