// frontend/src/styles/designSystem.js

/**
 * Design System Constants
 * Centralized design tokens for consistent styling across the application
 */

// Spacing Scale (using 4px base unit)
export const SPACING = {
  xs: '0.25rem',   // 4px
  sm: '0.5rem',    // 8px
  md: '1rem',      // 16px
  lg: '1.5rem',    // 24px
  xl: '2rem',      // 32px
  '2xl': '3rem',   // 48px
  '3xl': '4rem',   // 64px
};

// Size Scale for components
export const SIZES = {
  button: {
    sm: { height: '2rem', padding: '0.5rem 1rem', fontSize: '0.875rem' },
    md: { height: '2.5rem', padding: '0.625rem 1.25rem', fontSize: '1rem' },
    lg: { height: '3rem', padding: '0.75rem 1.5rem', fontSize: '1.125rem' },
  },
  input: {
    sm: { height: '2rem', padding: '0.5rem', fontSize: '0.875rem' },
    md: { height: '2.5rem', padding: '0.625rem 0.75rem', fontSize: '1rem' },
    lg: { height: '3rem', padding: '0.75rem 1rem', fontSize: '1.125rem' },
  },
  card: {
    sm: { padding: '0.5rem' },
    md: { padding: '1rem' },
    lg: { padding: '1.5rem' },
  },
  icon: {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-8 h-8',
  }
};

// Border Radius Scale
export const RADIUS = {
  none: '0',
  sm: '0.125rem',  // 2px
  md: '0.375rem',  // 6px (default)
  lg: '0.5rem',    // 8px
  xl: '0.75rem',   // 12px
  full: '9999px',  // pill shape
};

// Z-Index Scale
export const Z_INDEX = {
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  backdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
};

// Shadows (semantic naming)
export const SHADOWS = {
  none: 'none',
  xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  glow: (color) => `0 0 15px ${color}40, 0 0 5px ${color}20`,
  neon: (color) => `0 0 20px ${color}80, 0 0 10px ${color}40`,
};

// Transition Durations
export const TRANSITIONS = {
  fast: '150ms',
  normal: '200ms',
  slow: '300ms',
  verySlow: '500ms',
};

// Breakpoints
export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

// Semantic Color Tokens (maps to theme colors)
export const getSemanticColors = (theme) => ({
  // Backgrounds
  bgPrimary: theme.bgPrimary,
  bgSecondary: theme.bgSecondary,
  bgTertiary: theme.bgTertiary,
  bgHover: theme.bgTertiary,
  bgActive: theme.primaryColor + '20',
  
  // Text
  textPrimary: theme.textPrimary,
  textSecondary: theme.textSecondary,
  textMuted: theme.textSecondary + '80',
  textInverse: '#ffffff',
  
  // Borders
  borderDefault: theme.borderColor,
  borderHover: theme.primaryColor,
  borderActive: theme.primaryColor,
  borderError: '#ef4444',
  
  // States
  primary: theme.primaryColor,
  secondary: theme.secondaryColor,
  accent: theme.accentColor,
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',
});

// Style Helpers
export const getThemeStyles = (theme, isNeon = false, isCyberpunk = false) => ({
  // Card styles
  card: {
    default: {
      backgroundColor: theme.bgSecondary,
      borderRadius: theme.radius,
      border: `1px solid ${theme.borderColor}`,
      boxShadow: theme.shadow,
    },
    neon: {
      backgroundColor: 'rgba(10, 10, 16, 0.7)',
      border: `1px solid ${theme.primaryColor}`,
      boxShadow: SHADOWS.neon(theme.primaryColor),
      borderRadius: '0',
    },
    cyberpunk: {
      backgroundColor: 'rgba(15, 23, 42, 0.7)',
      border: `1px solid ${theme.primaryColor}`,
      boxShadow: SHADOWS.glow(theme.primaryColor),
      borderRadius: '0',
    }
  },
  
  // Button styles
  button: {
    primary: {
      default: {
        backgroundColor: theme.primaryColor,
        color: '#ffffff',
        border: 'none',
        borderRadius: theme.radius,
      },
      neon: {
        backgroundColor: 'transparent',
        color: theme.primaryColor,
        border: `1px solid ${theme.primaryColor}`,
        borderRadius: '0',
      }
    },
    secondary: {
      default: {
        backgroundColor: theme.bgTertiary,
        color: theme.textSecondary,
        border: 'none',
        borderRadius: theme.radius,
      },
      neon: {
        backgroundColor: 'transparent',
        color: theme.textSecondary,
        border: `1px solid ${theme.borderColor}`,
        borderRadius: '0',
      }
    }
  },
  
  // Input styles
  input: {
    default: {
      backgroundColor: theme.inputBg,
      color: theme.textPrimary,
      border: `1px solid ${theme.borderColor}`,
      borderRadius: theme.radius,
      padding: SIZES.input.md.padding,
    },
    focus: {
      borderColor: theme.primaryColor,
      boxShadow: `0 0 0 2px ${theme.primaryColor}20`,
    }
  }
});

// Utility function to get component styles
export const getComponentStyles = (componentType, variant, theme, options = {}) => {
  const { isNeon, isCyberpunk, size = 'md' } = options;
  const styles = getThemeStyles(theme, isNeon, isCyberpunk);
  
  if (componentType === 'card') {
    if (isNeon) return styles.card.neon;
    if (isCyberpunk) return styles.card.cyberpunk;
    return styles.card.default;
  }
  
  if (componentType === 'button') {
    const buttonStyle = isNeon || isCyberpunk 
      ? styles.button[variant].neon 
      : styles.button[variant].default;
    
    return {
      ...buttonStyle,
      ...SIZES.button[size],
      transition: `all ${TRANSITIONS.normal} ease`,
    };
  }
  
  if (componentType === 'input') {
    return {
      ...styles.input.default,
      ...SIZES.input[size],
      transition: `all ${TRANSITIONS.fast} ease`,
    };
  }
  
  return {};
};

// CSS Variable Generator for runtime theming
export const generateCSSVariables = (theme, prefix = 'app') => {
  const colors = getSemanticColors(theme);
  const cssVars = {};
  
  // Add semantic colors
  Object.entries(colors).forEach(([key, value]) => {
    cssVars[`--${prefix}-${key}`] = value;
  });
  
  // Add spacing
  Object.entries(SPACING).forEach(([key, value]) => {
    cssVars[`--${prefix}-space-${key}`] = value;
  });
  
  // Add radius
  Object.entries(RADIUS).forEach(([key, value]) => {
    cssVars[`--${prefix}-radius-${key}`] = value;
  });
  
  return cssVars;
};