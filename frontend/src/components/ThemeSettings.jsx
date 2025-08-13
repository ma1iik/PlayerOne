import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useThemeStyles } from '../context/ThemeProvider';

const ThemeSettings = () => {
  const { theme, styles, themes, setThemeId, themeId } = useThemeStyles();
  const [activeTab, setActiveTab] = useState('themes');

  const tabs = [
    { id: 'themes', label: 'Themes' },
    { id: 'preview', label: 'Preview' }
  ];

  // Get theme font
  const getThemeFont = () => theme.font;

  // Generate the color pill component for theme cards
  const ColorPill = ({ color, label }) => (
    <div className="flex items-center gap-1.5">
      <div 
        className="w-3 h-3 rounded-full" 
        style={{ backgroundColor: color }}
      />
      <span className="text-xs" style={{ color: theme.textSecondary }}>{label}</span>
    </div>
  );

  // Helper to get text classes
  const getTextClasses = (baseClasses = '', isHighlighted = false) => {
    let classes = baseClasses;
    if (theme.features.hasGlowEffects && isHighlighted) {
      classes += ' sl-glow-text';
    }
    return classes.trim();
  };

  // Helper to get themed text
  const getThemedText = (text) => styles.shouldTransform(text);

  return (
    <div className="rounded-lg overflow-hidden" style={styles.getCardStyle()}>
      {/* Header with tabs */}
      <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: theme.borderColor }}>
        <h3 className={getTextClasses('text-lg font-semibold flex items-center gap-2', true)} style={{ color: theme.textPrimary, fontFamily: getThemeFont() }}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
          {getThemedText('Theme Settings')}
        </h3>
        
        <div className="flex bg-bg-tertiary rounded-lg p-1" style={{ backgroundColor: theme.bgTertiary }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 text-sm rounded transition-colors ${getTextClasses('', true)}`}
              style={{
                backgroundColor: activeTab === tab.id ? theme.primaryColor : 'transparent',
                color: activeTab === tab.id ? '#ffffff' : theme.textSecondary,
                fontFamily: getThemeFont(),
              }}
            >
              {getThemedText(tab.label)}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {activeTab === 'themes' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {themes.map((themeOption) => (
                <motion.div
                  key={themeOption.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    themeId === themeOption.id 
                      ? 'ring-2 ring-offset-2' 
                      : 'hover:shadow-lg'
                  }`}
                  style={{
                    backgroundColor: themeOption.bgSecondary,
                    borderColor: themeId === themeOption.id ? themeOption.primaryColor : themeOption.borderColor,
                    borderRadius: themeOption.radius,
                    ringColor: themeOption.primaryColor,
                    boxShadow: themeOption.features?.hasGlowEffects && themeId === themeOption.id
                      ? `0 0 20px ${themeOption.primaryColor}40`
                      : undefined
                  }}
                  onClick={() => setThemeId(themeOption.id)}
                >
                  {/* Theme Preview */}
                  <div className="mb-3 space-y-2">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-6 h-6 rounded-full"
                        style={{ backgroundColor: themeOption.primaryColor }}
                      />
                      <h4 className={getTextClasses('font-semibold', true)} style={{ 
                        color: themeOption.textPrimary, 
                        fontFamily: themeOption.font 
                      }}>
                        {styles.shouldTransform(themeOption.name)}
                      </h4>
                    </div>
                    
                    {/* Color palette */}
                    <div className="flex gap-1">
                      <ColorPill color={themeOption.primaryColor} label="Primary" />
                      <ColorPill color={themeOption.secondaryColor} label="Secondary" />
                    </div>
                  </div>

                  {/* Feature badges */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {themeOption.features?.hasGlowEffects && (
                      <span className="px-2 py-1 text-xs rounded" style={{ 
                        backgroundColor: `${themeOption.primaryColor}20`, 
                        color: themeOption.primaryColor 
                      }}>
                        Glow Effects
                      </span>
                    )}
                    {themeOption.features?.hasSharpCorners && (
                      <span className="px-2 py-1 text-xs rounded" style={{ 
                        backgroundColor: `${themeOption.secondaryColor}20`, 
                        color: themeOption.secondaryColor 
                      }}>
                        Sharp Corners
                      </span>
                    )}
                    {themeOption.features?.hasGridBackground && (
                      <span className="px-2 py-1 text-xs rounded" style={{ 
                        backgroundColor: `${themeOption.textSecondary}20`, 
                        color: themeOption.textSecondary 
                      }}>
                        Grid BG
                      </span>
                    )}
                  </div>

                  {/* Sample UI Elements */}
                  <div className="space-y-2">
                    <div 
                      className="p-2 rounded text-xs"
                      style={{ 
                        backgroundColor: themeOption.bgTertiary,
                        color: themeOption.textSecondary,
                        borderRadius: themeOption.features?.hasSharpCorners ? '0' : themeOption.radius
                      }}
                    >
                      Sample card
                    </div>
                    <button 
                      className="w-full py-1 px-2 text-xs rounded transition-colors"
                      style={{ 
                        backgroundColor: themeOption.primaryColor,
                        color: '#ffffff',
                        borderRadius: themeOption.features?.hasSharpCorners ? '0' : themeOption.radius,
                        fontFamily: themeOption.font,
                        textTransform: themeOption.features?.useUppercaseText ? 'uppercase' : 'none'
                      }}
                    >
                      {themeOption.features?.useUppercaseText ? 'BUTTON' : 'Button'}
                    </button>
                  </div>

                  {/* Selected indicator */}
                  {themeId === themeOption.id && (
                    <div 
                      className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: themeOption.primaryColor }}
                    >
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'preview' && (
          <div className="space-y-6">
            <div>
              <h4 className={getTextClasses('font-semibold mb-3', true)} style={{ color: theme.textPrimary, fontFamily: getThemeFont() }}>
                {getThemedText('Current Theme Preview')}
              </h4>
              
              {/* Theme info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <h5 className={getTextClasses('font-medium mb-2', true)} style={{ color: theme.textPrimary }}>
                    {getThemedText('Theme Details')}
                  </h5>
                  <div className="space-y-1 text-sm">
                    <div style={{ color: theme.textSecondary }}>
                      <strong>Name:</strong> {theme.name}
                    </div>
                    <div style={{ color: theme.textSecondary }}>
                      <strong>Font:</strong> {theme.font}
                    </div>
                    <div style={{ color: theme.textSecondary }}>
                      <strong>Features:</strong> {Object.entries(theme.features || {})
                        .filter(([_, value]) => value)
                        .map(([key]) => key.replace(/([A-Z])/g, ' $1').toLowerCase())
                        .join(', ') || 'None'}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h5 className={getTextClasses('font-medium mb-2', true)} style={{ color: theme.textPrimary }}>
                    {getThemedText('Color Palette')}
                  </h5>
                  <div className="grid grid-cols-2 gap-2">
                    <ColorPill color={theme.primaryColor} label="Primary" />
                    <ColorPill color={theme.secondaryColor} label="Secondary" />
                    <ColorPill color={theme.bgPrimary} label="Background" />
                    <ColorPill color={theme.textPrimary} label="Text" />
                  </div>
                </div>
              </div>

              {/* UI Preview */}
              <div className="space-y-4">
                <h5 className={getTextClasses('font-medium', true)} style={{ color: theme.textPrimary }}>
                  {getThemedText('UI Elements Preview')}
                </h5>
                
                {/* Sample card */}
                <div className="p-4 rounded-lg" style={styles.getCardStyle()}>
                  <h6 className={getTextClasses('font-semibold mb-2', true)} style={{ color: theme.textPrimary }}>
                    {getThemedText('Sample Card')}
                  </h6>
                  <p style={{ color: theme.textSecondary, marginBottom: '1rem' }}>
                    This is how cards look in the current theme. Notice the styling, colors, and effects.
                  </p>
                  
                  {/* Sample buttons */}
                  <div className="flex gap-2 flex-wrap">
                    <button 
                      className="px-4 py-2 rounded transition-colors"
                      style={{
                        ...styles.button.base,
                        ...styles.button.primary[theme.variants?.button || 'default']
                      }}
                    >
                      {getThemedText('Primary Button')}
                    </button>
                    <button 
                      className="px-4 py-2 rounded transition-colors"
                      style={{
                        ...styles.button.base,
                        ...styles.button.secondary[theme.variants?.button || 'default']
                      }}
                    >
                      {getThemedText('Secondary Button')}
                    </button>
                  </div>
                </div>

                {/* Text effects demo */}
                {theme.features?.hasGlowEffects && (
                  <div className="p-4 rounded-lg" style={{ backgroundColor: theme.bgTertiary }}>
                    <h6 className={getTextClasses('font-semibold mb-2', true)} style={{ color: theme.textPrimary }}>
                      {getThemedText('Glow Effects Demo')}
                    </h6>
                    <p className="sl-glow-text selected" style={{ color: theme.textPrimary }}>SYSTEM INITIALIZED</p>
                    <p className="sl-glow-text mb-2" style={{ color: theme.textPrimary }}>* CONNECTING TO MAINFRAME...</p>
                    <p className="sl-glow-text" style={{ color: theme.textPrimary }}>ACCESS GRANTED</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ThemeSettings;