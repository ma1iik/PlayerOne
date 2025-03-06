import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../context/ThemeContext';

const ThemeSettings = () => {
  const { currentTheme, setTheme, themes } = useContext(ThemeContext);
  const [activeTab, setActiveTab] = useState('themes');

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
          activeIndicatorClass: 'bg-purple-700 text-purple-100 border border-purple-500 sl-glow-text font-bold',
          cardShadow: '0 0 15px rgba(126, 34, 206, 0.5)'
        };
      case 'neon-orange':
        return {
          cardWrapperClass: 'sl-scan-line',
          cardHeaderClass: 'border-b border-orange-500',
          cardFooterClass: 'border-t border-orange-500 bg-opacity-30 bg-orange-900',
          nameClass: 'sl-glow-text font-orbitron tracking-wide',
          previewClass: 'border border-orange-500',
          activeIndicatorClass: 'bg-orange-600 text-orange-100 border border-orange-400 sl-glow-text font-bold',
          cardShadow: '0 0 15px rgba(245, 158, 11, 0.5)'
        };
      default:
        return {
          cardWrapperClass: '',
          cardHeaderClass: '',
          cardFooterClass: '',
          nameClass: 'font-medium',
          previewClass: '',
          activeIndicatorClass: 'bg-primary text-white',
          cardShadow: ''
        };
    }
  };

  return (
    <div className="rounded-xl p-6" style={{ 
      backgroundColor: currentTheme.bgSecondary,
      borderRadius: currentTheme.radius 
    }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className={`text-xl font-bold text-textPrimary flex items-center gap-2 ${
          currentTheme.id.includes('neon') ? 'sl-glow-text' : ''
        }`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48 2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48 2.83-2.83" />
          </svg>
          <span>
            {currentTheme.id.includes('neon') ? 'APPEARANCE SETTINGS' : 'Appearance'}
          </span>
        </h3>
        <div className="flex gap-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? currentTheme.id.includes('neon')
                    ? 'bg-primaryColor text-white active-tab'
                    : 'bg-primaryColor text-white'
                  : 'bg-bgTertiary text-textSecondary hover:text-textPrimary'
              }`}
              style={{ borderRadius: currentTheme.radius }}
            >
              {currentTheme.id.includes('neon') ? (
                <span className={activeTab === tab.id ? 'sl-glow-text' : ''}>{tab.label}</span>
              ) : (
                tab.label
              )}
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
              
              return (
                <motion.div
                  key={theme.id}
                  className={`relative overflow-hidden cursor-pointer group transition-all duration-200 ${
                    currentTheme.id === theme.id ? 'ring-2 ring-primaryColor' : ''
                  } ${themeStyle.cardWrapperClass}`}
                  style={{ 
                    borderRadius: theme.radius,
                    boxShadow: currentTheme.id === theme.id ? themeStyle.cardShadow : 'none'
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
                    <span className={themeStyle.nameClass} style={{ color: theme.textPrimary }}>
                      {theme.id.includes('neon') 
                        ? `[ ${theme.name.toUpperCase()} ]` 
                        : theme.name}
                    </span>
                    
                    {currentTheme.id === theme.id ? (
                      <div 
                        className={`px-2 py-1 text-xs rounded-sm flex items-center ${themeStyle.activeIndicatorClass}`}
                        style={{ borderRadius: theme.radius }}
                      >
                        {theme.id.includes('neon') ? 'ACTIVATED' : 'Active'}
                      </div>
                    ) : (
                      <div 
                        className="w-5 h-5 flex items-center justify-center"
                        style={{
                          borderRadius: theme.radius === '0' ? '0' : '50%',
                          border: `2px solid ${theme.borderColor}`
                        }}
                      ></div>
                    )}
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
            <h4 className={`text-lg font-medium ${currentTheme.id.includes('neon') ? 'sl-glow-text selected' : ''}`}>
              {currentTheme.id.includes('neon') ? '[ UI ELEMENTS ]' : 'UI Elements'}
            </h4>
            
            <div className="space-y-4">
              {/* Buttons */}
              <div>
                <p className={`text-sm mb-2 ${currentTheme.id.includes('neon') ? 'sl-glow-text' : 'text-textSecondary'}`}>
                  Buttons
                </p>
                <div className="flex flex-wrap gap-3">
                  <button 
                    className={`btn ${currentTheme.id.includes('neon') ? 'sl-glow-text' : ''}`}
                    style={{ 
                      backgroundColor: currentTheme.id.includes('neon') ? 'transparent' : currentTheme.primaryColor, 
                      color: "white",
                      borderRadius: currentTheme.radius
                    }}
                  >
                    Primary
                  </button>
                  <button 
                    className={`btn ${currentTheme.id.includes('neon') ? 'sl-glow-text' : ''}`}
                    style={{ 
                      backgroundColor: currentTheme.id.includes('neon') ? 'transparent' : currentTheme.secondaryColor, 
                      color: "white",
                      borderRadius: currentTheme.radius
                    }}
                  >
                    Secondary
                  </button>
                  <button 
                    className={`btn ${currentTheme.id.includes('neon') ? 'sl-glow-text' : ''}`}
                    style={{ 
                      backgroundColor: currentTheme.id.includes('neon') ? 'transparent' : currentTheme.accentColor, 
                      color: "white",
                      borderRadius: currentTheme.radius
                    }}
                  >
                    Accent
                  </button>
                  <button 
                    className={`px-4 py-2 font-medium transition-colors border ${currentTheme.id.includes('neon') ? 'sl-glow-text' : ''}`}
                    style={{ 
                      borderColor: currentTheme.borderColor,
                      color: currentTheme.textPrimary,
                      borderRadius: currentTheme.radius
                    }}
                  >
                    Outline
                  </button>
                </div>
              </div>
              
              {/* Cards */}
              <div>
                <p className={`text-sm mb-2 ${currentTheme.id.includes('neon') ? 'sl-glow-text' : 'text-textSecondary'}`}>
                  Cards
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
                    <h5 className={`font-medium mb-2 ${currentTheme.id.includes('neon') ? 'sl-glow-text' : ''}`}>
                      {currentTheme.id.includes('neon') ? '[ CARD ]' : 'Card Title'}
                    </h5>
                    <p className="text-sm" style={{ color: currentTheme.textSecondary }}>
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
                    <h5 className={`font-medium mb-2 ${currentTheme.id.includes('neon') ? 'sl-glow-text' : ''}`}>
                      {currentTheme.id.includes('neon') ? '[ PROGRESS ]' : 'Progress'}
                    </h5>
                    <div className="w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: currentTheme.bgPrimary }}>
                      <div className="h-full" style={{ width: '70%', backgroundColor: currentTheme.primaryColor }}></div>
                    </div>
                    <p className="text-sm mt-2" style={{ color: currentTheme.textSecondary }}>
                      70% Complete
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Form Elements */}
              <div>
                <p className={`text-sm mb-2 ${currentTheme.id.includes('neon') ? 'sl-glow-text' : 'text-textSecondary'}`}>
                  Form Elements
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="w-64">
                    <label className={`block text-sm mb-1 ${currentTheme.id.includes('neon') ? 'sl-glow-text' : ''}`}>
                      Input Field
                    </label>
                    <input
                      type="text"
                      className="input"
                      placeholder="Type something..."
                      style={{
                        backgroundColor: currentTheme.inputBg,
                        color: currentTheme.textPrimary,
                        borderColor: currentTheme.inputBorder,
                        borderRadius: currentTheme.radius,
                        borderWidth: currentTheme.borderWidth
                      }}
                    />
                  </div>
                  <div className="w-64">
                    <label className={`block text-sm mb-1 ${currentTheme.id.includes('neon') ? 'sl-glow-text' : ''}`}>
                      Select Element
                    </label>
                    <select
                      className="input"
                      style={{
                        backgroundColor: currentTheme.inputBg,
                        color: currentTheme.textPrimary,
                        borderColor: currentTheme.inputBorder,
                        borderRadius: currentTheme.radius,
                        borderWidth: currentTheme.borderWidth
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
              {currentTheme.id.includes('neon') && (
                <div className="mt-6 p-4" style={{ 
                  backgroundColor: 'rgba(0,0,0,0.3)', 
                  border: `1px solid ${currentTheme.borderColor}`,
                  borderRadius: currentTheme.radius
                }}>
                  <div className="font-mono text-sm space-y-2">
                    <p className="sl-glow-text selected">SYSTEM INITIALIZED</p>
                    <p className="text-textSecondary">&gt; Loading interface components...</p>
                    <p className="text-textSecondary">&gt; Connecting to visual subsystems...</p>
                    <p className="sl-glow-text">ACCESS GRANTED</p>
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