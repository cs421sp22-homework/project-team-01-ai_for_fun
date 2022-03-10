import React, { Component,useState } from "react";
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
import {LoginContext} from '../context/AuthProvider';

const info = {pic:'./img/01.png',name:'Sample',email:'1234@jh.edu'}



function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [token, setToken] = useState('');
    return (
      <LoginContext.Provider value = {{loggedIn, setLoggedIn,token,setToken}}>
        <Router>
            <NavBar />
          <div>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/profile" element={<Profile props={info}/>} />
              <Route path="/community" element={<Community />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </div>
        </Router>
      </LoginContext.Provider>
    )
}
export default App;