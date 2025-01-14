import express, { json } from 'express';
import { postUrl } from "./controller.js";
import Url from "./model.js";

const app = express();

app.use(express.json());
const PORT = 5050;


// CREATE URL WITH POST METHOD
app.post('/post', async (req, res) => {

    // Implement Logic to Post URL to DB
    try {
        const { id, url, createdAt } = req.body;

        // Create a new URL object
        const newUrl = new Url(id, url, createdAt);

        // Call the postUrl function to save it in the database
        await postUrl(newUrl);

        res.status(201).json({message: 'URL Shortened!'});
    } catch {
        res.status(400).json({message: "Error!"});
    }
});


// RETRIEVE ORIGINAL URL


// UPDATE URL


// DELETE SHORT URL


// GET URL DATA



// Server Starting
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });