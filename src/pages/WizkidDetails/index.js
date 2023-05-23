import { useParams } from "react-router";
import Navbar from "../../components/Navbar";
import "./WizkidDetails.css"
import { useContext, useState } from 'react';
import WizkidsContext from "../../context/wizkidsContext";
import { Link } from "react-router-dom";
import WizkidElementContainer from "../../components/WizkidElementContainer";
import CenterContainer from "../../components/CenterContainer/CenterContainer";
import { SyncLoader } from "react-spinners";

function WizkidDetails() {
  const { id } = useParams(); //get the id from url
  const {wizkids, loading, token} = useContext(WizkidsContext);
  
  if(loading) {
    return (
      <CenterContainer>
        <SyncLoader color="var(--owow-green)" size="80px"/>
      </CenterContainer>
    );
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