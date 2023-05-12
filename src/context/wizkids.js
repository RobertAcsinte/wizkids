import { createContext, useState, useCallback } from "react";
import axios from "axios";


const WizkidsContext = createContext();

function Provider({children}) {
  const [wizkids, setWizkids] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  //delay to simulate real api call
  const fetchWizkids = () => {
    setLoading(true);
    setTimeout(async () => {
      try {
        const response = await axios.get("http://localhost:3001/wizkids");
        console.log(response.data);
        setWizkids(response.data);
      } catch(error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }, 1500);


  }

  const deleteWizkidById = async (id) => {
    await axios.delete(`http://localhost:3001/wizkids/${id}`)

    const updatedWizkids = wizkids.filter((wizkid) => {
        return wizkid.id !== id;
    });

    setWizkids(updatedWizkids);
};

const editWizkidById = async (id, newName) => {
  const response = await axios.put(`http://localhost:3001/wizkids/${id}`, {
      name: newName
  });
  
  const updatedWizkids = wizkids.map((wizkid) => {
      if(wizkid.id === id) {
          return { ...wizkid, ...response.data};
      }
      return wizkid;
  });
  
  setWizkids(updatedWizkids);
};

  const valueToShare = {
    error: error,
    loading: loading,
    wizkids: wizkids,
    fetchWizkids: fetchWizkids,
    deleteWizkidById: deleteWizkidById,
    editWizkidById: editWizkidById
  };

  return <WizkidsContext.Provider value={valueToShare}>
    {children}
  </WizkidsContext.Provider>
}

export {Provider};
export default WizkidsContext;