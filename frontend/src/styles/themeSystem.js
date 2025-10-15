// frontend/src/styles/themeSystem.js

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
  hasGradientBackground: false,
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
    bgPrimary: "#FCFAFA",
    bgSecondary: "#ffffff",
    bgTertiary: "#f3f4f6",
    textPrimary: "#1f2937",
    textSecondary: "#6b7280",
    borderColor: "#e5e7eb",
    radius: "0.1875rem",
    font: "'Inter', sans-serif",
    testColor: "#FFF5FF",
    features: {
      // Default theme, no special features
    }
  }),

  ENHANCED_LIGHT: createTheme({
    id: "enhanced-light",
    name: "Enhanced Light",
    primaryColor: "#6d28d9",
    secondaryColor: "#8b5cf6",
    bgPrimary: "#f8fafc", // Slightly less grey
    bgSecondary: "#ffffff", // Keep pure white for cards
    bgTertiary: "#f1f5f9", // Lighter grey, less strong
    textPrimary: "#0f172a", // Darker text for better readability
    textSecondary: "#64748b", // Lighter grey for secondary text
    borderColor: "#e2e8f0", // Lighter grey borders
    radius: "0.1875rem",
    font: "'Inter', sans-serif",
    features: {
      // Enhanced contrast for better accessibility
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
  }),

  NIGHT: createTheme({
    id: "night",
    name: "Midnight",
    primaryColor: "#6d28d9", // Same purple as light theme
    secondaryColor: "#8b5cf6", // Same secondary as light theme
    bgPrimary: "#111827", // Dark background
    bgSecondary: "#1f2937", // Dark cards
    bgTertiary: "#374151", // Dark tertiary
    textPrimary: "#f9fafb", // Light text
    textSecondary: "#9ca3af", // Muted light text
    borderColor: "#374151", // Dark borders
    radius: "0.1875rem", // Same radius as light theme
    font: "'Inter', sans-serif", // Same font as light theme
    features: {
      // Clean dark theme, no special effects
    },
    variants: {
      card: 'default',
      button: 'default',
      input: 'default',
      text: 'default',
    }
  }),

  ROSE: createTheme({
    id: "rose",
    name: "Rose Quartz",
    primaryColor: "#e11d48", // Deep rose
    secondaryColor: "#ec4899", // Pink accent
    bgPrimary: "#fdf2f8", // Very light rose
    bgSecondary: "#ffffff", // Pure white
    bgTertiary: "#fce7f3", // Soft pink
    textPrimary: "#881337", // Dark rose
    textSecondary: "#be185d", // Medium rose
    borderColor: "#f9a8d4", // Light pink border
    radius: "0.5rem", // Normal rounding, not excessive
    font: "'Inter', 'Segoe UI', sans-serif", // Clean modern font
    features: {
      // Clean and elegant
    },
    variants: {
      card: 'default',
      button: 'default',
      input: 'default',
      text: 'default',
    }
  }),

  DARK_FANTASY: createTheme({
    id: "dark-fantasy",
    name: "Dark Fantasy",
    primaryColor: "#8b1538", // Deep blood red
    secondaryColor: "#4a4a4a", // Charcoal gray
    bgPrimary: "#0a0a0a", // Almost black
    bgSecondary: "#141414", // Very dark gray
    bgTertiary: "#1f1f1f", // Dark charcoal
    textPrimary: "#d4c5b9", // Aged parchment
    textSecondary: "#8a7968", // Muted brown
    borderColor: "#2d2d2d", // Dark border
    radius: "0.1875rem", // Slightly rounded
    font: "'Cinzel', 'Times New Roman', serif", // Gothic serif font
    features: {
      hasGlowEffects: true,
      hasGlassEffect: true,
      hasBorderAnimations: true,
      hasGridBackground: true,
    },
    variants: {
      card: 'gothic',
      button: 'gothic',
      input: 'gothic',
      text: 'gothic',
    }
  })
};

