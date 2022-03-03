import React, { Component } from "react";
import '../style/App.css';
import '../bootstrap-4.3.1-dist/css/bootstrap.min.css'

// import Introduction from "./introduction";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./Navbar/navbar";
import Home from "../container/Home";
import { Account } from "../container/account";
import { Community } from "../container/community";
import { Contact } from "../container/Contact";
import { AI_face } from "../container/AI_face";
import { AI_vedio } from "../container/AI_vedio";
import { AI_text } from "../container/AI_text";
import Profile from "../components/Profile";
import Login from "../container/Login";
import Register from "../container/Register";
import "../style/App.css"

const info = {pic:'./img/01.png',name:'Sample',email:'1234@jh.edu'}

class App extends Component {
  render() {
    return (
      <>
        <Router>
            <NavBar />
          <div>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/profile" element={<Profile props={info}/>} />
              <Route path="/community" element={<Community />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/AI_face" element={<AI_face />} />
              <Route path="/AI_vedio" element={<AI_vedio />} />
              <Route path="/AI_text" element={<AI_text />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </div>
        </Router>
      </>
    )
  }
}
export default App;