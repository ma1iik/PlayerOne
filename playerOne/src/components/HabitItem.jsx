import React, { useContext } from "react";
import ThemeContext from "../context/ThemeContext";

const HabitItem = ({ habit }) => {
  const { currentTheme } = useContext(ThemeContext);
  const isNeonTheme = currentTheme.id.includes('neon');
  const isCyberpunk = currentTheme.id === 'cyberpunk';
  
  return (
    <div className={`p-3 rounded-lg transition-colors ${isNeonTheme ? 'sl-scan-line' : ''}`} 
         style={{ 
           borderRadius: currentTheme.radius,
           backgroundColor: 'transparent',
           border: isNeonTheme || isCyberpunk ? `1px solid ${currentTheme.borderColor}` : 'none'
         }}
         onMouseEnter={(e) => {
           e.currentTarget.style.backgroundColor = currentTheme.bgTertiary;
         }}
         onMouseLeave={(e) => {
           e.currentTarget.style.backgroundColor = 'transparent';
         }}>
      <div className="flex justify-between items-center">
        <span className={isNeonTheme ? 'sl-glow-text' : ''} 
              style={{ 
                color: currentTheme.textPrimary,
                fontFamily: isNeonTheme ? "'Orbitron', 'Rajdhani', sans-serif" : 
                           isCyberpunk ? "'Audiowide', 'Rajdhani', sans-serif" : 
                           currentTheme.font
              }}>
          {isNeonTheme ? habit.title.toUpperCase() : habit.title}
        </span>
        <span className="text-sm px-2 py-1 rounded" 
              style={{ 
                backgroundColor: isNeonTheme || isCyberpunk ? 'transparent' : currentTheme.bgTertiary,
                color: currentTheme.textSecondary,
                borderRadius: currentTheme.radius,
                border: isNeonTheme || isCyberpunk ? `1px solid ${currentTheme.borderColor}` : 'none',
                fontFamily: isNeonTheme ? "'Orbitron', 'Rajdhani', sans-serif" : 
                           isCyberpunk ? "'Audiowide', 'Rajdhani', sans-serif" : 
                           currentTheme.font
              }}>
          {isNeonTheme ? `[ ${habit.recurrence.toUpperCase()} ]` : habit.recurrence}
        </span>
      </div>
      <div className="mt-2 text-sm" 
           style={{ 
             color: currentTheme.primaryColor,
             fontFamily: isNeonTheme ? "'Orbitron', 'Rajdhani', sans-serif" : 
                        isCyberpunk ? "'Audiowide', 'Rajdhani', sans-serif" : 
                        currentTheme.font
           }}>
        {isNeonTheme ? `[🔥 ${habit.streak} DAYS]` : `🔥 ${habit.streak} days`}
      </div>
    </div>
  );
};

export default HabitItem;