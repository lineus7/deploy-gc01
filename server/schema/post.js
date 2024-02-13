const { GraphQLError } = require("graphql");
const postCollection = require("../models/post");
const { ObjectId } = require("mongodb");
const Redis = require("ioredis");

const redis = new Redis({
  host: process.env.REDIS_URI,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
});

const postTypeDefs = `#graphql
    type Comment {
      content: String
      username: String
      createdAt: String
      updatedAt: String
    }

    type User {
        _id: ID
        name: String
        username:String
        email:String
        password:String
    }

    type Like {
      username: String
      createdAt: String
      updatedAt: String
    }

    type Post {
      _id: ID!
      content:String
      tags:[String]
      imgUrl:String
      authorId: ID
      comments: [Comment]
      likes: [Like]
      createdAt: String
      updatedAt: String
      author: User
    }

    input PostInput {
      content:String!
      tags:[String]
      imgUrl:String
    }

    input CommentInput {
      content: String!
    }

    type Query {
        getAllPosts: [Post]
        getPostById(postId:ID!): Post
    }

    type Mutation {
        addPost(input: PostInput!): Post
        addComment(postId:ID!, input:CommentInput! ): Post
        addLike(postId:ID!): Post
    }
`;

const postResolvers = {
  Query: {
    getAllPosts: async (_, __, contextValue) => {
      await contextValue.authentication();

      const agg = [
        {
          $lookup: {
            from: "users",
            localField: "authorId",
            foreignField: "_id",
            as: "author",
          },
        },
        {
          $unwind: {
            path: "$author",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $sort: {
            createdAt: -1,
          },
        },
        {
          $project: {
            "author.password": 0,
          },
        },
      ];
      let cacheData = JSON.parse(await redis.get("posts"), "utf-8");
      if (cacheData) return cacheData;

      const data = await postCollection().aggregate(agg).toArray();
      redis.set("posts", JSON.stringify(data));
      return data;
    },
    getPostById: async (_, { postId }, contextValue) => {
      await contextValue.authentication();

      let agg = [
        {
          $match: {
            _id: new ObjectId(postId),
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "authorId",
            foreignField: "_id",
            as: "author",
          },
        },
        {
          $unwind: {
            path: "$author",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            "author.password": 0,
          },
        },
      ];

      const data = (await postCollection().aggregate(agg).toArray())[0];
      return data;
    },
  },

  Mutation: {
    addPost: async (_, { input }, contextValue) => {
      let payload = await contextValue.authentication();
      if (!input.imgUrl) throw new GraphQLError("ImgUrl is required");
      let authorId = payload._id;
      const body = {
        ...input,
        authorId: new ObjectId(authorId),
        comments: [],
        likes: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const data = await postCollection().insertOne(body);
      const postFound = await postCollection().findOne({
        _id: data.insertedId,
      });
      redis.del("posts");
      return postFound;
    },

    addComment: async (_, { postId, input }, contextValue) => {
      let { username } = await contextValue.authentication();

      const body = {
        ...input,
        username,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      await postCollection().updateOne(
        { _id: new ObjectId(postId) },
        { $push: { comments: body } }
      );
      const postFound = await postCollection().findOne({
        _id: new ObjectId(postId),
      });
      redis.del("posts");
      return postFound;
    },

    addLike: async (_, { postId }, contextValue) => {
      let { username } = await contextValue.authentication();

      let postFound = await postCollection().findOne({
        _id: new ObjectId(postId),
      });

      let foundLike = false;
      postFound.likes.forEach((item) => {
        if (item.username === username) foundLike = true;
      });
      if (foundLike) throw new GraphQLError("Post already been liked");

      const body = {
        username,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      await postCollection().updateOne(
        { _id: new ObjectId(postId) },
        { $push: { likes: body } }
      );
      postFound = await postCollection().findOne({
        _id: new ObjectId(postId),
      });
      redis.del("posts");
      return postFound;
    },
  },
};
module.exports = { postTypeDefs, postResolvers };
