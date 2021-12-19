import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import React, { useReducer, useEffect } from 'react';
import Login from './components/Login/login';
import NavbarLogin from './components/Navbar/NavbarLogin';
import Footer from './components/Footer/Footer';




function App() {
  return (

    <>
    <NavbarLogin/>
    <Login/>
    <Footer/>
    
    </>
    
    
  );
}

export default App;
