import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import UserStore from './stores/userStore';
import { Store } from './types/type';

const store = new UserStore();
const Context = createContext<Store>({ store });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context.Provider value={{ store }}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Context.Provider>
);
