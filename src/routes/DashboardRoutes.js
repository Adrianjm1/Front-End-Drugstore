import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from '../components/Main/Main';
import Seller from '../components/Seller/Seller';
import Payments from '../components/Payments/Payments';

function DashboardRoutes() {

    return (
        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/seller" element={<Seller />} />
            <Route path="/payments" element={<Payments />} />
        </Routes>
    )

}

export default DashboardRoutes;