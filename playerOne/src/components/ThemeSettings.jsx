import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../context/ThemeContext';

const ThemeSettings = () => {
  const { currentTheme, setTheme, themes } = useContext(ThemeContext);
  const [activeTab, setActiveTab] = useState('themes');

  const isNeonTheme = currentTheme.id.includes('neon');
  const isCyberpunk = currentTheme.id === 'cyberpunk';

  const tabs = [
    { id: 'themes', label: 'Themes' },
    { id: 'preview', label: 'Preview' }
  ];

  // Map each theme to its specific styling for the theme card
  const getThemeCardStyle = (theme) => {
    switch(theme.id) {
      case 'neon-violet':
        return {
          cardWrapperClass: 'sl-scan-line',
          cardHeaderClass: 'border-b border-purple-600',
          cardFooterClass: 'border-t border-purple-600 bg-opacity-30 bg-purple-900',
          nameClass: 'sl-glow-text font-orbitron tracking-wide',
          previewClass: 'border border-purple-600',
          activeIndicatorClass: 'bg-purple-700',
          cardShadow: '0 0 15px rgba(126, 34, 206, 0.5)'
        };
      case 'neon-orange':
        return {
          cardWrapperClass: 'sl-scan-line',
          cardHeaderClass: 'border-b border-orange-500',
          cardFooterClass: 'border-t border-orange-500 bg-opacity-30 bg-orange-900',
          nameClass: 'sl-glow-text font-orbitron tracking-wide',
          previewClass: 'border border-orange-500',
          activeIndicatorClass: 'bg-orange-600',
          cardShadow: '0 0 15px rgba(245, 158, 11, 0.5)'
        };
      case 'cyberpunk':
        return {
          cardWrapperClass: '',
          cardHeaderClass: 'border-b border-red-500',
          cardFooterClass: 'border-t border-red-500 bg-opacity-30 bg-gray-900',
          nameClass: 'font-audiowide tracking-wide',
          previewClass: 'border border-red-500',
          activeIndicatorClass: 'bg-red-500',
          cardShadow: '0 0 15px rgba(244, 63, 94, 0.5)'
        };
      default:
        return {
          cardWrapperClass: '',
          cardHeaderClass: '',
          cardFooterClass: '',
          nameClass: 'font-medium',
          previewClass: '',
          activeIndicatorClass: 'bg-primary',
          cardShadow: ''
        };
    }
  };

  // Get font styling based on theme
  const getThemeFont = (theme) => {
    if (theme.id.includes('neon')) {
      return "'Orbitron', 'Rajdhani', sans-serif";
    } else if (theme.id === 'cyberpunk') {
      return "'Audiowide', 'Rajdhani', sans-serif";
    }
    return theme.font;
  };

  return (
    <div className="rounded-xl p-6" style={{ 
      backgroundColor: currentTheme.bgSecondary,
      borderRadius: currentTheme.radius 
    }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className={`text-xl font-bold flex items-center gap-2 ${
          isNeonTheme ? 'sl-glow-text' : ''
        }`} style={{ 
          color: currentTheme.textPrimary,
          fontFamily: getThemeFont(currentTheme)
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48 2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48 2.83-2.83" />
          </svg>
          <span>
            {isNeonTheme ? 'APPEARANCE SETTINGS' : 'Appearance'}
          </span>
        </h3>
        <div className="flex gap-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                isNeonTheme ? 'sl-glow-text' : ''
              }`}
              style={{ 
                backgroundColor: activeTab === tab.id ? currentTheme.primaryColor : currentTheme.bgTertiary,
                color: activeTab === tab.id ? '#ffffff' : currentTheme.textSecondary,
                borderRadius: currentTheme.radius,
                fontFamily: getThemeFont(currentTheme),
                letterSpacing: isNeonTheme || isCyberpunk ? '0.05em' : 'normal'
              }}
            >
            {isNeonTheme ? 
              tab.label.toUpperCase() : 
              tab.label
            }
            </button>
          ))}
        </div>
      </div>

      {/* Themes Tab */}
      {activeTab === 'themes' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.values(themes).map((theme) => {
              const themeStyle = getThemeCardStyle(theme);
              const isThemeNeon = theme.id.includes('neon');
              const isThemeCyberpunk = theme.id === 'cyberpunk';
              
              return (
                <motion.div
                  key={theme.id}
                  className={`relative overflow-hidden cursor-pointer group transition-all duration-200 ${
                    currentTheme.id === theme.id ? 'ring-2' : ''
                  } ${themeStyle.cardWrapperClass}`}
                  style={{ 
                    borderRadius: theme.radius,
                    boxShadow: currentTheme.id === theme.id ? themeStyle.cardShadow : 'none',
                    ringColor: theme.primaryColor
                  }}
                  onClick={() => setTheme(theme.id)}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Theme Preview */}
                  <div 
                    className={`h-28 ${themeStyle.previewClass}`} 
                    style={{ backgroundColor: theme.bgPrimary }}
                  >
                    <div className="flex h-full w-full">
                      <div className="w-2/3 flex flex-col">
                        <div className="flex-1 flex">
                          <div className="w-1/2 p-2">
                            <div className="h-full w-full rounded-sm" style={{ 
                              backgroundColor: theme.bgSecondary,
                              borderRadius: theme.radius
                            }}></div>
                          </div>
                          <div className="w-1/2 p-2">
                            <div className="h-full w-full rounded-sm" style={{ 
                              backgroundColor: theme.bgTertiary,
                              borderRadius: theme.radius
                            }}></div>
                          </div>
                        </div>
                      </div>
                      <div className="w-1/3 p-2 flex flex-col justify-around">
                        <div className="h-4 w-full rounded-sm" style={{ 
                          backgroundColor: theme.accentColor,
                          borderRadius: theme.radius
                        }}></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Theme Info */}
                  <div 
                    className={`p-3 flex justify-between items-center ${themeStyle.cardFooterClass}`}
                    style={{ backgroundColor: theme.cardBg }}
                  >
                    <span className={themeStyle.nameClass} style={{ 
                      color: theme.textPrimary,
                      fontFamily: getThemeFont(theme)
                    }}>
                      {isThemeNeon
                        ? `[ ${theme.name.toUpperCase()} ]` 
                        : theme.name}
                    </span>
                    
                    {/* Active theme indicator */}
                    <div 
                      className="w-5 h-5 flex items-center justify-center transition-all duration-300 relative overflow-hidden"
                      style={{
                        borderRadius: theme.radius === '0' ? '0' : '50%',
                        border: `2px solid ${theme.borderColor}`,
                        backgroundColor: currentTheme.id === theme.id ? theme.primaryColor : 'transparent'
                      }}
                    >
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* Preview Tab */}
      {activeTab === 'preview' && (
        <div className="space-y-6">
          {/* UI Elements */}
          <div className="space-y-6 p-6 rounded-lg" style={{
            backgroundColor: currentTheme.cardBg,
            borderRadius: currentTheme.radius,
            boxShadow: currentTheme.shadow
          }}>
            <h4 className={`text-lg font-medium ${isNeonTheme ? 'sl-glow-text selected' : ''}`}
               style={{ 
                 color: currentTheme.textPrimary,
                 fontFamily: getThemeFont(currentTheme)
               }}>
              {isNeonTheme ? '[ UI ELEMENTS ]' : 'UI Elements'}
            </h4>
            
            <div className="space-y-4">
              {/* Buttons */}
              <div>
                <p className={`text-sm mb-2 ${isNeonTheme ? 'sl-glow-text' : ''}`}
                   style={{ 
                     color: isNeonTheme ? currentTheme.textPrimary : currentTheme.textSecondary,
                     fontFamily: getThemeFont(currentTheme)
                   }}>
                  {isNeonTheme ? '[ BUTTONS ]' : 'Buttons'}
                </p>
                <div className="flex flex-wrap gap-3">
                  <button 
                    className={isNeonTheme ? 'sl-glow-text px-4 py-2 border border-current' : 'px-4 py-2'}
                    style={{ 
                      backgroundColor: isNeonTheme ? 'transparent' : currentTheme.primaryColor, 
                      color: isNeonTheme ? currentTheme.primaryColor : "#ffffff",
                      borderRadius: currentTheme.radius,
                      fontFamily: getThemeFont(currentTheme)
                    }}
                  >
                    {isNeonTheme ? '[ PRIMARY ]' : 'Primary'}
                  </button>
                  <button 
                    className={isNeonTheme ? 'sl-glow-text px-4 py-2 border border-current' : 'px-4 py-2'}
                    style={{ 
                      backgroundColor: isNeonTheme ? 'transparent' : currentTheme.secondaryColor, 
                      color: isNeonTheme ? currentTheme.secondaryColor : "#ffffff",
                      borderRadius: currentTheme.radius,
                      fontFamily: getThemeFont(currentTheme)
                    }}
                  >
                    {isNeonTheme ? '[ SECONDARY ]' : 'Secondary'}
                  </button>
                  <button 
                    className={isNeonTheme ? 'sl-glow-text px-4 py-2 border border-current' : 'px-4 py-2'}
                    style={{ 
                      backgroundColor: isNeonTheme ? 'transparent' : currentTheme.accentColor, 
                      color: isNeonTheme ? currentTheme.accentColor : "#ffffff",
                      borderRadius: currentTheme.radius,
                      fontFamily: getThemeFont(currentTheme)
                    }}
                  >
                    {isNeonTheme ? '[ ACCENT ]' : 'Accent'}
                  </button>
                  <button 
                    className="px-4 py-2 font-medium transition-colors border"
                    style={{ 
                      borderColor: currentTheme.borderColor,
                      color: currentTheme.textPrimary,
                      borderRadius: currentTheme.radius,
                      fontFamily: getThemeFont(currentTheme)
                    }}
                  >
                    {isNeonTheme ? '[ OUTLINE ]' : 'Outline'}
                  </button>
                </div>
              </div>
              
              {/* Cards */}
              <div>
                <p className={`text-sm mb-2 ${isNeonTheme ? 'sl-glow-text' : ''}`}
                   style={{ 
                     color: isNeonTheme ? currentTheme.textPrimary : currentTheme.textSecondary,
                     fontFamily: getThemeFont(currentTheme)
                   }}>
                  {isNeonTheme ? '[ CARDS ]' : 'Cards'}
                </p>
                <div className="flex flex-wrap gap-4">
                  <div 
                    className="p-4 w-48"
                    style={{ 
                      backgroundColor: currentTheme.bgSecondary,
                      color: currentTheme.textPrimary,
                      borderRadius: currentTheme.radius,
                      boxShadow: currentTheme.shadow,
                      border: `${currentTheme.borderWidth} solid ${currentTheme.borderColor}`
                    }}
                  >
                    <h5 className={`font-medium mb-2 ${isNeonTheme ? 'sl-glow-text' : ''}`}
                        style={{ fontFamily: getThemeFont(currentTheme) }}>
                      {isNeonTheme ? '[ CARD ]' : 'Card Title'}
                    </h5>
                    <p className="text-sm" style={{ 
                      color: currentTheme.textSecondary,
                      fontFamily: getThemeFont(currentTheme)
                    }}>
                      This is a sample card with some content.
                    </p>
                  </div>
                  <div 
                    className="p-4 w-48"
                    style={{ 
                      backgroundColor: currentTheme.bgTertiary,
                      color: currentTheme.textPrimary,
                      borderRadius: currentTheme.radius,
                      boxShadow: currentTheme.shadow,
                      border: `${currentTheme.borderWidth} solid ${currentTheme.borderColor}`
                    }}
                  >
                    <h5 className={`font-medium mb-2 ${isNeonTheme ? 'sl-glow-text' : ''}`}
                        style={{ fontFamily: getThemeFont(currentTheme) }}>
                      {isNeonTheme ? '[ PROGRESS ]' : 'Progress'}
                    </h5>
                    <div className="w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: currentTheme.bgPrimary }}>
                      <div className="h-full" style={{ width: '70%', backgroundColor: currentTheme.primaryColor }}></div>
                    </div>
                    <p className="text-sm mt-2" style={{ 
                      color: currentTheme.textSecondary,
                      fontFamily: getThemeFont(currentTheme)
                    }}>
                      70% Complete
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Form Elements */}
              <div>
                <p className={`text-sm mb-2 ${isNeonTheme ? 'sl-glow-text' : ''}`}
                   style={{ 
                     color: isNeonTheme ? currentTheme.textPrimary : currentTheme.textSecondary,
                     fontFamily: getThemeFont(currentTheme)
                   }}>
                  {isNeonTheme ? '[ FORM ELEMENTS ]' : 'Form Elements'}
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="w-64">
                    <label className={`block text-sm mb-1 ${isNeonTheme ? 'sl-glow-text' : ''}`}
                           style={{ 
                             color: currentTheme.textPrimary,
                             fontFamily: getThemeFont(currentTheme)
                           }}>
                      {isNeonTheme ? '[ INPUT FIELD ]' : 'Input Field'}
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2"
                      placeholder="Type something..."
                      style={{
                        backgroundColor: currentTheme.inputBg,
                        color: currentTheme.textPrimary,
                        borderColor: currentTheme.inputBorder,
                        borderRadius: currentTheme.radius,
                        borderWidth: currentTheme.borderWidth,
                        borderStyle: 'solid',
                        fontFamily: getThemeFont(currentTheme)
                      }}
                    />
                  </div>
                  <div className="w-64">
                    <label className={`block text-sm mb-1 ${isNeonTheme ? 'sl-glow-text' : ''}`}
                           style={{ 
                             color: currentTheme.textPrimary,
                             fontFamily: getThemeFont(currentTheme)
                           }}>
                      {isNeonTheme ? '[ SELECT ELEMENT ]' : 'Select Element'}
                    </label>
                    <select
                      className="w-full px-4 py-2"
                      style={{
                        backgroundColor: currentTheme.inputBg,
                        color: currentTheme.textPrimary,
                        borderColor: currentTheme.inputBorder,
                        borderRadius: currentTheme.radius,
                        borderWidth: currentTheme.borderWidth,
                        borderStyle: 'solid',
                        fontFamily: getThemeFont(currentTheme)
                      }}
                    >
                      <option>Option 1</option>
                      <option>Option 2</option>
                      <option>Option 3</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Neon Theme Terminal Output */}
              {isNeonTheme && (
                <div className="mt-6 p-4" style={{ 
                  backgroundColor: 'rgba(0,0,0,0.3)', 
                  border: `1px solid ${currentTheme.borderColor}`,
                  borderRadius: currentTheme.radius
                }}>
                  <div className="font-mono text-sm space-y-2" style={{ fontFamily: getThemeFont(currentTheme) }}>
                    <p className="sl-glow-text selected" style={{ color: currentTheme.textPrimary }}>SYSTEM INITIALIZED</p>
                    <p style={{ color: currentTheme.textSecondary }}>&gt; Loading interface components...</p>
                    <p style={{ color: currentTheme.textSecondary }}>&gt; Connecting to visual subsystems...</p>
                    <p className="sl-glow-text" style={{ color: currentTheme.textPrimary }}>ACCESS GRANTED</p>
                    <p style={{ color: currentTheme.primaryColor }}>&gt; {currentTheme.name} theme activated</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeSettings;