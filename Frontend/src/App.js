// import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./Components/Register";
import Login from "./Components/Login";
// import Sidebar from "./Components/Sidebar";
import ChatArea from "./Components/ChatArea";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/sidebar" element={<Sidebar />} /> */}
        <Route path="/chatarea" element={<ChatArea />} />
        {/* Other routes go here */}
      </Routes>
    </Router>
  );
}

export default App;
