import React, { useState, useContext, useEffect } from "react";
import { XIcon, PlusIcon, SaveIcon } from "@heroicons/react/outline";
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
    recurrence: "daily",
    difficulty: 1,
    description: "",
    due: "",
    progress: 0
  });

  const isEditMode = editingItem?.item !== null && editingItem?.item !== undefined;

  // Reset form when modal is shown or editing item changes
  useEffect(() => {
    if (showAddModal) {
      if (editingItem?.item) {
        // Edit mode - populate form with item data
        setSelectedType(editingItem.type);
        setFormData({
          title: editingItem.item.title || "",
          recurrence: editingItem.item.recurrence || "daily",
          difficulty: editingItem.item.difficulty || 1,
          description: editingItem.item.description || "",
          due: editingItem.item.due || "",
          progress: editingItem.item.progress || 0,
          status: editingItem.item.status || "Pending",
          streak: editingItem.item.streak || 0
        });
      } else if (editingItem?.type) {
        // New item with pre-selected type
        setSelectedType(editingItem.type);
        setFormData({
          title: "",
          recurrence: "daily",
          difficulty: 1,
          description: "",
          due: "",
          progress: 0,
          status: "Pending",
          streak: 0
        });
      } else {
        // Default new item
        setSelectedType("task");
        setFormData({
          title: "",
          recurrence: "daily",
          difficulty: 1,
          description: "",
          due: "",
          progress: 0,
          status: "Pending",
          streak: 0
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
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Handle special conversions
    if (name === "difficulty") {
      setFormData({ ...formData, [name]: parseInt(value) });
    } else if (name === "progress") {
      setFormData({ ...formData, [name]: Math.min(100, Math.max(0, parseInt(value))) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleCancel = () => {
    setShowAddModal(false);
    if (setEditingItem) setEditingItem(null);
  };

  if (!showAddModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-4 flex justify-between items-center border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">
            {isEditMode ? `Edit ${selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}` : 
             `New ${selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}`}
          </h3>
          <button
            onClick={handleCancel}
            className="text-gray-400 hover:text-gray-500 transition-colors"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4 space-y-4">
          {/* Item Type Selector - only show if not editing */}
          {!isEditMode && (
            <div className="flex gap-2">
              {["habit", "task", "project"].map((type) => (
                <button
                  key={type}
                  onClick={() => handleTypeChange(type)}
                  className={`flex-1 capitalize py-2 rounded-md text-sm font-medium transition-colors ${
                    selectedType === type 
                      ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          )}
          
          {/* Title Field */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              placeholder="What do you want to accomplish?"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              value={formData.title}
              onChange={handleInputChange}
            />
          </div>
          
          {/* Description Field */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description (optional)
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Add details..."
              className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              rows="2"
              value={formData.description || ""}
              onChange={handleInputChange}
            />
          </div>
          
          {/* Recurrence Selector for Habits and Tasks */}
          {(selectedType === "habit" || selectedType === "task") && (
            <div>
              <label htmlFor="recurrence" className="block text-sm font-medium text-gray-700 mb-1">
                Recurrence
              </label>
              <select
                id="recurrence"
                name="recurrence"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                value={formData.recurrence || "daily"}
                onChange={handleInputChange}
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
          )}
          
          {/* Due Date for Tasks Only */}
          {selectedType === "task" && (
            <div>
              <label htmlFor="due" className="block text-sm font-medium text-gray-700 mb-1">
                Due Date (optional)
              </label>
              <input
                id="due"
                name="due"
                type="date"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                value={formData.due || ""}
                onChange={handleInputChange}
              />
            </div>
          )}
          
          {/* Difficulty Selector for Tasks and Projects */}
          {(selectedType === "task" || selectedType === "project") && (
            <div>
              <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-1">
                Difficulty
              </label>
              <select
                id="difficulty"
                name="difficulty"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                value={formData.difficulty || 1}
                onChange={handleInputChange}
              >
                <option value="1">Easy</option>
                <option value="2">Medium</option>
                <option value="3">Hard</option>
                {selectedType === "project" && <option value="4">Very Hard</option>}
                {selectedType === "project" && <option value="5">Epic</option>}
              </select>
            </div>
          )}
          
          {/* Progress for Projects Only */}
          {selectedType === "project" && (
            <div>
              <label htmlFor="progress" className="block text-sm font-medium text-gray-700 mb-1">
                Progress ({formData.progress || 0}%)
              </label>
              <input
                id="progress"
                name="progress"
                type="range"
                min="0"
                max="100"
                step="1"
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                value={formData.progress || 0}
                onChange={handleInputChange}
              />
              <div className="mt-1 flex justify-between text-xs text-gray-500">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>
          )}
          
          {/* Streak for Habits Only - only visible when editing */}
          {selectedType === "habit" && isEditMode && (
            <div>
              <label htmlFor="streak" className="block text-sm font-medium text-gray-700 mb-1">
                Current Streak
              </label>
              <input
                id="streak"
                name="streak"
                type="number"
                min="0"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                value={formData.streak || 0}
                onChange={handleInputChange}
              />
            </div>
          )}
          
          {/* Status for Tasks Only - only visible when editing */}
          {selectedType === "task" && isEditMode && (
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                id="status"
                name="status"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                value={formData.status || "Pending"}
                onChange={handleInputChange}
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          )}
          
          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full py-2 mt-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg text-sm font-medium hover:shadow-md transition-shadow flex items-center justify-center"
          >
            {isEditMode ? (
              <>
                <SaveIcon className="w-5 h-5 mr-1" />
                Save Changes
              </>
            ) : (
              <>
                <PlusIcon className="w-5 h-5 mr-1" />
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