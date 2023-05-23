import { useParams } from "react-router";
import Navbar from "../../components/Navbar";
import style from "./WizkidEdit.module.css"
import { useContext, useEffect, useState } from 'react';
import WizkidsContext from "../../context/wizkidsContext";
import { useNavigate } from "react-router-dom";
import WizkidElementContainer from "../../components/WizkidElementContainer";
import InputLabel from "../../components/InputLabel";
import AuthContext from "../../context/authContext";
import CenterContainer from "../../components/CenterContainer/CenterContainer";
import { SyncLoader } from "react-spinners";


function WizkidEditPage() {
  const { id } = useParams(); //get the id from url
  const {wizkids, loading, editWizkidById, setEmployementWizkidById} = useContext(WizkidsContext);
  const {token} = useContext(AuthContext);
  const [name, setName] = useState("");
  const [employed, setEmployed] = useState();
  const [error, setError] = useState("");
  let navigate = useNavigate();
    
  const handleChange = (event) => {
    setName(event.target.value)
  };

  const handleSubmitEditName = async (event) => {
    event.preventDefault();
    try {
      await editWizkidById(id, name);
      navigate("/");
    } catch(error) {
      setError(error.message);
    }
  };

  const handleSubmitChangeEmployement= async () => {
    try {
      await setEmployementWizkidById(id);
      navigate("/");
    } catch(error) {
      setError(error.message);
    }
  };

const found = wizkids.find(element => element.id === Number(id));
useEffect(() => {
  if(found !== undefined) {
    setName(found.name);
    setEmployed(found.employed);
  } 
}, [found]);


const employmentButtonText = employed ? "Fire!" : "Hire back!";

  return (
    <div className={style.box}>
      <Navbar />
      <div className={`${style.row} ${style.content}`}>

        {found !== undefined && (
          <WizkidElementContainer>
            <form className={style.form} onSubmit={handleSubmitEditName}>
                <InputLabel labelName = "Name" value={name} onChange={handleChange} />
                <button className={style["button-edit"]}>
                    Save
                </button>
                {error && <p style={{color: "red", fontWeight: "bold"}}>{error}</p>}
            </form>
            {token && (
              <button className={style["button-set-employement"]} onClick={handleSubmitChangeEmployement}>
                {employmentButtonText}
              </button>
            )}
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

export default WizkidEditPage;