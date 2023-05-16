import { useParams } from "react-router";
import Navbar from "../components/Navbar";
import "./WizkidDetails.css"
import { useContext, useState } from 'react';
import WizkidsContext from "../context/wizkids";
import { Link } from "react-router-dom";
import WizkidElementContainer from "../components/WizkidElementContainer";
import LoadingContainer from "../components/LoadingContainer";


function WizkidDetails() {
  const { id } = useParams(); //get the id from url
  const {wizkids, loading, token} = useContext(WizkidsContext);
  
  if(loading) {
    return <LoadingContainer />
  }

  const found = wizkids.find(element => element.id === Number(id));

  return (
    <div>
      <Navbar />
      {found !== undefined && (
        <WizkidElementContainer>
          <p className="wizkid-details-name">{found.name}</p>
          <p className="wizkid-details-position">{found.position}</p>
          {token && (
            <div>
              <p className="wizkid-details-phone-email">{found.phone}</p>
              <p className="wizkid-details-phone-email">{found.email}</p>
            </div>
          )}
          <Link to={`/edit/${found.id}`}>
            <button className="wizkid-details-button-edit">Edit</button>
          </Link>
        </WizkidElementContainer>
      )}
    </div>
  );
}

export default WizkidDetails;