import './Navbar.css';
import { useNavigate } from "react-router-dom";

function Navbar() {
  let navigate = useNavigate();

  return (
    <nav>
      <a className='company-logo-navbar' href="/">OWOW</a>
      <a className='login-text-navbar' onClick={() => navigate("/login")}>Login</a>
    </nav>
  );
}

export default Navbar;