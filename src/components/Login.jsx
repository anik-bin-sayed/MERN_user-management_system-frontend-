import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useAuthStore from "../Store/userAuthStore";
import Loader from "./Loader";

const Login = () => {
    const { LoginUser, oauthLogin, error: serverError, isLoading } = useAuthStore();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        remember: false,
    });
    const [isTypingPassword, setIsTypingPassword] = useState(false);
    const [errors, setErrors] = useState({}); // validation error state

    // Email regex
    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    // Validation function
    const validateForm = () => {
        let newErrors = {};

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!validateEmail(formData.email)) {
            newErrors.email = "Please enter a valid email address";
        }

        if (!formData.password.trim()) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });

        if (name === "password") setIsTypingPassword(value.length > 0);

        // Real-time validation
        setErrors({
            ...errors,
            [name]: "",
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            LoginUser(formData.email, formData.password);
        }
    };

    // Generic OAuth handler
    const handleOAuthLogin = (provider) => {
        const width = 500,
            height = 600;
        const left = window.innerWidth / 2 - width / 2;
        const top = window.innerHeight / 2 - height / 2;

        const authWindow = window.open(
            `http://localhost:5000/api/auth/${provider}`,
            "_blank",
            `width=${width},height=${height},top=${top},left=${left}`
        );

        window.addEventListener(
            "message",
            function receiveToken(e) {
                if (e.origin !== "http://localhost:5000") return;
                const { token } = e.data;
                if (token) oauthLogin(token, provider);
                window.removeEventListener("message", receiveToken);
                authWindow.close();
            },
            false
        );
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
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
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
                            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.email ? "border-red-500 focus:ring-red-400" : "focus:ring-indigo-400"
                                }`}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                        )}
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
                            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.password ? "border-red-500 focus:ring-red-400" : "focus:ring-indigo-400"
                                }`}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                        )}
                    </div>

                    {/* Remember me */}
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

                    {/* Submit button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full bg-indigo-600 text-white py-2 rounded-lg font-medium transition ${isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-indigo-700"
                            }`}
                    >
                        {isLoading ? <Loader /> : "Login"}
                    </button>

                    {/* Server error */}
                    {serverError && (
                        <p className="text-red-500 text-center mt-2">
                            {serverError.message || serverError}
                        </p>
                    )}
                </form>

                {/* Register link */}
                <p className="text-center text-gray-600 text-sm mt-6">
                    Don’t have an account?{" "}
                    <Link to="/register" className="text-indigo-600 hover:underline font-medium">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
