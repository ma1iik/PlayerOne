import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";
import authService from "../services/authService";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();
  const { currentTheme } = useContext(ThemeContext);



  // Check for saved email on mount
  useEffect(() => {
    const savedEmail = authService.getSavedEmail();
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setErrorMessage("Please enter both email and password");
      return;
    }
    
    setIsLoading(true);
    setErrorMessage("");
    
    try {
      await login(email, password, rememberMe);
      navigate("/home");
    } catch (error) {
      setErrorMessage(error.message || "Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 bg-primary`}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="glass rounded-xl p-8 w-full max-w-md space-y-6"
        style={{ borderRadius: currentTheme.radius }}
      >
        <h1 className="text-4xl font-bold text-center text-gradient">
          Welcome Back
        </h1>

        {errorMessage && (
          <div className="bg-opacity-10 bg-red-500 p-3 rounded" style={{ borderRadius: currentTheme.radius }}>
            <p className="text-red-500 text-sm text-center">
              {errorMessage}
            </p>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <input
              className="input w-full"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>
          
          <div>
            <input
              className="input w-full"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>
          
          <div className="flex items-center">
            <input
              id="remember-me"
              type="checkbox"
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-textSecondary">
              Remember me
            </label>
          </div>
          
          <button 
            type="submit"
            className="btn w-full py-3"
            disabled={isLoading}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p className="text-center text-textSecondary text-sm">
          New here?{" "}
          <a href="/register" className="text-accent hover:underline transition-colors">
            Create account
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;