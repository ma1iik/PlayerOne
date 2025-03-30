import React, { useState, useContext, useEffect } from "react";
import { XIcon, PlusIcon, SaveIcon, MinusIcon } from "@heroicons/react/outline";
import ThemeContext from "../context/ThemeContext";

// Default form data structure
const DEFAULT_FORM_DATA = {
  title: "",
  recurrence: "one-time",
  difficulty: 1,
  description: "",
  due: "",
  progress: 0,
  status: "Pending",
  streak: 0,
  countable: false,
  targetCount: 1,
  currentCount: 0,
  weekday: "monday",
  monthday: 1,
};

// Input validation functions
const validateInput = (name, value) => {
  switch (name) {
    case 'title':
      // Title should not be empty and should be reasonably sized
      return value.trim().length > 0 && value.length <= 100;
    case 'description':
      // Description can be empty but should have a reasonable size limit
      return value.length <= 500;
    case 'difficulty':
      // Difficulty should be between 1 and 4
      return value >= 1 && value <= 4 && Number.isInteger(parseFloat(value));
    case 'progress':
      // Progress should be between 0 and 100
      return value >= 0 && value <= 100 && !isNaN(parseFloat(value));
    case 'targetCount':
      // Target count should be a positive integer
      return value > 0 && Number.isInteger(parseFloat(value));
    case 'currentCount':
      // Current count should be a non-negative integer
      return value >= 0 && Number.isInteger(parseFloat(value));
    case 'streak':
      // Streak should be a non-negative integer
      return value >= 0 && Number.isInteger(parseFloat(value));
    case 'monthday':
      // Month day should be between 1 and 31
      return value >= 1 && value <= 31 && Number.isInteger(parseFloat(value));
    default:
      return true;
  }
};

// Sanitize input to prevent XSS
const sanitizeInput = (value) => {
  if (typeof value !== 'string') return value;
  
  // Basic sanitization: replace HTML tags
  return value
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
};

