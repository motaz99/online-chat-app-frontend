import io from "socket.io-client";
import { useEffect, useState } from "react";
import { Container, TextField, Button, Typography, Paper } from "@mui/material";
import Chat from "./components/Chat";

const socket = io.connect("http://localhost:8080");

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data);
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, []);

  const sendMessage = () => {
    const newMessage = {
      sender: socket.id,
      message: message,
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);

    socket.emit("send_message", { message, client: socket.id });

    setMessage("");
  };

  return (
    <Container maxWidth="md" style={{ marginTop: "2rem" }}>
      <Paper elevation={3} style={{ padding: "1rem" }}>
        <Typography variant="h4" gutterBottom style={{ marginBottom: "1rem" }}>
          Chat Room
        </Typography>
        <div style={{ marginBottom: "1rem" }}>
          {messages.map((msg, index) => (
            <div key={index} style={{ marginBottom: "0.5rem" }}>
              <Typography variant="body1">
                <strong>{msg.sender || msg.client}: </strong> {msg.message}
              </Typography>
            </div>
          ))}
        </div>
        <TextField
          fullWidth
          label="Message"
          variant="outlined"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ marginBottom: "1rem" }}
        />
        <Button variant="contained" color="primary" onClick={sendMessage}>
          Send Message
        </Button>
      </Paper>
      <Chat />
    </Container>
  );
}

export default App;
