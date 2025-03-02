// playerOne/src/pages/Register.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

console.log("🟢 Register Component Rendered!");

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log("🟢 Register Attempt:", username, email);
    
    if (!username || !email || !password) {
      setErrorMessage("Please fill in all fields");
      return;
    }
    
    // Basic validation
    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters");
      return;
    }
    
    setIsLoading(true);
    setErrorMessage("");
    
    try {
      await register(username, email, password);
      navigate("/home");
    } catch (error) {
      console.error("❌ Registration error:", error);
      setErrorMessage(error.message || "Registration failed. Please try again.");
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
        <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Join Now
        </h1>

        {errorMessage && (
          <p className="text-red-500 text-sm text-center bg-red-500/10 p-2 rounded">
            {errorMessage}
          </p>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            className="w-full px-4 py-3 bg-gray-800/50 rounded-lg border border-gray-700 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/30 outline-none transition-all text-gray-100 placeholder-gray-400"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={isLoading}
            required
          />
          <input
            className="w-full px-4 py-3 bg-gray-800/50 rounded-lg border border-gray-700 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/30 outline-none transition-all text-gray-100 placeholder-gray-400"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            required
          />
          <input
            className="w-full px-4 py-3 bg-gray-800/50 rounded-lg border border-gray-700 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/30 outline-none transition-all text-gray-100 placeholder-gray-400"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            required
          />

          <button
            type="submit"
            className="w-full py-3 px-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:scale-[1.02] transition-transform duration-200 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 disabled:opacity-70 disabled:hover:scale-100"
            disabled={isLoading}
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="text-center text-gray-400">
          Already registered?{" "}
          <a
            href="/"
            className="text-pink-400 hover:text-pink-300 transition-colors"
          >
            Sign in here
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;