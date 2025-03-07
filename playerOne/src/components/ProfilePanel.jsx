// src/components/ProfilePanel.jsx
import React, { useContext } from "react";
import { ChevronLeftIcon } from "@heroicons/react/outline";
import ThemeContext from "../context/ThemeContext";

const ProfilePanel = ({ profile, isCollapsed, toggleCollapse }) => {
  const { currentTheme } = useContext(ThemeContext);
  const isNeonTheme = currentTheme.id.includes('neon');
  const isCyberpunk = currentTheme.id === 'cyberpunk';

  const getProgressBarStyle = (percent) => {
    if (isNeonTheme) {
      return {
        background: `linear-gradient(to right, ${currentTheme.primaryColor}, ${currentTheme.secondaryColor} ${percent}%, rgba(10, 10, 16, 0.2) ${percent}%)`,
        boxShadow: `0 0 10px ${currentTheme.primaryColor}`,
        height: '8px'
      };
    } else if (isCyberpunk) {
      return {
        background: `linear-gradient(to right, ${currentTheme.primaryColor} ${percent}%, rgba(2, 6, 23, 0.3) ${percent}%)`,
        height: '4px',
        border: `1px solid ${currentTheme.borderColor}`
      };
    } else {
      return {
        backgroundColor: currentTheme.bgTertiary,
        height: '8px',
        borderRadius: '9999px',
        overflow: 'hidden'
      };
    }
  };

  const getStatBoxStyle = (color) => {
    if (isNeonTheme) {
      return {
        backgroundColor: 'rgba(10, 10, 16, 0.7)',
        border: `1px solid ${color || currentTheme.borderColor}`,
        borderRadius: currentTheme.radius
      };
    } else if (isCyberpunk) {
      return {
        backgroundColor: 'rgba(15, 23, 42, 0.7)',
        border: `1px solid ${color || currentTheme.borderColor}`,
        borderRadius: currentTheme.radius
      };
    } else {
      return {
        backgroundColor: color ? `${color}10` : currentTheme.bgTertiary,
        borderRadius: currentTheme.radius
      };
    }
  };

  return (
    // Outer container toggles between w-0 and w-112
    <div
      className={`relative h-full transition-all duration-300 ease-in-out ${
        isCollapsed ? "w-0" : "w-112"
      }`}
    >
      {/* Inner "sliding door" for the panel content */}
      <div
        className={`absolute inset-0 border-r overflow-hidden
          transition-transform duration-300 ease-in-out
          ${isCollapsed ? "-translate-x-full" : "translate-x-0"}`}
        style={{ 
          backgroundColor: currentTheme.bgSecondary,
          borderColor: currentTheme.borderColor,
          backgroundImage: isNeonTheme ? 
            `linear-gradient(to bottom, rgba(10, 10, 16, 0.95), rgba(10, 10, 16, 0.98))` : 
            isCyberpunk ?
            `linear-gradient(to bottom, rgba(2, 6, 23, 0.98), rgba(2, 6, 23, 0.95))` : 
            'none'
        }}
      >
        <div className="p-6 h-full flex flex-col">
          <div className="flex flex-col items-center">
            {/* Avatar with theme-appropriate styling */}
            <div className="mb-4 relative">
              <img
                src={profile.avatar || "https://via.placeholder.com/150?text=Avatar"}
                alt="Profile"
                className="w-32 h-32 object-cover"
                style={{ 
                  borderRadius: isNeonTheme || isCyberpunk ? "0" : currentTheme.radius,
                  border: isNeonTheme || isCyberpunk ? 
                    `2px solid ${currentTheme.primaryColor}` : 
                    `2px solid ${currentTheme.borderColor}`
                }}
              />
              {isNeonTheme && (
                <div className="absolute inset-0 pointer-events-none" 
                     style={{ 
                       boxShadow: `0 0 20px ${currentTheme.primaryColor}`,
                       borderRadius: "0"
                     }}></div>
              )}
            </div>
            
            {/* Name and Role with theme styling */}
            <h2 className={`text-2xl font-semibold mb-1 ${isNeonTheme ? 'sl-glow-text' : ''}`}
                style={{ 
                  color: currentTheme.textPrimary,
                  fontFamily: isNeonTheme ? "'Orbitron', 'Rajdhani', sans-serif" : 
                              isCyberpunk ? "'Audiowide', 'Rajdhani', sans-serif" : 
                              currentTheme.font,
                  letterSpacing: isNeonTheme || isCyberpunk ? '0.05em' : 'normal'
                }}>
              {isNeonTheme ? profile.name.toUpperCase() : profile.name}
            </h2>
            <p className="text-sm mb-6"
               style={{ 
                 color: currentTheme.textSecondary,
                 fontFamily: isNeonTheme ? "'Orbitron', 'Rajdhani', sans-serif" : 
                             isCyberpunk ? "'Audiowide', 'Rajdhani', sans-serif" : 
                             currentTheme.font
               }}>
              {isNeonTheme ? profile.role.toUpperCase() : profile.role}
            </p>

            {/* Stats section */}
            <div className="w-full space-y-6">
              {/* Level and XP */}
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className={isNeonTheme ? 'sl-glow-text' : ''}
                        style={{ 
                          color: currentTheme.textPrimary,
                          fontFamily: isNeonTheme ? "'Orbitron', 'Rajdhani', sans-serif" : 
                                      isCyberpunk ? "'Audiowide', 'Rajdhani', sans-serif" : 
                                      currentTheme.font
                        }}>
                    {isNeonTheme ? `[ LEVEL ${profile.level} ]` : 
                     isCyberpunk ? `LEVEL ${profile.level}` : 
                     `Level ${profile.level}`}
                  </span>
                  <span style={{ 
                    color: currentTheme.textSecondary,
                    fontFamily: isNeonTheme ? "'Orbitron', 'Rajdhani', sans-serif" : 
                                isCyberpunk ? "'Audiowide', 'Rajdhani', sans-serif" : 
                                currentTheme.font
                  }}>
                    {isNeonTheme ? `${profile.xp}/${profile.maxXP} XP` : 
                     `${profile.xp}/${profile.maxXP} XP`}
                  </span>
                </div>
                <div style={getProgressBarStyle(0)}>
                  <div
                    className="h-full transition-all duration-500"
                    style={isNeonTheme || isCyberpunk ? {} : {
                      width: `${(profile.xp / profile.maxXP) * 100}%`,
                      backgroundColor: currentTheme.primaryColor,
                      borderRadius: '9999px'
                    }}
                  />
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3" style={getStatBoxStyle(currentTheme.primaryColor)}>
                  <p className={`text-xs mb-1 ${isNeonTheme ? 'sl-glow-text' : ''}`}
                     style={{ 
                       color: isNeonTheme || isCyberpunk ? currentTheme.primaryColor : currentTheme.textSecondary,
                       fontFamily: isNeonTheme ? "'Orbitron', 'Rajdhani', sans-serif" : 
                                   isCyberpunk ? "'Audiowide', 'Rajdhani', sans-serif" : 
                                   currentTheme.font
                     }}>
                    {isNeonTheme ? '[ ENERGY ]' : 
                     isCyberpunk ? 'ENERGY' : 'Energy'}
                  </p>
                  <p className={`text-xl font-semibold ${isNeonTheme ? 'sl-glow-text' : ''}`}
                     style={{ 
                       color: currentTheme.primaryColor,
                       fontFamily: isNeonTheme ? "'Orbitron', 'Rajdhani', sans-serif" : 
                                   isCyberpunk ? "'Audiowide', 'Rajdhani', sans-serif" : 
                                   currentTheme.font
                     }}>
                    {profile.energy}%
                  </p>
                </div>
                <div className="p-3" style={getStatBoxStyle(currentTheme.secondaryColor)}>
                  <p className={`text-xs mb-1 ${isNeonTheme ? 'sl-glow-text' : ''}`}
                     style={{ 
                       color: isNeonTheme || isCyberpunk ? currentTheme.secondaryColor : currentTheme.textSecondary,
                       fontFamily: isNeonTheme ? "'Orbitron', 'Rajdhani', sans-serif" : 
                                   isCyberpunk ? "'Audiowide', 'Rajdhani', sans-serif" : 
                                   currentTheme.font
                     }}>
                    {isNeonTheme ? '[ STREAK ]' : 
                     isCyberpunk ? 'STREAK' : 'Day Streak'}
                  </p>
                  <p className={`text-xl font-semibold ${isNeonTheme ? 'sl-glow-text' : ''}`}
                     style={{ 
                       color: currentTheme.secondaryColor,
                       fontFamily: isNeonTheme ? "'Orbitron', 'Rajdhani', sans-serif" : 
                                   isCyberpunk ? "'Audiowide', 'Rajdhani', sans-serif" : 
                                   currentTheme.font
                     }}>
                    {profile.streak}
                  </p>
                </div>
              </div>

              {/* Completed Tasks */}
              <div className="p-3" style={getStatBoxStyle()}>
                <p className={`text-xs mb-1 ${isNeonTheme ? 'sl-glow-text' : ''}`}
                   style={{ 
                     color: currentTheme.textSecondary,
                     fontFamily: isNeonTheme ? "'Orbitron', 'Rajdhani', sans-serif" : 
                                 isCyberpunk ? "'Audiowide', 'Rajdhani', sans-serif" : 
                                 currentTheme.font
                   }}>
                  {isNeonTheme ? '[ COMPLETED TASKS ]' : 
                   isCyberpunk ? 'COMPLETED TASKS' : 'Completed Tasks'}
                </p>
                <p className={`text-xl font-semibold ${isNeonTheme ? 'sl-glow-text' : ''}`}
                   style={{ 
                     color: currentTheme.textPrimary,
                     fontFamily: isNeonTheme ? "'Orbitron', 'Rajdhani', sans-serif" : 
                                 isCyberpunk ? "'Audiowide', 'Rajdhani', sans-serif" : 
                                 currentTheme.font
                   }}>
                  {profile.completedTasks}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Toggle Button in the top-right corner - only visible when expanded */}
        {!isCollapsed && (
          <button
            onClick={toggleCollapse}
            className="absolute top-2 right-2 border p-2 transition-colors"
            style={{ 
              backgroundColor: currentTheme.bgSecondary,
              borderColor: currentTheme.borderColor,
              borderRadius: isNeonTheme || isCyberpunk ? '0' : '9999px',
              boxShadow: isNeonTheme || isCyberpunk ? `0 0 10px ${currentTheme.shadowColor}` : 'none'
            }}
          >
            <ChevronLeftIcon className="w-5 h-5" style={{ color: currentTheme.textSecondary }} />
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfilePanel;