import './Login.css';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/authContext';
import { useNavigate } from 'react-router';
import LoadingContainer from '../../components/LoadingContainer';
import ErrorContainer from '../../components/ErrorContainer';
import Navbar from '../../components/Navbar';
import InputLabel from '../../components/InputLabel';


export default function Login() {

  const {login, loading, error, isLoggedIn} = useContext(AuthContext);

  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if(isLoggedIn) {
      navigate(-1);
    } 
  }, [isLoggedIn]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    login();
  }

  if(loading) {
    return <LoadingContainer />
  }

  return(
    <div className='center-cont'>
      <div className='login-title'>OWOW</div>
    <div className="login-wrapper">
      <h1>Login</h1>
      <form className='form-login' onSubmit={handleSubmit}>
        <InputLabel labelName={"Username"} type="text" onChange={e => setUserName(e.target.value)} />
        <InputLabel labelName={"Password"} type="password" onChange={e => setPassword(e.target.value)} />
        <button type="submit" className='submit-login'>Submit</button>
        {error && <p style={{color: "red", fontWeight: "bold"}}>{error}</p>}
      </form>
    </div>
    </div>

  )
}


