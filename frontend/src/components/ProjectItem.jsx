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

const ProjectItem = ({ project, onEdit, onClick }) => {
  const { currentTheme } = useContext(ThemeContext);
  const isNeonTheme = currentTheme.id.includes('neon');
  const isCyberpunk = currentTheme.id === 'cyberpunk';

  // Get difficulty indicator with stars based on level (1-4)
  const getDifficultyIndicator = (level = 1) => {
    const stars = [];
    // Different colors based on difficulty level
    const getStarColor = (level) => {
      switch(level) {
        case 1: return "text-green-400"; // Easy - green
        case 2: return "text-blue-400";  // Medium - blue
        case 3: return "text-orange-400"; // Hard - yellow
        case 4: return "text-red-400";   // Very hard - red
        default: return "text-green-400";
      }
    };
    
    for (let i = 0; i < 4; i++) {
      stars.push(
        <span 
          key={i} 
          className={i < level ? getStarColor(level) : "text-gray-300 opacity-50"}
        >
          ★
        </span>
      );
    }
    return <div className="flex gap-0.5">{stars}</div>;
  };

  // Format the due date
  const formatDueDate = () => {
    if (!project.due) return "";
    
    const dueDate = new Date(project.due);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (dueDate.toDateString() === today.toDateString()) return "Today";
    if (dueDate.toDateString() === tomorrow.toDateString()) return "Tomorrow";
    
    return dueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  // Check if project is due soon (within 48 hours)
  const isDueSoon = () => {
    if (!project.due) return false;
    const dueDate = new Date(project.due);
    const today = new Date();
    const diffTime = dueDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 2 && diffDays >= 0;
  };

  // Check if project is overdue
  const isOverdue = () => {
    if (!project.due) return false;
    const dueDate = new Date(project.due);
    const today = new Date();
    return dueDate < today;
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
      onClick={() => onClick && onClick(project)}
    >
      <div className="flex items-start">
        <div className="ml-1 flex-1">
          <div className="flex items-center">
            <h3 className="text-sm font-medium" style={{ color: currentTheme.textPrimary }}>
              {isNeonTheme ? project.title.toUpperCase() : project.title}
            </h3>
            
            {/* Edit button (pencil icon) - styled to match TaskItem */}
            <div 
              className="ml-2 opacity-0 group-hover:opacity-40 transition-opacity"
            >
              <button 
                className="p-1 rounded-sm transition-opacity"
                style={{ 
                  color: currentTheme.textSecondary
                }}
                onMouseOver={(e) => {
                  // Darken the icon itself on hover (not the background)
                  e.currentTarget.style.opacity = "1";
                }}
                onMouseOut={(e) => {
                  // Reset on mouse out
                  e.currentTarget.style.opacity = "";
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit();
                }}
              >
                <PencilIcon className="h-3.5 w-3.5" />
              </button>
            </div>
            
            {/* Add flex-1 to push the stars to the right */}
            <div className="flex-1"></div>
            
            {/* Difficulty stars - positioned at the right */}
            <div className="text-xs mr-2">
              {getDifficultyIndicator(project.difficulty || 1)}
            </div>
          </div>
          
          {/* Description - Added */}
          {project.description && (
            <p 
              className="text-xs mt-1 mb-1.5" 
              style={{ color: currentTheme.textSecondary }}
            >
              {project.description}
            </p>
          )}
          
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
          
          {/* Due date and metadata section - Added */}
          <div className="flex items-center mt-2">
            {/* Due date with color coding - Added */}
            {project.due && (
              <span 
                className="text-xs"
                style={{ 
                  color: isOverdue() ? '#ef4444' : isDueSoon() ? '#f59e0b' : '#3b82f6'
                }}
              >
                {formatDueDate()}
              </span>
            )}
            
            {/* Due soon badge - Added */}
            {isDueSoon() && !isOverdue() && (
              <span 
                className="ml-2 text-xs px-1.5 py-0.5 font-medium"
                style={{
                  backgroundColor: isNeonTheme || isCyberpunk ? 'transparent' : 'rgba(251, 191, 36, 0.1)',
                  color: '#f59e0b', // amber-500
                  borderRadius: currentTheme.radius,
                  border: isNeonTheme || isCyberpunk ? '1px solid #f59e0b' : 'none'
                }}
              >
                {isNeonTheme ? '[ DUE SOON ]' : isCyberpunk ? 'DUE SOON' : 'Due Soon'}
              </span>
            )}
            
            {/* Overdue badge - Added */}
            {isOverdue() && (
              <span 
                className="ml-2 text-xs px-1.5 py-0.5 font-medium"
                style={{
                  backgroundColor: isNeonTheme || isCyberpunk ? 'transparent' : 'rgba(239, 68, 68, 0.1)',
                  color: '#ef4444', // red-500
                  borderRadius: currentTheme.radius,
                  border: isNeonTheme || isCyberpunk ? '1px solid #ef4444' : 'none'
                }}
              >
                {isNeonTheme ? '[ OVERDUE ]' : isCyberpunk ? 'OVERDUE' : 'Overdue'}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectItem;