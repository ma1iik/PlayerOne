import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import ThemeContext from '../context/ThemeContext';

const ThemeSettings = () => {
  const { currentTheme, setTheme, themes } = useContext(ThemeContext);
  const [activeTab, setActiveTab] = useState('themes');

  const isNeonTheme = currentTheme.id.includes('neon');
  const isCyberpunk = currentTheme.id === 'cyberpunk';

  const tabs = [
    { id: 'themes', label: 'Themes' },
    { id: 'preview', label: 'Preview' }
  ];

  // Get font styling based on theme
  const getThemeFont = (theme) => {
    if (theme.id.includes('neon')) {
      return "'Orbitron', 'Rajdhani', sans-serif";
    } else if (theme.id === 'cyberpunk') {
      return "'Audiowide', 'Rajdhani', sans-serif";
    }
    return theme.font;
  };

  // Generate the color pill component for theme cards
  const ColorPill = ({ color, label }) => (
    <div className="flex items-center gap-1.5">
      <div 
        className="w-3 h-3 rounded-full" 
        style={{ backgroundColor: color }}
      />
      <span className="text-xs" style={{ color: currentTheme.textSecondary }}>{label}</span>
    </div>
  );

  return (
    <div className="rounded-lg overflow-hidden" style={{ 
      backgroundColor: currentTheme.bgSecondary,
      borderRadius: currentTheme.radius,
      boxShadow: currentTheme.shadow,
      border: `${currentTheme.borderWidth} solid ${currentTheme.borderColor}`
    }}>
      {/* Header with tabs */}
      <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: currentTheme.borderColor }}>
        <h3 className="text-lg font-semibold flex items-center gap-2" style={{ color: currentTheme.textPrimary }}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
          {isNeonTheme ? 'APPEARANCE' : 'Appearance'}
        </h3>
        
        <div className="flex p-1 bg-gray-100 rounded-lg" style={{ 
          backgroundColor: currentTheme.bgTertiary,
          borderRadius: currentTheme.radius
        }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="px-3 py-1.5 text-sm font-medium transition-colors"
              style={{ 
                backgroundColor: activeTab === tab.id ? currentTheme.bgSecondary : 'transparent',
                color: activeTab === tab.id ? currentTheme.textPrimary : currentTheme.textSecondary,
                borderRadius: `calc(${currentTheme.radius} - 2px)`,
                boxShadow: activeTab === tab.id ? '0 1px 2px rgba(0,0,0,0.05)' : 'none'
              }}
            >
              {isNeonTheme ? tab.label.toUpperCase() : tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content area */}
      <div className="p-4">
        {activeTab === 'themes' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.values(themes).map((theme) => {
              const isActive = currentTheme.id === theme.id;
              const isThemeNeon = theme.id.includes('neon');
              const isThemeCyberpunk = theme.id === 'cyberpunk';
              
              return (
                <motion.div
                  key={theme.id}
                  className="relative overflow-hidden cursor-pointer transition-all duration-200"
                  style={{ 
                    borderRadius: theme.radius,
                    border: `1px solid ${isActive ? theme.primaryColor : currentTheme.borderColor}`,
                    backgroundColor: isActive ? `${theme.primaryColor}10` : currentTheme.bgSecondary,
                    boxShadow: isActive ? `0 0 0 1px ${theme.primaryColor}40` : currentTheme.shadow
                  }}
                  onClick={() => setTheme(theme.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Theme Preview */}
                  <div className="p-3" style={{ backgroundColor: theme.bgPrimary }}>
                    <div className="flex gap-2 mb-2">
                      <div className="flex-1 h-6 rounded" style={{ 
                        backgroundColor: theme.bgSecondary,
                        borderRadius: theme.radius 
                      }}></div>
                      <div className="w-8 h-6 rounded" style={{ 
                        backgroundColor: theme.primaryColor,
                        borderRadius: theme.radius 
                      }}></div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div className="h-10 rounded" style={{ 
                        backgroundColor: theme.bgSecondary,
                        borderRadius: theme.radius 
                      }}></div>
                      <div className="h-10 rounded" style={{ 
                        backgroundColor: theme.bgTertiary,
                        borderRadius: theme.radius 
                      }}></div>
                    </div>
                    
                    <div className="h-2 w-full rounded-full overflow-hidden" style={{ backgroundColor: `${theme.primaryColor}30` }}>
                      <div className="h-full w-3/4" style={{ backgroundColor: theme.primaryColor }}></div>
                    </div>
                  </div>
                  
                  {/* Theme Info */}
                  <div className="p-3 flex items-center justify-between" style={{ backgroundColor: theme.bgSecondary }}>
                    <div>
                      <h3 className="font-medium mb-1" style={{ 
                        color: theme.textPrimary,
                        fontFamily: getThemeFont(theme)
                      }}>
                        {isThemeNeon || isThemeCyberpunk ? theme.name.toUpperCase() : theme.name}
                      </h3>
                      
                      <div className="flex gap-2">
                        <ColorPill color={theme.primaryColor} label="Primary" />
                        <ColorPill color={theme.secondaryColor} label="Secondary" />
                      </div>
                    </div>
                    
                    {/* Active theme indicator */}
                    {isActive && (
                      <div 
                        className="w-6 h-6 rounded-full flex items-center justify-center" 
                        style={{ backgroundColor: theme.primaryColor }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {activeTab === 'preview' && (
          <div className="space-y-6">
            {/* UI Elements */}
            <div className="p-5 rounded-lg" style={{
              backgroundColor: currentTheme.bgTertiary,
              borderRadius: currentTheme.radius
            }}>
              <h4 className="text-base font-medium mb-4" style={{ color: currentTheme.textPrimary }}>
                {isNeonTheme ? 'UI ELEMENTS' : 'UI Elements'}
              </h4>
              
              <div className="space-y-5">
                {/* Buttons */}
                <div>
                  <h5 className="text-sm mb-3" style={{ color: currentTheme.textSecondary }}>
                    {isNeonTheme ? 'BUTTONS' : 'Buttons'}
                  </h5>
                  <div className="flex flex-wrap gap-3">
                    <button className="px-4 py-2 font-medium rounded" style={{ 
                      backgroundColor: currentTheme.primaryColor,
                      color: '#ffffff',
                      borderRadius: currentTheme.radius
                    }}>
                      Primary
                    </button>
                    <button className="px-4 py-2 font-medium rounded" style={{ 
                      backgroundColor: currentTheme.secondaryColor,
                      color: '#ffffff',
                      borderRadius: currentTheme.radius
                    }}>
                      Secondary
                    </button>
                    <button className="px-4 py-2 font-medium rounded border" style={{ 
                      borderColor: currentTheme.borderColor,
                      color: currentTheme.textPrimary,
                      borderRadius: currentTheme.radius
                    }}>
                      Outline
                    </button>
                  </div>
                </div>
                
                {/* Cards */}
                <div>
                  <h5 className="text-sm mb-3" style={{ color: currentTheme.textSecondary }}>
                    {isNeonTheme ? 'CARDS' : 'Cards'}
                  </h5>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 rounded-lg" style={{ 
                      backgroundColor: currentTheme.bgSecondary,
                      borderRadius: currentTheme.radius,
                      boxShadow: currentTheme.shadow,
                      border: `${currentTheme.borderWidth} solid ${currentTheme.borderColor}`
                    }}>
                      <h6 className="font-medium mb-2" style={{ color: currentTheme.textPrimary }}>
                        Card Title
                      </h6>
                      <p className="text-sm" style={{ color: currentTheme.textSecondary }}>
                        This is a sample card.
                      </p>
                    </div>
                    <div className="p-3 rounded-lg" style={{ 
                      backgroundColor: currentTheme.bgSecondary,
                      borderRadius: currentTheme.radius,
                      boxShadow: currentTheme.shadow,
                      border: `${currentTheme.borderWidth} solid ${currentTheme.borderColor}`
                    }}>
                      <h6 className="font-medium mb-2" style={{ color: currentTheme.textPrimary }}>
                        Progress
                      </h6>
                      <div className="w-full h-2 rounded-full overflow-hidden mb-2" style={{ backgroundColor: `${currentTheme.primaryColor}20` }}>
                        <div className="h-full" style={{ width: '70%', backgroundColor: currentTheme.primaryColor }}></div>
                      </div>
                      <p className="text-xs" style={{ color: currentTheme.textSecondary }}>
                        70% Complete
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Form Elements */}
                <div>
                  <h5 className="text-sm mb-3" style={{ color: currentTheme.textSecondary }}>
                    {isNeonTheme ? 'FORM ELEMENTS' : 'Form Elements'}
                  </h5>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm mb-1" style={{ color: currentTheme.textPrimary }}>
                        Input Field
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 rounded"
                        placeholder="Type here..."
                        style={{
                          backgroundColor: currentTheme.inputBg,
                          color: currentTheme.textPrimary,
                          borderColor: currentTheme.inputBorder,
                          borderRadius: currentTheme.radius,
                          borderWidth: currentTheme.borderWidth,
                          borderStyle: 'solid'
                        }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-1" style={{ color: currentTheme.textPrimary }}>
                        Select
                      </label>
                      <select
                        className="w-full px-3 py-2 rounded appearance-none"
                        style={{
                          backgroundColor: currentTheme.inputBg,
                          color: currentTheme.textPrimary,
                          borderColor: currentTheme.inputBorder,
                          borderRadius: currentTheme.radius,
                          borderWidth: currentTheme.borderWidth,
                          borderStyle: 'solid'
                        }}
                      >
                        <option>Option 1</option>
                        <option>Option 2</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Theme color palette */}
            <div className="p-5 rounded-lg" style={{
              backgroundColor: currentTheme.bgTertiary,
              borderRadius: currentTheme.radius
            }}>
              <h4 className="text-base font-medium mb-4" style={{ color: currentTheme.textPrimary }}>
                {isNeonTheme ? 'COLOR PALETTE' : 'Color Palette'}
              </h4>
              
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <div className="h-12 rounded-t-lg" style={{ 
                    backgroundColor: currentTheme.primaryColor,
                    borderTopLeftRadius: currentTheme.radius,
                    borderTopRightRadius: currentTheme.radius
                  }}></div>
                  <div className="py-2 px-3 text-center bg-white rounded-b-lg shadow-sm" style={{
                    backgroundColor: currentTheme.bgSecondary,
                    borderBottomLeftRadius: currentTheme.radius,
                    borderBottomRightRadius: currentTheme.radius
                  }}>
                    <p className="text-xs font-medium" style={{ color: currentTheme.textPrimary }}>Primary</p>
                    <p className="text-xs mt-1" style={{ color: currentTheme.textSecondary }}>{currentTheme.primaryColor}</p>
                  </div>
                </div>
                
                <div>
                  <div className="h-12 rounded-t-lg" style={{ 
                    backgroundColor: currentTheme.secondaryColor,
                    borderTopLeftRadius: currentTheme.radius,
                    borderTopRightRadius: currentTheme.radius
                  }}></div>
                  <div className="py-2 px-3 text-center bg-white rounded-b-lg shadow-sm" style={{
                    backgroundColor: currentTheme.bgSecondary,
                    borderBottomLeftRadius: currentTheme.radius,
                    borderBottomRightRadius: currentTheme.radius
                  }}>
                    <p className="text-xs font-medium" style={{ color: currentTheme.textPrimary }}>Secondary</p>
                    <p className="text-xs mt-1" style={{ color: currentTheme.textSecondary }}>{currentTheme.secondaryColor}</p>
                  </div>
                </div>
                
                <div>
                  <div className="h-12 rounded-t-lg" style={{ 
                    backgroundColor: currentTheme.accentColor,
                    borderTopLeftRadius: currentTheme.radius,
                    borderTopRightRadius: currentTheme.radius
                  }}></div>
                  <div className="py-2 px-3 text-center bg-white rounded-b-lg shadow-sm" style={{
                    backgroundColor: currentTheme.bgSecondary,
                    borderBottomLeftRadius: currentTheme.radius,
                    borderBottomRightRadius: currentTheme.radius
                  }}>
                    <p className="text-xs font-medium" style={{ color: currentTheme.textPrimary }}>Accent</p>
                    <p className="text-xs mt-1" style={{ color: currentTheme.textSecondary }}>{currentTheme.accentColor}</p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-3 mt-3">
                <div>
                  <div className="h-12 rounded-t-lg" style={{ 
                    backgroundColor: currentTheme.bgPrimary,
                    borderTopLeftRadius: currentTheme.radius,
                    borderTopRightRadius: currentTheme.radius,
                    border: `1px solid ${currentTheme.borderColor}`
                  }}></div>
                  <div className="py-2 px-3 text-center bg-white rounded-b-lg shadow-sm" style={{
                    backgroundColor: currentTheme.bgSecondary,
                    borderBottomLeftRadius: currentTheme.radius,
                    borderBottomRightRadius: currentTheme.radius
                  }}>
                    <p className="text-xs font-medium" style={{ color: currentTheme.textPrimary }}>Background</p>
                    <p className="text-xs mt-1" style={{ color: currentTheme.textSecondary }}>Primary</p>
                  </div>
                </div>
                
                <div>
                  <div className="h-12 rounded-t-lg" style={{ 
                    backgroundColor: currentTheme.bgSecondary,
                    borderTopLeftRadius: currentTheme.radius,
                    borderTopRightRadius: currentTheme.radius,
                    border: `1px solid ${currentTheme.borderColor}`
                  }}></div>
                  <div className="py-2 px-3 text-center bg-white rounded-b-lg shadow-sm" style={{
                    backgroundColor: currentTheme.bgSecondary,
                    borderBottomLeftRadius: currentTheme.radius,
                    borderBottomRightRadius: currentTheme.radius
                  }}>
                    <p className="text-xs font-medium" style={{ color: currentTheme.textPrimary }}>Background</p>
                    <p className="text-xs mt-1" style={{ color: currentTheme.textSecondary }}>Secondary</p>
                  </div>
                </div>
                
                <div>
                  <div className="h-12 rounded-t-lg" style={{ 
                    backgroundColor: currentTheme.bgTertiary,
                    borderTopLeftRadius: currentTheme.radius,
                    borderTopRightRadius: currentTheme.radius,
                    border: `1px solid ${currentTheme.borderColor}`
                  }}></div>
                  <div className="py-2 px-3 text-center bg-white rounded-b-lg shadow-sm" style={{
                    backgroundColor: currentTheme.bgSecondary,
                    borderBottomLeftRadius: currentTheme.radius,
                    borderBottomRightRadius: currentTheme.radius
                  }}>
                    <p className="text-xs font-medium" style={{ color: currentTheme.textPrimary }}>Background</p>
                    <p className="text-xs mt-1" style={{ color: currentTheme.textSecondary }}>Tertiary</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Current theme details */}
            <div className="p-5 rounded-lg border" style={{
              backgroundColor: currentTheme.bgSecondary,
              borderRadius: currentTheme.radius,
              borderColor: currentTheme.borderColor
            }}>
              <h4 className="text-base font-medium mb-3" style={{ color: currentTheme.textPrimary }}>
                {isNeonTheme ? 'CURRENT THEME' : 'Current Theme'}
              </h4>
              
              <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                <div>
                  <p className="text-xs mb-1" style={{ color: currentTheme.textSecondary }}>Theme Name</p>
                  <p className="text-sm font-medium" style={{ color: currentTheme.textPrimary }}>{currentTheme.name}</p>
                </div>
                <div>
                  <p className="text-xs mb-1" style={{ color: currentTheme.textSecondary }}>ID</p>
                  <p className="text-sm font-medium" style={{ color: currentTheme.textPrimary }}>{currentTheme.id}</p>
                </div>
                <div>
                  <p className="text-xs mb-1" style={{ color: currentTheme.textSecondary }}>Border Radius</p>
                  <p className="text-sm font-medium" style={{ color: currentTheme.textPrimary }}>{currentTheme.radius}</p>
                </div>
                <div>
                  <p className="text-xs mb-1" style={{ color: currentTheme.textSecondary }}>Font</p>
                  <p className="text-sm font-medium" style={{ color: currentTheme.textPrimary }}>{
                    currentTheme.font.includes("'")
                      ? currentTheme.font.split("'")[1]
                      : currentTheme.font
                  }</p>
                </div>
              </div>
            </div>
            
            {/* Neon theme terminal output - only shown for neon themes */}
            {isNeonTheme && (
              <div className="p-4 rounded-lg" style={{ 
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
        )}
      </div>
    </div>
  );
};

export default ThemeSettings;