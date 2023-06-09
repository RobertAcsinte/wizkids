import { useState, createContext, useEffect } from "react";
import axios from "axios";
import useToken from "../hooks/useToken";

const AuthContext = createContext();


function ProviderContextAuth({children}) {

  const {token, setToken, removeToken} = useToken();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState();


  useEffect(() => {
    token ? setIsLoggedIn(true) : setIsLoggedIn(false);
  }, [token]);

  //delay to simulate real api call
  const login = async () => {
    setLoading(true);
    setTimeout(async () => {
      try {
        const response = await axios.get("http://localhost:3001/authh");
        setToken(response.data);
        setError("");
      } catch(error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }, 1000);
  };

  const logout = () => {
    removeToken();
  };

  const valueToShare = {
    isLoggedIn: isLoggedIn,
    token: token,
    login: login,
    logout: logout,
    loading: loading
  };

  return <AuthContext.Provider value={valueToShare}>{children}</AuthContext.Provider>
}

export {ProviderContextAuth};
export default AuthContext;