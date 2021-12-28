import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import React, { useReducer, useEffect } from 'react';
import Login from './components/Login/login';
import Main from './components/Main/main';
import MakeAPayment from './components/Payments/MakeAPayment';
import Payments from './components/Payments/Payments';
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
        <Route path="/login" element={<Login />}> </Route>
        <Route path="/" element={<Main />}> </Route>
        <Route path='/seller' element={<Seller/>}></Route>
        <Route path='/payment/make/:id' element={<MakeAPayment/>}></Route>
        <Route path='/payments' element={<Payments/>}></Route>
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
