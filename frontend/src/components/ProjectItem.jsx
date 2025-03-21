import React, { useContext } from "react";
import { PencilIcon } from "@heroicons/react/outline";
import ThemeContext from "../context/ThemeContext";

// Dynamic Segmented Progress Bar Component
const SegmentedProgressBar = ({ project, currentTheme }) => {
  // If project has subtasks property, use that length, otherwise default to 5
  const totalSegments = project.subtasks?.length || 5;
  
  // Calculate how many segments should be filled based on progress percentage
  // and the total number of segments
  const completedSubtasks = Math.round((project.progress / 100) * totalSegments);
  
  return (
    <div className="flex gap-0.5 w-full h-2 mt-2">
      {Array.from({ length: totalSegments }).map((_, index) => (
        <div 
          key={index}
          className="flex-1 transition-colors"
          style={{
            backgroundColor: index < completedSubtasks 
              ? currentTheme.primaryColor 
              : `${currentTheme.primaryColor}20`
          }}
        ></div>
      ))}
    </div>
  );
};

const ProjectItem = ({ project, onEdit }) => {
  const { currentTheme } = useContext(ThemeContext);
  const isNeonTheme = currentTheme.id.includes('neon');
  const isCyberpunk = currentTheme.id === 'cyberpunk';

  // Get difficulty level styling with new design
  const getDifficultyStyle = () => {
    // Map difficulty to emoji or text
    const difficultyLabel = ["Easy", "Medium", "Hard", "Very Hard", "Epic"][project.difficulty - 1] || "Medium";
    
    // Color mapping based on difficulty
    const colors = {
      1: { bg: 'rgba(16, 185, 129, 0.1)', text: '#10b981' },  // green
      2: { bg: 'rgba(59, 130, 246, 0.1)', text: '#3b82f6' },  // blue
      3: { bg: 'rgba(245, 158, 11, 0.1)', text: '#f59e0b' },  // amber
      4: { bg: 'rgba(249, 115, 22, 0.1)', text: '#f97316' },  // orange
      5: { bg: 'rgba(239, 68, 68, 0.1)', text: '#ef4444' }    // red
    }[project.difficulty] || { bg: 'rgba(156, 163, 175, 0.1)', text: '#6b7280' }; // gray default
    
    return {
      backgroundColor: isNeonTheme || isCyberpunk ? 'transparent' : colors.bg,
      color: colors.text,
      borderRadius: currentTheme.radius,
      border: isNeonTheme || isCyberpunk ? `1px solid ${colors.text}` : 'none'
    };
  };

  // Get number of completed subtasks and total subtasks
  const totalSubtasks = project.subtasks?.length || 5;
  const completedSubtasks = Math.round((project.progress / 100) * totalSubtasks);

  return (
    <div 
      className="group relative px-4 py-3 transition-all duration-150 hover:translate-y-[-2px]" 
      style={{
        backgroundColor: currentTheme.bgSecondary,
        borderRadius: currentTheme.radius,
        border: `1px solid ${currentTheme.borderColor}`,
        boxShadow: currentTheme.shadow
      }}
    >
      <div className="flex items-start">
        <div className="ml-1 flex-1">
          <div className="flex items-center">
            <h3 className="text-sm font-medium" style={{ color: currentTheme.textPrimary }}>
              {isNeonTheme ? project.title.toUpperCase() : project.title}
            </h3>
            <div 
              className="ml-2 px-2 py-0.5 rounded-md text-xs font-medium"
              style={getDifficultyStyle()}
            >
              {isNeonTheme ? `LEVEL ${project.difficulty}` : `Level ${project.difficulty}`}
            </div>
          </div>
          <div className="mt-2">
            {/* Dynamic segmented progress bar */}
            <SegmentedProgressBar project={project} currentTheme={currentTheme} />
            <div className="flex justify-between mt-1">
              <span className="text-xs" style={{ color: currentTheme.textSecondary }}>
                {completedSubtasks}/{totalSubtasks} {isNeonTheme ? 'SUBTASKS' : 'subtasks'}
              </span>
              <span 
                className="text-xs font-medium" 
                style={{ color: currentTheme.primaryColor }}
              >
                {project.progress}%
              </span>
            </div>
          </div>
        </div>
        <div 
          className="absolute right-3 top-3 flex items-center opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <button 
            className="p-1 transition-colors"
            style={{ 
              color: currentTheme.textSecondary,
              backgroundColor: isNeonTheme || isCyberpunk ? 'transparent' : currentTheme.bgTertiary,
              borderRadius: currentTheme.radius,
              border: isNeonTheme || isCyberpunk ? `1px solid ${currentTheme.borderColor}` : 'none'
            }}
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
          >
            <PencilIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectItem;