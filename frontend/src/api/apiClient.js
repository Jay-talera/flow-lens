// frontend/src/api/apiClient.js
import axios from "axios";

const apiClient = axios.create({
  // Use env variable instead of hardcoded URL
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;