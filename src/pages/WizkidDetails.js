import { useParams } from "react-router";
import Navbar from "../components/Navbar";
import "./WizkidDetails.css"
import { useContext } from 'react';
import WizkidsContext from "../context/wizkids";


function WizkidDetails() {
  const { id } = useParams(); //get the id from url

  const {wizkids} = useContext(WizkidsContext);

  // wizkids.map((w) => {
  //   console.log(w.id);
  // })

  if (!wizkids || wizkids.length === 0) {
    return <div>Loading...</div>; // or any loading indicator/placeholder
  }

  const found = wizkids.find(element => element.id === Number(id));
  console.log(found);

  return (
    <div>
      <Navbar />
      <div className="wizkid-details-container-center">
      <div className="wizkid-details-container">
        <div className="wizkid-details-avatar-container">
          <img className="wizkid-details-avatar" src={require('../images/person.jpg')}/>
        </div>
        <p className="wizkid-details-name">{found.name}</p>
        <p className="wizkid-details-position">{found.position}</p>
        <p className="wizkid-details-phone-email">{found.phone}</p>
        <p className="wizkid-details-phone-email">{found.email}</p>
        <button className="wizkid-details-button-edit">
          Edit
        </button>
      </div>
      </div>
    </div>
  );
}

export default WizkidDetails;