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
        return res;
    } finally {
        await client.close();
    }
}

async function retrieveFromDB(db_name, collection_name, query, projections) {
    try {
        await client.connect();
        const db = client.db(db_name);
        const coll = db.collection(collection_name);
        const res = await coll.findOne(query, projections);
        return res;
    } finally {
        await client.close();
    }
}

async function updateData(db_name, collection_name, shortCode, newUrl) {
    try {
        await client.connect();
        const db = client.db(db_name);
        const coll = db.collection(collection_name);

        // Obtain Current Date and Time
        const now = new Date();
        const isoString = now.toISOString();


        const res = await coll.updateOne({"shortCode":shortCode}, { $set: {"url": newUrl, "updatedAt":isoString}});
        return res;
    } finally {
        await client.close();
    }
}

async function deleteData(db_name, collection_name, shortCode) {
    try {
        await client.connect();
        const db = client.db(db_name);
        const coll = db.collection(collection_name);

        const res = await coll.deleteOne({"shortCode":shortCode});
        return res;
    } finally {
        await client.close();
    }
}

async function incrementUsage(db_name, collection_name, shortCode) {
    try {
        await client.connect();
        const db = client.db(db_name);
        const coll = db.collection(collection_name);

        const res = await coll.updateOne({"shortCode":shortCode}, {$inc: {"accessCount": 1}})
        return res;
    } finally {
        await client.close();
    }
}


export {inputData, retrieveFromDB, updateData, deleteData, incrementUsage};
