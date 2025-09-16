import axios from "axios";

const rawBase = import.meta.env.VITE_BACKEND_URL || "";
// Trim trailing slashes to avoid double slash when callers use leading '/path'
const baseURL = rawBase.replace(/\/+$/, "");

export default axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
    },
});