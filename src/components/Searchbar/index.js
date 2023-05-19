import "./Searchbar.css";
import { useState, useContext } from "react";
import WizkidsContext from "../../context/wizkidsContext";

function Searchbar() {
  const {searchWizkids} = useContext(WizkidsContext);
  const [searchQuery, setSearchQuery] = useState("");

  const searchQueryHandler = (e) => {
    // setSearchQuery(e.target.value);
    searchWizkids(e.target.value);
  };

  return (
    <input type="text" onChange={searchQueryHandler}>
    </input>
  );
};

export default Searchbar;