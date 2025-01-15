// backend/controller.js
import { inputData, retrieveFromDB, updateData, deleteData } from "./database.js"

const db_name = process.env.DB;
const collection_name = process.env.COLL;


// CREATE URL WITH POST METHOD
async function postUrl(url) {
    try {
        const result = await inputData(db_name, collection_name, [url]);
        console.log("URL inserted successfully:", result);

        const currentData = retrieveUrl(url.shortCode);

        return currentData;
    } catch (error) {
        console.error("Error inserting URL into the database:", error.message);
        throw error;
    }
}

// RETRIEVE ORIGINAL URL
async function retrieveUrl(shortcode) {
    try {
        const result = await retrieveFromDB(db_name, collection_name, {"shortCode": shortcode});
        console.log("URL Successfully Obtained:", result);
        return result;
    } catch (error) {
        console.error("Error getting URL INFO: ", error.message);
        throw error;
    }
}

// UPDATE URL
async function updateUrl(shortCode, newUrl) {
    try {
        const result = await updateData(db_name, collection_name, shortCode, newUrl);
        console.log("URL successfully Updated:", result);
        return result;
    } catch (error) {
        console.error("Error updating url:", error.message);
        throw error;
    }
}


// DELETE SHORT URL
async function deleteUrl(shortCode) {
    try {
        const result = await deleteData(db_name, collection_name, shortCode);
        console.log("URL successfully deleted:", result);
        return result;
    } catch (error) {
        console.error("Error deleting url:", error.message);
        throw error;
    }
}

// GET URL DATA


export {postUrl, retrieveUrl, updateUrl, deleteUrl}