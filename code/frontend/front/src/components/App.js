import React, { useState } from "react";
import '../style/App.css';
import '../bootstrap-4.3.1-dist/css/bootstrap.min.css'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./Navbar/navbar";
import Home from "../container/Home";
// import { Contact } from "../container/Contact";
import Profile from "../components/Profile";
import Login from "../container/Login";
import Register from "../container/Register";
import "../style/App.css"
import { LoginContext } from '../context/AuthProvider';
import { AI_face } from "../container/AI_face";
import { AI_text } from "../container/AI_text";
import { AI_face_topic } from "../container/AI_face_topic";
import { CookiesProvider } from 'react-cookie';
import Community_home from '../container/HomeCommunity';
import YourPost from "../container/YourPost";
import FollowerPost from "../container/FollowerPost";
import Recommend from "../container/Recommend";
import Post from "../container/Post";
import { AI_style } from "../container/AI_style";
import ProfileHeader from "./ProfileHeader";

const info = { pic: './img/01_1.png', name: 'Sample', email: '1234@jh.edu' }


function App() {
  const [sourceimg, setSourceimg] = useState(''); //src_img for AI face, content_img for AI style
  const [faceimg, setFaceimg] = useState('');  //dst_img for AI face, style_img for AI style
  const [dst, setDst] = useState(''); //res_img for AI face and AI style
  const [avatarimg, setAvatarimg] = useState('');
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
              {/* <Route path="/contact" element={<Contact />} /> */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/AI_face" element={<AI_face />} />
              <Route path="/AI_text" element={<AI_text />} />
              <Route path="/AI_style" element={<AI_style />} />
              <Route path="/AI_face_topic" element={<AI_face_topic />} />
              <Route path="/gallery" element={<Community_home />} />
              <Route path="/your_posts" element={<YourPost />} />
              <Route path="/followers" element={<FollowerPost />} />
              <Route path="/post" element={<Post />} />
              <Route path="/userdetail/:name" element={<ProfileHeader />} />
              <Route path="/recommend" element={<Recommend />} />
            </Routes>
          </div>
        </Router>
      </LoginContext.Provider>
    </CookiesProvider>
  )
}
export default App;