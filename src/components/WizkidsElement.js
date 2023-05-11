import "./WizkidsElement.css"
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import WizkidsContext from "../context/wizkids";

function WizkidsElement({wizkid}) {

  const { deleteWizkidById } = useContext(WizkidsContext);


  const handleDeleteClick = (event) => {
    deleteWizkidById(wizkid.id);
  }

  const employedBadgeColor = {
    color: wizkid.employed ? "var(--employed-color)" : "var(--unemployed-color)",
    borderColor: wizkid.employed ? "var(--employed-color)" : "var(--unemployed-color)"
  };

  

  return (
    <Link to={`/details/${wizkid.id}`}>
      <span className="wizkid-element-container">
        <div className="wizkid-element-avatar-container">
          <img className="wizkid-element-avatar" src={require('../images/person.jpg')}/>
        </div>
        <div className="wizkid-element-info-container">
          <div className="wizkid-element-edit-icon-container" onClick={handleDeleteClick}>
            X
          </div>
          <p className="wizkid-element-name">{wizkid.name}</p>
          <p className="wizkid-element-position">{wizkid.position}</p>
          <div className="wizkid-element-employed" style={employedBadgeColor}>{wizkid.employed ? "Employed" : "Unemployed"}</div>
        </div>
      </span>
    </Link>

  );
}

export default WizkidsElement