import express, {json} from "express"
import { WebSocketServer } from "ws";
import { inputVotesFromUser, viewAllVotes, checkValidity } from "./controller.js";
import { Poll } from "./model.js";
import { v4 as uuidv4 } from "uuid";

const app = express();

// Initialize Websocket Server
const wss = new WebSocketServer({ port: 8080 });

// Initialize App
app.use(express.json());
const PORT = 5050;

// Store Clients MetaData
const clients = new Map();

function sendClientsData() {
  // Fetch Total Counts
  const outbound = JSON.stringify(viewAllVotes());

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
    ws.on('message', (rawMessage) => { 
      const message = JSON.parse(rawMessage.toString());
      console.log("Received Message", message);
      const { id } = clients.get(ws);
      
      console.log(checkValidity(id))
      if (checkValidity(id)) {
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