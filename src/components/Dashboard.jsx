import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../Store/userAuthStore';
import Loader from './Loader';

const Dashboard = () => {
    const { user, isLoading, getUser, logout } = useAuthStore();
    const navigate = useNavigate();

    // useEffect(() => {
    //     const initAuth = async () => {
    //         try {
    //             await getUser();
    //         } catch (err) {
    //             console.log("Not authenticated, redirecting to login");
    //             navigate('/');  // redirect if not authenticated
    //         }
    //     };

    //     initAuth();
    // }, [getUser, navigate]);

    if (isLoading) return <Loader />;  // show loader while checking auth

    if (!user) return null; // optional safeguard

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600 p-4">
            <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md flex flex-col gap-4">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">User Info</h1>
                <div className="flex flex-col gap-1">
                    <h2 className="text-lg font-medium text-gray-700">{user?.name}</h2>
                    <p className="text-gray-500">{user?.email}</p>
                </div>
                <button
                    onClick={() => {
                        logout();
                        navigate('/')
                    }}
                    className="mt-6 w-full bg-red-500 text-white py-2 rounded-md font-semibold hover:bg-red-600 transition-all shadow-md hover:shadow-lg"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Dashboard;
