import React, { useContext } from "react"; 
import ThemeContext from "../../../context/ThemeContext";
import { ThemedButton, FormLabel } from "./FormComponents";
import { CounterInput } from "./FormComponents";

const CountableSection = ({ 
  formData, 
  isEditMode, 
  handleInputChange, 
  handleNumberChange, 
  errors 
}) => {
  const { currentTheme } = useContext(ThemeContext);


  const isNeonTheme = currentTheme.id.includes('neon');

  return (
    <>
      {/* Countable Toggle for Habits */}
      <div>
        <FormLabel htmlFor="countable">Type of Habit</FormLabel>
        <div className="grid grid-cols-2 gap-2">
          {[
            { value: "false", label: "Check-off" },
            { value: "true", label: "Countable" }
          ].map((option) => (
            <ThemedButton
              key={option.value}
              onClick={() => {
                const event = {
                  target: {
                    name: "countable",
                    value: option.value
                  }
                };
                handleInputChange(event);
              }}
              isActive={String(formData.countable) === option.value}
            >
              {isNeonTheme ? option.label.toUpperCase() : option.label}
            </ThemedButton>
          ))}
        </div>
        <p className="mt-1 text-xs text-gray-500">
          {formData.countable 
            ? "Track multiple completions per day (e.g., glasses of water)" 
            : "Simple habit to check off when completed"}
        </p>
      </div>
      
      {/* Target count for countable habits */}
      {formData.countable && (
        <div>
          <FormLabel htmlFor="targetCount">Daily Target</FormLabel>
          <CounterInput
            name="targetCount"
            value={formData.targetCount}
            onChange={handleNumberChange}
            min={1}
            error={errors.targetCount}
            label="per day"
          />
        </div>
      )}
      
      {/* Current count for countable habits (edit mode only) */}
      {formData.countable && isEditMode && (
        <div>
          <FormLabel htmlFor="currentCount">Current Count</FormLabel>
          <CounterInput
            name="currentCount"
            value={formData.currentCount}
            onChange={handleNumberChange}
            min={0}
            error={errors.currentCount}
            label={`of ${formData.targetCount} target`}
          />
        </div>
      )}
    </>
  );
};

export default CountableSection;