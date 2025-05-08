import React, { createContext, useState, useEffect } from "react";
import api from "../services/api"; // We'll create this next

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // To handle initial auth check

  useEffect(() => {
    // // Check if user is already logged in (e.g., from localStorage)
    // const token = localStorage.getItem("accessToken");
    // if (token) {
    //   // You might want to verify the token with the backend here
    //   // For simplicity, we'll assume the token is valid if it exists
    //   // and decode it to get user info or fetch user profile
    //   // For this example, we'll just set a dummy user if token exists
    //   // In a real app, decode the token or make an API call to get user data
    //   try {
    //     // const decodedUser = jwt_decode(token); // if using JWTs
    //     // setUser(decodedUser);
    //     // For now, if a token exists, let's assume a user object.
    //     // You'd typically fetch user details using the token.

    //     const user = getAuthUser(); // Fetch user data from API

    //     setUser(user); // Replace with actual user data
    //     api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    //   } catch (error) {
    //     console.error("Failed to initialize auth state from token:", error);
    //     localStorage.removeItem("accessToken");
    //     localStorage.removeItem("refreshToken");
    //     setUser(null);
    //   }
    // }
    // setLoading(false);

    // Check if user is already logged in from localStorage
    const checkAuth = async () => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        try {
          // Set authorization header before making the API request
          api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

          // Correctly await the async getAuthUser function
          const user = await getAuthUser();

          setUser(user);
        } catch (error) {
          console.error("Failed to initialize auth state from token:", error);
          // Cleanup tokens with consistent names
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          delete api.defaults.headers.common["Authorization"];
          setUser(null);
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (credentials) => {
    try {
      // const response = await api.post('/auth/login', credentials); // Your actual login endpoint
      // const { token, userData } = response.data;

      const response = await api.post("/auth/login", credentials);

      const data = response.data?.data;

      if (data?.access_token) {
        const accessToken = data?.access_token;
        const refreshToken = data?.refresh_token;
        const userData = data?.user;

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        setUser(userData);
        return { success: true };
      } else {
        return { success: false, message: "Invalid credentials" };
      }
    } catch (error) {
      console.error("Login failed:", error);
      // logout(); // Ensure clean state on error
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    }
  };

  // Locate the register function and update it - around line 97
  const register = async (userData) => {
    try {
      const response = await api.post("/auth/register", userData);

      // Check if the request was successful
      if (response.data.success) {
        // For email verification flow, we don't set tokens or login the user yet
        // Just return success with the user data
        return {
          success: true,
          userData: response.data.data.user,
        };
      } else {
        return {
          success: false,
          message: response.data.message || "Registration failed",
        };
      }
    } catch (error) {
      console.error("Registration failed:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Registration failed",
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    delete api.defaults.headers.common["Authorization"];
    setUser(null);
  };

  if (loading) {
    return <div>Loading authentication...</div>; // Or a spinner component
  }

  return (
    <AuthContext.Provider
      value={{ user, login, logout, register, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const getAuthUser = async () => {
  const response = await api.get("/auth/me");
  const user = response.data?.data;

  console.log(user);

  if (user) {
    return user;
  } else {
    throw new Error("User not found");
  }
};

export default AuthContext;
