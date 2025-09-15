import React from "react";
import { useThemeStyles } from "../../../context/ThemeProvider";
import { ThemedButton, FormLabel } from "./FormComponents";

const StatusSection = ({ formData, setFormData }) => {
  const { theme: currentTheme } = useThemeStyles();
  
  // Add null checks to prevent React Error #31
  if (!currentTheme) {
    return <div>Loading...</div>;
  }
  
  const isNeonTheme = currentTheme.id && currentTheme.id.includes('neon');
  const isCyberpunk = currentTheme.id === 'cyberpunk';

  // Utility function for status colors with better contrast
  const getStatusColor = (status) => {
    const colors = {
      "Pending": "#f59e0b", // amber-500 - better contrast
      "In Progress": "#3b82f6", // blue-500 - better contrast  
      "Completed": "#10b981" // green-500 - better contrast
    };
    return colors[status] || "#6b7280"; // gray-500 as fallback
  };

  return (
    <div>
      <FormLabel htmlFor="status">Status</FormLabel>
      <div className="grid grid-cols-3 gap-2">
        {["Pending", "In Progress", "Completed"].map((status) => {
          const isActive = formData.status === status;
          const statusColor = getStatusColor(status);
          
          return (
            <button
              key={status}
              onClick={() => setFormData({ ...formData, status: status })}
              className="px-3 py-2 text-sm font-medium transition-all duration-200 rounded-lg"
              style={{
                backgroundColor: isActive 
                  ? statusColor 
                  : currentTheme.bgTertiary,
                color: isActive 
                  ? '#ffffff' 
                  : currentTheme.textSecondary,
                border: isActive 
                  ? 'none' 
                  : `1px solid ${currentTheme.borderColor}`,
                borderRadius: currentTheme.radius,
                boxShadow: isActive 
                  ? `0 2px 4px ${statusColor}40` 
                  : 'none'
              }}
            >
              {isNeonTheme ? status.toUpperCase() : status}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default StatusSection;