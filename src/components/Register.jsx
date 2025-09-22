import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import useAuthStore from "../Store/userAuthStore";
import Loader from "./Loader";

const Register = () => {
    const { register, error, isLoading } = useAuthStore();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(formData.name, formData.email, formData.password);
            navigate("/verify-email");
        } catch (err) { }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600 p-4 relative overflow-hidden">
            {/* Floating gradient circles background */}
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 0.3 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="absolute top-10 left-10 w-40 h-40 bg-pink-400 rounded-full blur-3xl"
            />
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 0.3 }}
                transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                className="absolute bottom-10 right-10 w-52 h-52 bg-indigo-400 rounded-full blur-3xl"
            />

            {/* Card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 relative z-10"
            >
                {/* Avatar / Illustration */}
                <div className="flex justify-center mb-6">
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                        className="w-20 h-20 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="white"
                            strokeWidth={2}
                            className="w-10 h-10"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 4.5c1.38 0 2.5 1.12 2.5 2.5S13.38 9.5 12 9.5 9.5 8.38 9.5 7s1.12-2.5 2.5-2.5zM6.75 18a5.25 5.25 0 0110.5 0v.75h-10.5V18z"
                            />
                        </svg>
                    </motion.div>
                </div>

                {/* Title */}
                <h2 className="text-2xl tracking-tight font-bold text-center text-gray-800 mb-6">
                    Create an Account
                </h2>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.4 }}
                    >
                        <label className="block text-gray-700 font-medium mb-1">Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.4 }}
                    >
                        <label className="block text-gray-700 font-medium mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.4 }}
                    >
                        <label className="block text-gray-700 font-medium mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                        />
                    </motion.div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        disabled={isLoading}
                        className={`w-full bg-indigo-600 text-white py-2 rounded-lg font-medium transition
              ${isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-indigo-700"}`}
                    >
                        {isLoading ? <Loader /> : "Register"}
                    </motion.button>

                    {error && (
                        <p className="text-red-500 mt-2 font-medium text-center">{error}</p>
                    )}
                </form>

                <p className="text-center text-gray-600 text-sm mt-6">
                    Already have an account?{" "}
                    <Link to="/" className="text-indigo-600 hover:underline font-medium">
                        Login
                    </Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Register;
