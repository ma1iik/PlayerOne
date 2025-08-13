import React, { useState } from "react";
import { EyeIcon, EyeOffIcon, LockClosedIcon, UserIcon } from "@heroicons/react/outline";
import { motion } from "framer-motion";
import { useThemeStyles } from "../context/ThemeProvider";

const Login = () => {
  const { theme, styles } = useThemeStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login attempt:", formData);
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
                <UserIcon className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className={getTextClasses('text-2xl font-bold mb-2', true)} style={{ color: theme.textPrimary }}>
              {getThemedText('Welcome Back')}
            </h1>
            <p style={{ color: theme.textSecondary }}>
              {getThemedText('Sign in to your account')}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
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

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded"
                  style={{ accentColor: theme.primaryColor }}
                />
                <span className="ml-2 text-sm" style={{ color: theme.textSecondary }}>
                  {getThemedText('Remember me')}
                </span>
              </label>
              <a 
                href="#" 
                className="text-sm hover:underline"
                style={{ color: theme.primaryColor }}
              >
                {getThemedText('Forgot password?')}
              </a>
            </div>

            <button
              type="submit"
              className={`w-full py-3 rounded-lg font-medium transition-colors ${getTextClasses('', theme.features.hasGlowEffects)}`}
              style={{
                ...styles.button.base,
                ...styles.button.primary[theme.variants?.button || 'default']
              }}
            >
              {getThemedText('Sign In')}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p style={{ color: theme.textSecondary }}>
              {getThemedText("Don't have an account?")}{' '}
              <a 
                href="/register" 
                className="font-medium hover:underline"
                style={{ color: theme.primaryColor }}
              >
                {getThemedText('Sign up')}
              </a>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;