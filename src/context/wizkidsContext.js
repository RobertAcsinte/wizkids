import { createContext, useState, useCallback } from "react";
import axios from "axios";



const WizkidsContext = createContext();

function Provider({children}) {
  
  const [wizkids, setWizkids] = useState([]);
  const [filteredWizkids, setFilteredWizkids] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  console.log(filteredWizkids);
  
  const searchWizkids = (query) => {
    setFilteredWizkids(wizkids.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    ));
  }

  //delay to simulate real api call
  const fetchWizkids = () => {
    setLoading(true);
    setTimeout(async () => {
      try {
        const response = await axios.get("http://localhost:3001/wizkids");
        setWizkids(response.data);
        setError("");
      } catch(error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }, 1000);
  };

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

const setEmployementWizkidById = async (id) => {
  try {
    const updatedWizkids = await Promise.all(wizkids.map(async (wizkid) => {
      if(wizkid.id === Number(id)) {
        const response = await axios.put(`http://localhost:3001/wizkids/${id}`, {
          name: wizkid.name,
          position: wizkid.position,
          employed: !(wizkid.employed),
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
    editWizkidById: editWizkidById,
    setEmployementWizkidById: setEmployementWizkidById,
    filteredWizkids: filteredWizkids,
    searchWizkids: searchWizkids
  };

  return <WizkidsContext.Provider value={valueToShare}>
    {children}
  </WizkidsContext.Provider>
}

export {Provider};
export default WizkidsContext;