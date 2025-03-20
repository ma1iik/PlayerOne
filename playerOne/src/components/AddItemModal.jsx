import React, { useState, useContext, useEffect } from "react";
import { XIcon, PlusIcon, SaveIcon, MinusIcon } from "@heroicons/react/outline";
import ThemeContext from "../context/ThemeContext";

const AddItemModal = ({ 
  showAddModal, 
  setShowAddModal, 
  onAddItem,
  editingItem = null,
  setEditingItem
}) => {
  const { currentTheme } = useContext(ThemeContext);
  const [selectedType, setSelectedType] = useState("task");
  const [formData, setFormData] = useState({
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
    weekday: "monday", // for weekly recurrence
    monthday: 1, // for monthly recurrence
  });

  const isNeonTheme = currentTheme.id.includes('neon');
  const isCyberpunk = currentTheme.id === 'cyberpunk';
  const isEditMode = editingItem?.item !== null && editingItem?.item !== undefined;

  // Reset form when modal is shown or editing item changes
  useEffect(() => {
    if (showAddModal) {
      if (editingItem?.item) {
        // Edit mode - populate form with item data
        setSelectedType(editingItem.type);
        setFormData({
          ...formData, // Keep default values
          ...editingItem.item, // Override with item data
        });
      } else if (editingItem?.type) {
        // New item with pre-selected type
        setSelectedType(editingItem.type);
        // Reset to defaults but keep the type
        setFormData({
          title: "",
          recurrence: selectedType === "habit" ? "daily" : "one-time",
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
        });
      } else {
        // Default new item
        setSelectedType("task");
        setFormData({
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
        });
      }
    }
  }, [showAddModal, editingItem]);

  const handleSubmit = () => {
    if (!formData.title.trim()) {
      return; // Prevent adding empty items
    }
    
    if (isEditMode) {
      // Update existing item
      const updatedItem = {
        ...editingItem.item,
        ...formData
      };
      onAddItem(selectedType, updatedItem, true);
    } else {
      // Create new item
      const newItem = {
        id: Date.now(),
        ...formData
      };
      onAddItem(selectedType, newItem, false);
    }
    
    setShowAddModal(false);
    if (setEditingItem) setEditingItem(null);
  };

  const handleTypeChange = (type) => {
    setSelectedType(type);
    // Update recurrence based on type
    if (type === "habit") {
      setFormData({
        ...formData,
        recurrence: "daily",
      });
    } else if (type === "task") {
      setFormData({
        ...formData,
        recurrence: "one-time",
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Handle special conversions
    if (["difficulty", "targetCount", "currentCount", "monthday"].includes(name)) {
      setFormData({ ...formData, [name]: parseInt(value) || 0 });
    } else if (name === "progress") {
      setFormData({ ...formData, [name]: Math.min(100, Math.max(0, parseInt(value) || 0)) });
    } else if (name === "streak") {
      setFormData({ ...formData, [name]: Math.max(0, parseInt(value) || 0) });
    } else if (name === "countable") {
      setFormData({ ...formData, [name]: value === "true" });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleCountChange = (type) => {
    if (type === "increment") {
      setFormData({
        ...formData,
        currentCount: formData.currentCount + 1
      });
    } else if (type === "decrement") {
      setFormData({
        ...formData,
        currentCount: Math.max(0, formData.currentCount - 1)
      });
    }
  };

  const handleTargetCountChange = (type) => {
    if (type === "increment") {
      setFormData({
        ...formData,
        targetCount: formData.targetCount + 1
      });
    } else if (type === "decrement") {
      setFormData({
        ...formData,
        targetCount: Math.max(1, formData.targetCount - 1)
      });
    }
  };

  const handleCancel = () => {
    setShowAddModal(false);
    if (setEditingItem) setEditingItem(null);
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

  // Generate weekday options
  const weekdays = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
  
  // Generate monthday options (1-31)
  const monthdays = Array.from({ length: 31 }, (_, i) => i + 1);

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
                <button
                  key={type}
                  onClick={() => handleTypeChange(type)}
                  className="flex-1 capitalize py-2 rounded-md text-sm font-medium transition-colors"
                  style={{
                    backgroundColor: selectedType === type 
                      ? (isNeonTheme || isCyberpunk ? 'rgba(255, 255, 255, 0.1)' : currentTheme.primaryColor)
                      : (isNeonTheme || isCyberpunk ? 'transparent' : currentTheme.bgTertiary),
                    color: selectedType === type 
                      ? (isNeonTheme || isCyberpunk ? currentTheme.primaryColor : 'white')
                      : currentTheme.textSecondary,
                    border: isNeonTheme || isCyberpunk 
                      ? `1px solid ${selectedType === type ? currentTheme.primaryColor : currentTheme.borderColor}` 
                      : 'none',
                    borderRadius: currentTheme.radius
                  }}
                >
                  {type}
                </button>
              ))}
            </div>
          )}
          
          {/* Title Field */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-1" style={{ color: currentTheme.textPrimary }}>
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              placeholder={`What ${selectedType === "habit" ? "habit do you want to build" : "do you want to accomplish"}?`}
              className="w-full px-4 py-2 border rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:border-purple-500"
              style={{ 
                backgroundColor: currentTheme.inputBg,
                color: currentTheme.textPrimary,
                borderColor: currentTheme.borderColor,
                borderRadius: currentTheme.radius
              }}
              value={formData.title}
              onChange={handleInputChange}
            />
          </div>
          
          {/* Description Field */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-1" style={{ color: currentTheme.textPrimary }}>
              Description (optional)
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Add details..."
              className="w-full px-4 py-2 border rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:border-purple-500"
              rows="2"
              style={{ 
                backgroundColor: currentTheme.inputBg,
                color: currentTheme.textPrimary,
                borderColor: currentTheme.borderColor,
                borderRadius: currentTheme.radius
              }}
              value={formData.description || ""}
              onChange={handleInputChange}
            />
          </div>
          
          {/* Recurrence Selector */}
          <div>
            <label htmlFor="recurrence" className="block text-sm font-medium mb-1" style={{ color: currentTheme.textPrimary }}>
              Recurrence
            </label>
            
            {/* Different options for habit vs task */}
            {selectedType === "habit" ? (
              <div className="grid grid-cols-3 gap-2">
                {["daily", "weekly", "monthly"].map((recur) => (
                  <button
                    key={recur}
                    type="button"
                    className="py-2 capitalize text-sm font-medium"
                    style={{
                      backgroundColor: formData.recurrence === recur 
                        ? (isNeonTheme || isCyberpunk ? 'rgba(255, 255, 255, 0.1)' : currentTheme.primaryColor)
                        : (isNeonTheme || isCyberpunk ? 'transparent' : currentTheme.bgTertiary),
                      color: formData.recurrence === recur 
                        ? (isNeonTheme || isCyberpunk ? currentTheme.primaryColor : 'white')
                        : currentTheme.textSecondary,
                      border: isNeonTheme || isCyberpunk 
                        ? `1px solid ${formData.recurrence === recur ? currentTheme.primaryColor : currentTheme.borderColor}` 
                        : 'none',
                      borderRadius: currentTheme.radius
                    }}
                    onClick={() => setFormData({ ...formData, recurrence: recur })}
                  >
                    {recur}
                  </button>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                {["one-time", "recurring"].map((recur) => (
                  <button
                    key={recur}
                    type="button"
                    className="py-2 capitalize text-sm font-medium"
                    style={{
                      backgroundColor: formData.recurrence === recur 
                        ? (isNeonTheme || isCyberpunk ? 'rgba(255, 255, 255, 0.1)' : currentTheme.primaryColor)
                        : (isNeonTheme || isCyberpunk ? 'transparent' : currentTheme.bgTertiary),
                      color: formData.recurrence === recur 
                        ? (isNeonTheme || isCyberpunk ? currentTheme.primaryColor : 'white')
                        : currentTheme.textSecondary,
                      border: isNeonTheme || isCyberpunk 
                        ? `1px solid ${formData.recurrence === recur ? currentTheme.primaryColor : currentTheme.borderColor}` 
                        : 'none',
                      borderRadius: currentTheme.radius
                    }}
                    onClick={() => setFormData({ ...formData, recurrence: recur })}
                  >
                    {recur.replace('-', ' ')}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Weekly day selector */}
          {(formData.recurrence === "weekly" || (selectedType === "task" && formData.recurrence === "recurring")) && (
            <div>
              <label htmlFor="weekday" className="block text-sm font-medium mb-1" style={{ color: currentTheme.textPrimary }}>
                Day of Week
              </label>
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
              <label htmlFor="monthday" className="block text-sm font-medium mb-1" style={{ color: currentTheme.textPrimary }}>
                Day of Month
              </label>
              <select
                id="monthday"
                name="monthday"
                className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:border-purple-500"
                style={{ 
                  backgroundColor: currentTheme.inputBg,
                  color: currentTheme.textPrimary,
                  borderColor: currentTheme.borderColor,
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
            </div>
          )}
          
          {/* Due Date for Tasks Only */}
          {selectedType === "task" && formData.recurrence === "one-time" && (
            <div>
              <label htmlFor="due" className="block text-sm font-medium mb-1" style={{ color: currentTheme.textPrimary }}>
                Due Date (optional)
              </label>
              <input
                id="due"
                name="due"
                type="date"
                className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:border-purple-500"
                style={{ 
                  backgroundColor: currentTheme.inputBg,
                  color: currentTheme.textPrimary,
                  borderColor: currentTheme.borderColor,
                  borderRadius: currentTheme.radius
                }}
                value={formData.due || ""}
                onChange={handleInputChange}
              />
            </div>
          )}
          
          {/* Countable Toggle for Habits */}
          {selectedType === "habit" && (
            <div>
              <label htmlFor="countable" className="block text-sm font-medium mb-1" style={{ color: currentTheme.textPrimary }}>
                Type of Habit
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { value: "false", label: "Check-off" },
                  { value: "true", label: "Countable" }
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    className="py-2 text-sm font-medium"
                    style={{
                      backgroundColor: String(formData.countable) === option.value 
                        ? (isNeonTheme || isCyberpunk ? 'rgba(255, 255, 255, 0.1)' : currentTheme.primaryColor)
                        : (isNeonTheme || isCyberpunk ? 'transparent' : currentTheme.bgTertiary),
                      color: String(formData.countable) === option.value 
                        ? (isNeonTheme || isCyberpunk ? currentTheme.primaryColor : 'white')
                        : currentTheme.textSecondary,
                      border: isNeonTheme || isCyberpunk 
                        ? `1px solid ${String(formData.countable) === option.value ? currentTheme.primaryColor : currentTheme.borderColor}` 
                        : 'none',
                      borderRadius: currentTheme.radius
                    }}
                    onClick={() => setFormData({ ...formData, countable: option.value === "true" })}
                  >
                    {option.label}
                  </button>
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
              <label htmlFor="targetCount" className="block text-sm font-medium mb-1" style={{ color: currentTheme.textPrimary }}>
                Daily Target
              </label>
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() => handleTargetCountChange("decrement")}
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
                  id="targetCount"
                  name="targetCount"
                  type="number"
                  min="1"
                  className="w-16 py-1.5 px-2 border text-center border-l-0 border-r-0"
                  style={{ 
                    backgroundColor: currentTheme.inputBg,
                    color: currentTheme.textPrimary,
                    borderColor: currentTheme.borderColor
                  }}
                  value={formData.targetCount}
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  onClick={() => handleTargetCountChange("increment")}
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
                <span className="ml-2 text-sm" style={{ color: currentTheme.textPrimary }}>
                  per day
                </span>
              </div>
            </div>
          )}
          
          {/* Current count for countable habits (edit mode only) */}
          {selectedType === "habit" && formData.countable && isEditMode && (
            <div>
              <label htmlFor="currentCount" className="block text-sm font-medium mb-1" style={{ color: currentTheme.textPrimary }}>
                Current Count
              </label>
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() => handleCountChange("decrement")}
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
                  id="currentCount"
                  name="currentCount"
                  type="number"
                  min="0"
                  className="w-16 py-1.5 px-2 border text-center border-l-0 border-r-0"
                  style={{ 
                    backgroundColor: currentTheme.inputBg,
                    color: currentTheme.textPrimary,
                    borderColor: currentTheme.borderColor
                  }}
                  value={formData.currentCount}
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  onClick={() => handleCountChange("increment")}
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
                <span className="ml-2 text-sm" style={{ color: currentTheme.textSecondary }}>
                  of {formData.targetCount} target
                </span>
              </div>
            </div>
          )}
          
          {/* Difficulty Selector for Both Habits and Tasks */}
          <div>
            <label htmlFor="difficulty" className="block text-sm font-medium mb-1" style={{ color: currentTheme.textPrimary }}>
              Difficulty
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((level) => (
                <button
                  key={level}
                  type="button"
                  className="py-2 rounded-md text-sm font-medium"
                  style={{
                    backgroundColor: formData.difficulty === level 
                      ? (isNeonTheme || isCyberpunk ? 'rgba(255, 255, 255, 0.1)' : `rgba(${level === 1 ? '16, 185, 129' : level === 2 ? '59, 130, 246' : level === 3 ? '249, 115, 22' : '239, 68, 68'}, 0.4)`)
                      : (isNeonTheme || isCyberpunk ? 'transparent' : currentTheme.bgTertiary),
                    color: formData.difficulty === level 
                      ? (isNeonTheme || isCyberpunk ? [null, "#10b981", "#3b82f6", "#f97316", "#ef4444"][level] : currentTheme.textPrimary)
                      : currentTheme.textSecondary,
                    border: isNeonTheme || isCyberpunk 
                      ? `1px solid ${formData.difficulty === level ? [null, "#10b981", "#3b82f6", "#f97316", "#ef4444"][level] : currentTheme.borderColor}` 
                      : 'none',
                    borderRadius: currentTheme.radius
                  }}
                  onClick={() => setFormData({ ...formData, difficulty: level })}
                >
                  {getDifficultyIndicator(level)}
                  <div className="mt-1">
                    {["", "Easy", "Medium", "Hard", "Epic"][level]}
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          {/* Progress for Projects Only */}
          {selectedType === "project" && (
            <div>
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="progress" className="block text-sm font-medium" style={{ color: currentTheme.textPrimary }}>
                  Progress
                </label>
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
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
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
            </div>
          )}
          
          {/* Streak for Habits Only - only visible when editing */}
          {selectedType === "habit" && isEditMode && (
            <div>
              <label htmlFor="streak" className="block text-sm font-medium mb-1" style={{ color: currentTheme.textPrimary }}>
                Current Streak
              </label>
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, streak: Math.max(0, (formData.streak || 0) - 1) })}
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
                  id="streak"
                  name="streak"
                  type="number"
                  min="0"
                  className="w-16 py-1.5 px-2 border text-center border-l-0 border-r-0"
                  style={{ 
                    backgroundColor: currentTheme.inputBg,
                    color: currentTheme.textPrimary,
                    borderColor: currentTheme.borderColor
                  }}
                  value={formData.streak || 0}
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, streak: (formData.streak || 0) + 1 })}
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
              <label htmlFor="status" className="block text-sm font-medium mb-1" style={{ color: currentTheme.textPrimary }}>
                Status
              </label>
              <div className="grid grid-cols-3 gap-2">
                {["Pending", "In Progress", "Completed"].map((status) => (
                  <button
                    key={status}
                    type="button"
                    className="py-2 text-sm font-medium"
                    style={{
                      backgroundColor: formData.status === status 
                        ? (isNeonTheme || isCyberpunk ? 'rgba(255, 255, 255, 0.1)' : getStatusColor(status, 0.4))
                        : (isNeonTheme || isCyberpunk ? 'transparent' : currentTheme.bgTertiary),
                      color: formData.status === status 
                        ? (isNeonTheme || isCyberpunk ? getStatusColor(status, 1) : currentTheme.textPrimary)
                        : currentTheme.textSecondary,
                      border: isNeonTheme || isCyberpunk 
                        ? `1px solid ${formData.status === status ? getStatusColor(status, 1) : currentTheme.borderColor}` 
                        : 'none',
                      borderRadius: currentTheme.radius
                    }}
                    onClick={() => setFormData({ ...formData, status: status })}
                  >
                    {status}
                  </button>
                ))}
              </div>
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
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-md text-sm font-medium shadow-sm transition-all flex items-center"
            style={{ 
              background: isNeonTheme || isCyberpunk 
                ? 'transparent' 
                : `linear-gradient(to right, ${currentTheme.primaryColor}, ${currentTheme.secondaryColor})`,
              color: isNeonTheme || isCyberpunk ? currentTheme.primaryColor : 'white',
              border: isNeonTheme || isCyberpunk ? `1px solid ${currentTheme.primaryColor}` : 'none',
              borderRadius: currentTheme.radius
            }}
          >
            {isEditMode ? (
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

// Utility function to get color for status
const getStatusColor = (status, opacity = 1) => {
  const colors = {
    "Pending": `rgba(245, 158, 11, ${opacity})`, // amber
    "In Progress": `rgba(59, 130, 246, ${opacity})`, // blue
    "Completed": `rgba(16, 185, 129, ${opacity})` // green
  };
  return colors[status] || `rgba(107, 114, 128, ${opacity})`; // gray as fallback
};

export default AddItemModal;