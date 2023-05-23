import style from "./WizkidCard.module.css"
import { useContext } from 'react';
import WizkidsContext from "../../../../context/wizkidsContext";
import { useNavigate } from "react-router-dom";

function WizkidCard({wizkid}) {

  const { deleteWizkidById } = useContext(WizkidsContext);
  let navigate = useNavigate();

  const handleDeleteClick = (event) => {
    event.stopPropagation();
    deleteWizkidById(wizkid.id);
  }

  const handleDetailsClick = (event) => {
    navigate(`/details/${wizkid.id}`);
  }

  const employedBadgeColor = {
    color: wizkid.employed ? "var(--employed-color)" : "var(--unemployed-color)",
    borderColor: wizkid.employed ? "var(--employed-color)" : "var(--unemployed-color)"
  };

  return ( 
    <div className={style.container} onClick={handleDetailsClick}>
      <div className={style["avatar-container"]}>
        <img className={style.avatar} src={require('../../../../assets/images/person.jpg')}/>
      </div>
      <div className={style["info-container"]}>
        <div className={style["edit-icon-container"]} onClick={handleDeleteClick}>
          X
        </div>
        <p className={style.name}>{wizkid.name}</p>
        <p className={style.position}>{wizkid.position}</p>
        <div className={style.employed} style={employedBadgeColor}>{wizkid.employed ? "Employed" : "Unemployed"}</div>
      </div>
    </div>
  

  );
}

export default WizkidCard