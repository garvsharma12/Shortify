import { useNavigate } from "react-router-dom";
import React from "react";
import { motion } from "framer-motion";
import Card from "./Card";
import { useStoreContext } from "../contextApi/ContextApi";
import { FiZap, FiShield, FiBarChart2, FiLink } from "react-icons/fi";

const LandingPage = () => {
    const navigate = useNavigate();
    const { token } = useStoreContext();
    console.log("TOKEN FROM LANDING PAGE: " + token);

    const dashBoardNavigateHandler = () => {
        if (token) navigate("/dashboard");
        else navigate("/login");
    };

    return (
        <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-white via-gray-50 to-blue-50">
            {/* HERO SECTION */}
            <div className="lg:flex-row flex-col lg:py-16 py-12 px-6 lg:px-14 flex justify-between items-center gap-12">
                {/* Left: Text Content */}
                <motion.div
                    className="flex-1"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="font-extrabold text-gray-900 lg:text-6xl md:text-5xl text-4xl leading-tight">
                        Shortify <span className="text-blue-600">Simplifies</span> URL
                        Shortening
                    </h1>
                    <p className="text-gray-600 mt-6 text-lg leading-relaxed max-w-lg">
                        Shortify streamlines the process of URL shortening, making sharing
                        links effortless and efficient. Generate concise, easy-to-share URLs
                        in seconds with our user-friendly interface.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex items-center gap-4 mt-8">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={dashBoardNavigateHandler}
                            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
                        >
                            Manage Links
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={dashBoardNavigateHandler}
                            className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition duration-300"
                        >
                            Create Short Link
                        </motion.button>
                    </div>
                </motion.div>

                {/* Right: Hero Image */}
                <motion.div
                    className="flex-1 flex justify-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.9 }}
                >
                    <img
                        className="sm:w-[480px] w-[360px] drop-shadow-2xl rounded-xl"
                        src="/images/logo.png"
                        alt="Shortify illustration"
                    />
                </motion.div>
            </div>

            {/* TRUSTED SECTION */}
            <motion.div
                className="text-center px-6 lg:px-0"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <h2 className="text-gray-900 font-bold lg:text-4xl text-3xl mb-4">
                    Trusted by teams and individuals worldwide
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                    From startups to enterprises, Shortify empowers people to simplify
                    link sharing and enhance digital presence.
                </p>
            </motion.div>

            {/* FEATURES GRID */}
            {/* FEATURES GRID */}
            <div className="px-6 lg:px-14 py-14">
                <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-8">
                    <Card
                        Icon={FiLink}
                        title="Simple URL Shortening"
                        desc="Experience the ease of creating short, memorable URLs in just a few clicks. Our intuitive interface ensures you can start shortening URLs without hassle."
                    />
                    <Card
                        Icon={FiBarChart2}
                        title="Powerful Analytics"
                        desc="Gain insights into your link performance with our analytics dashboard. Track clicks, geography, and sources to optimize your strategy."
                    />
                    <Card
                        Icon={FiShield}
                        title="Enhanced Security"
                        desc="All shortened URLs are protected with advanced encryption, ensuring your links and data remain safe and secure."
                    />
                    <Card
                        Icon={FiZap}
                        title="Fast and Reliable"
                        desc="Enjoy lightning-fast redirects and high uptime with our reliable infrastructure. Your links will always be available and responsive."
                    />
                </div>
            </div>

        </div>
    );
};

export default LandingPage;
