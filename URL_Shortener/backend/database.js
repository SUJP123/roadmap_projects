import dotenv from 'dotenv';
dotenv.config();

import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.URI;

const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
});

async function inputData(db_name, collection_name, data) {

    try {
        await client.connect();
        const db = client.db(db_name);
        const coll = db.collection(collection_name);
        const res = await coll.insertMany(data);
    } finally {
        await client.close();
    }
}

export {inputData};
