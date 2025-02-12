import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

console.log("🟢 Login Component Rendered!");


const Login = ({ setAuth }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    console.log("🟢 Login Attempt:", email, password);
  
    try {
      const response = await fetch("http://localhost:3000/api/auth/local", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });
  
      const data = await response.json();
      console.log("🔵 Login Response:", response.status, data);
  
      if (response.ok) {
        localStorage.setItem("accessToken", data.accessToken);
        setAuth(true);
        navigate("/home");
      } else {
        console.error("🔴 Login Failed:", data.error);
      }
    } catch (error) {
      console.error("❌ Network Error:", error);
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-900 to-gray-800">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-xl p-8 w-full max-w-md space-y-6">
        <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
          Welcome Back
        </h1>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <div className="space-y-4">
          <input
            className="w-full px-4 py-3 bg-gray-800/50 rounded-lg border border-gray-700 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/30 outline-none transition-all text-gray-100 placeholder-gray-400"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full px-4 py-3 bg-gray-800/50 rounded-lg border border-gray-700 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/30 outline-none transition-all text-gray-100 placeholder-gray-400"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button onClick={handleLogin} className="w-full py-3 px-6 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-semibold rounded-lg hover:scale-[1.02] transition-transform duration-200 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30">
          Sign In
        </button>

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
