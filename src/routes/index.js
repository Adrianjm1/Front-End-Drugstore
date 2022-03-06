import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { PublicRoutes } from './PublicRoutes';
import { PrivateRoutes } from './PrivateRoutes';
import Login from '../components/Login/login';
import DashboardRoutes from './DashboardRoutes';

function AppRouter() {

    return (
        <Routes>

            <Route path="/login" element={
                <PublicRoutes>
                    <Login />
                </PublicRoutes>
            } />

            <Route path="/*" element={
                <PrivateRoutes>
                    <DashboardRoutes />
                </PrivateRoutes>
            } />

        </Routes>
    )

}


export default AppRouter;