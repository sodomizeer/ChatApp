import React from "react";
// import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useState } from "react";
import TextField from "@mui/material/TextField";

export default function MessageInput({ selectedChatId, onSendMessage }) {
  //stores the input value from the Text Field inside inputValue
  const [inputValue, setInputValue] = useState("");
  const YOUR_TOKEN = localStorage.getItem("token");
  const handleSendMessage = () => {
    if (inputValue.trim() !== "") {
      // Prepare the JSON data
      const postData = {
        content: inputValue,
      };

      // Sending a POST request to the backend to send a message
      fetch(`http://127.0.0.1:8000/chats/${selectedChatId}/send-message/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${YOUR_TOKEN}`,
        },
        body: JSON.stringify(postData),
      })
        .then((response) => response.json())
        .then((data) => {
          // Handling the response as needed
          console.log("Message sent successfully:", data);

          // Clearing the input field after sending the message
          setInputValue("");
          onSendMessage(data);
        })
        .catch((error) => {
          console.error("Error sending message:", error);
          console.log(selectedChatId);
        });
    }
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      // Preventing the default form submission behavior
      event.preventDefault();
      // Triggering the button click event (sendMessage)
      handleSendMessage();
    }
  };
  return (
    <>
      <div className="message-input">
        <TextField
          className="textarea"
          component="form"
          sx={{
            "& > :not(style)": { m: 1 },
          }}
          id="standard-basic"
          variant="standard"
          color="success"
          label="Type you message"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
        />

        <Button
          className="button"
          variant="contained"
          color="success"
          onClick={handleSendMessage}
        >
          Send
        </Button>
      </div>
      <div></div>
    </>
  );
}
