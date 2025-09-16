import axios from "axios";

const envBase = import.meta.env.VITE_BACKEND_URL;
const fallbackBase = "https://shortify-production-4b6f.up.railway.app";
const rawBase = (envBase && envBase.trim()) ? envBase : fallbackBase;
// Trim trailing slashes to avoid double slash when callers use leading '/path'
const baseURL = rawBase.replace(/\/+$/, "");

export default axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
    },
});