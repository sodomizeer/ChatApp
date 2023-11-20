import React, { useState } from "react";
import { TextField, Box, Button } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";

export default function Register() {
  //
  const BASE_URL = "http://127.0.0.1:8000/";
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  });
  /*This function handles the registration form*/
  const handleFormSubmit = () => {
    //Sending Data to register/
    fetch(`${BASE_URL}register/`, {
      //POST Method bc sending only
      method: "POST",

      //Defining Data type
      headers: {
        "content-type": "application/json",
      },

      //Changing into JSON data
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        //Printing the sent data to the browser console
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const navigate = useNavigate();

  const redirectToLogin = () => {
    navigate("/login");
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      // Prevent the default form submission behavior
      event.preventDefault();
      redirectToLogin();
      // Trigger the button click event
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

        <h3 style={{ textAlign: "center", color: "green" }}>Sign Up</h3>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-end",
            marginLeft: "10%",
          }}
        >
          <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
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
          <TextField
            id="first_name"
            label="First Name"
            type="text"
            variant="standard"
            color="success"
            //Changes the formdata
            onChange={(e) =>
              setFormData({ ...formData, first_name: e.target.value })
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
          <TextField
            id="last_name"
            label="Last Name"
            variant="standard"
            type="text"
            color="success"
            //Changes the formdata
            onKeyDown={handleKeyPress}
            onChange={(e) =>
              setFormData({ ...formData, last_name: e.target.value })
            }
          />
        </Box>

        <div className="mt-4">
          <Button
            color="success"
            variant="contained"
            onClick={handleFormSubmit}
          >
            Sign Up
          </Button>
        </div>

        <div className="mt-2">
          <p style={{ textAlign: "center", color: "green" }}>
            {" "}
            Already have an Account? Then Log-in
          </p>

          <Button color="success" variant="contained" onClick={redirectToLogin}>
            Log In
          </Button>
        </div>
      </div>
    </div>
  );
}
// <TextField id="input-with" label="Last Name" variant="standard" />
