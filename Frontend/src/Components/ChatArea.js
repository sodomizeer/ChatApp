import React from "react";
import Message from "./Message";
import Sidebar from "./Sidebar";
import MessageInput from "./MessageInput";
import CreateChat from "./CreateChat";
import { useState, useEffect, useCallback } from "react";
import Button from "@mui/material/Button";
// import { useNavigate } from "react-router-dom";

export default function ChatArea() {
  const [selectedChatId, setSelectedChatId] = useState(null);
  let [selectedChat, setSelectedChat] = useState(null);
  const fullName = `${localStorage.getItem("firstName")} ${localStorage.getItem(
    "lastName"
  )}`;

  //Connections
  const [messages, setMessages] = useState([]);
  const [webSocket, setWebSocket] = useState(null);
  // let fullName;
  const YOUR_TOKEN = localStorage.getItem("token");
  const YOUR_EMAIL = localStorage.getItem("email");

  //
  const handleChatSelect = useCallback(
    (chatId) => {
      setSelectedChatId(chatId);
    },
    [setSelectedChatId]
  );
  const [chats, setChats] = useState([]);
  useEffect(() => {
    // Fetching existing chats from the backend
    fetch("http://127.0.0.1:8000/chats/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${YOUR_TOKEN}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setChats(data);
        // console.log(`chat data JSON: ${JSON.stringify(data)}`);
        console.log(`chat data : ${data}`);
      })
      .catch((error) => {
        console.error("Error fetching chats:", error);
      });
  }, [YOUR_TOKEN, selectedChatId]);

  const selectedChatname = chats.find((chat) => chat.id === selectedChatId);
  let otherPerson;
  if (selectedChat) {
    const otherUser = selectedChatname.users.find(
      (user) => `${user.first_name} ${user.last_name}` !== fullName
    );

    if (otherUser) {
      otherPerson = `${otherUser.first_name} ${otherUser.last_name}`;
      console.log(otherPerson);
    } else {
      console.log("Other user not found in the selected chat");
    }
  } else {
    console.log("Selected chat not found");
  }
  const handleReceiveMessage = (newMessage) => {
    // Updates the state with the new message
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  /*
  Tried to implement this websocket but it is not smooth enough to load the messages when another chat room is selected
  It renders every second and fetches the messages 
  */
  const [latestMessageTimestamp, setLatestMessageTimestamp] = useState(null);
  useEffect(() => {
    // Establishing WebSocket connection only when there are new messages
    if (latestMessageTimestamp) {
      const ws = new WebSocket(
        `ws://127.0.0.1:8000/ws/chat/${selectedChatId}/messages`
      );
      ws.onopen = () => {
        console.log("WebSocket connection opened");
      };

      ws.onmessage = (event) => {
        const newMessage = JSON.parse(event.data);
        handleReceiveMessage(newMessage);
        console.log("New Message: ", newMessage);

        // Updates the latest message timestamp
        setLatestMessageTimestamp(newMessage.timestamp);
      };

      ws.onclose = () => {
        console.log("WebSocket connection closed");
      };

      // Saves the WebSocket instance to state
      setWebSocket(ws);
    }
  }, [latestMessageTimestamp, selectedChatId]);

  /*This function sends message to the websocket*/
  const handleSendMessage = (content) => {
    // Checking if the WebSocket connection is open
    if (webSocket && webSocket.readyState === WebSocket.OPEN) {
      // Sending the message to the WebSocket server
      webSocket.send(JSON.stringify({ content }));
    }
  };

  /*This function handles Delete Chat */
  const handleDeleteChat = () => {
    // Checking if there is a selectedChatId
    if (selectedChatId) {
      // Sending DELETE request to delete the chat
      fetch(`http://127.0.0.1:8000/chats/${selectedChatId}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${YOUR_TOKEN}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            console.log("Chat deleted successfully");
            selectedChat = null;
            window.location.reload();
            // navigate("/chatarea");
          } else {
            console.error("Failed to delete chat");
          }
        })
        .catch((error) => {
          console.error("Error deleting chat:", error);
        });
    }
  };

  /*This hook fetches new message when the message is sent*/
  useEffect(() => {
    // Fetching data when selectedChatId changes
    if (selectedChatId) {
      // Fetching messages for the selected chat from the backend
      fetch(`http://127.0.0.1:8000/chats/${selectedChatId}/messages/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${YOUR_TOKEN}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setSelectedChat(data);
        })
        .catch((error) => {
          console.error("Error fetching messages:", error);
        });
    }
  }, [handleReceiveMessage, handleSendMessage]);

  return (
    <>
      <div className="chat-container">
        {/* <CreateChat onChatSelect={userNames} /> */}
        <CreateChat />

        <div className="chat-area">
          <div
            className="chat-header"
            style={{
              backgroundColor: "rgba(20, 177, 70, 0.286)",
              boxShadow: "0 0 15px rgba(0, 0, 0, 0.4)",
            }}
          >
            <div></div>
            <h2
              style={{
                color: "green",
                fontSize: "40px",
                fontWeight: "bold",
                marginLeft: "200px",
              }}
            >
              {otherPerson ? `${otherPerson}` : "Start Chat"}
            </h2>
            <Button
              className="button"
              variant="contained"
              color="error"
              style={{
                marginLeft: "70px",
                fontSize: "12px",
                fontWeight: "600",
                marginRight: "30px",
              }}
              onClick={handleDeleteChat}
            >
              Delete Chat
            </Button>
          </div>

          {Array.isArray(selectedChat) ? (
            <div key={selectedChatId} className="messages">
              {selectedChat.map((message) => (
                <Message
                  key={message.id}
                  text={message.content}
                  status={
                    message.sender.email === YOUR_EMAIL ? "sent" : "received"
                  }
                />
              ))}
            </div>
          ) : (
            <div className="divv">
              <div className="selectChat" style={{ color: "success" }}>
                Please Select a Chat Room
              </div>
            </div>
          )}

          <MessageInput
            selectedChatId={selectedChatId}
            onSendMessage={handleSendMessage}
          />
        </div>
        <Sidebar onChatSelect={handleChatSelect} />
      </div>
    </>
  );
}
