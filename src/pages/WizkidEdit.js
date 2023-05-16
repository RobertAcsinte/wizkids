import { useParams } from "react-router";
import Navbar from "../components/Navbar";
import "./WizkidEdit.css"
import { useContext, useEffect, useState } from 'react';
import WizkidsContext from "../context/wizkids";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import WizkidElementContainer from "../components/WizkidElementContainer";
import LoadingContainer from "../components/LoadingContainer";


function WizkidEdit() {
  const { id } = useParams(); //get the id from url
  const {wizkids, loading, editWizkidById} = useContext(WizkidsContext);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  let navigate = useNavigate();
    
  const handleChange = (event) => {
    setName(event.target.value)
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await editWizkidById(id, name);
      navigate("/");
    } catch(error) {
      setError(error.message);
    }
  };

const found = wizkids.find(element => element.id === Number(id));
useEffect(() => {
  if(found !== undefined) {
    setName(found.name);
  } 
}, [found]);

if(loading) {
  return <LoadingContainer />
}

  return (
    <div>
      <Navbar />
      {found !== undefined && (
        <WizkidElementContainer>
        <form className="wizkid-edit-form" onSubmit={handleSubmit}>
            <label className="label-form">Name</label>
            <input value={name} className="input-form" onChange={handleChange}/>
            <button className="wizkid-edit-button-edit">
                Save
            </button>
            {error && <p style={{color: "red", fontWeight: "bold"}}>{error}</p>}
          </form>
        </WizkidElementContainer>
      )}
    </div>
  );
}

export default WizkidEdit;