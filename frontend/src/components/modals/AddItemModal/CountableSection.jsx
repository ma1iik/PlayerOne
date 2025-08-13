import React, { useState } from "react";
import { useThemeStyles } from "../../../context/ThemeProvider";
import { ThemedButton, FormLabel } from "./FormComponents";
import { CounterInput } from "./FormComponents";

const CountableSection = ({ formData, setFormData, isEditMode, handleInputChange, handleNumberChange, errors }) => {
  const { theme: currentTheme } = useThemeStyles();
  
  // Add null checks to prevent React Error #31
  if (!currentTheme) {
    return <div>Loading...</div>;
  }
  
  const isNeonTheme = currentTheme.id && currentTheme.id.includes('neon');

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
                setFormData({ ...formData, countable: option.value === "true" });
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
            onChange={(name, value) => setFormData({ ...formData, [name]: value })}
            min={1}
            label="per day"
          />
        </div>
      )}
      
      {/* Current count for countable habits (edit mode only) */}
      {formData.countable && formData.id && (
        <div>
          <FormLabel htmlFor="currentCount">Current Count</FormLabel>
          <CounterInput
            name="currentCount"
            value={formData.currentCount}
            onChange={(name, value) => setFormData({ ...formData, [name]: value })}
            min={0}
            label={`of ${formData.targetCount} target`}
          />
        </div>
      )}
    </>
  );
};

export default CountableSection;