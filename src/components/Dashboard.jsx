import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import useAuthStore from '../Store/userAuthStore';
import Loader from './Loader';

const Dashboard = () => {
    const { user, isLoading, getUser, logout } = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            getUser();
        }
    }, [user, getUser]);

    if (isLoading) return <Loader />;

    if (!user) return null;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600 p-4 relative overflow-hidden">
            {/* Top animated illustration */}
            <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="mb-6"
            >
                <motion.div
                    animate={{ y: [0, -15, 0] }}
                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                    className="w-32 h-32 bg-gradient-to-tr from-pink-500 to-yellow-400 rounded-full flex items-center justify-center shadow-xl"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="w-16 h-16 text-white"
                    >
                        <circle cx="12" cy="7" r="4" />
                        <path d="M5.5 21a7.5 7.5 0 0 1 13 0" />
                    </svg>
                </motion.div>
            </motion.div>

            {/* User card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md flex flex-col gap-4 relative z-10"
            >
                <motion.h1
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="text-3xl font-extrabold text-gray-800 mb-2 text-center"
                >
                    Welcome, {user?.name}
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="flex flex-col items-center gap-2"
                >
                    <p className="text-gray-800 font-medium">Email : {user?.email}</p>
                    <p className="text-gray-800 font-medium">Last Login : {" "}
                        {user?.lastLogin ? new Date(user.lastLogin).toLocaleString("en-US", {
                            weekday: "short",   // e.g., Mon
                            year: "numeric",    // 2025
                            month: "short",     // Sep
                            day: "numeric",     // 22
                            hour: "2-digit",    // 06
                            minute: "2-digit",  // 30
                            hour12: true        // AM/PM format
                        }) : "N/A"}
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="mt-4 text-center text-gray-500 text-sm"
                >
                    <p>You have successfully logged in and arrived at the dashboard.</p>
                    <p>From this page, you can view your personal information.</p>
                </motion.div>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                        logout();
                        navigate('/');
                    }}
                    className="mt-6 w-full bg-red-500 text-white py-2 rounded-md font-semibold shadow-md hover:bg-red-600 transition-all"
                >
                    Logout
                </motion.button>
            </motion.div>
        </div>
    );
};

export default Dashboard;