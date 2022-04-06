import React, { Component, useState } from "react";
import '../style/App.css';
import '../bootstrap-4.3.1-dist/css/bootstrap.min.css'

// import Introduction from "./introduction";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./Navbar/navbar";
import Home from "../container/Home";
import { Contact } from "../container/Contact";
import Profile from "../components/Profile";
import Login from "../container/Login";
import Register from "../container/Register";
import "../style/App.css"
import { LoginContext } from '../context/AuthProvider';
import EditVideo from "../container/EditVideo";
import { AI_face } from "../container/AI_face";
import { AI_text } from "../container/AI_text";
import { AI_face_topic } from "../container/AI_face_topic";
import { CookiesProvider } from 'react-cookie';
import Community_home from '../container/HomeCommunity';
import Post from "../container/Post";

const info = { pic: './img/01_1.png', name: 'Sample', email: '1234@jh.edu' }


function App() {
  const [faceimg, setFaceimg] = useState('');
  const [sourceimg, setSourceimg] = useState('');
  const [avatarimg, setAvatarimg] = useState('');
  const [dst, setDst] = useState('');
  const [person, setPerson] = useState('');
  return (
    <CookiesProvider>
      <LoginContext.Provider value={{ dst, setDst, faceimg, setFaceimg, sourceimg, setSourceimg, avatarimg, setAvatarimg, person, setPerson }}>
        <Router>
          <NavBar />
          <div>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/profile" element={<Profile props={info} />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/AI_face" element={<AI_face />} />
              <Route path="/AI_text" element={<AI_text />} />
              <Route path="/AI_face_topic" element={<AI_face_topic />} />
              <Route path="/gallery" element={<Community_home />} />
              <Route path="/Post" element={<Post />} />
            </Routes>
          </div>
        </Router>
      </LoginContext.Provider>
    </CookiesProvider>
  )
}
export default App;