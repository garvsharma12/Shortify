import React from "react";
import { motion } from "framer-motion";
import { FaLink, FaShareAlt, FaEdit, FaChartLine } from "react-icons/fa";

const features = [
    {
        icon: <FaLink className="text-blue-500 text-4xl" />,
        title: "Simple URL Shortening",
        description:
            "Experience the ease of creating short, memorable URLs in just a few clicks. Our intuitive interface and quick setup process ensure you can start shortening URLs without any hassle.",
    },
    {
        icon: <FaShareAlt className="text-green-500 text-4xl" />,
        title: "Powerful Analytics",
        description:
            "Gain insights into your link performance with our comprehensive analytics dashboard. Track clicks, geographical data, and referral sources to optimize your marketing strategies.",
    },
    {
        icon: <FaEdit className="text-purple-500 text-4xl" />,
        title: "Enhanced Security",
        description:
            "Rest assured with our robust security measures. All shortened URLs are protected with advanced encryption, ensuring your data remains safe and secure.",
    },
    {
        icon: <FaChartLine className="text-red-500 text-4xl" />,
        title: "Fast and Reliable",
        description:
            "Enjoy lightning-fast redirects and high uptime with our reliable infrastructure. Your shortened URLs will always be available and responsive, ensuring a seamless experience for your users.",
    },
];

const AboutPage = () => {
    return (
        <div className="bg-white min-h-[calc(100vh-64px)] flex flex-col items-center py-16 px-6">
            {/* Heading */}
            <motion.h1
                className="text-5xl font-extrabold text-gray-900 mb-6 text-center"
                initial={{ y: -40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7 }}
            >
                About <span className="text-blue-600 italic">Shortify</span>
            </motion.h1>

            {/* Description */}
            <motion.p
                className="text-gray-600 text-lg max-w-3xl text-center leading-relaxed mb-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
            >
                Shortify simplifies URL shortening for efficient sharing. Easily
                generate, manage, and track your shortened links. Whether you’re a
                marketer, developer, or casual user — Shortify makes managing links fast,
                secure, and reliable.
            </motion.p>

            {/* Features Section */}
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl w-full">
                {features.map((feature, index) => (
                    <motion.div
                        key={index}
                        className="p-6 bg-gray-50 rounded-2xl shadow-md hover:shadow-xl transition duration-300 flex items-start gap-4"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 * index, duration: 0.6 }}
                    >
                        <div>{feature.icon}</div>
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">
                                {feature.title}
                            </h2>
                            <p className="text-gray-600">{feature.description}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default AboutPage;
