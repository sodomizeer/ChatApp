import React, { useState } from "react";
import { TextField, Box, Button } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
export default function Register() {
  //
  const BASE_URL = "http://127.0.0.1:8000/";
  // const token = "your_token_here";
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  /*Handles the form submission and sends a POST request*/
  const handleFormSubmit = () => {
    //Sending Data to register/
    fetch(`${BASE_URL}login/`, {
      //POST Method bc sending only
      method: "POST",

      //Defining Data type
      headers: {
        "content-type": "application/json",
        // Authorization: `Bearer ${token}`,
      },

      //Changing into JSON data
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        //Printing the sent data to the browser console
        console.log(data);
        let token = data.token;
        localStorage.setItem("token", token);
        localStorage.setItem("email", data.user.email);
        localStorage.setItem("firstName", data.user.first_name);
        localStorage.setItem("lastName", data.user.last_name);

        if (token) {
          // Set the token in a cookie or localStorage
          document.cookie = `token=${token}; path=/`;
          // Redirect to the ChatArea component
          console.log(document.cookie);
          navigate("/chatarea");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const navigate = useNavigate();
  /*This function navigates to register*/
  const redirectToRegister = () => {
    navigate("/register");
  };
  /*This function Handles the "Enter" keypress on the password form to login the user*/
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleFormSubmit();
    }
  };
  return (
    <div className="container text-center d-flex flex-column align-items-center justify-content-center vh-100 gap-3 ">
      <div
        className="p-5  "
        style={{
          backgroundColor: "rgba(20, 177, 69, 0.25)",
          borderRadius: "15px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
        }}
      >
        <h1 style={{ textAlign: "center", color: "green" }}>ChatHub</h1>

        <h3 style={{ textAlign: "center", color: "green" }}>Log In</h3>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-end",
            marginLeft: "10%",
          }}
        >
          <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
          {/*Email form*/}
          <TextField
            id="email"
            label="Email"
            type="email"
            variant="standard"
            color="success"
            //Changes the formdata
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "flex-end",
            marginLeft: "10%",
          }}
        >
          <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
          {/*Password form*/}
          <TextField
            id="password"
            label="Password"
            type="password"
            variant="standard"
            color="success"
            //Changes the formdata
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            onKeyDown={handleKeyPress}
          />
        </Box>

        <div className="mt-4">
          {/*Log In Button*/}
          <Button
            color="success"
            variant="contained"
            //Onclick action => send data
            onKeyDown={handleKeyPress}
            onClick={handleFormSubmit}
          >
            Log In
          </Button>
        </div>

        <div className="mt-2">
          <p style={{ textAlign: "center", color: "green" }}>
            {" "}
            Don't have any Account Registered?
          </p>
          <p
            style={{
              textAlign: "center",
              color: "green",
            }}
          >
            Sign Up for Free
          </p>
          {/*Register button Button*/}
          <Button
            color="success"
            variant="contained"
            onClick={redirectToRegister}
          >
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
}
// <TextField id="input-with" label="Last Name" variant="standard" />
