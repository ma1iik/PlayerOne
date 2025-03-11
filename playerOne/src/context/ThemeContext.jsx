import React, { createContext, useState, useEffect } from "react";

export const THEMES = {
  LIGHT: {
    id: "light",
    name: "Light Mode",
    primaryColor: "#6d28d9", // purple-600
    secondaryColor: "#8b5cf6", // purple-500
    accentColor: "#38bdf8", // blue-400
    bgPrimary: "#f9fafb", // gray-50 (main background)
    bgSecondary: "#ffffff", // white (card/panel backgrounds)
    bgTertiary: "#f3f4f6", // gray-100 (hover states, secondary elements)
    textPrimary: "#1f2937", // gray-800
    textSecondary: "#6b7280", // gray-500
    borderColor: "#e5e7eb", // gray-200
    cardBg: "#ffffff", // white
    inputBg: "#f9fafb", // gray-50
    inputBorder: "#e5e7eb", // gray-200
    shadowColor: "rgba(0, 0, 0, 0.05)",
    radius: "0.375rem", // Slightly more rounded corners
    borderWidth: "1px",
    shadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
    font: "'Inter', sans-serif"
  },
  DARK: {
    id: "dark",
    name: "Dark Mode",
    primaryColor: "#8b5cf6", // purple-500
    secondaryColor: "#a78bfa", // purple-400
    accentColor: "#38bdf8", // blue-400
    bgPrimary: "#1f2937", // gray-800 (main background)
    bgSecondary: "#111827", // gray-900 (card/panel backgrounds)
    bgTertiary: "#374151", // gray-700 (hover states, secondary elements)
    textPrimary: "#f9fafb", // gray-50
    textSecondary: "#d1d5db", // gray-300
    borderColor: "#374151", // gray-700
    cardBg: "#111827", // gray-900
    inputBg: "#1f2937", // gray-800
    inputBorder: "#374151", // gray-700
    shadowColor: "rgba(0, 0, 0, 0.3)",
    radius: "0.375rem", // Slightly more rounded corners
    borderWidth: "1px",
    shadow: "0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 2px 0 rgba(0, 0, 0, 0.1)",
    font: "'Inter', sans-serif"
  },
  DARK_DEEP: {
    id: "dark-deep",
    name: "Deep Dark",
    primaryColor: "#7c3aed", // violet-600
    secondaryColor: "#6d28d9", // violet-700
    accentColor: "#60a5fa", // blue-400
    bgPrimary: "#0f172a", // slate-900 (main background)
    bgSecondary: "#1e293b", // slate-800 (card/panel backgrounds)
    bgTertiary: "#334155", // slate-700 (hover states, secondary elements)
    textPrimary: "#f8fafc", // slate-50
    textSecondary: "#cbd5e1", // slate-300
    borderColor: "#334155", // slate-700
    cardBg: "#1e293b", // slate-800
    inputBg: "#0f172a", // slate-900
    inputBorder: "#334155", // slate-700
    shadowColor: "rgba(15, 23, 42, 0.7)", // slate-900 with alpha
    radius: "0.375rem", // Slightly more rounded corners
    borderWidth: "1px",
    shadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    font: "'Inter', sans-serif"
  },
  NEON_VIOLET: {
    id: "neon-violet",
    name: "Neon Violet",
    primaryColor: "#7e22ce", 
    secondaryColor: "#a855f7",
    accentColor: "#c084fc",
    bgPrimary: "#0a0a10", 
    bgSecondary: "#131320", 
    bgTertiary: "#1e1e35", 
    textPrimary: "#e0f2fe", 
    textSecondary: "#a5b4fc", 
    borderColor: "#4f46e5", 
    cardBg: "#15151c", 
    inputBg: "#0c0c14", 
    inputBorder: "#7e22ce", 
    shadowColor: "rgba(126, 34, 206, 0.5)", 
    radius: "0", 
    borderWidth: "1px",
    shadow: "0 0 15px rgba(126, 34, 206, 0.3), 0 0 5px rgba(126, 34, 206, 0.2)",
    font: "'Orbitron', 'Rajdhani', sans-serif"
  },
  NEON_ORANGE: {
    id: "neon-orange",
    name: "Neon Orange",
    primaryColor: "#f59e0b", 
    secondaryColor: "#fbbf24", 
    accentColor: "#fcd34d", 
    bgPrimary: "#0a0a10", 
    bgSecondary: "#131320", 
    bgTertiary: "#1a1a25", 
    textPrimary: "#fef3c7", 
    textSecondary: "#fde68a", 
    borderColor: "#f59e0b", 
    cardBg: "#15151c", 
    inputBg: "#0c0c14",
    inputBorder: "#f59e0b",
    shadowColor: "rgba(245, 158, 11, 0.5)",
    radius: "0", 
    borderWidth: "1px",
    shadow: "0 0 15px rgba(245, 158, 11, 0.3), 0 0 5px rgba(245, 158, 11, 0.2)", 
    font: "'Orbitron', 'Rajdhani', sans-serif"
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
    shadow: "0 0 20px rgba(244, 63, 94, 0.3)",
    font: "'Audiowide', 'Rajdhani', sans-serif"
  }
};

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(THEMES.LIGHT);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load fonts dynamically based on theme requirements
    const loadThemeFonts = () => {
      const fontLinks = document.querySelectorAll('link[data-theme-font]');
      fontLinks.forEach(link => link.remove());

      // Add links for the necessary fonts
      const fonts = [
        { name: 'Orbitron', url: 'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700&display=swap' },
        { name: 'Rajdhani', url: 'https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&display=swap' },
        { name: 'Audiowide', url: 'https://fonts.googleapis.com/css2?family=Audiowide&display=swap' },
        { name: 'Inter', url: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap' }
      ];

      fonts.forEach(font => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = font.url;
        link.setAttribute('data-theme-font', font.name);
        document.head.appendChild(link);
      });
    };

    loadThemeFonts();

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
    
    // Set the font family on body
    document.body.style.fontFamily = currentTheme.font;
    
    // Set theme-specific class for CSS targeting
    const themeClasses = Object.values(THEMES).map(t => `theme-${t.id}`);
    document.body.classList.remove(...themeClasses);
    document.body.classList.add(`theme-${currentTheme.id}`);
    
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