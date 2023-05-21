import "./FilterDropdown.css";
import WizkidsContext from "../../context/wizkidsContext";
import { useContext, useEffect, useState } from "react";

function FilterDropdown() {
  const {fetchedPositions, filteredPosition, setFilteredPosition} = useContext(WizkidsContext);

  const changeSelectedPosition = (e) => {
    setFilteredPosition(e);
  };

  const renderedPositions = fetchedPositions.map((position) => {
    return (
        <div key={position} onClick={() => changeSelectedPosition(position)} className="position-element">
          {position}
        </div>
    )
  });

  return (
    <div className="dropdown">
      <button className="dropbtn">{filteredPosition}</button>
      <div className="dropdown-content">
        {renderedPositions}
      </div>
    </div>
  );
}

export default FilterDropdown;