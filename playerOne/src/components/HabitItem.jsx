import React, { useContext } from "react";
import { PencilIcon } from "@heroicons/react/outline";
import ThemeContext from "../context/ThemeContext";

const HabitItem = ({ habit, onEdit }) => {
  const { currentTheme } = useContext(ThemeContext);
  const isNeonTheme = currentTheme.id.includes('neon');
  const isCyberpunk = currentTheme.id === 'cyberpunk';
  
  return (
    <div 
      className="group relative px-4 py-3 transition-all duration-150 hover:translate-y-[-2px]" 
      style={{
        backgroundColor: currentTheme.bgSecondary,
        borderRadius: currentTheme.radius,
        border: `1px solid ${currentTheme.borderColor}`,
        boxShadow: currentTheme.shadow,
      }}
    >
      <div className="flex items-start">
        <div className="flex items-center h-5 mt-0.5">
          <div 
            className="flex-shrink-0 w-5 h-5 rounded-sm cursor-pointer transition-colors hover:border-purple-500" 
            style={{
              border: `2px solid ${currentTheme.borderColor}`,
              backgroundColor: 'transparent',
              borderRadius: `calc(${currentTheme.radius} / 2)`,
            }}
          ></div>
        </div>
        <div className="ml-3 flex-1">
          <div className="flex items-center">
            <h3 className="text-sm font-medium" style={{ color: currentTheme.textPrimary }}>
              {isNeonTheme ? habit.title.toUpperCase() : habit.title}
            </h3>
            <div 
              className="ml-2 flex items-center text-xs px-1.5 py-0.5 font-medium" 
              style={{
                backgroundColor: isNeonTheme || isCyberpunk ? 'transparent' : 'rgba(251, 191, 36, 0.1)',
                color: '#f59e0b', // amber-500
                borderRadius: currentTheme.radius,
                border: isNeonTheme || isCyberpunk ? '1px solid #f59e0b' : 'none'
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
              </svg>
              <span>{habit.streak}</span>
            </div>
          </div>
          <div className="flex items-center mt-1">
            <span 
              className="text-xs font-medium px-1.5 py-0.5" 
              style={{
                backgroundColor: isNeonTheme || isCyberpunk ? 'transparent' : 'rgba(139, 92, 246, 0.1)',  
                color: currentTheme.primaryColor,
                borderRadius: currentTheme.radius,
                border: isNeonTheme || isCyberpunk ? `1px solid ${currentTheme.primaryColor}` : 'none'
              }}
            >
              {isNeonTheme ? habit.recurrence.toUpperCase() : habit.recurrence}
            </span>
            <span className="text-xs ml-2" style={{ color: currentTheme.textSecondary }}>0/1</span>
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

export default HabitItem;