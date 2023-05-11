import { createContext, useState, useCallback } from "react";
import axios from "axios";


const WizkidsContext = createContext();

function Provider({children}) {
  const [wizkids, setWizkids] = useState([]);

  const fetchWizkids = async () => {
    const response = await axios.get("http://localhost:3001/wizkids")
    setWizkids(response.data)
  }

  const deleteWizkidById = async (id) => {
    await axios.delete(`http://localhost:3001/wizkids/${id}`)

    const updatedWizkids = wizkids.filter((wizkid) => {
        return wizkid.id !== id;
    });

    setWizkids(updatedWizkids);
};

  const valueToShare = {
    wizkids: wizkids,
    fetchWizkids: fetchWizkids,
    deleteWizkidById: deleteWizkidById
  };

  return <WizkidsContext.Provider value={valueToShare}>
    {children}
  </WizkidsContext.Provider>
}

export {Provider};
export default WizkidsContext;