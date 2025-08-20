import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-custom-gradient text-white py-4 z-40 relative">
            <div className="container mx-auto px-6 lg:px-14 flex flex-col lg:flex-row lg:justify-between items-center gap-2">
                <div className="text-center lg:text-left">
                    <h2 className="text-2xl font-bold">Shortify</h2>
                    <p className="text-sm">Simplifying URL shortening for efficient sharing</p>
                </div>

                <p className="mt-2 lg:mt-0 text-sm">
                    &copy; 2025 Shortify. All rights reserved.
                </p>

                <div className="flex space-x-4 mt-2 lg:mt-0">
                    <a href="#" className="hover:text-gray-200">
                        <FaFacebook size={20} />
                    </a>
                    <a href="#" className="hover:text-gray-200">
                        <FaTwitter size={20} />
                    </a>
                    <a href="#" className="hover:text-gray-200">
                        <FaInstagram size={20} />
                    </a>
                    <a href="#" className="hover:text-gray-200">
                        <FaLinkedin size={20} />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
