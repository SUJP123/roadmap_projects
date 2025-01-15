// backend/controller.js
import { inputData, retrieveFromDB, updateData, deleteData, incrementUsage } from "./database.js"

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
        const result = await retrieveFromDB(db_name, collection_name, {"shortCode": shortcode}, { projection: {"accessCount": 0}});
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

// Increment Usage 
async function increment(shortCode) {
    try {
        const result = await incrementUsage(db_name, collection_name, shortCode);
        console.log("URL access count successfully updated:", result);
        return result;
    } catch (error) {
        console.error("Error updated url access count:", error.message);
        throw error;
    }
}

// GET URL DATA
async function getUrlData(shortCode) {
    try {
        const result = await  retrieveFromDB(db_name, collection_name, {"shortCode":shortCode}, {});
        console.log("URL Data Obtained:", result);
        return result;
    } catch (error) {
        console.error("Error Obtaining Url Data:", error.message);
        throw error;
    }
}


export {postUrl, retrieveUrl, updateUrl, deleteUrl, increment, getUrlData}