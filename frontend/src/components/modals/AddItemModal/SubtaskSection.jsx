import React, { useContext, useState } from "react";
import { PlusIcon, XIcon, CheckIcon, TrashIcon, PencilIcon } from "@heroicons/react/outline";
import ThemeContext from "../../../context/ThemeContext";
import { FormLabel } from "./FormComponents";

const SubtaskSection = ({ formData, setFormData }) => {
  const { currentTheme } = useContext(ThemeContext);


  const isNeonTheme = currentTheme.id.includes('neon');
  const isCyberpunk = currentTheme.id === 'cyberpunk';
  
  const [newSubtaskTitle, setNewSubtaskTitle] = useState("");
  const [isAddingSubtask, setIsAddingSubtask] = useState(false);
  const [editingSubtaskId, setEditingSubtaskId] = useState(null);
  const [editingSubtaskTitle, setEditingSubtaskTitle] = useState("");
  
  // Add a new subtask
  const handleAddSubtask = () => {
    if (!newSubtaskTitle.trim()) return;
    
    const newSubtask = {
      id: Date.now(), // Generate a unique ID
      title: newSubtaskTitle.trim(),
      completed: false
    };
    
    setFormData({
      ...formData,
      subtasks: [...(formData.subtasks || []), newSubtask]
    });
    
    setNewSubtaskTitle("");
    setIsAddingSubtask(false);
  };
  
  // Remove a subtask
  const handleRemoveSubtask = (subtaskId) => {
    setFormData({
      ...formData,
      subtasks: (formData.subtasks || []).filter(st => st.id !== subtaskId)
    });
  };
  
  // Toggle subtask completion status
  const handleToggleSubtask = (subtaskId) => {
    setFormData({
      ...formData,
      subtasks: (formData.subtasks || []).map(st => 
        st.id === subtaskId ? { ...st, completed: !st.completed } : st
      )
    });
  };
  
  // Start editing a subtask
  const handleEditSubtask = (subtask) => {
    setEditingSubtaskId(subtask.id);
    setEditingSubtaskTitle(subtask.title);
  };
  
  // Save edited subtask
  const handleSaveSubtaskEdit = (subtaskId) => {
    if (!editingSubtaskTitle.trim()) return;
    
    setFormData({
      ...formData,
      subtasks: (formData.subtasks || []).map(st => 
        st.id === subtaskId 
          ? { ...st, title: editingSubtaskTitle.trim() } 
          : st
      )
    });
    
    setEditingSubtaskId(null);
    setEditingSubtaskTitle("");
  };
  
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <FormLabel htmlFor="subtasks">Subtasks</FormLabel>
        
        {!isAddingSubtask && (
          <button
            type="button"
            onClick={() => setIsAddingSubtask(true)}
            className="text-xs flex items-center gap-1 py-1 px-2 rounded"
            style={{ 
              backgroundColor: isNeonTheme || isCyberpunk ? 'transparent' : `${currentTheme.primaryColor}10`,
              color: currentTheme.primaryColor,
              border: isNeonTheme || isCyberpunk ? `1px solid ${currentTheme.primaryColor}` : 'none',
              borderRadius: currentTheme.radius
            }}
          >
            <PlusIcon className="w-3 h-3" />
            <span>{isNeonTheme ? 'ADD' : isCyberpunk ? 'ADD' : 'Add'}</span>
          </button>
        )}
      </div>
      
      {/* Add new subtask form */}
      {isAddingSubtask && (
        <div className="flex items-center gap-2 mb-3">
          <input
            type="text"
            placeholder="Enter subtask title..."
            value={newSubtaskTitle}
            onChange={(e) => setNewSubtaskTitle(e.target.value)}
            className="flex-1 px-3 py-2 text-sm rounded"
            style={{ 
              backgroundColor: currentTheme.inputBg,
              color: currentTheme.textPrimary,
              border: `1px solid ${currentTheme.borderColor}`,
              borderRadius: currentTheme.radius
            }}
            autoFocus
          />
          
          <button
            type="button"
            onClick={handleAddSubtask}
            className="p-2 rounded"
            style={{ 
              backgroundColor: isNeonTheme || isCyberpunk ? 'transparent' : currentTheme.primaryColor,
              color: isNeonTheme || isCyberpunk ? currentTheme.primaryColor : 'white',
              border: isNeonTheme || isCyberpunk ? `1px solid ${currentTheme.primaryColor}` : 'none',
              borderRadius: currentTheme.radius
            }}
          >
            <CheckIcon className="w-4 h-4" />
          </button>
          
          <button
            type="button"
            onClick={() => {
              setIsAddingSubtask(false);
              setNewSubtaskTitle("");
            }}
            className="p-2 rounded"
            style={{ 
              backgroundColor: isNeonTheme || isCyberpunk ? 'transparent' : currentTheme.bgTertiary,
              color: currentTheme.textSecondary,
              border: isNeonTheme || isCyberpunk ? `1px solid ${currentTheme.borderColor}` : 'none',
              borderRadius: currentTheme.radius
            }}
          >
            <XIcon className="w-4 h-4" />
          </button>
        </div>
      )}
      
      {/* List of subtasks */}
      <div className="max-h-40 overflow-y-auto">
        {formData.subtasks && formData.subtasks.length > 0 ? (
          <ul className="space-y-2">
            {formData.subtasks.map((subtask) => (
              <li 
                key={subtask.id}
                className="flex items-center p-2 rounded group"
                style={{ 
                  backgroundColor: subtask.completed 
                    ? `${currentTheme.primaryColor}10` 
                    : currentTheme.bgTertiary,
                  borderRadius: currentTheme.radius,
                  opacity: subtask.completed ? 0.8 : 1
                }}
              >
                {/* Checkbox */}
                <div 
                  className="mr-3 w-4 h-4 rounded flex items-center justify-center cursor-pointer"
                  style={{ 
                    backgroundColor: subtask.completed ? currentTheme.primaryColor : 'transparent',
                    border: `2px solid ${subtask.completed ? currentTheme.primaryColor : currentTheme.borderColor}`,
                    borderRadius: `calc(${currentTheme.radius} / 2)`
                  }}
                  onClick={() => handleToggleSubtask(subtask.id)}
                >
                  {subtask.completed && (
                    <CheckIcon className="w-2 h-2 text-white" />
                  )}
                </div>
                
                {/* Subtask title - either display or edit mode */}
                {editingSubtaskId === subtask.id ? (
                  <div className="flex-1 flex items-center gap-2">
                    <input
                      type="text"
                      value={editingSubtaskTitle}
                      onChange={(e) => setEditingSubtaskTitle(e.target.value)}
                      className="flex-1 px-2 py-1 text-sm rounded"
                      style={{ 
                        backgroundColor: currentTheme.inputBg,
                        color: currentTheme.textPrimary,
                        border: `1px solid ${currentTheme.borderColor}`,
                        borderRadius: currentTheme.radius
                      }}
                      autoFocus
                    />
                    
                    <button
                      type="button"
                      onClick={() => handleSaveSubtaskEdit(subtask.id)}
                      className="p-1 rounded text-xs"
                      style={{ 
                        backgroundColor: isNeonTheme || isCyberpunk ? 'transparent' : currentTheme.primaryColor,
                        color: isNeonTheme || isCyberpunk ? currentTheme.primaryColor : 'white',
                        border: isNeonTheme || isCyberpunk ? `1px solid ${currentTheme.primaryColor}` : 'none',
                        borderRadius: currentTheme.radius
                      }}
                    >
						<CheckIcon className="w-3 h-3" />
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => {
                        setEditingSubtaskId(null);
                        setEditingSubtaskTitle("");
                      }}
                      className="p-1 rounded text-xs"
                      style={{ 
                        backgroundColor: isNeonTheme || isCyberpunk ? 'transparent' : currentTheme.bgTertiary,
                        color: currentTheme.textSecondary,
                        border: isNeonTheme || isCyberpunk ? `1px solid ${currentTheme.borderColor}` : 'none',
                        borderRadius: currentTheme.radius
                      }}
                    >
                      <XIcon className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <>
                    <span 
                      className="flex-1 text-xs transition-all"
                      style={{ 
                        color: subtask.completed ? currentTheme.textSecondary : currentTheme.textPrimary,
                        textDecoration: subtask.completed ? 'line-through' : 'none'
                      }}
                    >
                      {subtask.title}
                    </span>
                    
                    {/* Action buttons */}
                    <div className="flex items-center opacity-0 group-hover:opacity-100">
                      <button
                        type="button"
                        onClick={() => handleEditSubtask(subtask)}
                        className="p-1 rounded text-xs"
                        style={{ color: currentTheme.textSecondary }}
                        title="Edit"
                      >
                        <PencilIcon className="w-3 h-3" />
                      </button>
                      
                      <button
                        type="button"
                        onClick={() => handleRemoveSubtask(subtask.id)}
                        className="p-1 rounded text-xs"
                        style={{ color: '#ef4444' }} // red color
                        title="Delete"
                      >
                        <TrashIcon className="w-3 h-3" />
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <div 
            className="text-center p-3 rounded text-xs"
            style={{ 
              backgroundColor: currentTheme.bgTertiary,
              color: currentTheme.textSecondary,
              borderRadius: currentTheme.radius
            }}
          >
            No subtasks added yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default SubtaskSection;