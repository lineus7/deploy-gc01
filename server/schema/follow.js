const { GraphQLError } = require("graphql");
const { ObjectId } = require("mongodb");
const followCollection = require("../models/follow");

const followTypeDefs = `#graphql
    type Follow {
        followingId: ID
        followerId: ID
        createdAt: String
        updatedAt: String
    }

    #type Query {
    #    getAllFollow: [Follow]
    #}

    type Mutation {
        addFollow(followingId:ID!) : Follow
    }
`;

const followResolvers = {
  // Query: {
  //   getAllFollow: async () => {
  //     const data = await followCollection().find({}).toArray();
  //     return data;
  //   },
  // },

  Mutation: {
    addFollow: async (_, { followingId }, contextValue) => {
      const { _id } = await contextValue.authentication();

      if (followingId === _id) throw new GraphQLError("Cannot follow yourself");

      let followFound = await followCollection().findOne({
        followerId: new ObjectId(_id),
        followingId: new ObjectId(followingId),
      });
      if (followFound) throw new GraphQLError("Already been followed");

      const body = {
        followerId: new ObjectId(_id),
        followingId: new ObjectId(followingId),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const data = await followCollection().insertOne(body);

      followFound = await followCollection().findOne({
        _id: data.insertedId,
      });

      return followFound;
    },
  },
};
module.exports = { followTypeDefs, followResolvers };
