const { getDatabase } = require("../config/config");

const followCollection = () => {
  let db = getDatabase();
  let collection = db.collection("follows");
  return collection;
};

module.exports = followCollection;
