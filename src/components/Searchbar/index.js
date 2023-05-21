import "./Searchbar.css";
import { useState, useContext } from "react";
import WizkidsContext from "../../context/wizkidsContext";

function Searchbar({...rest}) {
  const {searchQuery, setSearchQuery} = useContext(WizkidsContext);

  const searchQueryHandler = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <input className="search-bar" type="text" value={searchQuery} onChange={searchQueryHandler} placeholder={rest.placeholder}/> 
  );
};

export default Searchbar;