import React, { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon, CheckIcon } from "@heroicons/react/outline";
import { useThemeStyles } from "../../context/ThemeProvider";
import PixelCharacter from "../PixelCharacter";

const ProfilePanel = ({ profile, isCollapsed, toggleCollapse }) => {
  const { theme: currentTheme, styles } = useThemeStyles();

  // Add null checks to prevent React Error #31
  if (!currentTheme) {
    return <div>Loading...</div>;
  }

  const getThemedText = (text) => {
    return styles.shouldTransform(text);
  };

  const isNeonTheme = currentTheme.id && currentTheme.id.includes('neon');
  const isCyberpunk = currentTheme.id === 'cyberpunk';
  
  // Assuming the user is online and has checked in for the day
  const hasCheckedIn = true; 
  // Placeholder data for daily stats
  const dailyStats = {
    tasksCompleted: 6,
    totalTasks: 10,
    coinsEarned: 80,
    experienceGained: 150
  };

  return (
    <div className={`relative h-full transition-all duration-300 ease-in-out ${
      isCollapsed ? "w-0" : "w-104" // Increased width from 72 to 96
    }`}>
      {/* Inner "sliding door" for the panel content */}
      <div
        className={`absolute inset-0 border-r overflow-hidden shadow-sm
          transition-transform duration-300 ease-in-out
          ${isCollapsed ? "-translate-x-full" : "translate-x-0"}`}
        style={{ 
          backgroundColor: currentTheme.bgSecondary,
          borderColor: currentTheme.borderColor,
          boxShadow: currentTheme.features?.hasGlowEffects ? `0 0 20px ${currentTheme.primaryColor}20` : '0 1px 3px rgba(0,0,0,0.1)'
        }}
      >
        <div className="p-6 h-full flex flex-col">
          <div className="flex flex-col items-center">
            {/* Avatar with pixel-style border */}
            <div className="mb-4 relative">
              <img
                src={profile.avatar || "https://via.placeholder.com/150?text=Avatar"}
                alt="Profile"
                className="w-24 h-24 object-cover border-2 shadow-sm"
                style={{
                  borderRadius: currentTheme.features?.hasSharpCorners ? '4px' : '8px',
                  borderColor: currentTheme.primaryColor + '30',
                  boxShadow: currentTheme.features?.hasGlowEffects ? `0 0 15px ${currentTheme.primaryColor}40` : '0 2px 4px rgba(0,0,0,0.1)'
                }}
              />
              {/* Pixel-styled level badge */}
              <div 
                className="absolute -bottom-2 -right-2 text-white text-xs font-bold px-2 py-1 shadow-sm"
                style={{
                  background: `linear-gradient(to right, ${currentTheme.primaryColor}, ${currentTheme.secondaryColor})`,
                  borderRadius: currentTheme.features?.hasSharpCorners ? '2px' : '4px',
                  fontFamily: currentTheme.font,
                  textTransform: currentTheme.features?.useUppercaseText ? 'uppercase' : 'none'
                }}
              >
                {getThemedText(`LVL ${profile.level}`)}
              </div>
            </div>
            
            {/* Name and Role */}
            <h2 
              className="text-xl font-semibold mb-1"
              style={{ 
                color: currentTheme.textPrimary,
                fontFamily: currentTheme.font,
                textTransform: currentTheme.features?.useUppercaseText ? 'uppercase' : 'none'
              }}
            >
              {getThemedText(profile.name)}
            </h2>
            <p 
              className="text-sm mb-6"
              style={{ 
                color: currentTheme.textSecondary,
                fontFamily: currentTheme.font,
                textTransform: currentTheme.features?.useUppercaseText ? 'uppercase' : 'none'
              }}
            >
              {getThemedText(profile.role)}
            </p>

            {/* Daily Check-in Button with pixel-style */}
            <div className="w-full mb-6">
              <button 
                className={`w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-all`}
                style={{
                  backgroundColor: hasCheckedIn ? currentTheme.bgTertiary : `linear-gradient(to right, ${currentTheme.primaryColor}, ${currentTheme.secondaryColor})`,
                  background: hasCheckedIn ? currentTheme.bgTertiary : `linear-gradient(to right, ${currentTheme.primaryColor}, ${currentTheme.secondaryColor})`,
                  color: hasCheckedIn ? currentTheme.textSecondary : '#ffffff',
                  border: hasCheckedIn ? `1px solid ${currentTheme.borderColor}` : 'none',
                  borderRadius: currentTheme.features?.hasSharpCorners ? '2px' : '6px',
                  fontFamily: currentTheme.font,
                  textTransform: currentTheme.features?.useUppercaseText ? 'uppercase' : 'none',
                  boxShadow: currentTheme.features?.hasGlowEffects ? `0 0 10px ${currentTheme.primaryColor}30` : '0 2px 4px rgba(0,0,0,0.1)'
                }}
                disabled={hasCheckedIn}
              >
                {hasCheckedIn ? (
                  <>
                    <CheckIcon className="w-5 h-5" />
                    {getThemedText('Daily Check-in Completed!')}
                  </>
                ) : (
                  <>{getThemedText('Daily Check-in')}</>
                )}
              </button>
            </div>

            {/* Stats section with pixel-style cards */}
            <div className="w-full space-y-5">
              
              <div 
                className="p-4"
                style={{
                  backgroundColor: currentTheme.bgTertiary,
                  borderRadius: currentTheme.features?.hasSharpCorners ? '2px' : '8px',
                  border: `1px solid ${currentTheme.borderColor}`
                }}
              >
                <h3 
                  className="text-sm font-semibold mb-2 flex items-center"
                  style={{ 
                    color: currentTheme.primaryColor,
                    fontFamily: currentTheme.font,
                    textTransform: currentTheme.features?.useUppercaseText ? 'uppercase' : 'none'
                  }}
                >
                  <span role="img" aria-label="Today" className="mr-2">📅</span>
                  {getThemedText("Today's Progress")}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div 
                    className="p-2 shadow-sm flex items-center justify-between"
                    style={{
                      backgroundColor: currentTheme.bgSecondary,
                      borderRadius: currentTheme.features?.hasSharpCorners ? '2px' : '4px',
                      border: `1px solid ${currentTheme.borderColor}`
                    }}
                  >
                    <div className="flex items-center">
                      <span role="img" aria-label="Tasks" className="mr-2">✅</span>
                      <span 
                        className="text-xs"
                        style={{ 
                          color: currentTheme.textSecondary,
                          fontFamily: currentTheme.font,
                          textTransform: currentTheme.features?.useUppercaseText ? 'uppercase' : 'none'
                        }}
                      >
                        {getThemedText('Tasks')}
                      </span>
                    </div>
                    <span 
                      className="text-sm font-medium"
                      style={{ 
                        color: currentTheme.textPrimary,
                        fontFamily: currentTheme.font
                      }}
                    >
                      {dailyStats.tasksCompleted}/{dailyStats.totalTasks}
                    </span>
                  </div>
                  <div 
                    className="p-2 shadow-sm flex items-center justify-between"
                    style={{
                      backgroundColor: currentTheme.bgSecondary,
                      borderRadius: currentTheme.features?.hasSharpCorners ? '2px' : '4px',
                      border: `1px solid ${currentTheme.borderColor}`
                    }}
                  >
                    <div className="flex items-center">
                      <span role="img" aria-label="Coins" className="mr-2">🪙</span>
                      <span 
                        className="text-xs"
                        style={{ 
                          color: currentTheme.textSecondary,
                          fontFamily: currentTheme.font,
                          textTransform: currentTheme.features?.useUppercaseText ? 'uppercase' : 'none'
                        }}
                      >
                        {getThemedText('Earned')}
                      </span>
                    </div>
                    <span 
                      className="text-sm font-medium"
                      style={{ 
                        color: currentTheme.textPrimary,
                        fontFamily: currentTheme.font
                      }}
                    >
                      {dailyStats.coinsEarned}
                    </span>
                  </div>
                </div>
              </div>

              {/* Level and XP with pixel-style progress bar */}
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span 
                    className="flex items-center"
                    style={{ 
                      color: currentTheme.textPrimary,
                      fontFamily: currentTheme.font,
                      textTransform: currentTheme.features?.useUppercaseText ? 'uppercase' : 'none'
                    }}
                  >
                    <span role="img" aria-label="Level" className="mr-2">⭐</span>
                    {getThemedText('Experience')}
                  </span>
                  <span 
                    style={{ 
                      color: currentTheme.textSecondary,
                      fontFamily: currentTheme.font
                    }}
                  >
                    {profile.xp}/{profile.maxXP} XP
                  </span>
                </div>
                <div 
                  className="h-3 overflow-hidden"
                  style={{
                    backgroundColor: currentTheme.bgTertiary,
                    borderRadius: currentTheme.features?.hasSharpCorners ? '2px' : '6px',
                    border: `1px solid ${currentTheme.borderColor}`
                  }}
                >
                  <div
                    className="h-full transition-all duration-500"
                    style={{ 
                      background: `linear-gradient(to right, ${currentTheme.primaryColor}, ${currentTheme.secondaryColor})`,
                      width: `${(profile.xp / profile.maxXP) * 100}%`,
                      boxShadow: currentTheme.features?.hasGlowEffects ? `0 0 8px ${currentTheme.primaryColor}60` : 'none'
                    }}
                  />
                </div>
                <div 
                  className="mt-1 text-xs text-right"
                  style={{ 
                    color: currentTheme.textSecondary,
                    fontFamily: currentTheme.font,
                    textTransform: currentTheme.features?.useUppercaseText ? 'uppercase' : 'none'
                  }}
                >
                  {getThemedText(`${profile.maxXP - profile.xp} XP to next level`)}
                </div>
              </div>

              {/* Stats Grid with pixel-style cards */}
              <div className="grid grid-cols-3 gap-3">
                <div 
                  className="p-3 col-span-1 flex flex-col items-center"
                  style={{
                    backgroundColor: currentTheme.bgTertiary,
                    borderRadius: currentTheme.features?.hasSharpCorners ? '2px' : '6px',
                    border: `1px solid ${currentTheme.borderColor}`
                  }}
                >
                  <div className="text-2xl mb-1">⚡</div>
                  <p 
                    className="text-xs font-medium mb-1"
                    style={{ 
                      color: currentTheme.primaryColor,
                      fontFamily: currentTheme.font,
                      textTransform: currentTheme.features?.useUppercaseText ? 'uppercase' : 'none'
                    }}
                  >
                    {getThemedText('Energy')}
                  </p>
                  <p 
                    className="text-xl font-semibold"
                    style={{ 
                      color: currentTheme.textPrimary,
                      fontFamily: currentTheme.font
                    }}
                  >
                    {profile.energy}%
                  </p>
                </div>
                <div 
                  className="p-3 col-span-1 flex flex-col items-center"
                  style={{
                    backgroundColor: currentTheme.bgTertiary,
                    borderRadius: currentTheme.features?.hasSharpCorners ? '2px' : '6px',
                    border: `1px solid ${currentTheme.borderColor}`
                  }}
                >
                  <div className="text-2xl mb-1">🔥</div>
                  <p 
                    className="text-xs font-medium mb-1"
                    style={{ 
                      color: currentTheme.primaryColor,
                      fontFamily: currentTheme.font,
                      textTransform: currentTheme.features?.useUppercaseText ? 'uppercase' : 'none'
                    }}
                  >
                    {getThemedText('Streak')}
                  </p>
                  <p 
                    className="text-xl font-semibold"
                    style={{ 
                      color: currentTheme.textPrimary,
                      fontFamily: currentTheme.font
                    }}
                  >
                    {profile.streak}
                  </p>
                </div>
                <div 
                  className="p-3 col-span-1 flex flex-col items-center"
                  style={{
                    backgroundColor: currentTheme.bgTertiary,
                    borderRadius: currentTheme.features?.hasSharpCorners ? '2px' : '6px',
                    border: `1px solid ${currentTheme.borderColor}`
                  }}
                >
                  <div className="text-2xl mb-1">📋</div>
                  <p 
                    className="text-xs font-medium mb-1"
                    style={{ 
                      color: currentTheme.primaryColor,
                      fontFamily: currentTheme.font,
                      textTransform: currentTheme.features?.useUppercaseText ? 'uppercase' : 'none'
                    }}
                  >
                    {getThemedText('Tasks')}
                  </p>
                  <p 
                    className="text-xl font-semibold"
                    style={{ 
                      color: currentTheme.textPrimary,
                      fontFamily: currentTheme.font
                    }}
                  >
                    {profile.completedTasks}
                  </p>
                </div>
              </div>
              
              {/* Currency display with pixel-style */}
              <div className="grid grid-cols-2 gap-4">
                <div 
                  className="p-3 flex items-center justify-between"
                  style={{
                    backgroundColor: currentTheme.bgTertiary,
                    borderRadius: currentTheme.features?.hasSharpCorners ? '2px' : '6px',
                    border: `1px solid ${currentTheme.borderColor}`
                  }}
                >
                  <div className="flex items-center">
                    <span role="img" aria-label="Coin" className="mr-2">🪙</span>
                    <p 
                      className="text-xs"
                      style={{ 
                        color: currentTheme.textSecondary,
                        fontFamily: currentTheme.font,
                        textTransform: currentTheme.features?.useUppercaseText ? 'uppercase' : 'none'
                      }}
                    >
                      {getThemedText('Coins')}
                    </p>
                  </div>
                  <p 
                    className="text-md font-semibold"
                    style={{ 
                      color: currentTheme.textPrimary,
                      fontFamily: currentTheme.font
                    }}
                  >
                    1,250
                  </p>
                </div>
                <div 
                  className="p-3 flex items-center justify-between"
                  style={{
                    backgroundColor: currentTheme.bgTertiary,
                    borderRadius: currentTheme.features?.hasSharpCorners ? '2px' : '6px',
                    border: `1px solid ${currentTheme.borderColor}`
                  }}
                >
                  <div className="flex items-center">
                    <span role="img" aria-label="Gem" className="mr-2">💎</span>
                    <p 
                      className="text-xs"
                      style={{ 
                        color: currentTheme.textSecondary,
                        fontFamily: currentTheme.font,
                        textTransform: currentTheme.features?.useUppercaseText ? 'uppercase' : 'none'
                      }}
                    >
                      {getThemedText('Gems')}
                    </p>
                  </div>
                  <p 
                    className="text-md font-semibold"
                    style={{ 
                      color: currentTheme.textPrimary,
                      fontFamily: currentTheme.font
                    }}
                  >
                    75
                  </p>
                </div>
              </div>
              
              {/* Current Character Class with pixel-style */}
              <div 
                className="p-3 flex items-center justify-between"
                style={{
                  backgroundColor: currentTheme.bgTertiary,
                  borderRadius: currentTheme.features?.hasSharpCorners ? '2px' : '6px',
                  border: `1px solid ${currentTheme.borderColor}`
                }}
              >
                <div className="flex items-center">
                  <span role="img" aria-label="Character" className="text-2xl mr-3">🧙‍♀️</span>
                  <div>
                    <p 
                      className="text-xs"
                      style={{ 
                        color: currentTheme.primaryColor,
                        fontFamily: currentTheme.font,
                        textTransform: currentTheme.features?.useUppercaseText ? 'uppercase' : 'none'
                      }}
                    >
                      {getThemedText('Character Class')}
                    </p>
                    <p 
                      className="text-sm font-semibold"
                      style={{ 
                        color: currentTheme.textPrimary,
                        fontFamily: currentTheme.font,
                        textTransform: currentTheme.features?.useUppercaseText ? 'uppercase' : 'none'
                      }}
                    >
                      {getThemedText('Master Developer')}
                    </p>
                  </div>
                </div>
                <span 
                  className="text-xs py-1 px-2"
                  style={{
                    backgroundColor: currentTheme.primaryColor + '30',
                    color: currentTheme.primaryColor,
                    borderRadius: currentTheme.features?.hasSharpCorners ? '2px' : '4px',
                    fontFamily: currentTheme.font,
                    textTransform: currentTheme.features?.useUppercaseText ? 'uppercase' : 'none'
                  }}
                >
                  {getThemedText('+15% XP')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Pixel-styled toggle button */}
        {!isCollapsed && (
          <button
            onClick={toggleCollapse}
            className="absolute top-2 right-2 p-2 transition-colors"
            style={{
              backgroundColor: currentTheme.bgSecondary,
              border: `1px solid ${currentTheme.borderColor}`,
              borderRadius: currentTheme.features?.hasSharpCorners ? '2px' : '6px',
              color: currentTheme.textSecondary,
              boxShadow: currentTheme.features?.hasGlowEffects ? `0 0 8px ${currentTheme.primaryColor}20` : '0 1px 2px rgba(0,0,0,0.1)'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = currentTheme.bgTertiary;
              e.target.style.color = currentTheme.primaryColor;
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = currentTheme.bgSecondary;
              e.target.style.color = currentTheme.textSecondary;
            }}
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfilePanel;