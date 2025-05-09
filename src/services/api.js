import axios from "axios";

// Set a base URL for your API
const API_BASE_URL = import.meta.env.VITE_API_URL; // Replace with your actual API base URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    console.log(token);
    // Do not add token for login or register endpoints
    if (
      token &&
      config.url !== "/auth/login" &&
      config.url !== "/auth/register"
    ) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response Interceptor (optional, but good for global error handling)
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized errors, e.g., redirect to login
      localStorage.removeItem("accessToken"); // Clear invalid token
      localStorage.removeItem("refreshToken"); // Clear invalid token
      delete api.defaults.headers.common["Authorization"];
      // navigate('/login')
      console.error("Unauthorized request - 401", error.response);
      // Potentially trigger logout action from AuthContext here
    }
    return Promise.reject(error);
  },
);

export default api;
