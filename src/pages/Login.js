import './Login.css';
import { useContext, useEffect, useState } from 'react';
import WizkidsContext from "../context/wizkids";
import { useNavigate } from 'react-router';
import LoadingContainer from '../components/LoadingContainer';
import ErrorContainer from '../components/ErrorContainer';

export default function Login() {

  const {login, loading, error, token} = useContext(WizkidsContext);

  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if(token) {
      navigate(-1);
    } 
  }, [loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    login();
  }

  if(loading) {
    return <LoadingContainer />
  }

  return(
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={e => setUserName(e.target.value)}/>
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)}/>
        </label>
        <div>
          <button type="submit">Submit</button>
          {error && <p style={{color: "red", fontWeight: "bold"}}>{error}</p>}
        </div>
      </form>
    </div>
  )
}


