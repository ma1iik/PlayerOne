import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import ThemeContext from "../context/ThemeContext";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { register } = useAuth();
  const { currentTheme } = useContext(ThemeContext);



  const handleRegister = async (e) => {
    e.preventDefault();
    
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
      await register(username, email, password, rememberMe);
      navigate("/home");
    } catch (error) {
      setErrorMessage(error.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-primary">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-xl p-8 w-full max-w-md space-y-6"
        style={{ borderRadius: currentTheme.radius }}
      >
        <h1 className="text-4xl font-bold text-center text-gradient">
          Join Now
        </h1>

        {errorMessage && (
          <div className="bg-opacity-10 bg-red-500 p-3 rounded" style={{ borderRadius: currentTheme.radius }}>
            <p className="text-red-500 text-sm text-center">
              {errorMessage}
            </p>
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <input
              className="input w-full"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>
          
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
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="text-center text-textSecondary text-sm">
          Already registered?{" "}
          <a
            href="/"
            className="text-accent hover:underline transition-colors"
          >
            Sign in here
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;