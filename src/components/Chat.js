import React from "react";
import { makeStyles } from "@mui/styles"; // Note the correct import path
import Paper from "@mui/material/Paper"; // Correct import path
import Grid from "@mui/material/Grid"; // Correct import path
import Box from "@mui/material/Box"; // Correct import path
import Divider from "@mui/material/Divider"; // Correct import path
import TextField from "@mui/material/TextField"; // Correct import path
import Typography from "@mui/material/Typography"; // Correct import path
import List from "@mui/material/List"; // Correct import path
import ListItem from "@mui/material/ListItem"; // Correct import path
import ListItemIcon from "@mui/material/ListItemIcon"; // Correct import path
import ListItemText from "@mui/material/ListItemText"; // Correct import path
import Avatar from "@mui/material/Avatar"; // Correct import path
import Fab from "@mui/material/Fab"; // Correct import path
import SendIcon from "@mui/icons-material/Send"; // Correct import path

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: "100%",
    height: "80vh",
  },
  headBG: {
    backgroundColor: "#e0e0e0",
  },
  borderRight500: {
    borderRight: "1px solid #e0e0e0",
  },
  messageArea: {
    height: "70vh",
    overflowY: "auto",
  },
});

const Chat = ({ messages }) => {
  const classes = useStyles();

  return (
    <div>
      <Grid border={9} borderColor="primary.main" container>
        <Grid item xs={12}>
          <Typography variant="h5" className="header-message">
            Chat
          </Typography>
        </Grid>
      </Grid>
      <Grid container component={Paper} className={classes.chatSection}>
        <Grid item xs={3} className={classes.borderRight500}>
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
          <List className={classes.messageArea}>
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
              />
            </Grid>
            <Grid xs={1} align="right">
              <Fab color="primary" aria-label="add">
                <SendIcon />
              </Fab>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Chat;
