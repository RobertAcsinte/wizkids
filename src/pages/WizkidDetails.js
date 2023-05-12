import { useParams } from "react-router";
import Navbar from "../components/Navbar";
import "./WizkidDetails.css"
import { useContext, useState } from 'react';
import WizkidsContext from "../context/wizkids";
import { Link } from "react-router-dom";


function WizkidDetails() {
  const { id } = useParams(); //get the id from url
  const {wizkids} = useContext(WizkidsContext);

  //used in case wizkids still fetching if page is refreshed and context has to fetch again
  if (!wizkids || wizkids.length === 0) {
    return <div>Loading...</div>;
  }
  const found = wizkids.find(element => element.id === Number(id));
 
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
        <Link to={`/edit/${found.id}`}>
          <button className="wizkid-details-button-edit">Edit</button>
        </Link>
      </div>
      </div>
    </div>
  );
}

export default WizkidDetails;