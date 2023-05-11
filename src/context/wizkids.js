import { createContext, useState, useCallback } from "react";
import axios from "axios";


const WizkidsContext = createContext();

function Provider({children}) {
  const [wizkids, setWizkids] = useState([]);

  const fetchWizkids = async () => {
    const response = await axios.get("http://localhost:3001/wizkids")

    setWizkids(response.data)
  }

  const valueToShare = {
    wizkids: wizkids,
    fetchWizkids: fetchWizkids
  };

  return <WizkidsContext.Provider value={valueToShare}>
    {children}
  </WizkidsContext.Provider>
}

export {Provider};
export default WizkidsContext;