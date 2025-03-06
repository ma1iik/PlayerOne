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
    shadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    font: "'Inter', sans-serif"
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
    shadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
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
  const [currentTheme, setCurrentTheme] = useState(THEMES.DARK);
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