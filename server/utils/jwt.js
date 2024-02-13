let jwt = require("jsonwebtoken");

let secretKey = process.env.JWT_SECRET_KEY;
let createToken = (payload) => jwt.sign(payload, secretKey);
let verifyToken = (token) => jwt.verify(token, secretKey);

module.exports = { createToken, verifyToken };
