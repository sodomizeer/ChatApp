// import React from "react";
// import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
export default function CreateChat() {
  const [userNames, setUserNames] = useState([]);
  const YOUR_TOKEN = localStorage.getItem("token");
  const YOUR_EMAIL = localStorage.getItem("email");
  // const name = localStorage.getItem("firstName");

  useEffect(() => {
    // Fetch existing chats from the backend
    fetch(`http://127.0.0.1:8000/get_users/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${YOUR_TOKEN}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("User Data : ", data);
        console.log("Chat created successfully:", data);
        const names = data.map(
          (user) => `${user.first_name} ${user.last_name} : ${user.email}`
        );
        setUserNames(names);
      })
      .catch((error) => {
        console.error("Error fetching chats:", error);
      });
  }, [YOUR_TOKEN]);

  const handeCreateChatClick = (index) => {
    const selectedUserName = userNames[index];
    const selectedUserEmail = selectedUserName.split(" : ")[1];

    // Create a new chat with the current user and the selected user
    const createChatData = {
      users: [YOUR_EMAIL, selectedUserEmail],
    };

    fetch("http://127.0.0.1:8000/create-chat/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${YOUR_TOKEN}`,
      },
      body: JSON.stringify(createChatData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response as needed
        console.log("Chat created successfully:", data);
        // onChatSelect(data.id);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error creating chat:", error);
      });
  };
  const navigate = useNavigate();

  const redirectToLogin = () => {
    navigate("/login");
  };
  return (
    <>
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
            <Typography
              variant="h6"
              component="div"
              style={{ color: "green", fontWeight: "600" }}
            >
              User List
            </Typography>
            <Button
              className="button"
              variant="contained"
              color="success"
              style={{
                marginLeft: "70px",
                fontSize: "12px",
                fontWeight: "600",
              }}
              onClick={redirectToLogin}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>

        <ul style={{ marginTop: "50px" }}>
          {userNames.map((userName, index) => (
            <Button
              key={index}
              variant="contained"
              style={{
                marginBottom: "20px",
                backgroundColor: "rgba(20, 177, 70, 0.40)",
              }}
              onClick={() => handeCreateChatClick(index)}
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
                {userName.split(" : ")[0]}
              </Typography>
            </Button>
          ))}
        </ul>
      </div>
    </>
  );
}
