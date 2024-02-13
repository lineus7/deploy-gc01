const { getDatabase } = require("../config/config");

const postCollection = () => {
  let db = getDatabase();
  let collection = db.collection("posts");
  return collection;
};

module.exports = postCollection;
