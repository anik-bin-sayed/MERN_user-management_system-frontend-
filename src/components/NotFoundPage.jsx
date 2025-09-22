import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// NotFoundPage.jsx
// Single-file React component (Tailwind CSS + Framer Motion).
// Usage: add a route like <Route path="*" element={<NotFoundPage/>} />

export default function NotFoundPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, ease: "anticipate" }}
                className="max-w-3xl w-full bg-white/5 backdrop-blur-md rounded-2xl shadow-2xl p-8 md:p-12 border border-white/10"
            >
                <div className="flex flex-col md:flex-row items-center gap-8">
                    {/* Animated illustration */}
                    <motion.div
                        initial={{ rotate: -8 }}
                        animate={{ rotate: 8 }}
                        transition={{ yoyo: Infinity, duration: 2.5, ease: "easeInOut" }}
                        className="w-48 h-48 flex items-center justify-center bg-gradient-to-tr from-indigo-600 to-pink-500 rounded-xl shadow-lg"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 120 120"
                            className="w-28 h-28 text-white"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <circle cx="60" cy="60" r="36" className="opacity-30" />
                            <path d="M36 60c0-13.255 10.745-24 24-24s24 10.745 24 24-10.745 24-24 24S36 73.255 36 60z" />
                            <path d="M48 48l24 24M72 48L48 72" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </motion.div>

                    {/* Text content */}
                    <div className="flex-1 text-center md:text-left">
                        <motion.h1
                            initial={{ x: -30, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.15, duration: 0.5 }}
                            className="text-6xl md:text-7xl font-extrabold text-white leading-none"
                        >
                            404
                        </motion.h1>

                        <motion.p
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.25, duration: 0.45 }}
                            className="mt-4 text-lg md:text-xl text-slate-200/90"
                        >
                            Oops — Route Not Found.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.35, duration: 0.45 }}
                            className="mt-6 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-start md:justify-start"
                        >
                            <Link to="/" className="inline-block">
                                <button className="px-5 py-2 rounded-lg bg-white text-slate-900 font-semibold shadow hover:scale-[1.02] transform transition">
                                    Go Back Home
                                </button>
                            </Link>

                            <Link to="#" className="inline-block">
                                <button className="px-5 py-2 rounded-lg border border-white/20 text-white font-medium hover:opacity-90 transition">
                                    Support e jao
                                </button>
                            </Link>
                        </motion.div>
                    </div>
                </div>

                {/* subtle floating dots */}
                <motion.div
                    aria-hidden
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="pointer-events-none"
                >
                    <div className="relative">
                        <span className="absolute -top-6 -right-6 w-6 h-6 rounded-full bg-white/7 blur-sm animate-pulse" />
                        <span className="absolute -bottom-6 -left-8 w-4 h-4 rounded-full bg-white/5 blur-sm animate-pulse" />
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}
