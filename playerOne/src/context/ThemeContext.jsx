import React, { createContext, useState, useEffect } from "react";

export const THEMES = {
  PIXEL_DARK: {
    id: "pixel-dark",
    name: "Pixel Dark",
    primaryColor: "#6d28d9",
    secondaryColor: "#a855f7",
    accentColor: "#38bdf8",
    bgPrimary: "#111827",
    bgSecondary: "#1f2937",
    textPrimary: "#f9fafb",
    textSecondary: "#d1d5db",
    borderColor: "#374151",
  },
  PIXEL_LIGHT: {
    id: "pixel-light",
    name: "Pixel Light",
    primaryColor: "#8b5cf6",
    secondaryColor: "#a78bfa",
    accentColor: "#38bdf8",
    bgPrimary: "#f9fafb",
    bgSecondary: "#f3f4f6",
    textPrimary: "#111827",
    textSecondary: "#4b5563",
    borderColor: "#e5e7eb",
  },
  CYBER: {
    id: "cyber",
    name: "Cyberpunk",
    primaryColor: "#06b6d4",
    secondaryColor: "#0891b2",
    accentColor: "#fb7185",
    bgPrimary: "#020617",
    bgSecondary: "#0f172a",
    textPrimary: "#f8fafc",
    textSecondary: "#94a3b8",
    borderColor: "#1e293b",
  },
  FOREST: {
    id: "forest",
    name: "Forest Quest",
    primaryColor: "#16a34a",
    secondaryColor: "#22c55e",
    accentColor: "#eab308",
    bgPrimary: "#064e3b",
    bgSecondary: "#065f46",
    textPrimary: "#f0fdf4",
    textSecondary: "#d1fae5",
    borderColor: "#047857",
  }
};

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(THEMES.PIXEL_DARK);
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
    
    root.style.setProperty('--color-primary', currentTheme.primaryColor);
    root.style.setProperty('--color-secondary', currentTheme.secondaryColor);
    root.style.setProperty('--color-accent', currentTheme.accentColor);
    root.style.setProperty('--bg-primary', currentTheme.bgPrimary);
    root.style.setProperty('--bg-secondary', currentTheme.bgSecondary);
    root.style.setProperty('--text-primary', currentTheme.textPrimary);
    root.style.setProperty('--text-secondary', currentTheme.textSecondary);
    root.style.setProperty('--border-color', currentTheme.borderColor);
    
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