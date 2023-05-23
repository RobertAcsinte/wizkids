import styles from "./FilterDropdown.module.css";
import WizkidsContext from "../../../../context/wizkidsContext";
import { useContext, useEffect, useState } from "react";

function FilterDropdown() {
  const {fetchedPositions, filteredPosition, setFilteredPosition} = useContext(WizkidsContext);

  const handleDropdownButton = (e) => {
    setFilteredPosition(e);
  };

  const renderedPositions = fetchedPositions.map((position) => {
    return (
        <div key={position} onClick={() => handleDropdownButton(position)} className={styles["dropdown-content-list"]}>
          {position}
        </div>
    )
  });

  return (
    <div className={styles.container}>
      <button className={styles["dropdown-button"]}>{filteredPosition}</button>
      <div className={styles["dropdown-content-container"]}>
        {renderedPositions}
      </div>
    </div>
  );
}

export default FilterDropdown;