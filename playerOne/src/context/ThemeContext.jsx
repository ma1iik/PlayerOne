import React, { createContext, useState, useEffect } from "react";

export const THEMES = {
  DARK: {
    id: "dark",
    name: "Dark Mode",
    primaryColor: "#6d28d9",
    secondaryColor: "#8b5cf6",
    accentColor: "#38bdf8", 
    bgPrimary: "#0f172a", 
    bgSecondary: "#1e293b", 
    bgTertiary: "#334155", 
    textPrimary: "#f8fafc", 
    textSecondary: "#cbd5e1", 
    borderColor: "#334155", 
    cardBg: "#1e293b", 
    inputBg: "#0f172a", 
    inputBorder: "#334155", 
    shadowColor: "rgba(15, 23, 42, 0.7)", 
    radius: "0.5rem", 
    borderWidth: "1px",
    shadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
  },
  LIGHT: {
    id: "light",
    name: "Light Mode",
    primaryColor: "#6d28d9",
    secondaryColor: "#8b5cf6",
    accentColor: "#0284c7",
    bgPrimary: "#f8fafc",
    bgSecondary: "#f1f5f9",
    bgTertiary: "#e2e8f0",
    textPrimary: "#0f172a",
    textSecondary: "#475569",
    borderColor: "#e2e8f0",
    cardBg: "#ffffff",
    inputBg: "#f8fafc",
    inputBorder: "#e2e8f0",
    shadowColor: "rgba(15, 23, 42, 0.05)",
    radius: "0.5rem",
    borderWidth: "1px",
    shadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
  },
  SOLOLEVELING: {
    id: "sololeveling",
    name: "Solo Leveling",
    primaryColor: "#7e22ce", // More vibrant purple
    secondaryColor: "#a855f7", // Lighter purple
    accentColor: "#f59e0b", // Neon yellow-orange
    bgPrimary: "#0a0a10", // Darker background
    bgSecondary: "#131320", // Dark with hint of purple
    bgTertiary: "#1e1e35", 
    textPrimary: "#e0f2fe", // Brighter text for contrast
    textSecondary: "#a5b4fc", // Purple tinted secondary text
    borderColor: "#4f46e5", // Neon border
    cardBg: "#15151c", // Darker card background
    inputBg: "#0c0c14", // Very dark input background
    inputBorder: "#7e22ce", // Purple border for inputs
    shadowColor: "rgba(126, 34, 206, 0.5)", // Purple shadow
    radius: "0", // Sharp edges for the edgy look
    borderWidth: "1px",
    shadow: "0 0 15px rgba(126, 34, 206, 0.3), 0 0 5px rgba(245, 158, 11, 0.2)" // Purple + orange glow
  },
  CYBERPUNK: {
    id: "cyberpunk",
    name: "Cyberpunk",
    primaryColor: "#f43f5e",
    secondaryColor: "#0ea5e9",
    accentColor: "#eab308",
    bgPrimary: "#020617",
    bgSecondary: "#0f172a",
    bgTertiary: "#1e293b",
    textPrimary: "#f8fafc",
    textSecondary: "#94a3b8",
    borderColor: "#1e293b",
    cardBg: "rgba(15, 23, 42, 0.7)",
    inputBg: "rgba(2, 6, 23, 0.8)",
    inputBorder: "#f43f5e",
    shadowColor: "rgba(244, 63, 94, 0.4)",
    radius: "0",
    borderWidth: "1px",
    shadow: "0 0 20px rgba(244, 63, 94, 0.3)"
  }
};

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(THEMES.DARK);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedThemeId = localStorage.getItem("themeId");
    if (savedThemeId) {
      const theme = Object.values(THEMES).find(t => t.id === savedThemeId);
      if (theme) {
        setCurrentTheme(theme);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    
    const root = document.documentElement;
    
    Object.entries(currentTheme).forEach(([key, value]) => {
      if (key !== 'id' && key !== 'name') {
        root.style.setProperty(`--${key}`, value);
      }
    });
    
    document.body.className = `theme-${currentTheme.id}`;
    localStorage.setItem("themeId", currentTheme.id);
  }, [currentTheme, isLoaded]);

  const setTheme = (themeId) => {
    const theme = Object.values(THEMES).find(t => t.id === themeId);
    if (theme) {
      setCurrentTheme(theme);
    }
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;