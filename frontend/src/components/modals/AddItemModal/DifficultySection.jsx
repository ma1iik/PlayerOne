import React, { useContext } from "react"; 
import ThemeContext from "../../../context/ThemeContext";
import { ThemedButton, FormLabel } from "./FormComponents";

const DifficultySection = ({ formData, handleInputChange, errors }) => {
  const { currentTheme } = useContext(ThemeContext);


  const isNeonTheme = currentTheme.id.includes('neon');
  const isCyberpunk = currentTheme.id === 'cyberpunk';

  // Get difficulty indicator based on level (1-4)
  const getDifficultyIndicator = (level) => {
    const stars = [];
    for (let i = 0; i < 4; i++) {
      stars.push(
        <span 
          key={i} 
          className={i < level ? "text-yellow-400" : "text-gray-300 opacity-50"}
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
          // Colors for the difficulty levels
          const difficultyColors = [null, "#10b981", "#3b82f6", "#f97316", "#ef4444"];
          const bgColors = [null, "rgba(16, 185, 129, 0.4)", "rgba(59, 130, 246, 0.4)", "rgba(249, 115, 22, 0.4)", "rgba(239, 68, 68, 0.4)"];
          
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
              color={isNeonTheme || isCyberpunk ? difficultyColors[level] : bgColors[level]}
            >
              {getDifficultyIndicator(level)}
              <div className="mt-1">
                {["", "Easy", "Medium", "Hard", "Epic"][level]}
              </div>
            </ThemedButton>
          );
        })}
      </div>
      {errors.difficulty && (
        <p className="mt-1 text-xs text-red-500">
          Please select a valid difficulty level.
        </p>
      )}
    </div>
  );
};

export default DifficultySection;