// Utility function for rendering themed buttons
const ThemedButton = ({ 
  onClick, 
  isActive = false, 
  children, 
  color = null,
  fullWidth = false,
  className = "",
  disabled = false
}) => {
  const { currentTheme } = useContext(ThemeContext);
  const isNeonTheme = currentTheme.id.includes('neon');
  const isCyberpunk = currentTheme.id === 'cyberpunk';
  
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`py-2 text-sm font-medium ${fullWidth ? 'w-full' : ''} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      style={{
        backgroundColor: isActive 
          ? (isNeonTheme || isCyberpunk ? 'rgba(255, 255, 255, 0.1)' : color ? `${color}` : currentTheme.primaryColor)
          : (isNeonTheme || isCyberpunk ? 'transparent' : currentTheme.bgTertiary),
        color: isActive 
          ? (isNeonTheme || isCyberpunk ? color || currentTheme.primaryColor : 'white')
          : currentTheme.textSecondary,
        border: isNeonTheme || isCyberpunk 
          ? `1px solid ${isActive ? (color || currentTheme.primaryColor) : currentTheme.borderColor}` 
          : 'none',
        borderRadius: currentTheme.radius
      }}
    >
      {children}
    </button>
  );
};

// Utility function for form labels
const FormLabel = ({ htmlFor, children }) => {
  const { currentTheme } = useContext(ThemeContext);
  
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
const FormInput = ({ 
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
  const { currentTheme } = useContext(ThemeContext);
  
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

const AddItemModal = ({ 
  showAddModal, 
  setShowAddModal, 
  onAddItem,
  editingItem = null,
  setEditingItem
}) => {
  const { currentTheme } = useContext(ThemeContext);
  const [selectedType, setSelectedType] = useState("task");
  const [formData, setFormData] = useState({ ...DEFAULT_FORM_DATA });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isNeonTheme = currentTheme.id.includes('neon');
  const isCyberpunk = currentTheme.id === 'cyberpunk';
  const isEditMode = editingItem?.item !== null && editingItem?.item !== undefined;

  // Reset form when modal is shown or editing item changes
  useEffect(() => {
    if (showAddModal) {
      if (editingItem?.item) {
        // Edit mode - populate form with item data
        setSelectedType(editingItem.type);
        
        // Sanitize all string inputs before setting state
        const sanitizedItem = { ...editingItem.item };
        for (const key in sanitizedItem) {
          if (typeof sanitizedItem[key] === 'string') {
            sanitizedItem[key] = sanitizeInput(sanitizedItem[key]);
          }
        }
        
        setFormData({
          ...DEFAULT_FORM_DATA,
          ...sanitizedItem,
        });
      } else if (editingItem?.type) {
        // New item with pre-selected type
        setSelectedType(editingItem.type);
        setFormData({
          ...DEFAULT_FORM_DATA,
          recurrence: editingItem.type === "habit" ? "daily" : "one-time",
        });
      } else {
        // Default new item
        setSelectedType("task");
        setFormData({ ...DEFAULT_FORM_DATA });
      }
      
      // Reset errors whenever the modal opens
      setErrors({});
      setIsSubmitting(false);
    }
  }, [showAddModal, editingItem]);

  // Validate all form fields
  const validateForm = () => {
    const newErrors = {};
    
    // Check title (required for all types)
    if (!validateInput('title', formData.title)) {
      newErrors.title = true;
    }
    
    // Check description (optional but validate if present)
    if (formData.description && !validateInput('description', formData.description)) {
      newErrors.description = true;
    }
    
    // Check difficulty
    if (!validateInput('difficulty', formData.difficulty)) {
      newErrors.difficulty = true;
    }
    
    // Check progress for projects
    if (selectedType === 'project' && !validateInput('progress', formData.progress)) {
      newErrors.progress = true;
    }
    
    // Check counts for countable habits
    if (selectedType === 'habit' && formData.countable) {
      if (!validateInput('targetCount', formData.targetCount)) {
        newErrors.targetCount = true;
      }
      if (isEditMode && !validateInput('currentCount', formData.currentCount)) {
        newErrors.currentCount = true;
      }
    }
    
    // Check streak for habits in edit mode
    if (selectedType === 'habit' && isEditMode && !validateInput('streak', formData.streak)) {
      newErrors.streak = true;
    }
    
    // Check month day for monthly recurrence
    if (formData.recurrence === 'monthly' && !validateInput('monthday', formData.monthday)) {
      newErrors.monthday = true;
    }
    
    // Check due date for projects
    if (selectedType === 'project' && formData.recurrence === 'one-time' && !formData.due) {
      newErrors.due = true;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Validate all fields before submission
    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }
    
    // Sanitize string inputs before submission
    const sanitizedData = { ...formData };
    for (const key in sanitizedData) {
      if (typeof sanitizedData[key] === 'string') {
        sanitizedData[key] = sanitizeInput(sanitizedData[key]);
      }
    }
    
    if (isEditMode) {
      // Update existing item
      const updatedItem = {
        ...editingItem.item,
        ...sanitizedData
      };
      onAddItem(selectedType, updatedItem, true);
    } else {
      // Create new item
      const newItem = {
        id: Date.now(),
        ...sanitizedData
      };
      onAddItem(selectedType, newItem, false);
    }
    
    setShowAddModal(false);
    if (setEditingItem) setEditingItem(null);
    setIsSubmitting(false);
  };

  const handleTypeChange = (type) => {
    setSelectedType(type);
    // Update recurrence based on type
    if (type === "habit") {
      setFormData({
        ...formData,
        recurrence: "daily",
      });
    } else if (type === "task" || type === "project") {
      setFormData({
        ...formData,
        recurrence: "one-time",
      });
    }
    
    // Reset errors when type changes
    setErrors({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;
    
    // Remove any error for this field
    if (errors[name]) {
      setErrors({ ...errors, [name]: false });
    }
    
    // Handle special conversions
    if (["difficulty", "targetCount", "currentCount", "monthday"].includes(name)) {
      processedValue = parseInt(value) || 0;
      // Validate the numeric input
      if (!validateInput(name, processedValue)) {
        setErrors({ ...errors, [name]: true });
      }
    } else if (name === "progress") {
      processedValue = Math.min(100, Math.max(0, parseInt(value) || 0));
      // Validate the progress value
      if (!validateInput(name, processedValue)) {
        setErrors({ ...errors, [name]: true });
      }
    } else if (name === "streak") {
      processedValue = Math.max(0, parseInt(value) || 0);
      // Validate the streak value
      if (!validateInput(name, processedValue)) {
        setErrors({ ...errors, [name]: true });
      }
    } else if (name === "countable") {
      processedValue = value === "true";
    } else if (typeof value === 'string') {
      // For string inputs, validate if they match their criteria
      if (!validateInput(name, value)) {
        setErrors({ ...errors, [name]: true });
      }
    }
    
    setFormData({ ...formData, [name]: processedValue });
  };

  const handleNumberChange = (name, value) => {
    // Remove any error for this field
    if (errors[name]) {
      setErrors({ ...errors, [name]: false });
    }
    
    let processedValue = value;
    
    if (name === "currentCount") {
      processedValue = Math.max(0, value);
    } else if (name === "targetCount") {
      processedValue = Math.max(1, value);
    } else if (name === "streak") {
      processedValue = Math.max(0, value);
    }
    
    // Validate the numeric input
    if (!validateInput(name, processedValue)) {
      setErrors({ ...errors, [name]: true });
    }
    
    setFormData({ ...formData, [name]: processedValue });
  };

  const handleCancel = () => {
    setShowAddModal(false);
    if (setEditingItem) setEditingItem(null);
    setErrors({});
  };

  // Get difficulty indicator based on level (1-4)
  const getDifficultyIndicator = (level) => {
    const stars = [];
    for (let i = 0; i < 4; i++) {
      stars.push(
        <span 
          key={i} 
          className={i < level ? "text-yellow-400" : "text-gray-300 opacity-50"}
        >
          ★
        </span>
      );
    }
    return <div className="flex justify-center gap-1">{stars}</div>;
  };

  // Generate options for selects
  const weekdays = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
  const monthdays = Array.from({ length: 31 }, (_, i) => i + 1);

  // Utility function for status colors
  const getStatusColor = (status, opacity = 1) => {
    const colors = {
      "Pending": `rgba(245, 158, 11, ${opacity})`, // amber
      "In Progress": `rgba(59, 130, 246, ${opacity})`, // blue
      "Completed": `rgba(16, 185, 129, ${opacity})` // green
    };
    return colors[status] || `rgba(107, 114, 128, ${opacity})`; // gray as fallback
  };

  // Render counter input (used for target, current count, streak)
  const renderCounter = (name, value, label = "") => {
    return (
      <div className="flex items-center">
        <button
          type="button"
          onClick={() => handleNumberChange(name, value - 1)}
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
          min={name === "targetCount" ? "1" : "0"}
          className={`w-16 py-1.5 px-2 border text-center border-l-0 border-r-0 ${errors[name] ? 'border-red-500' : ''}`}
          style={{ 
            backgroundColor: currentTheme.inputBg,
            color: currentTheme.textPrimary,
            borderColor: errors[name] ? '#ef4444' : currentTheme.borderColor
          }}
          value={value}
          onChange={handleInputChange}
        />
        <button
          type="button"
          onClick={() => handleNumberChange(name, value + 1)}
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
        {errors[name] && (
          <p className="ml-2 text-xs text-red-500">
            Invalid value
          </p>
        )}
      </div>
    );
  };
  
  if (!showAddModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)' }}>
      <div 
        className="w-full max-w-md overflow-hidden shadow-lg animate-fade-in"
        style={{
          backgroundColor: currentTheme.bgSecondary,
          borderRadius: currentTheme.radius,
          border: isNeonTheme || isCyberpunk ? `2px solid ${currentTheme.primaryColor}` : `1px solid ${currentTheme.borderColor}`
        }}
      >
        {/* Colorful accent bar */}
        <div 
          className="h-1" 
          style={{ 
            background: `linear-gradient(to right, ${currentTheme.primaryColor}, ${currentTheme.secondaryColor})` 
          }}
        ></div>
        
        {/* Header */}
        <div 
          className="p-4 flex justify-between items-center border-b" 
          style={{ borderColor: currentTheme.borderColor }}
        >
          <h3 
            className="text-lg font-semibold" 
            style={{ color: currentTheme.textPrimary }}
          >
            {isEditMode ? 
              `Edit ${selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}` : 
              `New ${selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}`}
          </h3>
          <button
            onClick={handleCancel}
            className="p-2 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-500 transition-colors"
            style={{ color: currentTheme.textSecondary }}
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Form Content */}
        <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto">
          {/* Item Type Selector - only show if not editing */}
          {!isEditMode && (
            <div className="flex gap-2 mb-1">
              {["habit", "task", "project"].map((type) => (
                <ThemedButton
                  key={type}
                  onClick={() => handleTypeChange(type)}
                  isActive={selectedType === type}
                  fullWidth={true}
                  className="capitalize"
                >
                  {type}
                </ThemedButton>
              ))}
            </div>
          )}
          
          {/* Title Field */}
          <div>
            <FormLabel htmlFor="title">Title</FormLabel>
            <FormInput
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder={`What ${selectedType === "habit" ? "habit do you want to build" : "do you want to accomplish"}?`}
              required={true}
              error={errors.title}
              maxLength={100}
            />
          </div>
          
          {/* Description Field */}
          <div>
            <FormLabel htmlFor="description">Description (optional)</FormLabel>
            <textarea
              id="description"
              name="description"
              placeholder="Add details..."
              className={`w-full px-4 py-2 border rounded-lg text-sm placeholder-gray-500 focus:outline-none ${errors.description ? 'border-red-500 focus:border-red-500' : 'focus:border-purple-500'}`}
              rows="2"
              style={{ 
                backgroundColor: currentTheme.inputBg,
                color: currentTheme.textPrimary,
                borderColor: errors.description ? '#ef4444' : currentTheme.borderColor,
                borderRadius: currentTheme.radius
              }}
              value={formData.description || ""}
              onChange={handleInputChange}
              maxLength={500}
            />
            {errors.description && (
              <p className="mt-1 text-xs text-red-500">
                Description is too long (maximum 500 characters).
              </p>
            )}
          </div>
          
          {/* Recurrence Selector */}
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
                    {recur}
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
                    {recur.replace('-', ' ')}
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
          
          {/* Due Date for Tasks and Projects */}
          {(selectedType === "task" || selectedType === "project") && formData.recurrence === "one-time" && (
            <div>
              <FormLabel htmlFor="due">Due Date {selectedType === "project" ? "" : "(optional)"}</FormLabel>
              <FormInput
                name="due"
                type="date"
                value={formData.due || ""}
                onChange={handleInputChange}
                required={selectedType === "project"}
                error={errors.due}
              />
              {errors.due && selectedType === "project" && (
                <p className="mt-1 text-xs text-red-500">
                  Due date is required for projects.
                </p>
              )}
            </div>
          )}
          
          {/* Countable Toggle for Habits */}
          {selectedType === "habit" && (
            <div>
              <FormLabel htmlFor="countable">Type of Habit</FormLabel>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { value: "false", label: "Check-off" },
                  { value: "true", label: "Countable" }
                ].map((option) => (
                  <ThemedButton
                    key={option.value}
                    onClick={() => setFormData({ ...formData, countable: option.value === "true" })}
                    isActive={String(formData.countable) === option.value}
                  >
                    {option.label}
                  </ThemedButton>
                ))}
              </div>
              <p className="mt-1 text-xs text-gray-500">
                {formData.countable 
                  ? "Track multiple completions per day (e.g., glasses of water)" 
                  : "Simple habit to check off when completed"}
              </p>
            </div>
          )}
          
          {/* Target count for countable habits */}
          {selectedType === "habit" && formData.countable && (
            <div>
              <FormLabel htmlFor="targetCount">Daily Target</FormLabel>
              {renderCounter("targetCount", formData.targetCount, "per day")}
            </div>
          )}
          
          {/* Current count for countable habits (edit mode only) */}
          {selectedType === "habit" && formData.countable && isEditMode && (
            <div>
              <FormLabel htmlFor="currentCount">Current Count</FormLabel>
              {renderCounter("currentCount", formData.currentCount, `of ${formData.targetCount} target`)}
            </div>
          )}
          
          {/* Difficulty Selector */}
          <div>
            <FormLabel htmlFor="difficulty">Difficulty</FormLabel>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((level) => {
                // Colors for the difficulty levels
                const difficultyColors = [null, "#10b981", "#3b82f6", "#f97316", "#ef4444"];
                const bgColors = [null, "rgba(16, 185, 129, 0.4)", "rgba(59, 130, 246, 0.4)", "rgba(249, 115, 22, 0.4)", "rgba(239, 68, 68, 0.4)"];
                
                return (
                  <ThemedButton
                    key={level}
                    onClick={() => setFormData({ ...formData, difficulty: level })}
                    isActive={formData.difficulty === level}
                    color={isNeonTheme || isCyberpunk ? difficultyColors[level] : bgColors[level]}
                  >
                    {getDifficultyIndicator(level)}
                    <div className="mt-1">
                      {["", "Easy", "Medium", "Hard", "Epic"][level]}
                    </div>
                  </ThemedButton>
                );
              })}
            </div>
            {errors.difficulty && (
              <p className="mt-1 text-xs text-red-500">
                Please select a valid difficulty level.
              </p>
            )}
          </div>
          
          {/* Progress for Projects Only */}
          {selectedType === "project" && (
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
          )}
          
          {/* Streak for Habits Only - only visible when editing */}
          {selectedType === "habit" && isEditMode && (
            <div>
              <FormLabel htmlFor="streak">Current Streak</FormLabel>
              <div className="flex items-center">
                {renderCounter("streak", formData.streak || 0)}
                <div 
                  className="ml-2 flex items-center gap-1 px-2 py-1 rounded"
                  style={{
                    backgroundColor: isNeonTheme || isCyberpunk ? 'transparent' : 'rgba(251, 191, 36, 0.1)',
                    color: '#f59e0b',
                    border: isNeonTheme || isCyberpunk ? '1px solid #f59e0b' : 'none',
                    borderRadius: currentTheme.radius,
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
                  </svg>
                  <span className="text-xs font-medium">Streak</span>
                </div>
              </div>
            </div>
          )}
          
          {/* Status for Tasks Only - only visible when editing */}
          {selectedType === "task" && isEditMode && (
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
                    {status}
                  </ThemedButton>
                ))}
              </div>
            </div>
          )}
          
          {/* Show validation errors summary if there are any */}
          {Object.keys(errors).length > 0 && isSubmitting && (
            <div className="bg-red-50 border border-red-400 text-red-800 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Please correct the errors before submitting:</strong>
              <ul className="mt-1 list-disc list-inside text-sm">
                {errors.title && <li>Title is required</li>}
                {errors.description && <li>Description is too long</li>}
                {errors.due && selectedType === "project" && <li>Due date is required for projects</li>}
                {errors.difficulty && <li>Invalid difficulty level</li>}
                {errors.progress && <li>Progress must be between 0-100</li>}
                {errors.targetCount && <li>Target count must be a positive number</li>}
                {errors.currentCount && <li>Current count cannot be negative</li>}
                {errors.streak && <li>Streak cannot be negative</li>}
              </ul>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div 
          className="p-4 flex justify-end space-x-3 border-t"
          style={{ 
            backgroundColor: isNeonTheme || isCyberpunk ? 'rgba(0, 0, 0, 0.2)' : currentTheme.bgTertiary,
            borderColor: currentTheme.borderColor 
          }}
        >
          <button
            onClick={handleCancel}
            className="px-4 py-2 border rounded-md text-sm font-medium transition-colors"
            style={{ 
              backgroundColor: isNeonTheme || isCyberpunk ? 'transparent' : 'white',
              color: currentTheme.textSecondary,
              borderColor: currentTheme.borderColor,
              borderRadius: currentTheme.radius
            }}
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className={`px-4 py-2 rounded-md text-sm font-medium shadow-sm transition-all flex items-center ${isSubmitting ? 'opacity-70 cursor-wait' : ''}`}
            style={{ 
              background: isNeonTheme || isCyberpunk 
                ? 'transparent' 
                : `linear-gradient(to right, ${currentTheme.primaryColor}, ${currentTheme.secondaryColor})`,
              color: isNeonTheme || isCyberpunk ? currentTheme.primaryColor : 'white',
              border: isNeonTheme || isCyberpunk ? `1px solid ${currentTheme.primaryColor}` : 'none',
              borderRadius: currentTheme.radius
            }}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : isEditMode ? (
              <>
                <SaveIcon className="w-4 h-4 mr-1.5" />
                Save Changes
              </>
            ) : (
              <>
                <PlusIcon className="w-4 h-4 mr-1.5" />
                Create {selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddItemModal;