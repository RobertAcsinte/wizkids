import "./WizkidsElement.css"
import { Link } from 'react-router-dom';

function WizkidsElement({wizkid}) {

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
          <div className="wizkid-element-edit-icon-container">
            <img className="wizkid-element-edit-icon" src={require('../icons/edit.png')}/>
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