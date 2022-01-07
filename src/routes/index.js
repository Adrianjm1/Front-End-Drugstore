import React, { useContext } from 'react';
import { Router, Route, Routes } from 'react-router-dom';
import Login from '../components/Login/login';
import Main from '../components/Main/main';
import Seller from '../components/Seller/Seller';
import MakeAPayment from '../components/Payments/MakeAPayment';
import Payments from '../components/Payments/Payments';

function AppRouter() {

    return (
        <Routes>
            <Route path="/login" element={<Login />}> </Route>
            <Route path="/" element={<Main />}> </Route>
            <Route path='/seller' element={<Seller />}></Route>
            <Route path='/payment/make/:id' element={<MakeAPayment />}></Route>
            <Route path='/payments' element={<Payments />}></Route>
        </Routes>
    )

}

export default AppRouter;