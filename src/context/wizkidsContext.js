import { createContext, useState, useEffect, useMemo, useReducer } from "react";
import axios from "axios";


const WizkidsContext = createContext();

export const ACTIONS = {
  CALL_API: "call-api",
  SUCCESS_API: "success",
  ERROR_API: "error",
}

const initialState = {
  wizkids: [],
  loading: true,
  error: null
}

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
            error: null
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

function Provider({children}) {
  
  const [filteredPosition, setFilteredPosition] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const [state, dispatch] = useReducer(reducer, initialState)
  const [_state, _dispatch]  = useReducer(() => {}, {})

  const {wizkids, loading, error} = state

  useEffect(() => {
    fetchWizkids()
  }, [])

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
    setTimeout(async () => {
      try {
        const response = await axios.get("http://localhost:3001/wizkids");
        dispatch({ type: ACTIONS.SUCCESS_API, payload: response.data });
      } catch(error) {
        dispatch({ type: ACTIONS.ERROR_API, error: error.message });
      } 
    }, 1000);
    
  };

  const deleteWizkidById = async (id) => {
    dispatch({type: ACTIONS.CALL_API})
    setTimeout(async () => {
      try {
        await axios.delete(`http://localhost:3001/wizkids/${id}`)
        const updatedWizkids = wizkids.filter((wizkid) => {
          return wizkid.id !== id;
      });
        dispatch({ type: ACTIONS.SUCCESS_API, payload: updatedWizkids});
      } catch(error) {
        dispatch({ type: ACTIONS.ERROR_API, error: error.message });
      }
    }, 1000)
};

//timeout just to simulate real api
const editWizkidById = async (id, newName) => {
  dispatch({ type: ACTIONS.CALL_API })
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const updatedWizkids = await Promise.all(wizkids.map(async (wizkid) => {
          if(wizkid.id === Number(id)) {
            const response = await axios.put(`http://localhost:3001/wizkids/${id}`, {
              ...wizkid, name: newName
          });
              return { ...wizkid, ...response.data};
          }
          return wizkid;
      }));
      resolve();
      dispatch({ type: ACTIONS.SUCCESS_API, payload: updatedWizkids });
      } catch(error) {
          reject(error)
          dispatch({ type: ACTIONS.ERROR_API, error: error.message });
      }
    }, 1000)
  })
};

//timeout just to simulate real api
const setEmployementWizkidById = async (id) => {
  dispatch({type: ACTIONS.CALL_API})
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const updatedWizkids = await Promise.all(wizkids.map(async (wizkid) => {
          if(wizkid.id === Number(id)) {
            const response = await axios.put(`http://localhost:3001/wizkidss/${id}`, {
              ...wizkid, employed: !(wizkid.employed)
          });
              return { ...wizkid, ...response.data};
          }
          return wizkid;
      }));
      resolve();
      dispatch({ type: ACTIONS.SUCCESS_API, payload: updatedWizkids });
      } catch(error) {
          reject(error)
          dispatch({ type: ACTIONS.ERROR_API, error: error.message });
      }
    }, 1000)
  })
};

  const valueToShare = {
    error: error,
    loading: loading,
    wizkids: wizkids,

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