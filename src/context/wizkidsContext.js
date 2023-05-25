import { createContext, useState, useCallback, useEffect, useMemo } from "react";
import axios from "axios";



const WizkidsContext = createContext();

function Provider({children}) {
  
  const [wizkids, setWizkids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const [fetchedPositions, setFetchPositions] = useState([]); //show the available positions for the dropdown fiter
  const [filteredPosition, setFilteredPosition] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  let filteredWizkids = useMemo(() => {
    if(filteredPosition !== "All") {
      return wizkids.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()) && item.position.toLowerCase().includes(filteredPosition.toLowerCase()))
    } else {
      return wizkids.filter((item) =>item.name.toLowerCase().includes(searchQuery.toLowerCase()))
    }
  })

  //delay to simulate real api call
  const fetchWizkids = () => {
    setFetchPositions([]);
    setLoading(true);
    setTimeout(async () => {
      try {
        const response = await axios.get("http://localhost:3001/wizkids");
        setWizkids(response.data);
        // setFilteredWizkids(response.data)
        //get positions
        let tempArray = ["All"];
        response.data.forEach(element => {
          if(!(tempArray.includes(element.position))) {
            tempArray.push(element.position)
          }
        });
        setFetchPositions(tempArray);
        setError(null);
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
          phone: wizkid.phone,
          email: wizkid.email,
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
          phone: wizkid.phone,
          email: wizkid.email
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
    // searchWizkids: searchWizkids,
    fetchedPositions: fetchedPositions,
    setFilteredPosition: setFilteredPosition,
    filteredPosition: filteredPosition,
    searchQuery: searchQuery,
    setSearchQuery: setSearchQuery
  };

  return <WizkidsContext.Provider value={valueToShare}>
    {children}
  </WizkidsContext.Provider>
}

export {Provider};
export default WizkidsContext;