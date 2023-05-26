import { createContext, useState, useCallback, useEffect, useMemo, useReducer } from "react";
import axios from "axios";



const WizkidsContext = createContext();

export const ACTIONS = {
  CALL_API: "call-api",
  SUCCESS_API: "success",
  ERROR_API: "error",

  FETCH_WIZKIDS: "fetch-wizkids",
  EDIT_WIZKID: "edit-wizkids",
  DELETE_WIZKID: "delete-wizkid",
  UPDATE_WIZKID: "update-wizkid"
}

const initialState = {
  wizkids: [],
  loading: true,
  error: null
}

function Provider({children}) {
  
  const [filteredPosition, setFilteredPosition] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");


  const [state, dispatch] = useReducer(reducer, initialState)
  const {wizkids, loading, error} = state

  useEffect(() => {
    fetchWizkids()
  }, [])

  function reducer(state, action) {
    switch(action.type) {
      case ACTIONS.CALL_API: {
        return {
            ...state,
            loading: true,
        };
    }
      case ACTIONS.SUCCESS_API: {
          return {
              ...state,
              loading: false,
              wizkids: action.payload,
          };
      }
      case ACTIONS.ERROR_API: {
          return {
              ...state,
              loading: false,
              error: action.error,
          };
      }

      default:
        return state
    }
  }


  let filteredWizkids = useMemo(() => {
    if(filteredPosition !== "All") {
      return wizkids.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()) && item.position.toLowerCase().includes(filteredPosition.toLowerCase()))
    } else {
      return wizkids.filter((item) =>item.name.toLowerCase().includes(searchQuery.toLowerCase()))
    }
  }, [wizkids, searchQuery, filteredPosition])

  let fetchedPositions = useMemo(() => {
    let tempArray = ["All"];
    wizkids.forEach(wizkid => {
      if(!(tempArray.includes(wizkid.position))) {
        tempArray.push(wizkid.position)
      }
    })
    return tempArray
  }, [wizkids])

  //delay to simulate real api call
  function fetchWizkids(){
    dispatch({ type: ACTIONS.CALL_API })
    let response = setTimeout(async () => {
      try {
        response = await axios.get("http://localhost:3001/wizkids");
        dispatch({ type: ACTIONS.SUCCESS_API, payload: response.data });
      } catch(error) {
        dispatch({ type: ACTIONS.ERROR_API, error: error.message });
      } 
    }, 1000);
    
  };

  const deleteWizkidById = async (id) => {
    await axios.delete(`http://localhost:3001/wizkids/${id}`)
    const updatedWizkids = wizkids.filter((wizkid) => {
        return wizkid.id !== id;
    });
    return updatedWizkids
    // setWizkids(updatedWizkids);
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
  return updatedWizkids
  // setWizkids(updatedWizkids);
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
  return updatedWizkids;
  // setWizkids(updatedWizkids);
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
    fetchedPositions: fetchedPositions,
    setFilteredPosition: setFilteredPosition,
    filteredPosition: filteredPosition,
    searchQuery: searchQuery,
    setSearchQuery: setSearchQuery,

    dispatch: dispatch
  };

  return <WizkidsContext.Provider value={valueToShare}>
    {children}
  </WizkidsContext.Provider>
}

export {Provider};
export default WizkidsContext;