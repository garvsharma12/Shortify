import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const ShortenUrlPage = () => {
    const { url } = useParams();

    useEffect(() => {
        if (url) {
            const raw = import.meta.env.VITE_BACKEND_URL || "https://shortify-vuv0.onrender.com";
            const base = raw.replace(/\/+$/, "");
            window.location.href = `${base}/${url}`;
        }
    }, [url]);
  return <p>Redirecting...</p>;
}

export default ShortenUrlPage