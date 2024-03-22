import React, { useEffect, useState } from "react";

import io from "socket.io-client";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import Fab from "@mui/material/Fab";
import SendIcon from "@mui/icons-material/Send";
import Container from "@mui/material/Container";

const socket = io.connect("http://localhost:8080");

const Chat = () => {
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
  }, [socket]);

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
    <Container maxWidth="md" sx={{ marginTop: "2rem" }}>
      <Grid container>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ padding: "1rem" }}>
            <Typography variant="h4" gutterBottom sx={{ marginBottom: "1rem" }}>
              Chat Room
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <Grid container component={Paper} sx={{ width: "100%", height: "80vh" }}>
        <Grid item xs={3} sx={{ borderRight: "1px solid #e0e0e0" }}>
          <Divider />
          <List>
            <ListItem button key="GlobalChat">
              <ListItemIcon>
                <Avatar
                  alt="Cindy Baker"
                  src="https://material-ui.com/static/images/avatar/2.jpg"
                />
              </ListItemIcon>
              <ListItemText primary="Global Chat">Global Chat</ListItemText>
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={9}>
          <List sx={{ height: "70vh", overflowY: "auto" }}>
            {messages.map((msg, index) => (
              <div key={index} style={{ marginBottom: "0.5rem" }}>
                <ListItem key="1">
                  <Grid container>
                    <Grid item xs={12}>
                      <ListItemText
                        align={msg.sender ? "right" : "left"}
                        primary={msg.message}
                      ></ListItemText>
                    </Grid>
                    <Grid item xs={12}>
                      <ListItemText
                        align={msg.sender ? "right" : "left"}
                        secondary="09:30"
                      ></ListItemText>
                    </Grid>
                  </Grid>
                </ListItem>
              </div>
            ))}
          </List>
          <Divider />
          <Grid container style={{ padding: "20px" }}>
            <Grid item xs={11}>
              <TextField
                id="outlined-basic-email"
                label="Type Something"
                fullWidth
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                style={{ marginBottom: "1rem" }}
              />
            </Grid>
            <Grid xs={1} align="right">
              <Fab color="primary" aria-label="add">
                <SendIcon onClick={sendMessage} />
              </Fab>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Chat;
