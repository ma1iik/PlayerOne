import React, { createContext, useState, useContext, useEffect } from 'react';
import {
  THEMES,
  generateStyles,
} from '../styles/themeSystem';

const themes = {
  light: THEMES.LIGHT,
  'enhanced-light': THEMES.ENHANCED_LIGHT,
  'neon-violet': THEMES.NEON_VIOLET,
  cyberpunk: THEMES.CYBERPUNK,
  night: THEMES.NIGHT,
  rose: THEMES.ROSE,
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const getInitialTheme = () => {
    try {
      const saved = localStorage.getItem('themeId');
      return saved && themes[saved] ? saved : 'light';
    } catch {
      return 'light';
    }
  };

  const [themeId, setThemeId] = useState(getInitialTheme);
  const theme = themes[themeId] ?? themes.light;
  const styles = generateStyles(theme);

  useEffect(() => {
    try {
      localStorage.setItem('themeId', themeId);
      document.body.style.fontFamily = theme.font;
      
      document.body.className = `theme-${themeId}`;
      
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

export const useThemeStyles = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeStyles must be used within a ThemeProvider');
  }
  return context;
};
