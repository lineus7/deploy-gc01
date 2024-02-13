const { GraphQLError } = require("graphql");
const userCollection = require("../models/user");
const { hashPassword, verifyPassword } = require("../utils/hash");
const { ObjectId } = require("mongodb");
const { createToken, verifyToken } = require("../utils/jwt");
const { client } = require("../config/config");

const userTypeDefs = `#graphql
    type User {
        _id: ID
        name: String
        username:String
        email:String
        password:String
    }

    type UserDetail {
        _id: ID
        name: String
        username: String
        email: String
        password: String
        follower: [User]
        following: [User]
    }

    type LoginResponse {
        token:String!
        _id:String
    }

    input RegisterInput{
        name: String
        username:String!
        email:String!
        password:String!
    }

    input LoginInput{
        email:String!
        password:String!
    }

    type Query {
        getAllUsers: [User]
        getUserById(userId:ID!): UserDetail #PAKAI TOKEN DI HEADERS
        getUserByName(username:String,name:String): [User]
    }

    type Mutation {
        register(inputRegister:RegisterInput!): User
        login(input:LoginInput!):LoginResponse
    }
`;

const userResolvers = {
  Query: {
    getAllUsers: async (_, __, contextValue) => {
      try {
        await contextValue.authentication();

        const data = await userCollection().find({}).toArray();
        return data;
      } catch (error) {
        console.log(error);
      }
    },

    getUserById: async (_, { userId }, contextValue) => {
      try {
        await contextValue.authentication();

        const agg = [
          {
            $match: {
              _id: new ObjectId(userId),
            },
          },
          {
            $lookup: {
              from: "follows",
              localField: "_id",
              foreignField: "followingId",
              as: "followerId",
            },
          },
          {
            $lookup: {
              from: "follows",
              localField: "_id",
              foreignField: "followerId",
              as: "followingId",
            },
          },
          {
            $lookup: {
              from: "users",
              localField: "followerId.followerId",
              foreignField: "_id",
              as: "follower",
            },
          },
          {
            $lookup: {
              from: "users",
              localField: "followingId.followingId",
              foreignField: "_id",
              as: "following",
            },
          },
          {
            $project: {
              password: 0,
              followerId: 0,
              followingId: 0,
              "follower.password": 0,
              "follower.email": 0,
              "following.password": 0,
              "following.email": 0,
            },
          },
        ];

        const cursor = userCollection().aggregate(agg);
        const result = await cursor.toArray();
        await client.close();

        return result[0];
      } catch (error) {
        console.log(error);
      }
    },

    getUserByName: async (_, { username, name }, contextValue) => {
      try {
        await contextValue.authentication();

        if (username) {
          let data = await userCollection().find(
            {
              username: { $regex: new RegExp(username, "i") },
            },
            { projection: { password: 0 } }
          );
          let arr = await data.toArray();
          return arr;
        }

        if (name) {
          let data = await userCollection().find({
            name: { $regex: new RegExp(name, "i") },
          });
          let arr = await data.toArray();
          return arr;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  Mutation: {
    register: async (_, args) => {
      if (!args.inputRegister.email)
        throw new GraphQLError("Input cannot empty");
      if (!args.inputRegister.username)
        throw new GraphQLError("Input cannot empty");
      if (!args.inputRegister.password)
        throw new GraphQLError("Input cannot empty");

      let userFound = await userCollection().findOne({
        username: args.inputRegister.username,
      });
      if (userFound) throw new GraphQLError("Username already registered");

      userFound = await userCollection().findOne({
        email: args.inputRegister.email,
      });
      if (userFound) throw new GraphQLError("Email already registered");

      const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailFormat.test(args.inputRegister.email))
        throw new GraphQLError("Email is not in email format");
      if (args.inputRegister.password.length < 5)
        throw new GraphQLError("Password minimal 5 words");

      const body = {
        ...args.inputRegister,
        password: hashPassword(args.inputRegister.password),
      };

      const data = await userCollection().insertOne(body);
      userFound = await userCollection().findOne(
        { _id: data.insertedId },
        { projection: { password: 0 } }
      );

      return userFound;
    },

    login: async (_, args) => {
      let userFound = await userCollection().findOne({
        email: args.input.email,
      });

      if (!userFound) throw new GraphQLError("Invalid Username/Password");
      if (!verifyPassword(args.input.password, userFound.password))
        throw new GraphQLError("Invalid Username/Password");

      //   userFound = await userCollection().findOne(
      //     { username: args.input.username },
      //     { projection: { password: 0 } }
      //   );

      let payload = {
        _id: userFound._id,
        username: userFound.username,
      };

      return { token: createToken(payload), _id: userFound._id };
    },
  },
};
module.exports = { userTypeDefs, userResolvers };
