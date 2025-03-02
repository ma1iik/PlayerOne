// playerOne/src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

console.log("🟢 Login Component Rendered!");

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("🟢 Login Attempt:", email);
    
    if (!email || !password) {
      setErrorMessage("Please enter both email and password");
      return;
    }
    
    setIsLoading(true);
    setErrorMessage("");
    
    try {
      await login(email, password);
      navigate("/home");
    } catch (error) {
      console.error("❌ Login error:", error);
      setErrorMessage(error.message || "Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-900 to-gray-800">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="glass rounded-xl p-8 w-full max-w-md space-y-6"
      >
        <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
          Welcome Back
        </h1>

        {errorMessage && (
          <p className="text-red-500 text-sm text-center bg-red-500/10 p-2 rounded">
            {errorMessage}
          </p>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            className="w-full px-4 py-3 bg-gray-800/50 rounded-lg border border-gray-700 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/30 outline-none transition-all text-gray-100 placeholder-gray-400"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            required
          />
          <input
            className="w-full px-4 py-3 bg-gray-800/50 rounded-lg border border-gray-700 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/30 outline-none transition-all text-gray-100 placeholder-gray-400"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            required
          />
          
          <button 
            type="submit"
            className="w-full py-3 px-6 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-semibold rounded-lg hover:scale-[1.02] transition-transform duration-200 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 disabled:opacity-70 disabled:hover:scale-100"
            disabled={isLoading}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p className="text-center text-gray-400">
          New here?{" "}
          <a href="/register" className="text-cyan-400 hover:text-cyan-300 transition-colors">
            Create account
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;