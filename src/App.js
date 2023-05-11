import {useEffect, useContext} from "react";
import Home from "./pages/Home";
import WizkidsContext from "./context/wizkids";

function App() {

  const {fetchWizkids} = useContext(WizkidsContext);
  
  useEffect(() => {
    fetchWizkids();
  }, []);

  return (
    <Home />
  );
}

export default App;
