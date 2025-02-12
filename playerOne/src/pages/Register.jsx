import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

console.log("🟢 Register Component Rendered!");


const Register = ({ setAuth }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    console.log("🟢 Register Attempt:", username, email, password);
  
    try {
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
        credentials: "include",
      });
  
      const data = await response.json();
      console.log("🔵 Register Response:", response.status, data);
  
      if (response.ok) {
        localStorage.setItem("accessToken", data.accessToken);
        setAuth(true);
        navigate("/home");
      } else {
        console.error("🔴 Register Failed:", data.error);
      }
    } catch (error) {
      console.error("❌ Network Error:", error);
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

        <div className="space-y-4">
          <input
            className="w-full px-4 py-3 bg-gray-800/50 rounded-lg border border-gray-700 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/30 outline-none transition-all text-gray-100 placeholder-gray-400"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="w-full px-4 py-3 bg-gray-800/50 rounded-lg border border-gray-700 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/30 outline-none transition-all text-gray-100 placeholder-gray-400"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full px-4 py-3 bg-gray-800/50 rounded-lg border border-gray-700 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/30 outline-none transition-all text-gray-100 placeholder-gray-400"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          onClick={handleRegister}
          className="w-full py-3 px-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:scale-[1.02] transition-transform duration-200 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30"
        >
          Create Account
        </button>

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