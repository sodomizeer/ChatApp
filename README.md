# Chat App Backed Startup

## Clone the Repository from GitHub

## Setting Up Django Backend

    1. Navigate to the Backend Folder
    2. run "cd Backend"

## Create and Activate the Virtual Environment named "Django"

#### Run these command to create a virtual environment

    1.pip install virtualenv
    2.python3.7 -m venv Django
    3.Django\Scripts\activate

## Install Dependencies from requirements.txt

    1.while inside the Backed Directory run "pip install -r requirements.txt"

## Create a MongoDB Database

    1.Create a MongoDB database named "db".

## Run the Django Backend Server with Daphne

    1. Run with "daphne backend.asgi:application" this command (Without the Quotations)

### The backend server should now be running with Python 3.7.16 at the specified address. Ensure that the MongoDB database is accessible and configured correctly in your Django settings.


# Chat App Frontend Startup

## Clone the Repository from GitHub

## Navigate to the Frontend Folder

    1. open a new terminal in the root folder where "Backend" and "Frontend" is located
    2. Navigate to the Frontend Folder
    3. run "cd Frontend"

## Install Dependencies (Install Node.js and npm if not already installed)

    1. npm install

## Start the React Development Server

    1. npm start

## Explore The React App

    1. Open the "http://localhost:3000/register" URL to Register a new User
    2. Open the "http://localhost:3000/login" URL to login with Email and Password
    3. Open the "http://localhost:3000/chatarea" URL (When Logged In) to see the chat area (You will be redirected immediately after login in)
    4. In the ChatArea, On the left side it let's you create chat rooms with new Users
    5. On the right side select a chat room to view the previous chats
    6. Press the "Delete Chat" button while being inside of a chat room to delete that particular Chat Room
    7. Press "Log Out" Button to log out of the ChatArea back to the logIn Page

