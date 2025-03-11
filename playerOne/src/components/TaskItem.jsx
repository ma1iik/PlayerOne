import React, { useContext } from "react";
import { CalendarIcon, TagIcon, PencilIcon } from "@heroicons/react/outline";
import ThemeContext from "../context/ThemeContext";

const TaskItem = ({ task, onComplete, onEdit }) => {
  const { currentTheme } = useContext(ThemeContext);

  // Check if task is due soon
  const isDueSoon = () => {
    if (!task.due) return false;
    const dueDate = new Date(task.due);
    const today = new Date();
    const diffTime = dueDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 2 && diffDays >= 0;
  };

  // Get border color based on priority/status
  const getBorderColor = () => {
    if (task.status === "Completed") return "border-green-400";
    if (isDueSoon()) return "border-yellow-400";
    if (task.difficulty === 3) return "border-red-400";
    if (task.difficulty === 2) return "border-blue-400";
    return "border-gray-200";
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
    <div className={`group relative bg-white ${task.difficulty === 3 || isDueSoon() ? 'border-l-4' : 'border'} ${getBorderColor()} border-gray-200 rounded-sm px-4 py-3 shadow-sm hover:shadow-md transition-shadow`}>
      <div className="flex items-start">
        <div className="flex items-center h-5 mt-0.5">
          <div 
            className={`flex-shrink-0 w-5 h-5 rounded-sm border-2 ${task.status === "Completed" ? "bg-green-500 border-green-500" : "border-gray-300 hover:border-purple-500"} cursor-pointer transition-colors`}
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
            <h3 className={`text-sm font-medium ${task.status === "Completed" ? "text-gray-500 line-through" : "text-gray-900"}`}>
              {task.title}
            </h3>
            {isDueSoon() && (
              <div className="ml-2 px-1.5 py-0.5 bg-yellow-50 text-yellow-700 text-xs rounded-sm font-medium">
                Due soon
              </div>
            )}
          </div>
          {task.description && (
            <p className={`text-xs ${task.status === "Completed" ? "text-gray-400" : "text-gray-500"} mt-1`}>
              {task.description}
            </p>
          )}
          <div className="flex items-center mt-1.5">
            <div className="flex items-center text-xs">
              <span className="bg-purple-50 text-purple-500 rounded-sm px-1.5 py-0.5 font-medium">
                {task.recurrence}
              </span>
            </div>
            {task.due && (
              <div className="flex items-center ml-3">
                <CalendarIcon className="h-3 w-3 text-gray-400" />
                <span className="text-xs text-gray-500 ml-1">{formatDueDate()}</span>
              </div>
            )}
          </div>
        </div>
        <div className="absolute right-3 top-3 flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            className="text-gray-400 hover:text-gray-500 p-1"
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