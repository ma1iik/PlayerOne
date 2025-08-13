import React from "react";
import { useThemeStyles } from "../../../context/ThemeProvider";
import { ThemedButton, FormLabel } from "./FormComponents";

const RecurrenceSection = ({ formData, setFormData, selectedType, errors, handleInputChange }) => {
  const { theme: currentTheme } = useThemeStyles();
  
  // Add null checks to prevent React Error #31
  if (!currentTheme) {
    return <div>Loading...</div>;
  }
  
  const isNeonTheme = currentTheme.id && currentTheme.id.includes('neon');
  
  // Weekdays and monthdays for appropriate recurrence options
  const weekdays = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
  const monthdays = Array.from({ length: 31 }, (_, i) => i + 1);
  
  return (
    <>
      <div>
        <FormLabel htmlFor="recurrence">Recurrence</FormLabel>
        
        {/* Different options for habit vs task/project */}
        {selectedType === "habit" ? (
          <div className="grid grid-cols-3 gap-2">
            {["daily", "weekly", "monthly"].map((recur) => (
              <ThemedButton
                key={recur}
                onClick={() => setFormData({ ...formData, recurrence: recur })}
                isActive={formData.recurrence === recur}
                className="capitalize"
              >
                {isNeonTheme ? recur.toUpperCase() : recur}
              </ThemedButton>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            {["one-time", "recurring"].map((recur) => (
              <ThemedButton
                key={recur}
                onClick={() => setFormData({ ...formData, recurrence: recur })}
                isActive={formData.recurrence === recur}
                className="capitalize"
              >
                {isNeonTheme ? recur.replace('-', ' ').toUpperCase() : recur.replace('-', ' ')}
              </ThemedButton>
            ))}
          </div>
        )}
      </div>
      
      {/* Weekly day selector */}
      {(formData.recurrence === "weekly" || ((selectedType === "task" || selectedType === "project") && formData.recurrence === "recurring")) && (
        <div>
          <FormLabel htmlFor="weekday">Day of Week</FormLabel>
          <select
            id="weekday"
            name="weekday"
            className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:border-purple-500"
            style={{ 
              backgroundColor: currentTheme.inputBg,
              color: currentTheme.textPrimary,
              borderColor: currentTheme.borderColor,
              borderRadius: currentTheme.radius
            }}
            value={formData.weekday}
            onChange={(e) => setFormData({ ...formData, weekday: e.target.value })}
          >
            {weekdays.map(day => (
              <option key={day} value={day}>
                {day.charAt(0).toUpperCase() + day.slice(1)}
              </option>
            ))}
          </select>
        </div>
      )}
      
      {/* Monthly day selector */}
      {formData.recurrence === "monthly" && (
        <div>
          <FormLabel htmlFor="monthday">Day of Month</FormLabel>
          <select
            id="monthday"
            name="monthday"
            className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none"
            style={{ 
              backgroundColor: currentTheme.inputBg,
              color: currentTheme.textPrimary,
              borderColor: currentTheme.borderColor,
              borderRadius: currentTheme.radius
            }}
            value={formData.monthday}
            onChange={(e) => setFormData({ ...formData, monthday: e.target.value })}
          >
            {monthdays.map(day => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </div>
      )}
    </>
  );
};

export default RecurrenceSection;