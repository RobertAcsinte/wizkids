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
        setWizkids(response.data);
      } catch(error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }, 1000);
  }

  const deleteWizkidById = async (id) => {
    await axios.delete(`http://localhost:3001/wizkids/${id}`)
    const updatedWizkids = wizkids.filter((wizkid) => {
        return wizkid.id !== id;
    });
    setWizkids(updatedWizkids);
};

const editWizkidById = async (id, newName) => {
  try {
    const updatedWizkids = await Promise.all(wizkids.map(async (wizkid) => {
      if(wizkid.id === Number(id)) {
        const response = await axios.put(`http://localhost:3001/wizkids/${id}`, {
          name: newName,
          position: wizkid.position,
          employed: wizkid.employed,
      });
          return { ...wizkid, ...response.data};
      }
      return wizkid;
  }));
  setWizkids(updatedWizkids);
  } catch(error) {
      throw error;
  }
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