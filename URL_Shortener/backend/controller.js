// backend/controller.js
import { inputData } from "./database.js"

const db_name = process.env.DB;
const collection_name = process.env.COLL;


// CREATE URL WITH POST METHOD
async function postUrl(url) {
    console.log("post method reached");
    try {
        const result = await inputData(db_name, collection_name, [url]);
        console.log("URL inserted successfully:", result);
    } catch (error) {
        console.error("Error inserting URL into the database:", error.message);
        throw error;
    }
}


// RETRIEVE ORIGINAL URL


// UPDATE URL


// DELETE SHORT URL


// GET URL DATA



export {postUrl};