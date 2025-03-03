import React, { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Check authentication status on initial load
  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      try {
        if (authService.isAuthenticated()) {
          // Fetch user profile if we have a token
          const response = await authService.authFetch("http://localhost:3000/api/profile");
          if (response.ok) {
            const data = await response.json();
            setUser(data.profile);
          } else {
            // If profile fetch fails, clear auth state
            authService.clearToken();
            setUser(null);
          }
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("Auth check error:", err);
        setError(err.message);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Login handler
  const login = async (email, password, rememberMe = false) => {
    setLoading(true);
    setError(null);
    try {
      const userData = await authService.login(email, password, rememberMe);
      setUser(userData);
      return userData;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Register handler
  const register = async (username, email, password, rememberMe = false) => {
    setLoading(true);
    setError(null);
    try {
      const userData = await authService.register(username, email, password, rememberMe);
      setUser(userData);
      return userData;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout handler
  const logout = async () => {
    setLoading(true);
    try {
      await authService.logout();
      setUser(null);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Provide authentication values and functions
  const value = {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};