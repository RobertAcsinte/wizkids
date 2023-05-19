import "./Searchbar.css";
import { useState, useContext } from "react";
import WizkidsContext from "../../context/wizkidsContext";

function Searchbar() {
  const {searchWizkids, searchQuery, setSearchQuery} = useContext(WizkidsContext);

  const searchQueryHandler = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <input type="text" value={searchQuery} onChange={searchQueryHandler}>
    </input>
  );
};

export default Searchbar;