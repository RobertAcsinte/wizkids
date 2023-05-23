import "./WizkidElementContainer.css"

function WizKidElementContainer({children}) {
  return (
    <div className="wizkid-element-container-center">
      <div className="wizkid-element-container-info">
        <div className="wizkid-element-avatar-container-info">
          <img className="wizkid-element-avatar-info" src={require('../../assets/images/person.jpg')}/>
        </div>
          {children}
      </div>
    </div>
  );
}

export default WizKidElementContainer;