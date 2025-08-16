import React from "react";
import { motion } from "framer-motion";

const Card = ({ title, desc }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            className="shadow-lg shadow-slate-300 border border-gray-200 flex flex-col px-6 py-8 gap-4 rounded-2xl bg-white hover:shadow-xl transition-shadow duration-300"
        >
            <h1 className="text-slate-900 text-2xl font-semibold tracking-wide">
                {title}
            </h1>
            <p className="text-slate-600 text-base leading-relaxed">
                {desc}
            </p>
        </motion.div>
    );
};

export default Card;
