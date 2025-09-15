import React, { useState } from "react";
import { EyeIcon, EyeOffIcon, UserAddIcon } from "@heroicons/react/outline";
import { motion } from "framer-motion";
import { useThemeStyles } from "../context/ThemeProvider";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { theme, styles } = useThemeStyles();
  const { register, error, loading } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    
    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }
    
    try {
      await register(formData.username, formData.email, formData.password, false);
      navigate('/home');
    } catch (err) {
      // Error is handled by AuthContext
      console.error('Registration failed:', err);
    }
  };

  // Helper functions
  const getTextClasses = (baseClasses = '', isHighlighted = false) => {
    let classes = baseClasses;
    if (theme.features.hasGlowEffects && isHighlighted) {
      classes += ' sl-glow-text';
    }
    return classes.trim();
  };

  const getThemedText = (text) => styles.shouldTransform(text);

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={{ 
        backgroundColor: theme.bgPrimary,
        fontFamily: theme.font
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div 
          className="p-8 rounded-lg shadow-lg"
          style={styles.getCardStyle()}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ backgroundColor: theme.primaryColor }}
              >
                <UserAddIcon className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className={getTextClasses('text-2xl font-bold mb-2', true)} style={{ color: theme.textPrimary }}>
              {getThemedText('Create Account')}
            </h1>
            <p style={{ color: theme.textSecondary }}>
              {getThemedText('Join us and start your journey')}
            </p>
          </div>

          {/* Error Display */}
          {error && (
            <div 
              className="mb-4 p-3 rounded-lg border"
              style={{
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                borderColor: '#ef4444',
                color: '#ef4444'
              }}
            >
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label 
                className={getTextClasses('block text-sm font-medium mb-2', theme.features.hasGlowEffects)}
                style={{ color: theme.textPrimary }}
              >
                {getThemedText('Username')}
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: theme.bgSecondary,
                  borderColor: theme.borderColor,
                  color: theme.textPrimary,
                  borderRadius: theme.features.hasSharpCorners ? '0' : theme.radius,
                }}
                placeholder={getThemedText('Enter your username')}
                required
              />
            </div>

            <div>
              <label 
                className={getTextClasses('block text-sm font-medium mb-2', theme.features.hasGlowEffects)}
                style={{ color: theme.textPrimary }}
              >
                {getThemedText('Email')}
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: theme.bgSecondary,
                  borderColor: theme.borderColor,
                  color: theme.textPrimary,
                  borderRadius: theme.features.hasSharpCorners ? '0' : theme.radius,
                }}
                placeholder={getThemedText('Enter your email')}
                required
              />
            </div>

            <div>
              <label 
                className={getTextClasses('block text-sm font-medium mb-2', theme.features.hasGlowEffects)}
                style={{ color: theme.textPrimary }}
              >
                {getThemedText('Password')}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 pr-12 rounded-lg border focus:outline-none focus:ring-2"
                  style={{
                    backgroundColor: theme.bgSecondary,
                    borderColor: theme.borderColor,
                    color: theme.textPrimary,
                    borderRadius: theme.features.hasSharpCorners ? '0' : theme.radius,
                  }}
                  placeholder={getThemedText('Enter your password')}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-5 w-5" style={{ color: theme.textSecondary }} />
                  ) : (
                    <EyeIcon className="h-5 w-5" style={{ color: theme.textSecondary }} />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label 
                className={getTextClasses('block text-sm font-medium mb-2', theme.features.hasGlowEffects)}
                style={{ color: theme.textPrimary }}
              >
                {getThemedText('Confirm Password')}
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 pr-12 rounded-lg border focus:outline-none focus:ring-2"
                  style={{
                    backgroundColor: theme.bgSecondary,
                    borderColor: theme.borderColor,
                    color: theme.textPrimary,
                    borderRadius: theme.features.hasSharpCorners ? '0' : theme.radius,
                  }}
                  placeholder={getThemedText('Confirm your password')}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOffIcon className="h-5 w-5" style={{ color: theme.textSecondary }} />
                  ) : (
                    <EyeIcon className="h-5 w-5" style={{ color: theme.textSecondary }} />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                className="rounded"
                style={{ accentColor: theme.primaryColor }}
                required
              />
              <span className="ml-2 text-sm" style={{ color: theme.textSecondary }}>
                {getThemedText('I agree to the')}{' '}
                <a 
                  href="#" 
                  className="hover:underline"
                  style={{ color: theme.primaryColor }}
                >
                  {getThemedText('Terms of Service')}
                </a>
                {' '}and{' '}
                <a 
                  href="#" 
                  className="hover:underline"
                  style={{ color: theme.primaryColor }}
                >
                  {getThemedText('Privacy Policy')}
                </a>
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg font-medium transition-colors ${getTextClasses('', theme.features.hasGlowEffects)} ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              style={{
                ...styles.button.base,
                ...styles.button.primary[theme.variants?.button || 'default']
              }}
            >
              {loading ? getThemedText('Creating Account...') : getThemedText('Create Account')}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p style={{ color: theme.textSecondary }}>
              {getThemedText('Already have an account?')}{' '}
              <a 
                href="/login" 
                className="font-medium hover:underline"
                style={{ color: theme.primaryColor }}
              >
                {getThemedText('Sign in')}
              </a>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;