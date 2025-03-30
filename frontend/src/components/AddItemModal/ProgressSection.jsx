import React, { useContext } from "react";
import ThemeContext from "../../context/ThemeContext";
import { FormLabel } from "./FormComponents";

const ProgressSection = ({ formData, handleInputChange, errors }) => {
  const { currentTheme } = useContext(ThemeContext);

  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <FormLabel htmlFor="progress">Progress</FormLabel>
        <span className="text-sm font-medium" style={{ color: currentTheme.primaryColor }}>
          {formData.progress || 0}%
        </span>
      </div>
      <input
        id="progress"
        name="progress"
        type="range"
        min="0"
        max="100"
        step="5"
        className={`w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer ${errors.progress ? 'border border-red-500' : ''}`}
        style={{
          backgroundColor: `${currentTheme.primaryColor}20`,
          accentColor: currentTheme.primaryColor
        }}
        value={formData.progress || 0}
        onChange={handleInputChange}
      />
      <div className="flex gap-0.5 w-full h-2 mt-2">
        {[...Array(10)].map((_, index) => (
          <div 
            key={index}
            className="flex-1"
            style={{
              backgroundColor: index < Math.floor(formData.progress / 10) 
                ? currentTheme.primaryColor 
                : `${currentTheme.primaryColor}20`
            }}
          ></div>
        ))}
      </div>
      {errors.progress && (
        <p className="mt-1 text-xs text-red-500">
          Progress must be between 0 and 100.
        </p>
      )}
    </div>
  );
};

export default ProgressSection;