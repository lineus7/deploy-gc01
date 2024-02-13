const { GraphQLError } = require("graphql");
const { verifyToken } = require("../utils/jwt");
const userCollection = require("../models/user");
const { ObjectId } = require("mongodb");

const authentication = async (req) => {
  let { authorization } = req.headers;
  // console.log(authorization);
  if (!authorization) throw new GraphQLError("Invalid Token");

  let token = authorization.split(` `)[1];
  let payload = verifyToken(token);

  let userFound = await userCollection().findOne({
    _id: new ObjectId(payload._id),
  });
  if (!userFound) throw new GraphQLError("Invalid Token");

  return payload;
};
module.exports = authentication;
