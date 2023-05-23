import React from "react";
import {useEffect, useContext} from "react";
import HomePage from "./pages/Home/HomePage";
import WizkidsContext from "./context/wizkidsContext";
import AuthContext from "./context/authContext";
import { Routes, Route } from 'react-router-dom';
import WizkidDetailsPage from "./pages/WizkidDetails/WizkidDetailsPage";
import WizkidEditPage from "./pages/WizkidEdit/WizkidEditPage";
import LoginPage from "./pages/Login/LoginPage";


function App() {

  const {fetchWizkids} = useContext(WizkidsContext);
  const {isLoggedIn} = useContext(AuthContext);
  
  useEffect(() => {
    fetchWizkids();
  }, []);


  return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/details/:id" element={<WizkidDetailsPage />} />
        <Route path="/edit/:id" element={isLoggedIn ? <WizkidEditPage /> : <LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
  );
}

export default App;
