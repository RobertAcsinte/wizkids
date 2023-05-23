import { useParams } from "react-router";
import Navbar from "../../components/Navbar";
import style from "./WizkidDetails.module.css"
import { useContext, useState } from 'react';
import AuthContext from "../../context/authContext";
import WizkidsContext from "../../context/wizkidsContext";
import { Link } from "react-router-dom";
import WizkidElementContainer from "../../components/WizkidElementContainer";
import CenterContainer from "../../components/CenterContainer/CenterContainer";
import { SyncLoader } from "react-spinners";

function WizkidDetailsPage() {
  const { id } = useParams(); //get the id from url
  const {token} = useContext(AuthContext);
  const {wizkids, loading } = useContext(WizkidsContext);

  const found = wizkids.find(element => element.id === Number(id));

  return (
    <div className={style.box}>
      <Navbar />
      <div className={`${style.row} ${style.content}`}>
        {found !== undefined && (
          <WizkidElementContainer>
            <p className={style.name}>{found.name}</p>
            <p className={style.position}>{found.position}</p>
            {token && (
              <div>
                <p className={style["phone-email"]}>{found.phone}</p>
                <p className={style["phone-email"]}>{found.email}</p>
              </div>
            )}
            <Link to={`/edit/${found.id}`}>
              <button className={style["button-edit"]}>Edit</button>
            </Link>
          </WizkidElementContainer>
      )}

      {loading && 
        <CenterContainer>
          <SyncLoader color="var(--owow-green)" size="80px"/>
        </CenterContainer>
      }
      </div>
    </div>
  );
}

export default WizkidDetailsPage;