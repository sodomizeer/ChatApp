// import React from "react";
import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

export default function Sidebar({ onChatSelect }) {
  //States
  const [chats, setChats] = useState([]);

  const YOUR_TOKEN = localStorage.getItem("token");

  const handleChatClick = (chatId) => {
    // Updates the selected chat ID when a chat is clicked
    onChatSelect(chatId);
  };
  useEffect(() => {
    // Fetch existing chats from the backend

    fetch("http://127.0.0.1:8000/chats/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${YOUR_TOKEN}`, // Replace with the actual token
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setChats(data);
      })
      .catch((error) => {
        console.error("Error fetching chats:", error);
      });
  }, [YOUR_TOKEN]);

  return (
    <div
      className="sidebar"
      style={{
        boxShadow: "0 0 15px rgba(0, 0, 0, 0.4)",
      }}
    >
      <AppBar
        position="static"
        style={{ backgroundColor: "rgba(20, 177, 70, 0.137)" }}
      >
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            color="green"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            style={{ color: "green", fontWeight: "600" }}
          >
            Chats Rooms
          </Typography>
        </Toolbar>
      </AppBar>
      <ul
        style={{
          marginTop: "40px",
          maxHeight: "calc(100vh - 150px)",
          overflowY: "auto",
        }}
      >
        {chats.map((chat) => (
          <Button
            variant="contained"
            style={{
              marginBottom: "20px",
              backgroundColor: "rgba(20, 177, 70, 0.40)",
            }}
            key={chat.id}
            onClick={() => handleChatClick(chat.id)}
          >
            <Typography
              variant="h6"
              component="div"
              color="darkgreen"
              style={{
                fontWeight: "600",
                gap: "10px",
                boxShadow: "rgba(0, 0, 0, 0.3)",
              }}
            >
              {
                /*Names of the two user from one chat room*/
                `${chat.users.map((name) => {
                  return ` ${name.first_name} `;
                })} [${chat.id}]`
              }
            </Typography>
          </Button>
        ))}
      </ul>
    </div>
  );
}

/*
{
  "id": 1,
  "email": "novely@gmail.com",
  "first_name": "Novely",
  "last_name": "Khan"
},
{
  "id": 3,
  "email": "x1@gmail.com",
  "first_name": "x1",
  "last_name": "x"
}

*/
