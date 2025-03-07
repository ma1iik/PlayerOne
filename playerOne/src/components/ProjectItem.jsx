import React, { useContext } from "react";
import ThemeContext from "../context/ThemeContext";

const ProjectItem = ({ project }) => {
  const { currentTheme } = useContext(ThemeContext);
  const isNeonTheme = currentTheme.id.includes('neon');
  const isCyberpunk = currentTheme.id === 'cyberpunk';

  // Get difficulty level styling based on theme
  const getDifficultyStyle = () => {
    if (isNeonTheme || isCyberpunk) {
      return {
        backgroundColor: 'transparent',
        color: project.difficulty <= 2 
          ? '#22c55e' // green for easy
          : project.difficulty === 3 
          ? '#eab308' // yellow for medium
          : '#ef4444', // red for hard
        border: `1px solid ${project.difficulty <= 2 
          ? '#22c55e' // green for easy
          : project.difficulty === 3 
          ? '#eab308' // yellow for medium
          : '#ef4444'}`, // red for hard
        borderRadius: currentTheme.radius
      };
    }
    
    return {
      backgroundColor: project.difficulty <= 2 
        ? 'rgba(34, 197, 94, 0.1)' // green bg for easy
        : project.difficulty === 3 
        ? 'rgba(234, 179, 8, 0.1)' // yellow bg for medium
        : 'rgba(239, 68, 68, 0.1)', // red bg for hard
      color: project.difficulty <= 2 
        ? '#15803d' // green for easy
        : project.difficulty === 3 
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
      <div className="flex justify-between items-center mb-2">
        <span className={isNeonTheme ? 'sl-glow-text' : ''} 
              style={{ 
                color: currentTheme.textPrimary,
                fontFamily: isNeonTheme ? "'Orbitron', 'Rajdhani', sans-serif" : 
                           isCyberpunk ? "'Audiowide', 'Rajdhani', sans-serif" : 
                           currentTheme.font
              }}>
          {isNeonTheme ? project.title.toUpperCase() : project.title}
        </span>
        <span className="text-sm px-2 py-1 rounded" style={getDifficultyStyle()}>
          {isNeonTheme ? `[ LEVEL ${project.difficulty} ]` : `Level ${project.difficulty}`}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex-1 h-2 rounded-full" 
             style={{ 
               backgroundColor: isNeonTheme || isCyberpunk 
                 ? 'rgba(255, 255, 255, 0.1)' // more subtle bg for neon/cyberpunk
                 : currentTheme.bgTertiary,
               borderRadius: currentTheme.radius,
               overflow: 'hidden'
             }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ 
              width: `${project.progress}%`,
              backgroundColor: currentTheme.primaryColor,
              boxShadow: isNeonTheme ? `0 0 10px ${currentTheme.primaryColor}` : 'none'
            }}
          />
        </div>
        <span className="text-sm" 
              style={{ 
                color: currentTheme.textSecondary,
                fontFamily: isNeonTheme ? "'Orbitron', 'Rajdhani', sans-serif" : 
                           isCyberpunk ? "'Audiowide', 'Rajdhani', sans-serif" : 
                           currentTheme.font
              }}>
          {isNeonTheme ? `${project.progress}%` : `${project.progress}%`}
        </span>
      </div>
    </div>
  );
};

export default ProjectItem;