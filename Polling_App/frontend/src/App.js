import logo from './logo.svg';
import { useState, useEffect} from 'react';
import './App.css';

function App() {

  // Hard Coded Categories for votes
  const [votes, setVotes] = useState({ red: 0, blue: 0 });

  // Websocket State
  const [ws, setWs] = useState(null);


  useEffect(() => {
    const connectToServer = async () => {
      const socket = new WebSocket("ws://localhost:8080");

      socket.onopen = () => {
        console.log("Connected to WebSocket server");
      };

      socket.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        setVotes(msg);
      };

      socket.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      setWs(socket);
    };

    connectToServer();

    // Cleanup WebSocket on unmount
    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []); // Run once when the component mounts

  const handleVote = (color) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      console.log("Voting for", color);
      ws.send(JSON.stringify({ vote: color }));
    } else {
      console.error("WebSocket is not connected");
    }
  };

  return (
    <div className="App">
      <div>
        <h1>Simple Polling App</h1>
      </div>

      <div>
        <button onClick={() => handleVote("red")}>Red</button>
        <button onClick={() => handleVote("blue")}>Blue</button>
      </div>

      <div>
        <h2>Results</h2>
        <p>Red: {votes.red}</p>
        <p>Blue: {votes.blue}</p>
      </div>
    </div>
  );
}

export default App;