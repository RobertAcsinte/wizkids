import './Navbar.css';
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/authContext";
import { useContext } from 'react';

function Navbar() {
  let navigate = useNavigate();
  const {isLoggedIn, logout} = useContext(AuthContext);

  const accountText = isLoggedIn ? "Logout" : "Login";

  const handleAccount = () => {
    if(isLoggedIn) {
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