import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import React, { useReducer, useEffect } from 'react';
import AppRouter from './routes';
import { authReducer } from './auth/authReducer';
import { AuthContext } from './auth/AuthContext';

import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
  
} from "react-router-dom";

const init = () => {
  return JSON.parse(localStorage.getItem('user')) || {logged: false};
}


function App() {

  const [ user, dispatch ] = useReducer (authReducer, {}, init)

  return (

    <AuthContext.Provider value={{user, dispatch}}>
      <AppRouter />
    </AuthContext.Provider>    
  );
}

export default App;
