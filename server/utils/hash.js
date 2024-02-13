let bcrypt = require("bcryptjs");
let hashPassword = (password) => bcrypt.hashSync(password);
let verifyPassword = (password, hash) => bcrypt.compareSync(password, hash);

module.exports = { hashPassword, verifyPassword };