// Legacy exports for backwards compatibility
export const LIGHT = THEMES.LIGHT;
export const ENHANCED_LIGHT = THEMES.ENHANCED_LIGHT;
export const NEON_VIOLET = THEMES.NEON_VIOLET;
export const CYBERPUNK = THEMES.CYBERPUNK;
export const NIGHT = THEMES.NIGHT;
export const ROSE = THEMES.ROSE;
export const DARK_FANTASY = THEMES.DARK_FANTASY;

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
        backgroundColor: 'rgba(26, 26, 31, 0.7)', // Dark glass for Night theme
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
      },
      pixel: {
        backgroundColor: 'rgba(26, 26, 26, 0.9)', // Dark pixel background
        border: `2px solid ${theme.primaryColor}`,
        boxShadow: features.hasGlowEffects 
          ? `0 0 15px ${theme.primaryColor}60, inset 0 0 10px ${theme.primaryColor}20`
          : `0 0 8px ${theme.primaryColor}40`,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(45deg, transparent 48%, ${theme.primaryColor}20 49%, ${theme.primaryColor}20 51%, transparent 52%)`,
          backgroundSize: '8px 8px',
          pointerEvents: 'none',
        }
      },
      gothic: {
        backgroundColor: 'rgba(20, 20, 20, 0.95)', // Very dark background
        border: `1px solid ${theme.borderColor}`,
        borderTop: `2px solid ${theme.primaryColor}30`,
        boxShadow: features.hasGlowEffects 
          ? `0 4px 20px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(139, 21, 56, 0.2)`
          : `0 4px 15px rgba(0, 0, 0, 0.6)`,
        background: `linear-gradient(145deg, rgba(20, 20, 20, 0.95), rgba(10, 10, 10, 0.98))`,
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: `linear-gradient(90deg, transparent, ${theme.primaryColor}60, transparent)`,
          opacity: 0.3,
        }
      },
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
        },
        gothic: {
          background: `linear-gradient(145deg, ${theme.primaryColor}, rgba(139, 21, 56, 0.8))`,
          color: '#ffffff',
          border: `1px solid ${theme.primaryColor}`,
          boxShadow: features.hasGlowEffects 
            ? `0 4px 15px rgba(139, 21, 56, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)`
            : `0 4px 10px rgba(139, 21, 56, 0.3)`,
          transition: 'all 0.3s ease',
          '&:hover': {
            background: `linear-gradient(145deg, rgba(139, 21, 56, 0.9), ${theme.primaryColor})`,
            boxShadow: features.hasGlowEffects 
              ? `0 6px 20px rgba(139, 21, 56, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.2)`
              : `0 6px 15px rgba(139, 21, 56, 0.5)`,
          }
        },
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
        },
        pixel: {
          backgroundColor: 'transparent',
          color: theme.primaryColor,
          border: `2px solid ${theme.primaryColor}`,
          boxShadow: features.hasGlowEffects 
            ? `0 0 10px ${theme.primaryColor}40, inset 0 0 5px ${theme.primaryColor}20`
            : 'none',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: `linear-gradient(90deg, transparent, ${theme.primaryColor}30, transparent)`,
            transition: 'left 0.5s ease',
          },
          '&:hover::before': {
            left: '100%',
          }
        },
        gothic: {
          backgroundColor: 'rgba(10, 10, 10, 0.8)',
          color: theme.textPrimary,
          border: `1px solid ${theme.borderColor}`,
          borderTop: `1px solid ${theme.primaryColor}40`,
          boxShadow: features.hasGlowEffects 
            ? `0 2px 10px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(139, 21, 56, 0.3)`
            : `0 2px 8px rgba(0, 0, 0, 0.6)`,
          background: `linear-gradient(145deg, rgba(15, 15, 15, 0.9), rgba(5, 5, 5, 0.95))`,
          transition: 'all 0.3s ease',
          '&:hover': {
            borderTopColor: theme.primaryColor,
            boxShadow: features.hasGlowEffects 
              ? `0 4px 15px rgba(0, 0, 0, 0.9), inset 0 1px 0 rgba(139, 21, 56, 0.5)`
              : `0 4px 12px rgba(0, 0, 0, 0.8)`,
          }
        },
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
        backgroundImage: theme.id === 'dark-fantasy' 
          ? `
            linear-gradient(to bottom, rgba(10, 10, 10, 0.98), rgba(5, 5, 5, 0.99)),
            radial-gradient(ellipse at center, rgba(139, 21, 56, 0.05) 0%, transparent 70%),
            repeating-linear-gradient(45deg, rgba(20, 20, 20, 0.3) 0px, rgba(20, 20, 20, 0.3) 1px, transparent 1px, transparent 20px)
          `
          : theme.id === 'dark-fantasy-pixel' 
          ? `
            linear-gradient(to bottom, rgba(15, 15, 15, 0.95), rgba(10, 10, 10, 0.98)),
            repeating-linear-gradient(0deg, rgba(139, 92, 246, 0.1) 0px, rgba(139, 92, 246, 0.1) 1px, transparent 1px, transparent 8px),
            repeating-linear-gradient(90deg, rgba(139, 92, 246, 0.1) 0px, rgba(139, 92, 246, 0.1) 1px, transparent 1px, transparent 8px)
          `
          : `
            linear-gradient(to bottom, rgba(10, 10, 16, 0.95), rgba(10, 10, 16, 0.98)),
            repeating-linear-gradient(45deg, rgba(30, 30, 41, 0.2) 0px, rgba(30, 30, 41, 0.2) 1px, transparent 1px, transparent 10px)
          `
      } : {},
    },

    // Helper functions for common patterns
    getTextClass: (isHighlighted = false) => {
      let classes = '';
      if (features.hasGlowEffects && isHighlighted) {
        classes += 'sl-glow-text ';
      }
      if (features.useUppercaseText) {
        classes += 'uppercase ';
      }
      return classes.trim();
    },

    getCardStyle: (variant = 'default') => {
      const cardVariant = theme.variants?.card || 'default';
      return {
        ...generateStyles(theme).card.base,
        ...generateStyles(theme).card[cardVariant === 'default' ? variant : cardVariant]
      };
    },

    shouldTransform: (text) => 
      text && features.useUppercaseText ? text.toUpperCase() : (text || ''),
  };
};