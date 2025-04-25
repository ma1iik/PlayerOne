import React, { useContext } from "react"; 
import ThemeContext from "../../../context/ThemeContext";
import { ThemedButton, FormLabel } from "./FormComponents";

const StatusSection = ({ formData, setFormData }) => {
  const { currentTheme } = useContext(ThemeContext);


  const isNeonTheme = currentTheme.id.includes('neon');
  const isCyberpunk = currentTheme.id === 'cyberpunk';

  // Utility function for status colors
  const getStatusColor = (status, opacity = 1) => {
    const colors = {
      "Pending": `rgba(245, 158, 11, ${opacity})`, // amber
      "In Progress": `rgba(59, 130, 246, ${opacity})`, // blue
      "Completed": `rgba(16, 185, 129, ${opacity})` // green
    };
    return colors[status] || `rgba(107, 114, 128, ${opacity})`; // gray as fallback
  };

  return (
    <div>
      <FormLabel htmlFor="status">Status</FormLabel>
      <div className="grid grid-cols-3 gap-2">
        {["Pending", "In Progress", "Completed"].map((status) => (
          <ThemedButton
            key={status}
            onClick={() => setFormData({ ...formData, status: status })}
            isActive={formData.status === status}
            color={isNeonTheme || isCyberpunk ? getStatusColor(status, 1) : getStatusColor(status, 0.4)}
          >
            {isNeonTheme ? status.toUpperCase() : status}
          </ThemedButton>
        ))}
      </div>
    </div>
  );
};

export default StatusSection;