import React, { useContext, useState } from "react";
import { PencilIcon } from "@heroicons/react/outline";
import ThemeContext from "../context/ThemeContext";

const TaskItem = ({ task, onComplete, onEdit }) => {
  const { currentTheme } = useContext(ThemeContext);
  const isNeonTheme = currentTheme.id.includes('neon');
  const isCyberpunk = currentTheme.id === 'cyberpunk';

  // Check if task is due soon (within 48 hours)
  const isDueSoon = () => {
    if (!task.due) return false;
    const dueDate = new Date(task.due);
    const today = new Date();
    const diffTime = dueDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 2 && diffDays >= 0;
  };

  // Check if task is overdue
  const isOverdue = () => {
    if (!task.due) return false;
    const dueDate = new Date(task.due);
    const today = new Date();
    return dueDate < today;
  };

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
    if (!task.due) return "";
    
    const dueDate = new Date(task.due);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (dueDate.toDateString() === today.toDateString()) return "Today";
    if (dueDate.toDateString() === tomorrow.toDateString()) return "Tomorrow";
    
    return dueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  // Get border color based on due date
  const getBorderStyle = () => {
    const baseBorder = `1px solid ${currentTheme.borderColor}`;
    
    if (task.status === "Completed") {
      return {
        border: baseBorder,
        borderLeft: isNeonTheme || isCyberpunk ? baseBorder : '4px solid #10b981' // green-500
      };
    }
    
    if (isOverdue()) {
      return {
        border: baseBorder,
        borderLeft: isNeonTheme || isCyberpunk ? baseBorder : '4px solid #ef4444' // red-500
      };
    }
    
    if (isDueSoon()) {
      return {
        border: baseBorder,
        borderLeft: isNeonTheme || isCyberpunk ? baseBorder : '4px solid #f59e0b' // amber-500
      };
    }

    if (task.due) {
      return {
        border: baseBorder,
        borderLeft: isNeonTheme || isCyberpunk ? baseBorder : '4px solid #3b82f6' // blue-500
      };
    }
    
    return { border: baseBorder };
  };

  return (
    <div 
      className="group relative transition-all duration-300 hover:translate-y-[-2px]"
      style={{
        backgroundColor: task.status === "Completed" ? currentTheme.bgTertiary : currentTheme.bgSecondary,
        borderRadius: currentTheme.radius,
        boxShadow: currentTheme.shadow,
        ...getBorderStyle()
      }}
    >
      <div className="flex items-center">
        {/* Main content */}
        <div className="flex-1 pl-7 pr-3 py-3">
          <div className="flex items-center">
            <h3 
              className="text-sm font-medium transition-all duration-300" 
              style={{ 
                color: task.status === "Completed" ? currentTheme.textSecondary : currentTheme.textPrimary,
                textDecoration: task.status === "Completed" ? 'line-through' : 'none'
              }}
            >
              {isNeonTheme ? task.title.toUpperCase() : task.title}
            </h3>

            {/* Due date badge for due soon tasks */}
            {isDueSoon() && !task.status === "Completed" && (
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
            
            {/* Edit button */}
            <div 
              className="ml-2 opacity-0 group-hover:opacity-40 transition-opacity"
            >
              <button 
                className="p-1 rounded-sm transition-opacity"
                style={{ 
                  color: currentTheme.textSecondary
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.opacity = "1";
                }}
                onMouseOut={(e) => {
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
              {getDifficultyIndicator(task.difficulty || 1)}
            </div>
          </div>
          
          {/* Description */}
          {task.description && (
            <p 
              className="text-xs mt-1 mb-1.5 transition-all duration-300" 
              style={{ 
                color: currentTheme.textSecondary,
                opacity: task.status === "Completed" ? 0.7 : 1
              }}
            >
              {task.description}
            </p>
          )}
          
          {/* Task metadata */}
          <div className="flex items-center mt-1">
            {/* Recurrence type */}
            <span 
              className="text-xs font-medium px-1.5 py-0.5"
              style={{
                backgroundColor: isNeonTheme || isCyberpunk ? 'transparent' : 'rgba(139, 92, 246, 0.1)',
                color: currentTheme.primaryColor,
                borderRadius: currentTheme.radius,
                border: isNeonTheme || isCyberpunk ? `1px solid ${currentTheme.primaryColor}` : 'none',
                opacity: task.status === "Completed" ? 0.6 : 1
              }}
            >
              {isNeonTheme ? task.recurrence.toUpperCase() : task.recurrence}
            </span>

            {/* Due date with color coding */}
            {task.due && (
              <span 
                className="ml-3 text-xs"
                style={{ 
                  color: isOverdue() ? '#ef4444' : isDueSoon() ? '#f59e0b' : '#3b82f6',
                  opacity: task.status === "Completed" ? 0.6 : 1
                }}
              >
                {formatDueDate()}
              </span>
            )}
          </div>
        </div>
        
        {/* Right side checkbox */}
        <div className="flex flex-col w-12 border-l" 
             style={{ borderColor: currentTheme.borderColor }}>
          <div 
            className="h-16 flex items-center justify-center cursor-pointer"
            style={{
              color: currentTheme.textSecondary
            }}
            onClick={(e) => {
              e.stopPropagation();
              onComplete(task.id);
            }}
          >
            <div 
              className="flex-shrink-0 w-5 h-5 rounded-sm cursor-pointer transition-all flex items-center justify-center" 
              style={{ 
                backgroundColor: task.status === "Completed" ? '#10b981' : 'transparent',
                border: `2px solid ${task.status === "Completed" ? '#10b981' : currentTheme.borderColor}`,
                borderRadius: `calc(${currentTheme.radius} / 2)`,
              }}
            >
              {task.status === "Completed" && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;