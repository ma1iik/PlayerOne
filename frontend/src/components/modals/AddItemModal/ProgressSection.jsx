import React from "react";
import { useThemeStyles } from "../../../context/ThemeProvider";
import { FormLabel, FormInput } from "./FormComponents";

const ProgressSection = ({ formData, setFormData }) => {
  const { theme: currentTheme } = useThemeStyles();


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
        className={`w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer`}
        style={{
          backgroundColor: `${currentTheme.primaryColor}20`,
          accentColor: currentTheme.primaryColor
        }}
        value={formData.progress || 0}
        onChange={(e) => setFormData({ ...formData, progress: e.target.value })}
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
    </div>
  );
};

export default ProgressSection;