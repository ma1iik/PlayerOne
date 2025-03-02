import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../context/ThemeContext';

const ThemeSettings = () => {
  const { currentTheme, setTheme, themes: allThemes } = useContext(ThemeContext);
  const [activeTab, setActiveTab] = useState('themes');

  // Filter out the FOREST theme
  const themes = Object.fromEntries(
    Object.entries(allThemes).filter(([key]) => key !== "FOREST")
  );

  const tabs = [
    { id: 'themes', label: 'Themes' },
    { id: 'preview', label: 'Preview' }
  ];

  return (
    <div className="bg-bgSecondary rounded-xl p-6" style={{ borderRadius: currentTheme.radius }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-textPrimary flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48 2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48 2.83-2.83" />
          </svg>
          Appearance
        </h3>
        <div className="flex gap-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === tab.id
                  ? 'bg-primaryColor text-white'
                  : 'bg-bgTertiary text-textSecondary hover:text-textPrimary'
              }`}
              style={{ borderRadius: currentTheme.radius }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Themes Tab */}
      {activeTab === 'themes' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {Object.values(themes).map((theme) => (
              <motion.div
                key={theme.id}
                className={`relative rounded-lg overflow-hidden cursor-pointer group transition-all duration-200 ${
                  currentTheme.id === theme.id ? 'ring-2 ring-primaryColor' : ''
                }`}
                style={{ 
                  borderRadius: theme.id === 'sololeveling' ? '0' : currentTheme.radius,
                  border: theme.id === 'sololeveling' ? '1px solid #4f46e5' : 'none',
                }}
                onClick={() => setTheme(theme.id)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Theme Preview - Simplified */}
                <div 
                  className="h-24" 
                  style={{ 
                    backgroundColor: theme.bgPrimary,
                    ...(theme.id === 'sololeveling' && {
                      boxShadow: '0 0 8px rgba(79, 70, 229, 0.5) inset'
                    })
                  }}
                >
                  {/* Simple color showcase */}
                  <div className="flex h-full w-full">
                    <div className="w-2/3 flex flex-col">
                      <div className="flex-1 flex">
                        <div className="w-1/2 p-2">
                          <div className="h-full w-full rounded-sm" style={{ 
                            backgroundColor: theme.bgSecondary,
                            borderRadius: theme.id === 'sololeveling' ? '0' : '0.25rem'
                          }}></div>
                        </div>
                        <div className="w-1/2 p-2">
                          <div className="h-full w-full rounded-sm" style={{ 
                            backgroundColor: theme.bgTertiary,
                            borderRadius: theme.id === 'sololeveling' ? '0' : '0.25rem'
                          }}></div>
                        </div>
                      </div>
                    </div>
                    <div className="w-1/3 p-2 flex flex-col justify-around">
                      <div className="h-4 w-full rounded-sm" style={{ 
                        backgroundColor: theme.primaryColor,
                        borderRadius: theme.id === 'sololeveling' ? '0' : '0.25rem' 
                      }}></div>
                      <div className="h-4 w-full rounded-sm" style={{ 
                        backgroundColor: theme.secondaryColor,
                        borderRadius: theme.id === 'sololeveling' ? '0' : '0.25rem'
                      }}></div>
                      <div className="h-4 w-full rounded-sm" style={{ 
                        backgroundColor: theme.accentColor,
                        borderRadius: theme.id === 'sololeveling' ? '0' : '0.25rem',
                        ...(theme.id === 'sololeveling' && {
                          boxShadow: '0 0 4px #f59e0b'
                        })
                      }}></div>
                    </div>
                  </div>
                </div>
                
                {/* Theme Info */}
                <div 
                  className="p-3 flex justify-between items-center" 
                  style={{ 
                    backgroundColor: theme.cardBg,
                    fontFamily: theme.id === 'sololeveling' ? "'Courier New', monospace" : 'inherit',
                    borderTop: theme.id === 'sololeveling' ? '1px solid #4f46e5' : 'none',
                  }}
                >
                  <span 
                    className={`font-medium ${theme.id === 'sololeveling' ? 'text-purple-400' : ''}`} 
                    style={{ 
                      color: theme.textPrimary,
                      textShadow: theme.id === 'sololeveling' ? '0 0 5px rgba(79, 70, 229, 0.5)' : 'none'
                    }}
                  >
                    {theme.id === 'sololeveling' ? '[ SYSTEM_THEME: SL ]' : theme.name}
                  </span>
                  
                  {currentTheme.id === theme.id ? (
                    <div 
                      className="px-2 py-1 text-xs rounded-sm flex items-center"
                      style={{ 
                        backgroundColor: theme.primaryColor,
                        color: '#ffffff',
                        borderRadius: theme.id === 'sololeveling' ? '0' : '0.25rem',
                      }}
                    >
                      {theme.id === 'sololeveling' ? 'ENABLED' : 'Active'}
                    </div>
                  ) : (
                    <div 
                      className="w-5 h-5 flex items-center justify-center group-hover:border-primaryColor transition-colors"
                      style={{
                        borderRadius: theme.id === 'sololeveling' ? '0' : '50%',
                        border: theme.id === 'sololeveling' 
                          ? '1px solid #4f46e5' 
                          : `2px solid ${theme.borderColor}`
                      }}
                    ></div>
                  )}
                </div>
              </motion.div>
            ))}
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
            <h4 className="text-lg font-medium">UI Elements</h4>
            
            <div className="space-y-4">
              {/* Buttons */}
              <div>
                <p className="text-sm text-textSecondary mb-2">Buttons</p>
                <div className="flex flex-wrap gap-3">
                  <button 
                    className="px-4 py-2 font-medium transition-colors"
                    style={{ 
                      backgroundColor: currentTheme.primaryColor, 
                      color: "white",
                      borderRadius: currentTheme.radius
                    }}
                  >
                    Primary
                  </button>
                  <button 
                    className="px-4 py-2 font-medium transition-colors"
                    style={{ 
                      backgroundColor: currentTheme.secondaryColor, 
                      color: "white",
                      borderRadius: currentTheme.radius
                    }}
                  >
                    Secondary
                  </button>
                  <button 
                    className="px-4 py-2 font-medium transition-colors"
                    style={{ 
                      backgroundColor: currentTheme.accentColor, 
                      color: "white",
                      borderRadius: currentTheme.radius
                    }}
                  >
                    Accent
                  </button>
                  <button 
                    className="px-4 py-2 font-medium transition-colors border"
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
                <p className="text-sm text-textSecondary mb-2">Cards</p>
                <div className="flex flex-wrap gap-4">
                  <div 
                    className="p-4 w-48"
                    style={{ 
                      backgroundColor: currentTheme.bgSecondary,
                      color: currentTheme.textPrimary,
                      borderRadius: currentTheme.radius,
                      boxShadow: currentTheme.shadow
                    }}
                  >
                    <h5 className="font-medium mb-2">Card Title</h5>
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
                      boxShadow: currentTheme.shadow
                    }}
                  >
                    <h5 className="font-medium mb-2">Card Title</h5>
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
                <p className="text-sm text-textSecondary mb-2">Form Elements</p>
                <div className="flex flex-wrap gap-4">
                  <div className="w-64">
                    <label className="block text-sm mb-1" style={{ color: currentTheme.textSecondary }}>
                      Input Field
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border focus:outline-none focus:ring-2 transition-all"
                      placeholder="Type something..."
                      style={{
                        backgroundColor: currentTheme.inputBg,
                        color: currentTheme.textPrimary,
                        borderColor: currentTheme.inputBorder,
                        borderRadius: currentTheme.radius,
                        borderWidth: currentTheme.borderWidth,
                        boxShadow: currentTheme.shadow
                      }}
                    />
                  </div>
                  <div className="w-64">
                    <label className="block text-sm mb-1" style={{ color: currentTheme.textSecondary }}>
                      Select Element
                    </label>
                    <select
                      className="w-full p-2 border focus:outline-none focus:ring-2 transition-all"
                      style={{
                        backgroundColor: currentTheme.inputBg,
                        color: currentTheme.textPrimary,
                        borderColor: currentTheme.inputBorder,
                        borderRadius: currentTheme.radius,
                        borderWidth: currentTheme.borderWidth,
                        boxShadow: currentTheme.shadow
                      }}
                    >
                      <option>Option 1</option>
                      <option>Option 2</option>
                      <option>Option 3</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeSettings;