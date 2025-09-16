import React, { useState } from "react";
import { useForm } from "react-hook-form";
import TextField from "./TextField";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import toast from "react-hot-toast";
import logo from "/images/logo.png"; // adjust path

const RegisterPage = () => {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            username: "",
            email: "",
            password: "",
        },
        mode: "onTouched",
    });

    const registerHandler = async (data) => {
        setLoader(true);
        try {
            const { data: response } = await api.post(
                "/api/auth/public/register",
                data
            );
            reset();
            navigate("/login");
            toast.success("Registration Successful!");
        } catch (error) {
            console.log(error);
            const res = error?.response;
            if (!res) {
                // Likely a network/CORS error
                toast.error("Registration failed: network/CORS error. Check backend URL and CORS settings.");
                return;
            }
            const msg = res.data;
            if (typeof msg === "string") {
                toast.error(msg);
            } else if (msg && typeof msg === "object") {
                const first = Object.values(msg)[0];
                toast.error(String(first || "Registration Failed!"));
            } else {
                toast.error("Registration Failed!");
            }
        } finally {
            setLoader(false);
        }
    };


    return (
        <div className="min-h-[calc(100vh-64px)] flex justify-center items-center bg-white px-4">
            <form
                onSubmit={handleSubmit(registerHandler)}
                className="w-full sm:w-[420px] bg-white shadow-lg rounded-2xl p-8 border border-gray-100"
            >
                {/* Logo */}
                <div className="flex justify-center mb-6">
                    <img src={logo} alt="Logo" className="h-14" />
                </div>

                {/* Title */}
                <h1 className="text-center text-2xl font-bold text-gray-800 mb-2">
                    Create an Account
                </h1>
                <p className="text-center text-gray-500 text-sm mb-6">
                    Join us today! It only takes a minute.
                </p>

                {/* Fields */}
                <div className="flex flex-col gap-4">
                    <TextField
                        label="Username"
                        required
                        id="username"
                        type="text"
                        message="*Username is required"
                        placeholder="Enter your username"
                        register={register}
                        errors={errors}
                    />

                    <TextField
                        label="Email"
                        required
                        id="email"
                        type="email"
                        message="*Email is required"
                        placeholder="Enter your email"
                        register={register}
                        errors={errors}
                    />

                    <TextField
                        label="Password"
                        required
                        id="password"
                        type="password"
                        message="*Password is required"
                        placeholder="Enter your password"
                        register={register}
                        min={6}
                        errors={errors}
                    />
                </div>

                {/* Button */}
                <button
                    disabled={loader}
                    type="submit"
                    className="mt-6 w-full py-3 rounded-lg font-semibold text-white transition-all duration-200 bg-gradient-to-r from-[#ff416c] to-[#ff4b2b] hover:opacity-90"
                >
                    {loader ? "Loading..." : "Register"}
                </button>

                {/* Footer */}
                <p className="text-center text-sm text-gray-600 mt-6">
                    Already have an account?{" "}
                    <Link
                        className="font-semibold text-[#ff416c] hover:underline"
                        to="/login"
                    >
                        Login
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default RegisterPage;
