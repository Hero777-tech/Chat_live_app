// src/lib/axios.js
import axios from "axios";

// 💡 Change 1: Set the full HTTPS URL for production
export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" 
    ? "http://localhost:3000/api" 
    : "https://chat-live-app.onrender.com/api", // 👈 CHANGED
  withCredentials: true,
});