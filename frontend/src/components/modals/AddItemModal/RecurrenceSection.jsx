import React, { useContext } from "react"; 
import ThemeContext from "../../../context/ThemeContext";
import { ThemedButton, FormLabel } from "./FormComponents";

const RecurrenceSection = ({ formData, setFormData, selectedType, errors, handleInputChange }) => {
  const { currentTheme } = useContext(ThemeContext);


  const isNeonTheme = currentTheme.id.includes('neon');
  
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
            onChange={handleInputChange}
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
            className={`w-full px-4 py-2 border rounded-lg text-sm focus:outline-none ${errors.monthday ? 'border-red-500 focus:border-red-500' : 'focus:border-purple-500'}`}
            style={{ 
              backgroundColor: currentTheme.inputBg,
              color: currentTheme.textPrimary,
              borderColor: errors.monthday ? '#ef4444' : currentTheme.borderColor,
              borderRadius: currentTheme.radius
            }}
            value={formData.monthday}
            onChange={handleInputChange}
          >
            {monthdays.map(day => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
          {errors.monthday && (
            <p className="mt-1 text-xs text-red-500">
              Please select a valid day of the month.
            </p>
          )}
        </div>
      )}
    </>
  );
};

export default RecurrenceSection;