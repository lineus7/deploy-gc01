const { getDatabase } = require("../config/config");

const userCollection = () => {
  let db = getDatabase();
  let collection = db.collection("users");
  return collection;
};

module.exports = userCollection;
