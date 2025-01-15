import express, { json } from 'express';
import { postUrl, retrieveUrl, updateUrl, deleteUrl } from "./controller.js";
import Url from "./model.js";

const app = express();

app.use(express.json());
const PORT = 5050;


// CREATE URL WITH POST METHOD
app.post('/shorten', async (req, res) => {

    // Implement Logic to Post URL to DB
    try {
        const { id, url} = req.body;

        // Get Current DateTime obj
        const now = new Date();
        const createdAt = now.toISOString();
        console.log(createdAt);

        // Create a new URL object
        const newUrl = new Url(id, url, createdAt);

        // Call the postUrl function to save it in the database
        const result = await postUrl(newUrl);

        res.status(201).json({message: result});
    } catch {
        res.status(400).json({message: "Error!"});
    }
});


// RETRIEVE ORIGINAL URL
app.get('/shorten/:shortCode', async (req, res) => {
     // Implement Logic to Post URL to DB
     try {
        const shortCode = req.params.shortCode;

        // Call the retrieveUrl function to access it from in the database
        const result = await retrieveUrl(shortCode);

        res.status(200).json({message: result});
    } catch {
        res.status(400).json({message: "Error!"});
    }
});


// UPDATE URL
app.put('/shorten/:shortCode', async (req, res) => {
    try {
        const { newUrl } = req.body;
        const shortCode = req.params.shortCode;

        const result = await updateUrl(shortCode, newUrl);

        const newRes = await retrieveUrl(shortCode);

        res.status(200).json({message: newRes});
    } catch {
        res.status(400).json({message: "Error!"});
    }
})


// DELETE SHORT URL
app.delete('/shorten/:shortCode', async (req, res) => {
    try {
        const shortCode = req.params.shortCode;
        const result = await deleteUrl(shortCode);

        res.status(200).json({message: `Url with shortcode: ${shortCode} was successfully deleted!`});
    } catch {
        res.status(400).json({message: "Error!"});
    }
})


// GET URL DATA



// Server Starting
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });