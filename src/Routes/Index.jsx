import React, { useEffect } from 'react'

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import DashboardPage from '../Pages/DashboardPage';
import LoginPage from '../Pages/LoginPage';
import RegisterPage from '../Pages/RegisterPage';
import VerifyEmailPage from '../Pages/VerifyEmailPage';
// import { PrivateRoute, PublicRoute } from '../components/PrivateRoute';
import useAuthStore from '../Store/userAuthStore';
import { PrivateRoute, PublicRoute } from './../components/PrivateRoute';
import Loader from '../components/Loader';
import NotFoundPage from '../components/NotFoundPage';


const Index = () => {
    const { getUser, refreshToken, isLoading, hasFetched } = useAuthStore();

    useEffect(() => {

        const initAuth = async () => {
            try {
                await getUser();
            } catch (err) {
                console.log("Not authenticated");
            }
        };
        initAuth();

    }, [hasFetched, getUser]);


    useEffect(() => {
        const interval = setInterval(async () => {
            try {
                await refreshToken();
            } catch (err) {
                logout();
            }
        }, 14 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);


    if (isLoading) {
        <div className='w-full h-screen flex items-center justify-center'><Loader /></div>
    }

    return (
        <Router>
            <Routes>
                <Route path="/dashboard" element={
                    <PrivateRoute>
                        <DashboardPage />
                    </PrivateRoute>
                } />
                <Route path="/" element={
                    <PublicRoute>
                        <LoginPage />
                    </PublicRoute>
                } />
                <Route path="/register" element={
                    <PublicRoute>
                        <RegisterPage />
                    </PublicRoute>
                } />
                <Route path="/verify-email" element={

                    <VerifyEmailPage />


                } />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Router>
    )
}

export default Index