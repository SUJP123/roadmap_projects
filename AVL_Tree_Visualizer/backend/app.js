import express, { json } from 'express';


const app = express();

app.use(express.json());
const PORT = 5050;




// Server Starting
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});