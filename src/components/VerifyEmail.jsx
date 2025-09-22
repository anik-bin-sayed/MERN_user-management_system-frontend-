import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../Store/userAuthStore";
import Loader from './Loader';

// OTP Input component
const OTPInput = ({ length = 6, value, onChange }) => {
    const inputsRef = useRef([]);

    const handleChange = (e, index) => {
        const val = e.target.value;
        if (!/^\d*$/.test(val)) return; // only digits

        e.target.value = val.slice(0, 1); // ekta digit
        if (val && inputsRef.current[index + 1]) {
            inputsRef.current[index + 1].focus();
        }

        const otp = inputsRef.current.map(input => input.value).join("");
        onChange && onChange(otp);
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !e.target.value && inputsRef.current[index - 1]) {
            inputsRef.current[index - 1].focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData("text").trim();
        if (!/^\d+$/.test(pasteData)) return; // only digits
        const digits = pasteData.slice(0, length).split("");
        digits.forEach((digit, idx) => {
            if (inputsRef.current[idx]) {
                inputsRef.current[idx].value = digit;
            }
        });

        const otp = inputsRef.current.map(input => input.value).join("");
        onChange && onChange(otp);

        // focus last filled input
        const lastFilledIndex = digits.length - 1;
        if (inputsRef.current[lastFilledIndex + 1]) {
            inputsRef.current[lastFilledIndex + 1].focus();
        }
    };

    return (
        <div className="flex justify-between gap-2">
            {Array.from({ length }).map((_, index) => (
                <input
                    key={index}
                    type="text"
                    maxLength={1}
                    ref={el => (inputsRef.current[index] = el)}
                    onChange={e => handleChange(e, index)}
                    onKeyDown={e => handleKeyDown(e, index)}
                    onPaste={handlePaste} // handle paste
                    className="w-12 h-12 text-center text-xl border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
            ))}
        </div>
    );
};

// VerifyEmail component
const VerifyEmail = () => {
    const { verifyUser, error, isLoading, isVerified, resendCode } = useAuthStore();
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
                <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 text-center">
                    <h2 className="text-2xl font-bold text-green-600 mb-4">
                        ✅ Your account is verified!
                    </h2>
                    <Link to="/" className="text-indigo-600 hover:underline font-medium">
                        Go to Login
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600 p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6">
                <div className="flex items-center flex-col gap-4 mb-6">
                    <h2 className="text-2xl font-bold tracking-tight text-center text-gray-800">
                        Verify Your Account
                    </h2>
                    <p className="text-base font-medium">Six digit code sent to your email</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Your OTP
                        </label>
                        <OTPInput length={6} value={otp} onChange={setOtp} />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full bg-indigo-600 text-white py-2 rounded-lg font-medium transition
              ${isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-indigo-700"}`}
                    >
                        {isLoading ? <Loader /> : "Verify"}
                    </button>

                    {error && (
                        <p className="text-red-500 text-center mt-2">
                            {error.message || error}
                        </p>
                    )}
                </form>

                <div className="text-center mt-6 flex justify-evenly">
                    <Link to="/" className="text-indigo-600 hover:underline">
                        Back to Login
                    </Link>
                    <button
                        onClick={resendCode}
                        className="text-indigo-600 hover:underline cursor-pointer">
                        Resend Code
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VerifyEmail;
