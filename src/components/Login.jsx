import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import useAuthStore from "../Store/userAuthStore";
import Loader from "./Loader";

const Login = () => {
    const { LoginUser, error, isLoading } = useAuthStore();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        remember: false,
    });

    const [isTypingPassword, setIsTypingPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
        if (name === "password") {
            setIsTypingPassword(value.length > 0);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            LoginUser(formData.email, formData.password);
        } catch (error) { }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600 p-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-8">

                {/* Avatar */}
                <div className="flex justify-center mb-6">
                    <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="relative w-24 h-24 rounded-full bg-gradient-to-tr from-indigo-400 to-purple-500 flex items-center justify-center shadow-lg"
                    >
                        {/* Face */}
                        <div className="w-16 h-16 bg-white rounded-full relative flex items-center justify-center">
                            {/* Eyes */}
                            <div className="flex gap-4">
                                <motion.span
                                    animate={{ scaleY: isTypingPassword ? 0.1 : 1 }}
                                    transition={{ duration: 0.2 }}
                                    className="w-3 h-3 bg-black rounded-full"
                                ></motion.span>
                                <motion.span
                                    animate={{ scaleY: isTypingPassword ? 0.1 : 1 }}
                                    transition={{ duration: 0.2 }}
                                    className="w-3 h-3 bg-black rounded-full"
                                ></motion.span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold tracking-tight text-center text-gray-800 mb-6">
                    Welcome Back
                </h2>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Email */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                    </div>

                    {/* Remember Me + Forgot Password */}
                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                name="remember"
                                checked={formData.remember}
                                onChange={handleChange}
                                className="w-4 h-4"
                            />
                            Remember me
                        </label>
                        <a href="#" className="text-indigo-600 hover:underline">
                            Forgot Password?
                        </a>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full bg-indigo-600 text-white py-2 rounded-lg font-medium transition
              ${isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-indigo-700"}`}
                    >
                        {isLoading ? <Loader /> : "Login"}
                    </button>

                    {error && (
                        <p className="text-red-500 text-center mt-2">
                            {error.message || error}
                        </p>
                    )}
                </form>

                {/* Footer */}
                <p className="text-center text-gray-600 text-sm mt-6">
                    Don’t have an account?{" "}
                    <Link
                        to="/register"
                        className="text-indigo-600 hover:underline font-medium"
                    >
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
