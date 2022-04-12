import React, { Component, useState } from "react";
import '../style/App.css';
import '../bootstrap-4.3.1-dist/css/bootstrap.min.css'

// import Introduction from "./introduction";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./Navbar/navbar";
import Home from "../container/Home";
import { Community } from "../container/community";
import { Contact } from "../container/Contact";
import Profile from "../components/Profile";
import Login from "../container/Login";
import Register from "../container/Register";
import "../style/App.css"
import { LoginContext } from '../context/AuthProvider';
import EditVideo from "../container/EditVideo";
import { AI_face } from "../container/AI_face";
import { AI_face_topic } from "../container/AI_face_topic";

const info = { pic: './img/01.png', name: 'Sample', email: '1234@jh.edu' }
const tempimage = [
  { imgUrl: './img/01.png', name: '01', topic: 'Star' },
  { imgUrl: './img/02.png', name: '02', topic: 'House' },
  { imgUrl: './img/03.png', name: '03', topic: 'New Year' },
  { imgUrl: './img/04.png', name: '04', topic: 'Amazing' },
  { imgUrl: './img/05.png', name: '05', topic: 'Fashion' },
]


function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState('');
  return (
    <LoginContext.Provider value={{ loggedIn, setLoggedIn, token, setToken }}>
      <Router>
        <NavBar />
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/profile" element={<Profile props={info} />} />
            <Route path="/community" element={<Community />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/AI_face" element={<AI_face />} />
            <Route path="/AI_face_topic" element={<AI_face_topic />} />
            <Route path="/edit-video" element={<EditVideo imgData={tempimage} />} />
          </Routes>
        </div>
      </Router>
    </LoginContext.Provider>
  )
}
export default App;