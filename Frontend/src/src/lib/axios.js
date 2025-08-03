import axios from "axios";

const api = axios.create({
  baseURL: "https://notes-backend-a6de.onrender.com/api",
  withCredentials: false, // keep false unless using cookies/sessions
});

export default api;

