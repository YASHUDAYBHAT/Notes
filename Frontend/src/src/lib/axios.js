import axios from "axios";

// Use environment variable for flexibility in dev/prod
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // if using cookies/auth, optional otherwise
});

export default api;
