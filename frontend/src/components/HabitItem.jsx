import React, { useContext } from "react";
import { PlusIcon, MinusIcon, DotsVerticalIcon } from "@heroicons/react/outline";
import ThemeContext from "../context/ThemeContext";

const HabitItem = ({ habit, onEdit, onToggle, onUpdateCount }) => {
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
        case 3: return "text-yellow-400"; // Hard - yellow
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

  // Calculate progress for countable habits only
  const getProgress = () => {
    if (!habit.countable) return '';
    const current = habit.currentCount || 0;
    const target = habit.targetCount || 1;
    return `${current}/${target}`;
  };

  return (
    <div 
      className="group relative transition-all duration-150 hover:translate-y-[-2px]" 
      style={{
        backgroundColor: currentTheme.bgSecondary,
        borderRadius: currentTheme.radius,
        border: `1px solid ${currentTheme.borderColor}`,
        boxShadow: currentTheme.shadow,
      }}
    >
      <div className="flex items-center">
        {/* Main content */}
        <div className="flex-1 pl-4 pr-2 py-3">
          <div className="flex items-center">
            <h3 className="text-sm font-medium" style={{ color: currentTheme.textPrimary }}>
              {isNeonTheme ? habit.title.toUpperCase() : habit.title}
            </h3>
            
            {/* Difficulty stars - moved right next to title */}
            <div className="text-xs ml-2">
              {getDifficultyIndicator(habit.difficulty || 1)}
            </div>
            
            {/* Edit button (three dots) - visible only on hover */}
            <div 
              className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <button 
                className="p-1 transition-colors"
                style={{ 
                  color: currentTheme.textSecondary
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit();
                }}
              >
                <DotsVerticalIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between mt-1">
            <div className="flex items-center gap-2">
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
              
              {/* Streak indicator - moved under recurrence */}
              <div 
                className="flex items-center text-xs px-1.5 py-0.5 font-medium" 
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
            
            {/* Counter display */}
            <span className="text-xs ml-2" style={{ color: currentTheme.textSecondary }}>
              {getProgress()}
            </span>
          </div>
        </div>
        
        {/* Right side controls */}
        {habit.countable ? (
          <div className="flex flex-col w-12 border-l" style={{ borderColor: currentTheme.borderColor }}>
            <button 
              className="h-8 flex items-center justify-center border-b"
              style={{
                color: currentTheme.textSecondary,
                borderColor: currentTheme.borderColor
              }}
              onClick={(e) => {
                e.stopPropagation();
                onUpdateCount ? onUpdateCount(habit.id, (habit.currentCount || 0) + 1) : null;
              }}
            >
              <PlusIcon className="w-4 h-4" />
            </button>
            <button 
              className="h-8 flex items-center justify-center"
              style={{
                color: currentTheme.textSecondary
              }}
              onClick={(e) => {
                e.stopPropagation();
                onUpdateCount ? onUpdateCount(habit.id, Math.max(0, (habit.currentCount || 0) - 1)) : null;
              }}
            >
              <MinusIcon className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col w-12 border-l" 
               style={{ borderColor: currentTheme.borderColor }}>
            <div 
              className="h-16 flex items-center justify-center"
              style={{
                color: currentTheme.textSecondary
              }}
              onClick={(e) => {
                e.stopPropagation();
                onToggle ? onToggle(habit.id) : null;
              }}
            >
              <div 
                className="flex-shrink-0 w-5 h-5 rounded-sm cursor-pointer transition-colors hover:border-purple-500" 
                style={{
                  border: `2px solid ${currentTheme.borderColor}`,
                  backgroundColor: 'transparent',
                  borderRadius: `calc(${currentTheme.radius} / 2)`,
                }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HabitItem;