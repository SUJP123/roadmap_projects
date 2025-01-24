import dotenv from 'dotenv';
dotenv.config();

import { MongoClient, ServerApiVersion } from 'mongodb';
const uri = process.env.URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

(async () => {
    try {
      await client.connect();
      console.log("Connected to MongoDB");
    } catch (err) {
      console.error("Error connecting to MongoDB:", err);
      process.exit(1);
    }
  })();

async function inputVotes(data, db_name, collection_name) {
    console.log(data);
    try {
        const db = client.db(db_name);
        const coll = db.collection(collection_name);
        const res = await coll.insertOne(data);
        return res;
    } catch (err) {
        console.error("Error checking if user exists:", err);
        throw new Error("Database operation failed");
    }
}

async function viewVotes(db_name, collection_name, categories) {
    try {
        const db = client.db(db_name);
        const coll = db.collection(collection_name);
        let res = [];
        for (let category of categories) {
            const query = { vote: category };
            const count = await coll.count(query);
            res.push({ category, count });
        }
        return res;
    } catch (err) {
        console.error("Error checking if user exists:", err);
        throw new Error("Database operation failed");
    }
}

async function checkIfUserExists(db_name, collection_name, userId) { 
    try {
        const db = client.db(db_name);
        const coll = db.collection(collection_name);
        const query = { userId: userId };
        const user = await coll.findOne(query);
        return !!user;
    } catch (err) {
        console.error("Error checking if user exists:", err);
        throw new Error("Database operation failed");
    }
}

export {inputVotes, viewVotes, checkIfUserExists};