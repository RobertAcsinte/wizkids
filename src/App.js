import React from "react";
import {useEffect, useContext} from "react";
import Home from "./pages/Home";
import WizkidsContext from "./context/wizkidsContext";
import AuthContext from "./context/authContext";
import "./App.css"
import { Routes, Route } from 'react-router-dom';
import WizkidDetails from "./pages/WizkidDetails";
import WizkidEdit from "./pages/WizkidEdit";
import Login from "./pages/Login";
import { useState } from "react";


function App() {

  const {fetchWizkids} = useContext(WizkidsContext);
  const {isLoggedIn} = useContext(AuthContext);
  
  useEffect(() => {
    fetchWizkids();
  }, []);


  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:id" element={<WizkidDetails />} />
        <Route path="/edit/:id" element={isLoggedIn ? <WizkidEdit /> : <Login />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
