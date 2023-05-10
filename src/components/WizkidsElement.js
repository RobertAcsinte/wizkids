import "./WizkidsElement.css"

function WizkidsElement() {
  return (
    <div className="wizkid-element-container">
      <div className="wizkid-element-avatar-container">
        <img className="wizkid-element-avatar" src={require('../images/person.jpg')}/>

      </div>
      <div className="wizkid-element-info-container">
        <div className="wizkid-element-edit-icon-container">
        <img className="wizkid-element-edit-icon" src={require('../icons/edit.png')}/>
        </div>
        <p className="wizkid-element-name">Random Name</p>
        <p className="wizkid-element-position">Developer</p>
        <div className="wizkid-element-employed">Employed</div>
      </div>
    </div>
  );
}

export default WizkidsElement