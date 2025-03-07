import React, { useContext } from "react";
import ThemeContext from "../context/ThemeContext";

const TaskItem = ({ task, onComplete }) => {
  const { currentTheme } = useContext(ThemeContext);
  const isNeonTheme = currentTheme.id.includes('neon');
  const isCyberpunk = currentTheme.id === 'cyberpunk';

  // Get difficulty color based on theme
  const getDifficultyStyle = () => {
    if (isNeonTheme || isCyberpunk) {
      return {
        backgroundColor: 'transparent',
        color: task.difficulty === 1 
          ? '#22c55e' // green for easy
          : task.difficulty === 2 
          ? '#eab308' // yellow for medium
          : '#ef4444', // red for hard
        border: `1px solid ${task.difficulty === 1 
          ? '#22c55e' // green for easy
          : task.difficulty === 2 
          ? '#eab308' // yellow for medium
          : '#ef4444'}`, // red for hard
        borderRadius: currentTheme.radius
      };
    }
    
    return {
      backgroundColor: task.difficulty === 1 
        ? 'rgba(34, 197, 94, 0.1)' // green bg for easy
        : task.difficulty === 2 
        ? 'rgba(234, 179, 8, 0.1)' // yellow bg for medium
        : 'rgba(239, 68, 68, 0.1)', // red bg for hard
      color: task.difficulty === 1 
        ? '#15803d' // green for easy
        : task.difficulty === 2 
        ? '#854d0e' // yellow for medium
        : '#b91c1c', // red for hard
      borderRadius: currentTheme.radius
    };
  };

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
          {isNeonTheme ? task.title.toUpperCase() : task.title}
        </span>
        <span className="text-sm px-2 py-1 rounded" 
              style={getDifficultyStyle()}>
          {isNeonTheme 
            ? `[ ${["EASY", "MEDIUM", "HARD"][task.difficulty - 1]} ]` 
            : ["Easy", "Medium", "Hard"][task.difficulty - 1]}
        </span>
      </div>
      <div className="mt-2 flex justify-between items-center text-sm">
        <span style={{ 
          color: currentTheme.textSecondary,
          fontFamily: isNeonTheme ? "'Orbitron', 'Rajdhani', sans-serif" : 
                     isCyberpunk ? "'Audiowide', 'Rajdhani', sans-serif" : 
                     currentTheme.font
        }}>
          {isNeonTheme ? task.recurrence.toUpperCase() : task.recurrence}
        </span>
        <span style={{ 
          color: currentTheme.textSecondary,
          fontFamily: isNeonTheme ? "'Orbitron', 'Rajdhani', sans-serif" : 
                     isCyberpunk ? "'Audiowide', 'Rajdhani', sans-serif" : 
                     currentTheme.font
        }}>
          {isNeonTheme ? `DUE ${task.due}` : `Due ${task.due}`}
        </span>
      </div>
      <button
        onClick={() => onComplete(task.id)}
        className={`mt-2 hover:text-opacity-80 transition-colors ${isNeonTheme ? 'sl-glow-text' : ''}`}
        style={{ 
          color: currentTheme.primaryColor,
          fontFamily: isNeonTheme ? "'Orbitron', 'Rajdhani', sans-serif" : 
                     isCyberpunk ? "'Audiowide', 'Rajdhani', sans-serif" : 
                     currentTheme.font,
          textShadow: isNeonTheme ? `0 0 5px ${currentTheme.primaryColor}` : 'none'
        }}
      >
        {isNeonTheme ? "[ COMPLETE ]" : "Complete"}
      </button>
    </div>
  );
};

export default TaskItem;