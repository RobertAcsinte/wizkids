import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from './context/wizkidsContext';
import { ProviderContextAuth } from './context/authContext';
import { BrowserRouter } from 'react-router-dom';


const el = document.getElementById("root");
const root = ReactDOM.createRoot(el);


root.render(

  <BrowserRouter>
    <ProviderContextAuth>
      <Provider>
        <App />
      </Provider> 
    </ProviderContextAuth>
  </BrowserRouter>

);