// frontend/src/config/api.js
import axios from "axios";

/**
 * Dynamic API Base URL resolver:
 * - Production on Vercel: Relative path "" or env VITE_API_URL
 * - Local Development: http://localhost:5000 (or VITE_API_URL)
 */
export const API_BASE =
  import.meta.env.VITE_API_URL !== undefined && import.meta.env.VITE_API_URL !== ""
    ? import.meta.env.VITE_API_URL.replace(/\/api\/?$/, "")
    : import.meta.env.PROD
    ? ""
    : "http://localhost:5000";

export const getApiUrl = (endpoint) => {
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  return `${API_BASE}${cleanEndpoint}`;
};

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json"
  }
});

export default api;
