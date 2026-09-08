import axios from "axios";

const rawApiUrl = import.meta.env.VITE_API_URL || "http://localhost:8800/api";
// Ensure baseURL always has /api prefix and no trailing slash
const sanitizedUrl = rawApiUrl.replace(/\/+$/, "");
const baseURL = sanitizedUrl.endsWith("/api") ? sanitizedUrl : `${sanitizedUrl}/api`;

const apiRequest = axios.create({
  baseURL,
  withCredentials: true,
});

export default apiRequest;
