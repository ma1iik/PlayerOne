import React, { useState } from "react";
import { PlusIcon, XIcon, CheckIcon, TrashIcon, PencilIcon, CalendarIcon, ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/outline";
import { useThemeStyles } from "../../../context/ThemeProvider";
import { FormLabel } from "./FormComponents";

const SubtaskSection = ({ formData, setFormData }) => {
  const { theme: currentTheme } = useThemeStyles();

  // Add null checks to prevent React Error #31
  if (!currentTheme) {
    return <div>Loading...</div>;
  }

  const isNeonTheme = currentTheme.id && currentTheme.id.includes('neon');
  const isCyberpunk = currentTheme.id === 'cyberpunk';
  
  const [newSubtaskTitle, setNewSubtaskTitle] = useState("");
  const [newSubtaskDescription, setNewSubtaskDescription] = useState("");
  const [newSubtaskDueDate, setNewSubtaskDueDate] = useState("");
  const [isAddingSubtask, setIsAddingSubtask] = useState(false);
  const [editingSubtaskId, setEditingSubtaskId] = useState(null);
  const [editingSubtaskTitle, setEditingSubtaskTitle] = useState("");
  const [editingSubtaskDescription, setEditingSubtaskDescription] = useState("");
  const [editingSubtaskDueDate, setEditingSubtaskDueDate] = useState("");
  const [expandedSubtasks, setExpandedSubtasks] = useState(new Set());
  
  // Add a new subtask with enhanced fields
  const handleAddSubtask = () => {
    if (!newSubtaskTitle.trim()) return;
    
    const newSubtask = {
      id: Date.now(), // Generate a unique ID
      title: newSubtaskTitle.trim(),
      description: newSubtaskDescription.trim(),
      dueDate: newSubtaskDueDate,
      checklist: [], // Array of checklist items
      completed: false
    };
    
    setFormData({
      ...formData,
      subtasks: [...(formData.subtasks || []), newSubtask]
    });
    
    setNewSubtaskTitle("");
    setNewSubtaskDescription("");
    setNewSubtaskDueDate("");
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
    setEditingSubtaskDescription(subtask.description || "");
    setEditingSubtaskDueDate(subtask.dueDate || "");
  };
  
  // Save edited subtask
  const handleSaveSubtaskEdit = (subtaskId) => {
    if (!editingSubtaskTitle.trim()) return;
    
    setFormData({
      ...formData,
      subtasks: (formData.subtasks || []).map(st => 
        st.id === subtaskId 
          ? { 
              ...st, 
              title: editingSubtaskTitle.trim(),
              description: editingSubtaskDescription.trim(),
              dueDate: editingSubtaskDueDate
            } 
          : st
      )
    });
    
    setEditingSubtaskId(null);
    setEditingSubtaskTitle("");
    setEditingSubtaskDescription("");
    setEditingSubtaskDueDate("");
  };

  // Add checklist item to subtask
  const handleAddChecklistItem = (subtaskId, itemText) => {
    if (!itemText.trim()) return;
    
    const newItem = {
      id: Date.now(),
      text: itemText.trim(),
      completed: false
    };
    
    setFormData({
      ...formData,
      subtasks: (formData.subtasks || []).map(st => 
        st.id === subtaskId 
          ? { ...st, checklist: [...(st.checklist || []), newItem] }
          : st
      )
    });
  };

  // Toggle checklist item completion
  const handleToggleChecklistItem = (subtaskId, itemId) => {
    setFormData({
      ...formData,
      subtasks: (formData.subtasks || []).map(st => 
        st.id === subtaskId 
          ? { 
              ...st, 
              checklist: (st.checklist || []).map(item => 
                item.id === itemId ? { ...item, completed: !item.completed } : item
              )
            }
          : st
      )
    });
  };

  // Remove checklist item
  const handleRemoveChecklistItem = (subtaskId, itemId) => {
    setFormData({
      ...formData,
      subtasks: (formData.subtasks || []).map(st => 
        st.id === subtaskId 
          ? { 
              ...st, 
              checklist: (st.checklist || []).filter(item => item.id !== itemId)
            }
          : st
      )
    });
  };

  // Toggle subtask expansion
  const toggleSubtaskExpansion = (subtaskId) => {
    const newExpanded = new Set(expandedSubtasks);
    if (newExpanded.has(subtaskId)) {
      newExpanded.delete(subtaskId);
    } else {
      newExpanded.add(subtaskId);
    }
    setExpandedSubtasks(newExpanded);
  };

  // Format due date for display
  const formatDueDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  // Calculate checklist completion
  const getChecklistProgress = (checklist) => {
    if (!checklist || checklist.length === 0) return 0;
    const completed = checklist.filter(item => item.completed).length;
    return Math.round((completed / checklist.length) * 100);
  };
  
  return (
    <div>
      <div className="mb-2">
        <FormLabel htmlFor="subtasks">Subtasks</FormLabel>
      </div>
      
      {/* Add new subtask form */}
      {isAddingSubtask && (
        <div className="mb-4 p-4 rounded-lg border-2 border-dashed"
          style={{ 
            backgroundColor: `${currentTheme.primaryColor}05`,
            borderColor: currentTheme.primaryColor,
            borderRadius: currentTheme.radius
          }}
        >
          <div className="space-y-3">
            {/* Title input */}
            <input
              type="text"
              placeholder="Subtask title..."
              value={newSubtaskTitle}
              onChange={(e) => setNewSubtaskTitle(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded"
              style={{ 
                backgroundColor: currentTheme.inputBg,
                color: currentTheme.textPrimary,
                border: `1px solid ${currentTheme.borderColor}`,
                borderRadius: currentTheme.radius
              }}
              autoFocus
            />
            
            {/* Description input */}
            <textarea
              placeholder="Description (optional)..."
              value={newSubtaskDescription}
              onChange={(e) => setNewSubtaskDescription(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded resize-none"
              rows="2"
              style={{ 
                backgroundColor: currentTheme.inputBg,
                color: currentTheme.textPrimary,
                border: `1px solid ${currentTheme.borderColor}`,
                borderRadius: currentTheme.radius
              }}
            />
            
            {/* Due date input */}
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-4 h-4" style={{ color: currentTheme.textSecondary }} />
              <input
                type="date"
                value={newSubtaskDueDate}
                onChange={(e) => setNewSubtaskDueDate(e.target.value)}
                className="px-3 py-2 text-sm rounded"
                style={{ 
                  backgroundColor: currentTheme.inputBg,
                  color: currentTheme.textPrimary,
                  border: `1px solid ${currentTheme.borderColor}`,
                  borderRadius: currentTheme.radius
                }}
              />
            </div>
            
            {/* Action buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleAddSubtask}
                className="px-4 py-2 text-sm rounded"
                style={{ 
                  backgroundColor: isNeonTheme || isCyberpunk ? 'transparent' : currentTheme.primaryColor,
                  color: isNeonTheme || isCyberpunk ? currentTheme.primaryColor : 'white',
                  border: isNeonTheme || isCyberpunk ? `1px solid ${currentTheme.primaryColor}` : 'none',
                  borderRadius: currentTheme.radius
                }}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleAddSubtask();
                  }
                }}
              >
                <CheckIcon className="w-4 h-4" />
              </button>
              
              <button
                type="button"
                onClick={() => {
                  setIsAddingSubtask(false);
                  setNewSubtaskTitle("");
                  setNewSubtaskDescription("");
                  setNewSubtaskDueDate("");
                }}
                className="px-4 py-2 text-sm rounded"
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
          </div>
        </div>
      )}
      
      {/* List of subtasks */}
      <div className="max-h-96 overflow-y-auto">
        {formData.subtasks && formData.subtasks.length > 0 ? (
          <ul className="space-y-3">
            {formData.subtasks.map((subtask) => (
              <li 
                key={subtask.id}
                className="border rounded-lg overflow-hidden"
                style={{ 
                  backgroundColor: subtask.completed 
                    ? `${currentTheme.primaryColor}08` 
                    : currentTheme.bgSecondary,
                  borderColor: subtask.completed 
                    ? `${currentTheme.primaryColor}30` 
                    : currentTheme.borderColor,
                  borderRadius: currentTheme.radius,
                  opacity: subtask.completed ? 0.9 : 1
                }}
              >
                {/* Subtask header */}
                <div className="p-3">
                  <div className="flex items-center gap-3">
                    {/* Enhanced Checkbox */}
                    <div 
                      className="w-5 h-5 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110"
                      style={{ 
                        backgroundColor: subtask.completed ? currentTheme.primaryColor : 'transparent',
                        border: `2px solid ${subtask.completed ? currentTheme.primaryColor : currentTheme.borderColor}`,
                        borderRadius: `calc(${currentTheme.radius} / 2)`
                      }}
                      onClick={() => handleToggleSubtask(subtask.id)}
                    >
                      {subtask.completed && (
                        <CheckIcon className="w-3 h-3 text-white" />
                      )}
                    </div>
                    
                    {/* Expand/Collapse button */}
                    <button
                      onClick={() => toggleSubtaskExpansion(subtask.id)}
                      className="p-1 rounded transition-colors"
                      style={{ color: currentTheme.textSecondary }}
                    >
                      {expandedSubtasks.has(subtask.id) ? (
                        <ChevronDownIcon className="w-4 h-4" />
                      ) : (
                        <ChevronRightIcon className="w-4 h-4" />
                      )}
                    </button>
                    
                    {/* Subtask title - either display or edit mode */}
                    {editingSubtaskId === subtask.id ? (
                      <div className="flex-1 space-y-2">
                        <input
                          type="text"
                          value={editingSubtaskTitle}
                          onChange={(e) => setEditingSubtaskTitle(e.target.value)}
                          className="w-full px-2 py-1 text-sm rounded"
                          style={{ 
                            backgroundColor: currentTheme.inputBg,
                            color: currentTheme.textPrimary,
                            border: `1px solid ${currentTheme.borderColor}`,
                            borderRadius: currentTheme.radius
                          }}
                          autoFocus
                        />
                        
                        <textarea
                          placeholder="Description..."
                          value={editingSubtaskDescription}
                          onChange={(e) => setEditingSubtaskDescription(e.target.value)}
                          className="w-full px-2 py-1 text-sm rounded resize-none"
                          rows="2"
                          style={{ 
                            backgroundColor: currentTheme.inputBg,
                            color: currentTheme.textPrimary,
                            border: `1px solid ${currentTheme.borderColor}`,
                            borderRadius: currentTheme.radius
                          }}
                        />
                        
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="w-4 h-4" style={{ color: currentTheme.textSecondary }} />
                          <input
                            type="date"
                            value={editingSubtaskDueDate}
                            onChange={(e) => setEditingSubtaskDueDate(e.target.value)}
                            className="px-2 py-1 text-sm rounded"
                            style={{ 
                              backgroundColor: currentTheme.inputBg,
                              color: currentTheme.textPrimary,
                              border: `1px solid ${currentTheme.borderColor}`,
                              borderRadius: currentTheme.radius
                            }}
                          />
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleSaveSubtaskEdit(subtask.id)}
                            className="px-3 py-1 text-xs rounded"
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
                              setEditingSubtaskDescription("");
                              setEditingSubtaskDueDate("");
                            }}
                            className="px-3 py-1 text-xs rounded"
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
                      </div>
                    ) : (
                      <>
                        <div className="flex-1">
                          <span 
                            className="text-sm font-medium transition-all duration-200"
                            style={{ 
                              color: subtask.completed ? currentTheme.textSecondary : currentTheme.textPrimary,
                              textDecoration: subtask.completed ? 'line-through' : 'none'
                            }}
                          >
                            {subtask.title}
                          </span>
                          
                          {/* Description preview */}
                          {subtask.description && (
                            <p className="text-xs mt-1" style={{ color: currentTheme.textSecondary }}>
                              {subtask.description}
                            </p>
                          )}
                          
                          {/* Due date preview */}
                          {subtask.dueDate && (
                            <div className="flex items-center gap-1 mt-1">
                              <CalendarIcon className="w-3 h-3" style={{ color: currentTheme.textSecondary }} />
                              <span className="text-xs" style={{ color: currentTheme.textSecondary }}>
                                {formatDueDate(subtask.dueDate)}
                              </span>
                            </div>
                          )}
                          
                          {/* Checklist progress */}
                          {subtask.checklist && subtask.checklist.length > 0 && (
                            <div className="mt-2">
                              <div className="flex items-center justify-between text-xs mb-1">
                                <span style={{ color: currentTheme.textSecondary }}>Checklist</span>
                                <span style={{ color: currentTheme.primaryColor }}>
                                  {getChecklistProgress(subtask.checklist)}%
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-1.5" style={{ backgroundColor: `${currentTheme.primaryColor}20` }}>
                                <div 
                                  className="h-1.5 rounded-full" 
                                  style={{ 
                                    width: `${getChecklistProgress(subtask.checklist)}%`, 
                                    backgroundColor: currentTheme.primaryColor 
                                  }}
                                ></div>
                              </div>
                            </div>
                          )}
                        </div>
                        
                        {/* Enhanced Action buttons */}
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <button
                            type="button"
                            onClick={() => handleEditSubtask(subtask)}
                            className="p-1.5 rounded-lg transition-all duration-200 hover:scale-105 hover:bg-gray-100"
                            style={{ 
                              color: currentTheme.textSecondary,
                              backgroundColor: 'transparent'
                            }}
                            title="Edit subtask"
                          >
                            <PencilIcon className="w-4 h-4" />
                          </button>
                          
                          <button
                            type="button"
                            onClick={() => handleRemoveSubtask(subtask.id)}
                            className="p-1.5 rounded-lg transition-all duration-200 hover:scale-105 hover:bg-red-50"
                            style={{ 
                              color: '#ef4444',
                              backgroundColor: 'transparent'
                            }}
                            title="Delete subtask"
                          >
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                
                {/* Expanded content */}
                {expandedSubtasks.has(subtask.id) && (
                  <div className="border-t px-3 py-3" style={{ borderColor: currentTheme.borderColor }}>
                    {/* Checklist section */}
                    <div className="mb-3">
                      <h4 className="text-xs font-medium mb-2" style={{ color: currentTheme.textPrimary }}>
                        Checklist Items
                      </h4>
                      
                      {/* Add new checklist item */}
                      <ChecklistItemAdder 
                        subtaskId={subtask.id}
                        onAddItem={handleAddChecklistItem}
                        currentTheme={currentTheme}
                        isNeonTheme={isNeonTheme}
                        isCyberpunk={isCyberpunk}
                      />
                      
                      {/* Checklist items */}
                      {subtask.checklist && subtask.checklist.length > 0 && (
                        <ul className="space-y-2 mt-2">
                          {subtask.checklist.map((item) => (
                            <li key={item.id} className="flex items-center gap-2">
                              <div 
                                className="w-4 h-4 rounded flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110"
                                style={{ 
                                  backgroundColor: item.completed ? currentTheme.primaryColor : 'transparent',
                                  border: `1px solid ${item.completed ? currentTheme.primaryColor : currentTheme.borderColor}`,
                                  borderRadius: `calc(${currentTheme.radius} / 2)`
                                }}
                                onClick={() => handleToggleChecklistItem(subtask.id, item.id)}
                              >
                                {item.completed && (
                                  <CheckIcon className="w-3 h-3 text-white" />
                                )}
                              </div>
                              
                              <span 
                                className="flex-1 text-xs transition-all duration-200"
                                style={{ 
                                  color: item.completed ? currentTheme.textSecondary : currentTheme.textPrimary,
                                  textDecoration: item.completed ? 'line-through' : 'none'
                                }}
                              >
                                {item.text}
                              </span>
                              
                              <button
                                onClick={() => handleRemoveChecklistItem(subtask.id, item.id)}
                                className="p-1 rounded transition-all duration-200 hover:bg-red-50"
                                style={{ color: '#ef4444' }}
                              >
                                <XIcon className="w-3 h-3" />
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                )}
              </li>
            ))}
            
            {/* Add more subtasks button */}
            {!isAddingSubtask && (
              <div 
                className="flex items-center justify-center gap-2 p-3 rounded-lg border-2 border-dashed cursor-pointer transition-all duration-200 hover:bg-gray-100 mt-3"
                style={{ 
                  backgroundColor: currentTheme.bgTertiary,
                  color: currentTheme.textSecondary,
                  borderRadius: currentTheme.radius,
                  borderColor: currentTheme.borderColor,
                  minHeight: '45px',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                }}
                onClick={() => setIsAddingSubtask(true)}
              >
                <PlusIcon className="w-5 h-5" />
                <span className="font-medium">Add a Subtask</span>
              </div>
            )}
          </ul>
        ) : (
          <div 
            className="flex items-center justify-center gap-2 p-3 rounded-lg border-2 border-dashed cursor-pointer transition-all duration-200 hover:bg-gray-100"
            style={{ 
              backgroundColor: currentTheme.bgTertiary,
              color: currentTheme.textSecondary,
              borderRadius: currentTheme.radius,
              borderColor: currentTheme.borderColor,
              minHeight: '45px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
            }}
            onClick={() => setIsAddingSubtask(true)}
          >
            <PlusIcon className="w-5 h-5" />
            <span className="font-medium">Add a Subtask</span>
          </div>
        )}
      </div>
    </div>
  );
};

// Checklist Item Adder Component
const ChecklistItemAdder = ({ subtaskId, onAddItem, currentTheme, isNeonTheme, isCyberpunk }) => {
  const [newItemText, setNewItemText] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = () => {
    if (!newItemText.trim()) return;
    onAddItem(subtaskId, newItemText);
    setNewItemText("");
    setIsAdding(false);
  };

  if (!isAdding) {
    return (
      <button
        onClick={() => setIsAdding(true)}
        className="flex items-center gap-2 text-xs px-2 py-1 rounded border-2 border-dashed transition-all duration-200 hover:bg-gray-100"
        style={{ 
          backgroundColor: currentTheme.bgTertiary,
          color: currentTheme.textSecondary,
          borderColor: currentTheme.borderColor,
          borderRadius: currentTheme.radius
        }}
      >
        <PlusIcon className="w-3 h-3" />
        <span>Add checklist item</span>
      </button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Enter checklist item..."
        value={newItemText}
        onChange={(e) => setNewItemText(e.target.value)}
        className="flex-1 px-2 py-1 text-xs rounded"
        style={{ 
          backgroundColor: currentTheme.inputBg,
          color: currentTheme.textPrimary,
          border: `1px solid ${currentTheme.borderColor}`,
          borderRadius: currentTheme.radius
        }}
        autoFocus
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            handleAdd();
          }
        }}
      />
      
      <button
        onClick={handleAdd}
        className="p-1 rounded"
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
        onClick={() => {
          setIsAdding(false);
          setNewItemText("");
        }}
        className="p-1 rounded"
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
  );
};

export default SubtaskSection;