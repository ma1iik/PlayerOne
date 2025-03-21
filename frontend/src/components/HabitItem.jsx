import React, { useContext, useState } from "react";
import { PlusIcon, MinusIcon } from "@heroicons/react/outline";
import ThemeContext from "../context/ThemeContext";

const HabitItem = ({ habit, onEdit, onToggle, onUpdateCount }) => {
  const { currentTheme } = useContext(ThemeContext);
  const isNeonTheme = currentTheme.id.includes('neon');
  const isCyberpunk = currentTheme.id === 'cyberpunk';
  
  // Local state to track completion status for animation purposes
  const [isCompleted, setIsCompleted] = useState(habit.completed || false);
  
  // Calculate if countable habit is completed
  const isCountableCompleted = habit.countable && 
    habit.targetCount > 0 && 
    (habit.currentCount || 0) >= habit.targetCount;
  
  // Use either the local state or countable completion status
  const displayAsCompleted = isCompleted || isCountableCompleted;
  
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
  
  // Handle checkbox toggle with animation
  const handleToggle = (e) => {
    e.stopPropagation();
    setIsCompleted(!isCompleted);
    if (onToggle) {
      onToggle(habit.id);
    }
  };
  
  // Handle increment with completion check
  const handleIncrement = (e) => {
    e.stopPropagation();
    if (onUpdateCount) {
      const newCount = (habit.currentCount || 0) + 1;
      onUpdateCount(habit.id, newCount);
    }
  };
  
  // Handle decrement
  const handleDecrement = (e) => {
    e.stopPropagation();
    if (onUpdateCount) {
      const newCount = Math.max(0, (habit.currentCount || 0) - 1);
      onUpdateCount(habit.id, newCount);
    }
  };

  return (
    <div 
      className={`group relative transition-all duration-300 hover:translate-y-[-2px] ${displayAsCompleted ? 'translate-y-[10px] opacity-75' : ''}`}
      style={{
        backgroundColor: displayAsCompleted ? currentTheme.bgTertiary : currentTheme.bgSecondary,
        borderRadius: currentTheme.radius,
        border: `1px solid ${currentTheme.borderColor}`,
        boxShadow: currentTheme.shadow,
      }}
    >
      <div className="flex items-center">
        {/* Main content */}
        <div className="flex-1 pl-5 pr-3 py-3">
          <div className="flex items-center">
            <h3 
              className="text-sm font-medium transition-all duration-300" 
              style={{ 
                color: displayAsCompleted ? currentTheme.textSecondary : currentTheme.textPrimary,
                textDecoration: displayAsCompleted ? 'line-through' : 'none'
              }}
            >
              {isNeonTheme ? habit.title.toUpperCase() : habit.title}
            </h3>
            
            {/* Edit button (pencil-alt icon) - very light on hover of habit item, gets darker when hovering the icon itself */}
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
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
            </div>
            
            {/* Add flex-1 to push the stars to the right */}
            <div className="flex-1"></div>
            
            {/* Difficulty stars - positioned at the right */}
            <div className="text-xs mr-2">
              {getDifficultyIndicator(habit.difficulty || 1)}
            </div>
          </div>
          
          {/* Description - Added to display habit description if available */}
          {habit.description && (
            <p 
              className="text-xs mt-1 mb-1.5 transition-all duration-300" 
              style={{ 
                color: currentTheme.textSecondary,
                opacity: displayAsCompleted ? 0.7 : 1
              }}
            >
              {habit.description}
            </p>
          )}
          
          <div className="flex items-center justify-between mt-1">
            <div className="flex items-center gap-2">
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
                {isNeonTheme ? habit.recurrence.toUpperCase() : habit.recurrence}
              </span>
              
              {/* Streak indicator - moved under recurrence */}
              <div 
                className="flex items-center text-xs px-1.5 py-0.5 font-medium transition-all duration-300" 
                style={{
                  backgroundColor: isNeonTheme || isCyberpunk ? 'transparent' : 'rgba(251, 191, 36, 0.1)',
                  color: '#f59e0b', // amber-500
                  borderRadius: currentTheme.radius,
                  border: isNeonTheme || isCyberpunk ? '1px solid #f59e0b' : 'none',
                  opacity: displayAsCompleted ? 0.6 : 1
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
                </svg>
                <span>{habit.streak}</span>
              </div>
            </div>
            
            {/* Counter display - aligned with the same right spacing as the stars */}
            <span 
              className="text-xs mr-2 transition-all duration-300" 
              style={{ 
                color: currentTheme.textSecondary,
                opacity: displayAsCompleted ? 0.7 : 1
              }}
            >
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
              onClick={handleIncrement}
            >
              <PlusIcon className="w-4 h-4" />
            </button>
            <button 
              className="h-8 flex items-center justify-center"
              style={{
                color: currentTheme.textSecondary
              }}
              onClick={handleDecrement}
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
              onClick={handleToggle}
            >
              <div 
                className="flex-shrink-0 w-5 h-5 rounded-sm cursor-pointer transition-all flex items-center justify-center" 
                style={{
                  border: `2px solid ${displayAsCompleted ? currentTheme.primaryColor : currentTheme.borderColor}`,
                  backgroundColor: displayAsCompleted ? currentTheme.primaryColor : 'transparent',
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
        )}
      </div>
    </div>
  );
};

export default HabitItem;