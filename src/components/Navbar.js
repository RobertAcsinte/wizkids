import './Navbar.css';
import { useNavigate } from "react-router-dom";
import WizkidsContext from "../context/wizkids";
import { useContext } from 'react';

function Navbar() {
  let navigate = useNavigate();
  const {token, logout} = useContext(WizkidsContext);

  const accountText = token ? "Logout" : "Login";

  const handleAccount = () => {
    if(token) {
      logout();
    }
    else {
      navigate("/login");
    }
  };

  return (
    <nav>
      <a className='company-logo-navbar' href="/">OWOW</a>
      <a className='login-text-navbar' onClick={handleAccount}>{accountText}</a>
    </nav>
  );
}

export default Navbar;