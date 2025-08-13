import React from "react"; 
import { useThemeStyles } from "../../../context/ThemeProvider";
import { PlusIcon, MinusIcon } from "@heroicons/react/outline";

// Utility function for rendering themed buttons
export const ThemedButton = ({ children, onClick, isActive, fullWidth, className, ...props }) => {
  const { theme: currentTheme } = useThemeStyles();
  
  // Add null checks to prevent React Error #31
  if (!currentTheme) {
    return <div>Loading...</div>;
  }
  
  const isNeonTheme = currentTheme.id && currentTheme.id.includes('neon');
  const isCyberpunk = currentTheme.id === 'cyberpunk';
  
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={props.disabled}
      className={`py-2 text-sm font-medium ${fullWidth ? 'w-full' : ''} ${className} ${props.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      style={{
        backgroundColor: isActive 
          ? (isNeonTheme || isCyberpunk ? 'rgba(255, 255, 255, 0.1)' : props.color ? `${props.color}` : currentTheme.primaryColor)
          : (isNeonTheme || isCyberpunk ? 'transparent' : currentTheme.bgTertiary),
        color: isActive 
          ? (isNeonTheme || isCyberpunk ? props.color || currentTheme.primaryColor : 'white')
          : currentTheme.textSecondary,
        border: isNeonTheme || isCyberpunk 
          ? `1px solid ${isActive ? (props.color || currentTheme.primaryColor) : currentTheme.borderColor}` 
          : 'none',
        borderRadius: currentTheme.radius
      }}
    >
      {children}
    </button>
  );
};

// Utility function for form labels
export const FormLabel = ({ htmlFor, children }) => {
  const { theme: currentTheme } = useThemeStyles();


  
  return (
    <label 
      htmlFor={htmlFor} 
      className="block text-sm font-medium mb-1" 
      style={{ color: currentTheme.textPrimary }}
    >
      {children}
    </label>
  );
};

// Utility function for form inputs with validation
export const FormInput = ({ 
  id, 
  name, 
  type = "text", 
  value, 
  onChange, 
  placeholder = "", 
  required = false,
  error = false,
  maxLength = null
}) => {
  const { theme: currentTheme } = useThemeStyles();


  
  return (
    <div>
      <input
        id={id || name}
        name={name}
        type={type}
        placeholder={placeholder}
        className={`w-full px-4 py-2 border rounded-lg text-sm placeholder-gray-500 focus:outline-none ${error ? 'border-red-500' : 'focus:border-purple-500'}`}
        style={{ 
          backgroundColor: currentTheme.inputBg,
          color: currentTheme.textPrimary,
          borderColor: error ? '#ef4444' : currentTheme.borderColor,
          borderRadius: currentTheme.radius
        }}
        value={value}
        onChange={onChange}
        required={required}
        maxLength={maxLength}
      />
      {error && (
        <p className="mt-1 text-xs text-red-500">
          {`Invalid ${name === 'title' ? 'title. Title is required.' : name + ' value.'}`}
        </p>
      )}
    </div>
  );
};

// Counter input component for numeric values
export const CounterInput = ({ name, value, onChange, min = 0, error = false, label = "" }) => {
  const { theme: currentTheme } = useThemeStyles();

  // Add null checks to prevent React Error #31
  if (!currentTheme) {
    return <div>Loading...</div>;
  }

  const isNeonTheme = currentTheme.id && currentTheme.id.includes('neon');
  const isCyberpunk = currentTheme.id === 'cyberpunk';

  const handleDecrement = () => {
    const newValue = Math.max(min, value - 1);
    onChange(name, newValue);
  };

  const handleIncrement = () => {
    onChange(name, value + 1);
  };

  return (
    <div className="flex items-center">
      <button
        type="button"
        onClick={handleDecrement}
        className="p-1.5 rounded-l-md"
        style={{ 
          backgroundColor: isNeonTheme || isCyberpunk ? 'transparent' : currentTheme.bgTertiary,
          color: currentTheme.textSecondary,
          border: isNeonTheme || isCyberpunk ? `1px solid ${currentTheme.borderColor}` : 'none',
          borderRadius: `${currentTheme.radius} 0 0 ${currentTheme.radius}`
        }}
      >
        <MinusIcon className="h-4 w-4" />
      </button>
      <input
        id={name}
        name={name}
        type="number"
        min={min}
        className={`w-16 py-1.5 px-2 border text-center border-l-0 border-r-0 ${error ? 'border-red-500' : ''}`}
        style={{ 
          backgroundColor: currentTheme.inputBg,
          color: currentTheme.textPrimary,
          borderColor: error ? '#ef4444' : currentTheme.borderColor
        }}
        value={value}
        onChange={(e) => {
          const val = parseInt(e.target.value) || min;
          onChange(name, Math.max(min, val));
        }}
      />
      <button
        type="button"
        onClick={handleIncrement}
        className="p-1.5 rounded-r-md"
        style={{ 
          backgroundColor: isNeonTheme || isCyberpunk ? 'transparent' : currentTheme.bgTertiary,
          color: currentTheme.textSecondary,
          border: isNeonTheme || isCyberpunk ? `1px solid ${currentTheme.borderColor}` : 'none',
          borderRadius: `0 ${currentTheme.radius} ${currentTheme.radius} 0`
        }}
      >
        <PlusIcon className="h-4 w-4" />
      </button>
      {label && (
        <span className="ml-2 text-sm" style={{ color: currentTheme.textSecondary }}>
          {label}
        </span>
      )}
      {error && (
        <p className="ml-2 text-xs text-red-500">
          Invalid value
        </p>
      )}
    </div>
  );
};