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
  
  // Weekdays for task recurrence
  const weekdays = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

  const handleRecurrenceChange = (recurrence) => {
    setFormData({ 
      ...formData, 
      recurrence,
      // Reset specific day selections when changing recurrence type
      weekday: recurrence === 'weekly' ? formData.weekday || 'monday' : null,
      monthday: recurrence === 'monthly' ? formData.monthday || 1 : null
    });
  };

  const handleDaySelection = (day, type) => {
    if (type === 'weekday') {
      setFormData({ ...formData, weekday: day, monthday: null });
    } else if (type === 'monthday') {
      setFormData({ ...formData, monthday: day, weekday: null });
    }
  };

  // Helper function to get day suffix (1st, 2nd, 3rd, etc.)
  const getDaySuffix = (day) => {
    if (day >= 11 && day <= 13) return 'th';
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };

  return (
    <>
      <div>
        <FormLabel htmlFor="recurrence">Recurrence</FormLabel>
        
        {/* Different options for habit vs task vs project */}
        {selectedType === "habit" ? (
          <div className="grid grid-cols-2 gap-2">
            {["daily", "weekly"].map((recur) => (
              <ThemedButton
                key={recur}
                onClick={() => handleRecurrenceChange(recur)}
                isActive={formData.recurrence === recur}
                className="capitalize"
              >
                {isNeonTheme ? recur.toUpperCase() : recur}
              </ThemedButton>
            ))}
          </div>
        ) : selectedType === "task" ? (
          <div className="grid grid-cols-2 gap-2">
            {["one-time", "recurring"].map((recur) => (
              <ThemedButton
                key={recur}
                onClick={() => handleRecurrenceChange(recur)}
                isActive={formData.recurrence === recur}
                className="capitalize"
              >
                {isNeonTheme ? recur.replace('-', ' ').toUpperCase() : recur.replace('-', ' ')}
              </ThemedButton>
            ))}
          </div>
        ) : null}
      </div>
      
      {/* Weekly day selector for habits */}
      {selectedType === "habit" && formData.recurrence === "weekly" && (
        <div>
          <FormLabel htmlFor="weekday">Day of Week</FormLabel>
          <div className="grid grid-cols-7 gap-1">
            {weekdays.map(day => (
              <ThemedButton
                key={day}
                onClick={() => handleDaySelection(day, 'weekday')}
                isActive={formData.weekday === day}
                className="text-xs py-2"
              >
                {day.charAt(0).toUpperCase()}
              </ThemedButton>
            ))}
          </div>
        </div>
      )}
      
      {/* Task recurrence options */}
      {selectedType === "task" && formData.recurrence === "recurring" && (
        <div className="space-y-3">
          {/* Recurrence type selection */}
          <div>
            <FormLabel htmlFor="recurrenceType">Recurrence Type</FormLabel>
            <div className="grid grid-cols-2 gap-2">
              {[
                { value: "weekly", label: "Day of Week" },
                { value: "monthly", label: "Day of Month" }
              ].map((option) => (
                <ThemedButton
                  key={option.value}
                  onClick={() => setFormData({ ...formData, recurrenceType: option.value })}
                  isActive={formData.recurrenceType === option.value}
                  className="text-sm"
                >
                  {option.label}
                </ThemedButton>
              ))}
            </div>
          </div>

          {/* Weekly day selector for tasks */}
          {formData.recurrenceType === "weekly" && (
            <div>
              <FormLabel htmlFor="weekday">Day of Week</FormLabel>
              <div className="grid grid-cols-7 gap-1">
                {weekdays.map(day => (
                  <ThemedButton
                    key={day}
                    onClick={() => handleDaySelection(day, 'weekday')}
                    isActive={formData.weekday === day}
                    className="text-xs py-2"
                  >
                    {day.charAt(0).toUpperCase()}
                  </ThemedButton>
                ))}
              </div>
            </div>
          )}

          {/* Monthly day selector using date input (same as date input) */}
          {formData.recurrenceType === "monthly" && (
            <div>
              <FormLabel htmlFor="monthday">Day of Month</FormLabel>
              <input
                type="date"
                id="monthday"
                name="monthday"
                className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:border-purple-500"
                style={{ 
                  backgroundColor: currentTheme.bgSecondary,
                  color: currentTheme.textPrimary,
                  borderColor: currentTheme.borderColor,
                  borderRadius: currentTheme.radius
                }}
                value={formData.monthday ? `2024-01-${String(formData.monthday).padStart(2, '0')}` : ''}
                onChange={(e) => {
                  const date = new Date(e.target.value);
                  const day = date.getDate();
                  setFormData({ ...formData, monthday: day });
                }}
              />
              <div className="text-xs mt-1" style={{ color: currentTheme.textSecondary }}>
                Select any date in the current month to set the day (e.g., January 15th = 15th of every month)
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default RecurrenceSection;