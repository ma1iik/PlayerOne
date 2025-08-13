// src/context/ThemeProvider.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import {
  THEMES,
  generateStyles,
} from '../styles/themeSystem';

// Map of available themes by ID
const themes = {
  light: THEMES.LIGHT,
  'neon-violet': THEMES.NEON_VIOLET,
  cyberpunk: THEMES.CYBERPUNK,
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Get initial theme from localStorage or default to light
  const getInitialTheme = () => {
    try {
      const saved = localStorage.getItem('themeId');
      return saved && themes[saved] ? saved : 'light';
    } catch {
      return 'light';
    }
  };

  const [themeId, setThemeId] = useState(getInitialTheme);
  // create a theme object; if custom themes exist use createTheme()
  const theme = themes[themeId] ?? themes.light;
  // generate reusable style helpers
  const styles = generateStyles(theme);

  // persist theme selection and apply global styles
  useEffect(() => {
    try {
      localStorage.setItem('themeId', themeId);
      document.body.style.fontFamily = theme.font;
      
      // Apply theme-based body classes for global styles
      document.body.className = `theme-${themeId}`;
      
      // Apply background effects if theme supports it
      if (theme.features?.hasGridBackground) {
        document.body.style.backgroundImage = styles.effects.background.backgroundImage;
      } else {
        document.body.style.backgroundImage = '';
      }
    } catch (error) {
      console.warn('Failed to persist theme:', error);
    }
  }, [themeId, theme, styles]);

  const contextValue = {
    theme,
    styles,
    themeId,
    setThemeId,
    // Legacy compatibility
    currentTheme: theme,
    setTheme: (newTheme) => setThemeId(newTheme.id || newTheme),
    themes: Object.values(themes),
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook for consuming theme and style helpers
export const useThemeStyles = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeStyles must be used within a ThemeProvider');
  }
  return context;
};
