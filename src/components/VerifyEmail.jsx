import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import useAuthStore from "../Store/userAuthStore";
import Loader from "./Loader";

// OTP Input component
const OTPInput = ({ length = 6, value, onChange }) => {
    const inputsRef = useRef([]);

    const handleChange = (e, index) => {
        const val = e.target.value;
        if (!/^\d*$/.test(val)) return;

        e.target.value = val.slice(0, 1);
        if (val && inputsRef.current[index + 1]) {
            inputsRef.current[index + 1].focus();
        }

        const otp = inputsRef.current.map((input) => input.value).join("");
        onChange && onChange(otp);
    };

    const handleKeyDown = (e, index) => {
        if (
            e.key === "Backspace" &&
            !e.target.value &&
            inputsRef.current[index - 1]
        ) {
            inputsRef.current[index - 1].focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData("text").trim();
        if (!/^\d+$/.test(pasteData)) return;
        const digits = pasteData.slice(0, length).split("");
        digits.forEach((digit, idx) => {
            if (inputsRef.current[idx]) {
                inputsRef.current[idx].value = digit;
            }
        });

        const otp = inputsRef.current.map((input) => input.value).join("");
        onChange && onChange(otp);
    };

    return (
        <div className="flex justify-between gap-3">
            {Array.from({ length }).map((_, index) => (
                <motion.input
                    key={index}
                    type="text"
                    maxLength={1}
                    ref={(el) => (inputsRef.current[index] = el)}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onPaste={handlePaste}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="w-12 h-12 text-center text-xl border border-gray-300 rounded-lg 
                     focus:outline-none focus:ring-2 focus:ring-indigo-400 transition 
                     hover:border-indigo-400 shadow-sm"
                />
            ))}
        </div>
    );
};

// VerifyEmail component
const VerifyEmail = () => {
    const { verifyUser, error, isLoading, isVerified, resendCode } =
        useAuthStore();
    const [otp, setOtp] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await verifyUser(otp);
            navigate("/");
        } catch (err) {
            console.log("Verification error:", err);
        }
    };

    if (isVerified) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600 p-4">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 text-center"
                >
                    <motion.h2
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="text-2xl font-bold text-green-600 mb-4"
                    >
                        ✅ Your account is verified!
                    </motion.h2>
                    <Link
                        to="/"
                        className="text-indigo-600 hover:underline font-medium text-lg"
                    >
                        Go to Login
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600 p-4 relative overflow-hidden">
            {/* floating bg elements */}
            <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ repeat: Infinity, duration: 5 }}
                className="absolute top-10 left-12 w-24 h-24 bg-pink-400 opacity-40 rounded-full blur-2xl"
            />
            <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ repeat: Infinity, duration: 6 }}
                className="absolute bottom-16 right-12 w-32 h-32 bg-indigo-300 opacity-40 rounded-full blur-2xl"
            />

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 relative z-10"
            >
                <div className="flex items-center flex-col gap-4 mb-6">
                    <motion.div
                        animate={{ y: [0, -8, 0] }}
                        transition={{ repeat: Infinity, duration: 3 }}
                        className="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center shadow-md"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-8 h-8 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path d="M16 12H8m0 0l4 4m-4-4l4-4" />
                        </svg>
                    </motion.div>

                    <h2 className="text-2xl font-bold tracking-tight text-center text-gray-800">
                        Verify Your Account
                    </h2>
                    <p className="text-base text-gray-600 font-medium text-center">
                        Enter the 6-digit code we sent to your email
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <OTPInput length={6} value={otp} onChange={setOtp} />
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        disabled={isLoading}
                        className={`w-full bg-indigo-600 text-white py-2 rounded-lg font-medium transition
              ${isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-indigo-700"}`}
                    >
                        {isLoading ? <Loader /> : "Verify"}
                    </motion.button>

                    {error && (
                        <p className="text-red-500 text-center mt-2 font-medium">
                            {error.message || error}
                        </p>
                    )}
                </form>

                <div className="text-center mt-6 flex justify-between">
                    <Link to="/" className="text-indigo-600 hover:underline font-medium">
                        Back to Login
                    </Link>
                    <button
                        onClick={resendCode}
                        className="text-indigo-600 hover:underline cursor-pointer font-medium"
                    >
                        Resend Code
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default VerifyEmail;
