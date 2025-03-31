import React, { useContext, useState, useEffect, useRef } from "react";
import { PencilIcon } from "@heroicons/react/outline";
import ThemeContext from "../context/ThemeContext";

const TaskItem = ({ task, onComplete, onEdit }) => {
  const { currentTheme } = useContext(ThemeContext);
  const isNeonTheme = currentTheme.id.includes('neon');
  const isCyberpunk = currentTheme.id === 'cyberpunk';
  const containerRef = useRef(null);
  
  // Local state to track completion status for animation purposes
  const [isCompleted, setIsCompleted] = useState(task.status === "Completed");
  
  // Use completion status
  const displayAsCompleted = task.status === "Completed";
  
  // This effect updates the border directly on completion change
  // by manipulating the DOM element directly, bypassing React's transitions
  useEffect(() => {
    if (containerRef.current) {
      const baseBorder = `1px solid ${currentTheme.borderColor}`;
      
      if (displayAsCompleted && !isNeonTheme && !isCyberpunk) {
        containerRef.current.style.borderLeft = '4px solid #10b981';
      } else if (isOverdue() && !isNeonTheme && !isCyberpunk) {
        containerRef.current.style.borderLeft = '4px solid #ef4444';
      } else if (isDueSoon() && !isNeonTheme && !isCyberpunk) {
        containerRef.current.style.borderLeft = '4px solid #f59e0b';
      } else if (task.due && !isNeonTheme && !isCyberpunk) {
        containerRef.current.style.borderLeft = '4px solid #3b82f6';
      } else {
        containerRef.current.style.borderLeft = baseBorder;
      }
    }
  }, [displayAsCompleted, currentTheme, isNeonTheme, isCyberpunk, task.due, task.status]);

  // Check if task is due soon (within 48 hours)
  const isDueSoon = () => {
    if (!task.due || displayAsCompleted) return false;
    const dueDate = new Date(task.due);
    const today = new Date();
    const diffTime = dueDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 2 && diffDays >= 0;
  };

  // Check if task is overdue
  const isOverdue = () => {
    if (!task.due || displayAsCompleted) return false;
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

  // Handle checkbox toggle with animation
  const handleToggle = (e) => {
    e.stopPropagation();
    setIsCompleted(!isCompleted);
    if (onComplete) {
      onComplete(task.id);
    }
  };

  // Get styles without border (we'll handle the border separately)
  const getStyles = () => {
    return {
      backgroundColor: displayAsCompleted ? currentTheme.bgTertiary : currentTheme.bgSecondary,
      borderRadius: currentTheme.radius,
      boxShadow: currentTheme.shadow,
      borderTop: `1px solid ${currentTheme.borderColor}`,
      borderRight: `1px solid ${currentTheme.borderColor}`,
      borderBottom: `1px solid ${currentTheme.borderColor}`,
      // borderLeft is handled by the useEffect
    };
  };

  return (
    <div 
      ref={containerRef}
      className={`group relative transition-all duration-300 hover:translate-y-[-2px] ${displayAsCompleted ? 'opacity-75' : ''}`}
      style={getStyles()}
    >
      <div className="flex items-center">
        {/* Main content */}
        <div className="flex-1 pl-7 pr-3 py-3">
          <div className="flex items-center">
            <h3 
              className="text-sm font-medium transition-all duration-300" 
              style={{ 
                color: displayAsCompleted ? currentTheme.textSecondary : currentTheme.textPrimary,
                textDecoration: displayAsCompleted ? 'line-through' : 'none'
              }}
            >
              {isNeonTheme ? task.title.toUpperCase() : task.title}
            </h3>

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
                opacity: displayAsCompleted ? 0.7 : 1
              }}
            >
              {task.description}
            </p>
          )}
          
          {/* Task metadata */}
          <div className="flex items-center mt-1">
            {/* Status badge - Added for completed task */}
            {displayAsCompleted && (
              <span 
                className="text-xs font-medium px-1.5 py-0.5 mr-2 transition-all duration-300" 
                style={{
                  backgroundColor: isNeonTheme || isCyberpunk ? 'transparent' : 'rgba(16, 185, 129, 0.1)',
                  color: '#10b981', // green color
                  borderRadius: currentTheme.radius,
                  border: isNeonTheme || isCyberpunk ? `1px solid #10b981` : 'none',
                  opacity: 0.8
                }}
              >
                {isNeonTheme ? 'COMPLETED' : 'Completed'}
              </span>
            )}
            
            {/* Recurrence type */}
            <span 
              className="text-xs font-medium px-1.5 py-0.5 transition-all duration-300" 
              style={{
                backgroundColor: isNeonTheme || isCyberpunk ? 'transparent' : 'rgba(139, 92, 246, 0.1)',
                color: currentTheme.primaryColor,
                borderRadius: currentTheme.radius,
                border: isNeonTheme || isCyberpunk ? `1px solid ${currentTheme.primaryColor}` : 'none',
                opacity: displayAsCompleted ? 0.6 : 1
              }}
            >
              {isNeonTheme ? task.recurrence.toUpperCase() : task.recurrence}
            </span>

            {/* Due date with color coding */}
            {task.due && (
              <span 
                className="ml-3 text-xs transition-all duration-300"
                style={{ 
                  color: isOverdue() ? '#ef4444' : isDueSoon() ? '#f59e0b' : '#3b82f6',
                  opacity: displayAsCompleted ? 0.6 : 1
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
            onClick={handleToggle}
          >
            <div 
              className="flex-shrink-0 w-5 h-5 rounded-sm cursor-pointer transition-all flex items-center justify-center" 
              style={{ 
                backgroundColor: displayAsCompleted ? '#10b981' : 'transparent',
                border: `2px solid ${displayAsCompleted ? '#10b981' : currentTheme.borderColor}`,
                borderRadius: `calc(${currentTheme.radius} / 2)`,
              }}
            >
              {displayAsCompleted && (
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