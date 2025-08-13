import React, { useState, useEffect } from "react";
import { XIcon, PlusIcon, SaveIcon } from "@heroicons/react/outline";
import { useThemeStyles } from "../../context/ThemeProvider";

import { ThemedButton, FormLabel, FormInput } from "./AddItemModal/FormComponents";
import RecurrenceSection from "./AddItemModal/RecurrenceSection";
import DifficultySection from "./AddItemModal/DifficultySection";
import CountableSection from "./AddItemModal/CountableSection";
import StatusSection from "./AddItemModal/StatusSection";
import SubtaskSection from "./AddItemModal/SubtaskSection";
import { validateInput, validateForm, sanitizeInput, DEFAULT_FORM_DATA } from "./AddItemModal/ValidationUtils";

const AddItemModal = ({ 
  showAddModal, 
  setShowAddModal, 
  onAddItem,
  editingItem = null,
  setEditingItem
}) => {
  const { theme: currentTheme } = useThemeStyles();

  // Add null checks to prevent React Error #31
  if (!currentTheme) {
    return <div>Loading...</div>;
  }

  const [selectedType, setSelectedType] = useState("task");
  const [formData, setFormData] = useState({ ...DEFAULT_FORM_DATA });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isNeonTheme = currentTheme.id && currentTheme.id.includes('neon');
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

  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Validate all fields before submission
    if (!validateForm(formData, selectedType, isEditMode, setErrors)) {
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
    
    // Calculate progress for projects based on completed subtasks
    if (selectedType === "project") {
      if (sanitizedData.subtasks && sanitizedData.subtasks.length > 0) {
        const completedSubtasks = sanitizedData.subtasks.filter(st => st.completed).length;
        sanitizedData.progress = Math.round((completedSubtasks / sanitizedData.subtasks.length) * 100);
      } else {
        // For projects without subtasks, set progress to 0 or use the current value if editing
        sanitizedData.progress = isEditMode ? formData.progress : 0;
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
          
          {/* Recurrence Section */}
          <RecurrenceSection 
            formData={formData}
            setFormData={setFormData}
            selectedType={selectedType}
            errors={errors}
            handleInputChange={handleInputChange}
          />
          
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
          
          {/* Countable Toggle and Settings for Habits */}
          {selectedType === "habit" && (
            <CountableSection 
              formData={formData}
              isEditMode={isEditMode}
              handleInputChange={handleInputChange}
              handleNumberChange={handleNumberChange}
              errors={errors}
            />
          )}
          
          {/* Difficulty Selector */}
          <DifficultySection 
            formData={formData}
            handleInputChange={handleInputChange}
            errors={errors}
          />
          
          {/* Subtasks for Projects Only */}
          {selectedType === "project" && (
            <SubtaskSection
              formData={formData}
              setFormData={setFormData}
            />
          )}
          
          {/* Progress Display for Projects */}
          {selectedType === "project" && formData.subtasks && formData.subtasks.length > 0 && (
            <div>
              <FormLabel>Progress (Calculated)</FormLabel>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm" style={{ color: currentTheme.textSecondary }}>
                  {formData.subtasks.filter(st => st.completed).length} of {formData.subtasks.length} subtasks completed
                </span>
                <span className="text-sm font-medium" style={{ color: currentTheme.primaryColor }}>
                  {Math.round((formData.subtasks.filter(st => st.completed).length / formData.subtasks.length) * 100)}%
                </span>
              </div>
              <div className="w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: `${currentTheme.primaryColor}20` }}>
                <div 
                  className="h-full" 
                  style={{ 
                    width: `${Math.round((formData.subtasks.filter(st => st.completed).length / formData.subtasks.length) * 100)}%`, 
                    backgroundColor: currentTheme.primaryColor 
                  }}
                ></div>
              </div>
            </div>
          )}

          {/* For projects without subtasks, show a message */}
          {selectedType === "project" && (!formData.subtasks || formData.subtasks.length === 0) && (
            <div>
              <FormLabel>Progress</FormLabel>
              <div className="text-center p-3 rounded" style={{ 
                backgroundColor: currentTheme.bgTertiary, 
                color: currentTheme.textSecondary,
                borderRadius: currentTheme.radius
              }}>
                Add subtasks to track progress automatically
              </div>
            </div>
          )}
          
          {/* Streak for Habits Only - only visible when editing */}
          {selectedType === "habit" && isEditMode && (
            <div>
              <FormLabel htmlFor="streak">Current Streak</FormLabel>
              <div className="flex items-center">
                <input
                  id="streak"
                  name="streak"
                  type="number"
                  min="0"
                  className={`w-20 py-1.5 px-2 border text-center ${errors.streak ? 'border-red-500' : ''}`}
                  style={{ 
                    backgroundColor: currentTheme.inputBg,
                    color: currentTheme.textPrimary,
                    borderColor: errors.streak ? '#ef4444' : currentTheme.borderColor
                  }}
                  value={formData.streak || 0}
                  onChange={handleInputChange}
                />
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
              {errors.streak && (
                <p className="mt-1 text-xs text-red-500">
                  Streak cannot be negative.
                </p>
              )}
            </div>
          )}
          
          {/* Status for Tasks Only - only visible when editing */}
          {selectedType === "task" && isEditMode && (
            <StatusSection
              formData={formData}
              setFormData={setFormData}
            />
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