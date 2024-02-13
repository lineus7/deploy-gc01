const { MongoClient } = require("mongodb");
// Connection URL
const url = process.env.MONGO_URI;
const client = new MongoClient(url);

// Database Name
const dbName = "GC-01";
let db;

async function mongoConnect() {
  try {
    // Use connect method to connect to the server
    await client.connect();
    console.log("Connected successfully to server");
    db = client.db(dbName);
    //   const collection = db.collection("documents");

    // the following code examples can be pasted here...
    console.log("done.");
    return "done.";
  } catch (error) {
    console.log(error);
    await client.close();
    console.log("Connection Closed");
  }
}

function getDatabase() {
  return db;
}

module.exports = { mongoConnect, getDatabase, client };
