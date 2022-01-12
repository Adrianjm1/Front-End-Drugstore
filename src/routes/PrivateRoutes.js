import React, { useContext } from 'react'
import { Navigate, Route } from 'react-router-dom'
import PropTypes from 'prop-types';
import { AuthContext } from '../auth/AuthContext';

export const PrivateRoutes = ({ children }) => {

    const { user } = useContext(AuthContext);

    return user.logged ?
        children
        : <Navigate to="/login" />

}