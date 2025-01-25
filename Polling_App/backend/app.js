import express, {json} from "express"
import { WebSocketServer } from "ws";
import { inputVotesFromUser, viewAllVotes, checkValidity } from "./controller.js";
import { Poll } from "./model.js";
import { v4 as uuidv4 } from "uuid";
import cors from "cors";

const app = express();
app.use(cors());

// Initialize Websocket Server
const wss = new WebSocketServer({ port: 8080 });

// Initialize App
app.use(express.json());
const PORT = 5050;

app.get("/initial", async (req, res) => { 
  const result = await viewAllVotes();
  return result;
});

// Store Clients MetaData
const clients = new Map();

async function sendClientsData() {
  // Fetch Total Counts
  console.log("Sending Data to Clients - Start");
  const outbound = JSON.stringify(await viewAllVotes());
  console.log("Sending Data to Clients", outbound);

  [...clients.keys()].forEach((client) => {
    client.send(outbound);
  });

}

// Connect and Create a new client for each new connection
wss.on('connection', (ws) => { 
    const id = uuidv4();
    clients.set(ws, {id});
    console.log(`New Client Connected with id ${id}`);

    // Listen for incoming messages (messages => { vote: string })
    ws.on('message', async (rawMessage) => { 
      const message = JSON.parse(rawMessage.toString());
      console.log("Received Message", message);
      const { id } = clients.get(ws);
      
      // Check if user already voted, valid if they haven't
      const valid = await checkValidity(id); 
      if (valid) {
        const data = new Poll(message.vote, id);
        inputVotesFromUser(data);
        console.log(`Received vote ${message.vote} from user ${id}`);
        sendClientsData();
      }

  
      // Remove Client on Disconnect
      ws.on('close', () => {
          clients.delete(ws);
      });
  });
});


// Server Starting
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });