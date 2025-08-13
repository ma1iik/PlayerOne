import React from "react";
import { useThemeStyles } from "../../../context/ThemeProvider";
import { ThemedButton, FormLabel } from "./FormComponents";

const DifficultySection = ({ formData, handleInputChange, errors }) => {
  const { theme: currentTheme } = useThemeStyles();
  
  // Add null checks to prevent React Error #31
  if (!currentTheme) {
    return <div>Loading...</div>;
  }
  
  const isNeonTheme = currentTheme.id && currentTheme.id.includes('neon');
  const isCyberpunk = currentTheme.id === 'cyberpunk';

  // Get difficulty indicator based on level (1-4)
  const getDifficultyIndicator = (level) => {
    const stars = [];
    
    // Different colors based on difficulty level - same as TaskItem
    const getStarColor = (level) => {
      switch(level) {
        case 1: return "text-green-400"; // Easy - green
        case 2: return "text-blue-400";  // Medium - blue
        case 3: return "text-orange-400"; // Hard - orange
        case 4: return "text-red-400";   // Epic - red
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
    return <div className="flex justify-center gap-1">{stars}</div>;
  };

  return (
    <div>
      <FormLabel htmlFor="difficulty">Difficulty</FormLabel>
      <div className="grid grid-cols-4 gap-2">
        {[1, 2, 3, 4].map((level) => {
          return (
            <ThemedButton
              key={level}
              onClick={() => {
                // Use the input change handler to update the difficulty
                const event = {
                  target: {
                    name: "difficulty",
                    value: level
                  }
                };
                handleInputChange(event);
              }}
              isActive={formData.difficulty === level}
            >
              {getDifficultyIndicator(level)}
              <div className="mt-1">
                {["", "Easy", "Medium", "Hard", "Epic"][level]}
              </div>
            </ThemedButton>
          );
        })}
      </div>
      {/* errors.difficulty && (
        <p className="mt-1 text-xs text-red-500">
          Please select a valid difficulty level.
        </p>
      ) */}
    </div>
  );
};

export default DifficultySection;