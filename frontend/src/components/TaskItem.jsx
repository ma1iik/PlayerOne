import React, { useContext } from "react";
import { CalendarIcon, TagIcon, PencilIcon } from "@heroicons/react/outline";
import ThemeContext from "../context/ThemeContext";

const TaskItem = ({ task, onComplete, onEdit }) => {
  const { currentTheme } = useContext(ThemeContext);
  const isNeonTheme = currentTheme.id.includes('neon');
  const isCyberpunk = currentTheme.id === 'cyberpunk';

  // Check if task is due soon
  const isDueSoon = () => {
    if (!task.due) return false;
    const dueDate = new Date(task.due);
    const today = new Date();
    const diffTime = dueDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 2 && diffDays >= 0;
  };

  // Get border style based on priority/status
  const getBorderStyle = () => {
    const baseBorder = `1px solid ${currentTheme.borderColor}`;
    
    if (task.status === "Completed") {
      return {
        border: baseBorder,
        borderLeft: isNeonTheme || isCyberpunk ? baseBorder : '4px solid #10b981' // green-500
      };
    }
    
    if (isDueSoon()) {
      return {
        border: baseBorder,
        borderLeft: isNeonTheme || isCyberpunk ? baseBorder : '4px solid #f59e0b' // amber-500
      };
    }
    
    if (task.difficulty === 3) {
      return {
        border: baseBorder,
        borderLeft: isNeonTheme || isCyberpunk ? baseBorder : '4px solid #ef4444' // red-500
      };
    }
    
    if (task.difficulty === 2) {
      return {
        border: baseBorder,
        borderLeft: isNeonTheme || isCyberpunk ? baseBorder : '4px solid #3b82f6' // blue-500
      };
    }
    
    return { border: baseBorder };
  };

  // Format the due date
  const formatDueDate = () => {
    if (!task.due) return "No due date";
    
    const dueDate = new Date(task.due);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (dueDate.toDateString() === today.toDateString()) return "Today";
    if (dueDate.toDateString() === tomorrow.toDateString()) return "Tomorrow";
    
    return dueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div 
      className="group relative px-4 py-3 transition-all duration-150 hover:translate-y-[-2px]" 
      style={{
        backgroundColor: currentTheme.bgSecondary,
        borderRadius: currentTheme.radius,
        boxShadow: currentTheme.shadow,
        ...getBorderStyle()
      }}
    >
      <div className="flex items-start">
        <div className="flex items-center h-5 mt-0.5">
          <div 
            className="flex-shrink-0 w-5 h-5 rounded-sm cursor-pointer transition-colors"
            style={{ 
              backgroundColor: task.status === "Completed" ? '#10b981' : 'transparent', // green-500
              border: task.status === "Completed" 
                ? '2px solid #10b981' 
                : `2px solid ${currentTheme.borderColor}`,
              borderRadius: `calc(${currentTheme.radius} / 2)`,
            }}
            onClick={(e) => {
              e.stopPropagation();
              onComplete(task.id);
            }}
          >
            {task.status === "Completed" && (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
        </div>
        <div className="ml-3 flex-1">
          <div className="flex items-center">
            <h3 
              className="text-sm font-medium"
              style={{ 
                color: task.status === "Completed" 
                  ? currentTheme.textSecondary
                  : currentTheme.textPrimary,
                textDecoration: task.status === "Completed" ? 'line-through' : 'none'
              }}
            >
              {isNeonTheme ? task.title.toUpperCase() : task.title}
            </h3>
            {isDueSoon() && (
              <div 
                className="ml-2 px-1.5 py-0.5 text-xs font-medium"
                style={{
                  backgroundColor: isNeonTheme || isCyberpunk ? 'transparent' : 'rgba(251, 191, 36, 0.1)', // amber-50
                  color: '#f59e0b', // amber-500
                  borderRadius: currentTheme.radius,
                  border: isNeonTheme || isCyberpunk ? '1px solid #f59e0b' : 'none'
                }}
              >
                {isNeonTheme ? 'DUE SOON' : 'Due soon'}
              </div>
            )}
          </div>
          {task.description && (
            <p 
              className="text-xs mt-1"
              style={{ 
                color: task.status === "Completed" 
                  ? `${currentTheme.textSecondary}80` 
                  : currentTheme.textSecondary
              }}
            >
              {task.description}
            </p>
          )}
          <div className="flex items-center mt-1.5">
            <div className="flex items-center text-xs">
              <span 
                className="px-1.5 py-0.5 font-medium"
                style={{
                  backgroundColor: isNeonTheme || isCyberpunk ? 'transparent' : 'rgba(139, 92, 246, 0.1)',
                  color: currentTheme.primaryColor,
                  borderRadius: currentTheme.radius,
                  border: isNeonTheme || isCyberpunk ? `1px solid ${currentTheme.primaryColor}` : 'none'
                }}
              >
                {isNeonTheme ? task.recurrence.toUpperCase() : task.recurrence}
              </span>
            </div>
            {task.due && (
              <div className="flex items-center ml-3">
                <CalendarIcon className="h-3 w-3" style={{ color: currentTheme.textSecondary }} />
                <span className="text-xs ml-1" style={{ color: currentTheme.textSecondary }}>
                  {formatDueDate()}
                </span>
              </div>
            )}
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

export default TaskItem;