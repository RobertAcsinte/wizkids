import { useParams } from "react-router";
import Navbar from "../components/Navbar";
import "./WizkidEdit.css"
import { useContext, useEffect, useState } from 'react';
import WizkidsContext from "../context/wizkids";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import WizkidElementContainer from "../components/WizkidElementContainer";


function WizkidEdit() {
  const { id } = useParams(); //get the id from url
  const {wizkids, loading, editWizkidById} = useContext(WizkidsContext);
  const found = wizkids.find(element => element.id === Number(id));
  const [name, setName] = useState(found.name);
  let navigate = useNavigate();
    
  const handleChange = (event) => {
    setName(event.target.value)
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    await editWizkidById(id, name);
    navigate("/");
}

  return (
    <div>
      <Navbar />
      <WizkidElementContainer>
      <form className="wizkid-edit-form" onSubmit={handleSubmit}>
          <label className="label-form">Name</label>
          <input value={name} className="input-form" onChange={handleChange}/>
          <button className="wizkid-edit-button-edit">
              Save
          </button>
        </form>
      </WizkidElementContainer>
    </div>
  );
}

export default WizkidEdit;