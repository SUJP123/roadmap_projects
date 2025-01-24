import dotenv from 'dotenv';
dotenv.config();

import { viewVotes, inputVotes, checkIfUserExists } from "./database.js";

const db_name = process.env.DB_NAME;
const collection_name = process.env.COLLECTION_NAME;
const categories = ['red', 'blue']


export async function inputVotesFromUser(data) {
    return await inputVotes(data, db_name, collection_name);
}

export async function viewAllVotes() {
    return await viewVotes(db_name, collection_name, categories);
}

export async function checkValidity(userId) {
    return !(await checkIfUserExists(db_name, collection_name, userId));
}