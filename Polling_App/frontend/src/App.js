import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./App.css";

function App() {

  const [votes, setVotes] = useState(null); // Default initial state
  const ws = useRef(null); // Use a ref to manage the WebSocket instance


  useEffect(() => {
    // Initialize WebSocket connection
    const socket = new WebSocket("ws://localhost:8080");

    socket.onopen = () => {
      console.log("Connected to WebSocket server");
    };

    socket.onmessage = (event) => {

      const msg = JSON.parse(event.data);
      setVotes({ red: msg[0].count, blue: msg[1].count });
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.current = socket;

    // Cleanup WebSocket on unmount
    return () => {
      if (ws.current) {
        ws.current.close();
        console.log("WebSocket connection closed");
      }
    };
  }, []); // Run once on component mount

  const handleVote = (color) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      console.log("Voting for", color);
      ws.current.send(JSON.stringify({ vote: color }));
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
      {votes === null ? (<div>Loading...</div>) : (
      <div>
        <h2>Results</h2>
        <p>Red: {votes.red}</p>
        <p>Blue: {votes.blue}</p>
      </div>
      )}
    </div>
  );
}

export default App;