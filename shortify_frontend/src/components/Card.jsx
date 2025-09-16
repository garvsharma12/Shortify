import React from "react";

const Card = ({ title, desc, Icon }) => {
    return (
        <div
            className="
        p-6 bg-white rounded-2xl shadow-md
        transition-transform duration-300 ease-out
        hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.03]
        border border-gray-100 hover:border-indigo-500/50
      "
        >
            <div className="flex justify-center mb-4 text-indigo-600">
                <Icon className="text-5xl transition-colors duration-300 group-hover:text-indigo-700" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-600">{desc}</p>
        </div>
    );
};

export default Card;
