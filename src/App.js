import {useEffect, useContext} from "react";
import Home from "./pages/Home";
import WizkidsContext from "./context/wizkids";
import "./App.css"
import { Routes, Route } from 'react-router-dom';
import WizkidDetails from "./pages/WizkidDetails";

function App() {

  const {fetchWizkids} = useContext(WizkidsContext);
  
  useEffect(() => {
    fetchWizkids();
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:id" element={<WizkidDetails />} />
      </Routes>
    </div>

  );
}

export default App;
