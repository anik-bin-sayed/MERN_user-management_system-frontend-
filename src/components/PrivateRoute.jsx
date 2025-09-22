import React from "react";

import { Navigate } from "react-router-dom";
import useAuthStore from "../Store/userAuthStore";
import Loader from "./Loader";

export const PrivateRoute = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuthStore();

    if (isLoading) {
        <div className='w-full h-screen flex items-center justify-center'><Loader /></div>
    }

    return isAuthenticated ? children : <Navigate to="/" replace />;
};
export const PublicRoute = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuthStore();

    if (isLoading) {
        <div className='w-full h-screen flex items-center justify-center'><Loader /></div>
    }

    return !isAuthenticated ? children : <Navigate to="/dashboard" replace />;
};
