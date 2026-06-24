// frontend/src/api/apiClient.js
import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://flow-lens.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,              // ← add this
});

// Request interceptor
apiClient.interceptors.request.use(
    config => {
      console.debug(`[API] ${config.method?.toUpperCase()} ${config.url}`);
      return config;
    },
    error => Promise.reject(error)
);

// Response interceptor
apiClient.interceptors.response.use(
    response => response,
    error => {
      console.error('[API Error]', error.response?.data || error.message);
      return Promise.reject(error);
    }
);

export default apiClient;