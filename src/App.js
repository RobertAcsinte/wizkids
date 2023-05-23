import React from "react";
import {useEffect, useContext} from "react";
import HomePage from "./pages/Home/HomePage";
import WizkidsContext from "./context/wizkidsContext";
import AuthContext from "./context/authContext";
import { Routes, Route } from 'react-router-dom';
import WizkidDetailsPage from "./pages/WizkidDetails/WizkidDetailsPage";
import WizkidEdit from "./pages/WizkidEdit";
import Login from "./pages/Login";


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
        <Route path="/edit/:id" element={isLoggedIn ? <WizkidEdit /> : <Login />} />
        <Route path="/login" element={<Login />} />
      </Routes>
  );
}

export default App;
