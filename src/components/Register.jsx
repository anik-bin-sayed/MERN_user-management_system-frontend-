import React, { useState } from "react";
// import "./gradient.css"; // extra css file add korbo
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../Store/userAuthStore";
import Loader from "./Loader";

const Register = () => {
    const { register, error, isLoading } = useAuthStore()

    const navigate = useNavigate()

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
            navigate('/verify-email')
        } catch (err) {
            // console.log("Register error:", err); // Backend message already set in store
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600 p-4">
            <div className="w-full max-w-md bg-white rounded-none md:rounded-xl lg:rounded-xl shadow-xl p-8">
                {/* Title */}
                <h2 className="text-2xl tracking-tight font-bold text-center text-gray-800 mb-6">
                    Create an Account
                </h2>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-sm focus:outline-none "
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-sm focus:outline-none"
                        />
                    </div>

                    <div>
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
                            className="w-full px-4 py-2 border rounded-sm focus:outline-none "
                        />
                    </div>

                    {/* <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm your password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-sm focus:outline-none "
                        />
                    </div> */}

                    <button
                        type="submit"
                        disabled={isLoading} // ✅
                        className={`w-full bg-indigo-600 text-white py-2 rounded-lg font-medium transition
              ${isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-indigo-700"}`}
                    >
                        {isLoading ? <Loader /> : "Register"}
                    </button>

                    {error && <p className="text-red-500 mt-2 text-semibold text-center">{error}</p>}

                </form>

                <p className="text-center text-gray-600 text-sm mt-6">
                    Already have an account?{" "}
                    <Link to="/" className="text-[#9333ea] hover:underline font-medium">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
