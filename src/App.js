import {useEffect, useContext} from "react";
import Home from "./pages/Home";
import WizkidsContext from "./context/wizkids";
import "./App.css"
import { Routes, Route } from 'react-router-dom';
import WizkidDetails from "./pages/WizkidDetails";
import WizkidEdit from "./pages/WizkidEdit";

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
        <Route path="/edit/:id" element={<WizkidEdit />} />
      </Routes>
    </div>

  );
}

export default App;
