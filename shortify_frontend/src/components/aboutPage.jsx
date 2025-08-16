import React from "react";
import { FaLink, FaShareAlt, FaEdit, FaChartLine } from "react-icons/fa";

const AboutPage = () => {
    const features = [
        {
            icon: <FaLink className="text-blue-500 text-2xl" />,
            title: "Simple URL Shortening",
            desc: "Create short, memorable URLs in just a few clicks. Our intuitive interface makes sharing links effortless."
        },
        {
            icon: <FaShareAlt className="text-green-500 text-2xl" />,
            title: "Powerful Analytics",
            desc: "Gain insights into your links with detailed analytics. Track clicks, geography, and referrals to optimize strategies."
        },
        {
            icon: <FaEdit className="text-purple-500 text-2xl" />,
            title: "Enhanced Security",
            desc: "All URLs are protected with strong encryption, ensuring your data remains safe and private."
        },
        {
            icon: <FaChartLine className="text-red-500 text-2xl" />,
            title: "Fast & Reliable",
            desc: "Enjoy instant redirects and high uptime with our robust infrastructure. Your links are always online."
        },
    ];

    return (
        <div className="lg:px-20 sm:px-10 px-6 min-h-[calc(100vh-64px)] py-10 bg-gray-50">
            {/* Header Section */}
            <div className="text-center mb-12">
                <h1 className="sm:text-4xl text-3xl font-extrabold text-slate-800 mb-4">
                    About <span className="text-blue-600">Shortify</span>
                </h1>
                <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
                    Shortify makes link management effortless. Create, customize, and track
                    your URLs with ease while enjoying advanced analytics, security, and
                    reliability—all in one place.
                </p>
            </div>

            {/* Features Section */}
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {features.map((item, idx) => (
                    <div
                        key={idx}
                        className="bg-white rounded-2xl shadow-md p-6 flex items-start gap-4 hover:shadow-lg transition-shadow duration-300"
                    >
                        <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-gray-100">
                            {item.icon}
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-slate-800 mb-2">
                                {item.title}
                            </h2>
                            <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AboutPage;
