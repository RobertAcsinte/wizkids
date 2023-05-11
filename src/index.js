import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from './context/wizkids';
import { BrowserRouter } from 'react-router-dom';


const el = document.getElementById("root");
const root = ReactDOM.createRoot(el);

root.render(

  <BrowserRouter>
    <Provider>
      <App />
    </Provider> 
  </BrowserRouter>

);