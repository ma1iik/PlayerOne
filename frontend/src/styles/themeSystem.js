// frontend/src/styles/themeSystem.js

import { useContext } from 'react';
import ThemeContext from '../context/ThemeContext';

/**
 * Theme-Agnostic Design System
 * No hard-coded theme names - everything is driven by theme properties
 */

// Theme Feature Flags
// Instead of checking theme names, themes declare their features
export const THEME_FEATURES = {
  hasGlowEffects: false,
  hasSharpCorners: false,
  hasGlassEffect: false,
  hasGridBackground: false,
  useUppercaseText: false,
  useMonospaceFont: false,
  hasBorderAnimations: false,
  hasNeonShadows: false,
};

// Enhanced Theme Structure
export const createTheme = (config) => ({
  // Existing theme properties
  ...config,
  
  // Feature flags that determine behavior
  features: {
    ...THEME_FEATURES,
    ...config.features
  },
  
  // Style variants that can be applied
  variants: {
    card: config.variants?.card || 'default',
    button: config.variants?.button || 'default',
    input: config.variants?.input || 'default',
    text: config.variants?.text || 'default',
  }
});

// Example theme definitions with features
export const THEMES = {
  LIGHT: createTheme({
    id: "light",
    name: "Light Mode",
    primaryColor: "#6d28d9",
    secondaryColor: "#8b5cf6",
    bgPrimary: "#f9fafb",
    bgSecondary: "#ffffff",
    bgTertiary: "#f3f4f6",
    textPrimary: "#1f2937",
    textSecondary: "#6b7280",
    borderColor: "#e5e7eb",
    radius: "0.375rem",
    font: "'Inter', sans-serif",
    features: {
      // Default theme, no special features
    }
  }),
  
  NEON_VIOLET: createTheme({
    id: "neon-violet",
    name: "Neon Violet",
    primaryColor: "#7e22ce",
    secondaryColor: "#a855f7",
    bgPrimary: "#0a0a10",
    bgSecondary: "#131320",
    bgTertiary: "#1e1e35",
    textPrimary: "#e0f2fe",
    textSecondary: "#a5b4fc",
    borderColor: "#4f46e5",
    radius: "0",
    font: "'Orbitron', 'Rajdhani', sans-serif",
    features: {
      hasGlowEffects: true,
      hasSharpCorners: true,
      useUppercaseText: true,
      useMonospaceFont: true,
      hasNeonShadows: true,
      hasGridBackground: true,
    },
    variants: {
      card: 'neon',
      button: 'neon',
      input: 'neon',
      text: 'neon',
    }
  }),
  
  CYBERPUNK: createTheme({
    id: "cyberpunk",
    name: "Cyberpunk",
    primaryColor: "#f43f5e",
    secondaryColor: "#0ea5e9",
    bgPrimary: "#020617",
    bgSecondary: "#0f172a",
    bgTertiary: "#1e293b",
    textPrimary: "#f8fafc",
    textSecondary: "#94a3b8",
    borderColor: "#1e293b",
    radius: "0",
    font: "'Audiowide', 'Rajdhani', sans-serif",
    features: {
      hasSharpCorners: true,
      useUppercaseText: true,
      hasGlowEffects: true,
      hasGridBackground: true,
    },
    variants: {
      card: 'cyber',
      button: 'cyber',
      input: 'cyber',
      text: 'cyber',
    }
  })
};

// Style Generators based on features, not theme names
export const generateStyles = (theme) => {
  const { features } = theme;
  
  return {
    // Card styles based on variant
    card: {
      base: {
        backgroundColor: theme.bgSecondary,
        borderRadius: features.hasSharpCorners ? '0' : theme.radius,
        transition: 'all 0.2s ease',
      },
      default: {
        border: `1px solid ${theme.borderColor}`,
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      },
      neon: {
        backgroundColor: 'rgba(10, 10, 16, 0.7)',
        border: `1px solid ${theme.primaryColor}`,
        boxShadow: features.hasNeonShadows 
          ? `0 0 20px ${theme.primaryColor}80, 0 0 10px ${theme.primaryColor}40`
          : `0 0 10px ${theme.primaryColor}40`,
      },
      cyber: {
        backgroundColor: 'rgba(15, 23, 42, 0.7)',
        border: `1px solid ${theme.primaryColor}`,
        boxShadow: `0 0 15px ${theme.primaryColor}40`,
        clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
      },
      glass: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
      }
    },
    
    // Button styles
    button: {
      base: {
        fontWeight: '500',
        transition: 'all 0.2s ease',
        borderRadius: features.hasSharpCorners ? '0' : theme.radius,
        textTransform: features.useUppercaseText ? 'uppercase' : 'none',
        fontFamily: theme.font,
      },
      primary: {
        default: {
          backgroundColor: theme.primaryColor,
          color: '#ffffff',
          border: 'none',
        },
        neon: {
          backgroundColor: 'transparent',
          color: theme.primaryColor,
          border: `1px solid ${theme.primaryColor}`,
          boxShadow: features.hasGlowEffects 
            ? `inset 0 0 10px ${theme.primaryColor}20`
            : 'none',
        },
        cyber: {
          background: `linear-gradient(45deg, ${theme.primaryColor}, ${theme.secondaryColor})`,
          color: '#ffffff',
          border: 'none',
          position: 'relative',
          overflow: 'hidden',
        }
      },
      secondary: {
        default: {
          backgroundColor: theme.bgTertiary,
          color: theme.textSecondary,
          border: 'none',
        },
        neon: {
          backgroundColor: 'transparent',
          color: theme.textSecondary,
          border: `1px solid ${theme.borderColor}`,
        },
        cyber: {
          backgroundColor: 'transparent',
          color: theme.secondaryColor,
          border: `1px solid ${theme.secondaryColor}`,
        }
      }
    },
    
    // Text transformations
    text: {
      transform: features.useUppercaseText ? 'uppercase' : 'none',
      fontFamily: theme.font,
      letterSpacing: features.useMonospaceFont ? '0.05em' : 'normal',
    },
    
    // Special effects
    effects: {
      glow: features.hasGlowEffects ? {
        textShadow: `0 0 10px ${theme.primaryColor}60`,
        animation: 'pulse-glow 2s infinite alternate',
      } : {},
      
      background: features.hasGridBackground ? {
        backgroundImage: `
          linear-gradient(to bottom, rgba(10, 10, 16, 0.95), rgba(10, 10, 16, 0.98)),
          repeating-linear-gradient(45deg, rgba(30, 30, 41, 0.2) 0px, rgba(30, 30, 41, 0.2) 1px, transparent 1px, transparent 10px)
        `
      } : {},
    }
  };
};

// Hook for using theme styles
export const useThemeStyles = () => {
  const { currentTheme } = useContext(ThemeContext);
  const styles = generateStyles(currentTheme);
  
  return {
    theme: currentTheme,
    styles,
    features: currentTheme.features || {},
    
    // Helper functions
    getCardStyle: (variant = 'default') => ({
      ...styles.card.base,
      ...styles.card[variant] || styles.card.default
    }),
    
    getButtonStyle: (variant = 'primary', state = 'default') => ({
      ...styles.button.base,
      ...styles.button[variant]?.[state] || styles.button.primary.default
    }),
    
    getTextStyle: () => styles.text,
    
    shouldTransform: (text) => 
      currentTheme.features?.useUppercaseText ? text.toUpperCase() : text,
  };
};