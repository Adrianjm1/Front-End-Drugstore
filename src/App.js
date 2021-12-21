import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import React, { useReducer, useEffect } from 'react';
import Login from './components/Login/login';
import NavbarLogin from './components/Navbar/NavbarLogin';
import Footer from './components/Footer/Footer';
import Dashboard from './components/Dashboard/Dashboard';
import Seller from './components/Seller/Seller';

import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
  
} from "react-router-dom";




function App() {
  return (
    <Routes>
        <Route path="/" element={<Login />}> </Route>
        <Route path='/seller' element={<Seller/>}></Route>
    </Routes>
    

    // <>
    // <NavbarLogin/>
    // <Login/>
    // <Seller/>
    // <Footer/>
    // <Dashboard/>
    
    // </>
    
    
  );
}

export default App;
