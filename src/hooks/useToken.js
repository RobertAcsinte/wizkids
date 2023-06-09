import { useState } from 'react';

export default function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem('authToken');
    const userToken = JSON.parse(tokenString);
    return userToken?.token
  };
  const [token, setToken] = useState(getToken());

  const saveToken = userToken => {
    localStorage.setItem('authToken', JSON.stringify(userToken));
    setToken(userToken.token);
  };

  const removeToken = () => {
    localStorage.removeItem("authToken");
    setToken(undefined);
  };

  return {
    removeToken: removeToken,
    setToken: saveToken,
    token
  }

}