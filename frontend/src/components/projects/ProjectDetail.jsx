import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  XIcon, 
  PlusIcon, 
  PencilIcon, 
  TrashIcon, 
  CheckIcon,
  CalendarIcon
} from "@heroicons/react/outline";
import { useThemeStyles } from "../../context/ThemeProvider";

const ProjectDetail = ({ 
  project, 
  onClose, 
  onToggleSubtask,
  onAddSubtask,
  onEditSubtask,
  onDeleteSubtask,
  onUpdateProject
}) => {
  const { theme: currentTheme } = useThemeStyles();
  
  if (!currentTheme) {
    return <div>Loading...</div>;
  }
  
  const isNeonTheme = currentTheme.id && currentTheme.id.includes('neon');
  const isCyberpunk = currentTheme.id === 'cyberpunk';
  
  // State for adding new subtask
  const [isAddingSubtask, setIsAddingSubtask] = useState(false);
  const [newSubtaskTitle, setNewSubtaskTitle] = useState("");
  const [newSubtaskDescription, setNewSubtaskDescription] = useState("");
  const [newSubtaskDueDate, setNewSubtaskDueDate] = useState("");
  
  // State for editing subtask
  const [editingSubtask, setEditingSubtask] = useState(null);
  const [editingSubtaskTitle, setEditingSubtaskTitle] = useState("");
  const [editingSubtaskDescription, setEditingSubtaskDescription] = useState("");
  const [editingSubtaskDueDate, setEditingSubtaskDueDate] = useState("");
  
  // State for checklist items
  const [newChecklistItem, setNewChecklistItem] = useState("");
  const [addingChecklistTo, setAddingChecklistTo] = useState(null);

  // Calculate progress
  const totalSubtasks = project.subtasks?.length || 0;
  const completedSubtasks = project.subtasks?.filter(s => s.completed).length || 0;
  const progressPercentage = totalSubtasks > 0 ? Math.round((completedSubtasks / totalSubtasks) * 100) : 0;

  const handleAddSubtask = () => {
    if (!newSubtaskTitle.trim()) return;
    
    const newSubtask = {
      id: Date.now(),
      title: newSubtaskTitle,
      description: newSubtaskDescription,
      dueDate: newSubtaskDueDate,
      completed: false,
      checklist: []
    };
    
    onAddSubtask(project.id, newSubtask);
    setNewSubtaskTitle("");
    setNewSubtaskDescription("");
    setNewSubtaskDueDate("");
    setIsAddingSubtask(false);
  };

  const handleSaveSubtaskEdit = (subtaskId) => {
    if (!editingSubtaskTitle.trim()) return;
    
    const updatedSubtask = {
      ...editingSubtask,
      title: editingSubtaskTitle,
      description: editingSubtaskDescription,
      dueDate: editingSubtaskDueDate
    };
    
    onEditSubtask(project.id, subtaskId, updatedSubtask);
    setEditingSubtask(null);
    setEditingSubtaskTitle("");
    setEditingSubtaskDescription("");
    setEditingSubtaskDueDate("");
  };

  const startEditingSubtask = (subtask) => {
    setEditingSubtask(subtask);
    setEditingSubtaskTitle(subtask.title);
    setEditingSubtaskDescription(subtask.description || "");
    setEditingSubtaskDueDate(subtask.dueDate || "");
  };

  const handleAddChecklistItem = (subtaskId, itemText) => {
    if (!itemText.trim()) return;
    
    const newItem = {
      id: Date.now(),
      text: itemText,
      completed: false
    };
    
    const subtask = project.subtasks.find(s => s.id === subtaskId);
    if (subtask) {
      const updatedSubtask = {
        ...subtask,
        checklist: [...(subtask.checklist || []), newItem]
      };
      onEditSubtask(project.id, subtaskId, updatedSubtask);
    }
    
    setNewChecklistItem("");
    setAddingChecklistTo(null);
  };

  const handleToggleChecklistItem = (subtaskId, itemId) => {
    const subtask = project.subtasks.find(s => s.id === subtaskId);
    if (subtask) {
      const updatedChecklist = (subtask.checklist || []).map(item => 
        item.id === itemId ? { ...item, completed: !item.completed } : item
      );
      
      const updatedSubtask = {
        ...subtask,
        checklist: updatedChecklist
      };
      
      onEditSubtask(project.id, subtaskId, updatedSubtask);
    }
  };

  const handleRemoveChecklistItem = (subtaskId, itemId) => {
    const subtask = project.subtasks.find(s => s.id === subtaskId);
    if (subtask) {
      const updatedChecklist = (subtask.checklist || []).filter(item => item.id !== itemId);
      
      const updatedSubtask = {
        ...subtask,
        checklist: updatedChecklist
      };
      
      onEditSubtask(project.id, subtaskId, updatedSubtask);
    }
  };

  const formatDueDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const getChecklistProgress = (checklist) => {
    if (!checklist || checklist.length === 0) return "0%";
    const completed = checklist.filter(item => item.completed).length;
    return `${Math.round((completed / checklist.length) * 100)}%`;
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 1: return '#10B981'; // Green
      case 2: return '#F59E0B'; // Yellow
      case 3: return '#F97316'; // Orange
      case 4: return '#EF4444'; // Red
      case 5: return '#7C3AED'; // Purple
      default: return '#6B7280'; // Gray
    }
  };

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative max-w-2xl w-full h-[85vh] flex flex-col"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        style={{
          backgroundColor: isNeonTheme 
            ? 'rgba(10, 10, 16, 0.95)' 
            : isCyberpunk 
            ? 'rgba(15, 23, 42, 0.95)' 
            : currentTheme.bgSecondary,
          borderRadius: currentTheme.radius,
          boxShadow: currentTheme.shadow,
          border: `1px solid ${currentTheme.borderColor}`
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full hover:bg-black hover:bg-opacity-20 transition-colors"
          style={{ color: currentTheme.textSecondary }}
        >
          <XIcon className="w-5 h-5" />
        </button>

        {/* Fixed Header */}
        <div className="p-6 pb-4 flex-shrink-0">
          <h2 className={`text-2xl font-semibold mb-2 ${isNeonTheme ? 'sl-glow-text' : ''}`}
              style={{ 
                color: currentTheme.textPrimary,
                fontFamily: isNeonTheme ? "'Orbitron', 'Rajdhani', sans-serif" : 
                            isCyberpunk ? "'Audiowide', 'Rajdhani', sans-serif" : 
                            currentTheme.font
              }}>
            {isNeonTheme ? project.title.toUpperCase() : project.title}
          </h2>
          
          <p className="text-sm mb-4" style={{ color: currentTheme.textSecondary }}>
            {project.description}
          </p>
          
          <div className="flex items-center gap-4">
            {/* Due date */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg" 
                 style={{ 
                   backgroundColor: `${currentTheme.primaryColor}10`,
                   border: `1px solid ${currentTheme.primaryColor}30`
                 }}>
              <CalendarIcon className="w-4 h-4" style={{ color: currentTheme.primaryColor }} />
              <div className="text-sm">
                <span className="font-medium" style={{ color: currentTheme.textPrimary }}>Due: </span>
                <span style={{ color: currentTheme.textSecondary }}>{formatDueDate(project.due)}</span>
              </div>
            </div>
            
            {/* Difficulty */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg"
                 style={{ 
                   backgroundColor: `${getDifficultyColor(project.difficulty)}10`,
                   border: `1px solid ${getDifficultyColor(project.difficulty)}30`
                 }}>
              <span className="text-sm font-medium" style={{ color: currentTheme.textPrimary }}>Difficulty: </span>
              <div className="flex">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <span 
                    key={idx} 
                    style={{ 
                      color: idx < project.difficulty ? getDifficultyColor(project.difficulty) : '#374151',
                      opacity: idx < project.difficulty ? 1 : 0.3
                    }}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Progress Section */}
        <div className="px-6 py-4 flex-shrink-0">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium" style={{ color: currentTheme.textPrimary }}>
              Progress
            </span>
            <span className="text-sm font-medium" style={{ color: currentTheme.primaryColor }}>
              {progressPercentage}%
            </span>
          </div>
          
          {/* Segmented progress bar */}
          <div className="flex gap-1 w-full h-3">
            {(() => {
              const totalSegments = project.subtasks?.length || 5;
              const completedSegments = Math.round((progressPercentage / 100) * totalSegments);
              
              return Array.from({ length: totalSegments }).map((_, index) => (
                <div 
                  key={index}
                  className="flex-1 transition-colors"
                  style={{
                    backgroundColor: index < completedSegments 
                      ? currentTheme.primaryColor 
                      : `${currentTheme.primaryColor}20`
                  }}
                />
              ));
            })()}
          </div>
          
          <div className="flex justify-between mt-1">
            <span className="text-xs" style={{ color: currentTheme.textSecondary }}>
              {completedSubtasks} of {totalSubtasks} subtasks
            </span>
            <span className="text-xs font-medium" style={{ color: currentTheme.primaryColor }}>
              {progressPercentage}%
            </span>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 pb-6">
          <div className="mb-4">
            <h3 className={`text-lg font-medium ${isNeonTheme ? 'sl-glow-text' : ''}`}
                style={{ 
                  color: currentTheme.textPrimary,
                  fontFamily: isNeonTheme ? "'Orbitron', 'Rajdhani', sans-serif" : 
                              isCyberpunk ? "'Audiowide', 'Rajdhani', sans-serif" : 
                              currentTheme.font
                }}>
              {isNeonTheme ? 'SUBTASKS' : isCyberpunk ? 'SUBTASKS' : 'Subtasks'}
            </h3>
          </div>
          
          {/* Add new subtask form */}
          {isAddingSubtask && (
            <div className="mb-4 p-4 rounded-lg border-2 border-dashed"
                 style={{ 
                   backgroundColor: currentTheme.bgTertiary,
                   borderColor: currentTheme.borderColor,
                   borderRadius: currentTheme.radius
                 }}>
              <div className="flex items-center gap-2 mb-3">
                <input
                  type="text"
                  placeholder="Subtask title..."
                  value={newSubtaskTitle}
                  onChange={(e) => setNewSubtaskTitle(e.target.value)}
                  className="flex-1 px-3 py-2 text-sm rounded-lg"
                  style={{ 
                    backgroundColor: currentTheme.inputBg,
                    color: currentTheme.textPrimary,
                    border: `1px solid ${currentTheme.borderColor}`,
                    borderRadius: currentTheme.radius
                  }}
                  autoFocus
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleAddSubtask();
                    }
                  }}
                />
                <button
                  onClick={handleAddSubtask}
                  className="px-3 py-2 text-sm rounded-lg"
                  style={{ 
                    backgroundColor: currentTheme.primaryColor,
                    color: '#ffffff',
                    borderRadius: currentTheme.radius
                  }}
                >
                  Add
                </button>
                <button
                  onClick={() => setIsAddingSubtask(false)}
                  className="px-3 py-2 text-sm rounded-lg"
                  style={{ 
                    backgroundColor: currentTheme.bgTertiary,
                    color: currentTheme.textSecondary,
                    border: `1px solid ${currentTheme.borderColor}`,
                    borderRadius: currentTheme.radius
                  }}
                >
                  Cancel
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Description (optional)..."
                  value={newSubtaskDescription}
                  onChange={(e) => setNewSubtaskDescription(e.target.value)}
                  className="px-3 py-2 text-sm rounded-lg"
                  style={{ 
                    backgroundColor: currentTheme.inputBg,
                    color: currentTheme.textPrimary,
                    border: `1px solid ${currentTheme.borderColor}`,
                    borderRadius: currentTheme.radius
                  }}
                />
                <input
                  type="date"
                  value={newSubtaskDueDate}
                  onChange={(e) => setNewSubtaskDueDate(e.target.value)}
                  className="px-3 py-2 text-sm rounded-lg"
                  style={{ 
                    backgroundColor: currentTheme.inputBg,
                    color: currentTheme.textPrimary,
                    border: `1px solid ${currentTheme.borderColor}`,
                    borderRadius: currentTheme.radius
                  }}
                />
              </div>
            </div>
          )}
          
          {/* Subtasks list */}
          <div className="space-y-3">
            {project.subtasks?.map((subtask, index) => (
              <div
                key={subtask.id || index}
                className="p-4 rounded-lg border group"
                style={{ 
                  backgroundColor: currentTheme.bgSecondary,
                  borderColor: currentTheme.borderColor,
                  borderRadius: currentTheme.radius
                }}
              >
                <div className="flex items-start gap-3">
                  {/* Number badge */}
                  <div 
                    className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ 
                      backgroundColor: subtask.completed ? '#10b981' : currentTheme.primaryColor,
                      color: '#ffffff'
                    }}
                  >
                    {index + 1}
                  </div>
                  
                  {/* Checkbox */}
                  <button
                    onClick={() => onToggleSubtask(project.id, subtask.id || index)}
                    className="flex-shrink-0 mt-0.5"
                  >
                    <div 
                      className="w-5 h-5 rounded-sm flex items-center justify-center transition-colors"
                      style={{ 
                        backgroundColor: subtask.completed ? '#10b981' : 'transparent',
                        border: `2px solid ${subtask.completed ? '#10b981' : currentTheme.borderColor}`,
                        borderRadius: `calc(${currentTheme.radius} / 2)`
                      }}
                    >
                      {subtask.completed && (
                        <CheckIcon className="w-3 w-3 text-white" />
                      )}
                    </div>
                  </button>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        {editingSubtask?.id === subtask.id ? (
                          <div className="space-y-2">
                            <input
                              type="text"
                              value={editingSubtaskTitle}
                              onChange={(e) => setEditingSubtaskTitle(e.target.value)}
                              className="w-full px-3 py-2 text-sm rounded-lg"
                              style={{ 
                                backgroundColor: currentTheme.inputBg,
                                color: currentTheme.textPrimary,
                                border: `1px solid ${currentTheme.borderColor}`,
                                borderRadius: currentTheme.radius
                              }}
                              autoFocus
                            />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              <input
                                type="text"
                                placeholder="Description..."
                                value={editingSubtaskDescription}
                                onChange={(e) => setEditingSubtaskDescription(e.target.value)}
                                className="px-3 py-2 text-sm rounded-lg"
                                style={{ 
                                  backgroundColor: currentTheme.inputBg,
                                  color: currentTheme.textPrimary,
                                  border: `1px solid ${currentTheme.borderColor}`,
                                  borderRadius: currentTheme.radius
                                }}
                              />
                              <input
                                type="date"
                                value={editingSubtaskDueDate}
                                onChange={(e) => setEditingSubtaskDueDate(e.target.value)}
                                className="px-3 py-2 text-sm rounded-lg"
                                style={{ 
                                  backgroundColor: currentTheme.inputBg,
                                  color: currentTheme.textPrimary,
                                  border: `1px solid ${currentTheme.borderColor}`,
                                  borderRadius: currentTheme.radius
                                }}
                              />
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleSaveSubtaskEdit(subtask.id)}
                                className="px-3 py-1 text-sm rounded-lg"
                                style={{ 
                                  backgroundColor: currentTheme.primaryColor,
                                  color: '#ffffff',
                                  borderRadius: currentTheme.radius
                                }}
                              >
                                Save
                              </button>
                              <button
                                onClick={() => setEditingSubtask(null)}
                                className="px-3 py-1 text-sm rounded-lg"
                                style={{ 
                                  backgroundColor: currentTheme.bgTertiary,
                                  color: currentTheme.textSecondary,
                                  border: `1px solid ${currentTheme.borderColor}`,
                                  borderRadius: currentTheme.radius
                                }}
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 
                                className={`text-sm font-medium transition-all duration-300 ${subtask.completed ? 'line-through' : ''}`}
                                style={{ 
                                  color: subtask.completed ? currentTheme.textSecondary : currentTheme.textPrimary
                                }}
                              >
                                {subtask.title}
                              </h4>
                              <button
                                onClick={() => startEditingSubtask(subtask)}
                                className="p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                                style={{ color: currentTheme.textSecondary }}
                              >
                                <PencilIcon className="w-3 h-3" />
                              </button>
                            </div>
                            
                            {(subtask.description || subtask.dueDate) && (
                              <div className="mt-2 space-y-1">
                                {subtask.description && (
                                  <p className="text-xs" style={{ color: currentTheme.textSecondary }}>
                                    {subtask.description}
                                  </p>
                                )}
                                {subtask.dueDate && (
                                  <div className="flex items-center gap-1 text-xs" style={{ color: currentTheme.textSecondary }}>
                                    <CalendarIcon className="w-3 h-3" />
                                    <span>{formatDueDate(subtask.dueDate)}</span>
                                  </div>
                                )}
                              </div>
                            )}
                            
                            {/* Checklist section */}
                            <div className="mt-3">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-medium" style={{ color: currentTheme.textPrimary }}>
                                  Checklist
                                </span>
                                <span className="text-xs" style={{ color: currentTheme.textSecondary }}>
                                  {getChecklistProgress(subtask.checklist || [])}
                                </span>
                              </div>
                              
                              {subtask.checklist && subtask.checklist.length > 0 && (
                                <div className="space-y-1 mb-2">
                                  {subtask.checklist.map((item, itemIndex) => (
                                    <div key={itemIndex} className="flex items-center gap-2">
                                      <button
                                        onClick={() => handleToggleChecklistItem(subtask.id, item.id)}
                                        className="flex-shrink-0"
                                      >
                                        <div 
                                          className="w-4 h-4 rounded-sm flex items-center justify-center transition-colors"
                                          style={{ 
                                            backgroundColor: item.completed ? '#10b981' : 'transparent',
                                            border: `1px solid ${item.completed ? '#10b981' : currentTheme.borderColor}`,
                                            borderRadius: `calc(${currentTheme.radius} / 2)`
                                          }}
                                        >
                                          {item.completed && (
                                            <CheckIcon className="w-2.5 h-2.5 text-white" />
                                          )}
                                        </div>
                                      </button>
                                      <span 
                                        className={`text-xs flex-1 ${item.completed ? 'line-through' : ''}`}
                                        style={{ 
                                          color: item.completed ? currentTheme.textSecondary : currentTheme.textPrimary
                                        }}
                                      >
                                        {item.text}
                                      </span>
                                      <button
                                        onClick={() => handleRemoveChecklistItem(subtask.id, item.id)}
                                        className="p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                                        style={{ color: '#ef4444' }}
                                      >
                                        <XIcon className="w-3 h-3" />
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              )}
                              
                              {/* Add checklist item */}
                              {addingChecklistTo === subtask.id ? (
                                <div className="flex items-center gap-2">
                                  <input
                                    type="text"
                                    placeholder="Enter checklist item..."
                                    value={newChecklistItem}
                                    onChange={(e) => setNewChecklistItem(e.target.value)}
                                    className="flex-1 px-3 py-2 text-sm rounded-lg"
                                    style={{ 
                                      backgroundColor: currentTheme.inputBg,
                                      color: currentTheme.textPrimary,
                                      border: `1px solid ${currentTheme.borderColor}`,
                                      borderRadius: currentTheme.radius
                                    }}
                                    autoFocus
                                    onKeyPress={(e) => {
                                      if (e.key === 'Enter') {
                                        handleAddChecklistItem(subtask.id, newChecklistItem);
                                      }
                                    }}
                                  />
                                  <button
                                    onClick={() => handleAddChecklistItem(subtask.id, newChecklistItem)}
                                    className="p-2 rounded-lg"
                                    style={{ 
                                      backgroundColor: currentTheme.primaryColor,
                                      color: '#ffffff',
                                      borderRadius: currentTheme.radius
                                    }}
                                  >
                                    <CheckIcon className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => {
                                      setAddingChecklistTo(null);
                                      setNewChecklistItem("");
                                    }}
                                    className="p-2 rounded-lg"
                                    style={{ 
                                      backgroundColor: currentTheme.bgTertiary,
                                      color: currentTheme.textSecondary,
                                      border: `1px solid ${currentTheme.borderColor}`,
                                      borderRadius: currentTheme.radius
                                    }}
                                  >
                                    <XIcon className="w-4 h-4" />
                                  </button>
                                </div>
                              ) : (
                                <button
                                  onClick={() => setAddingChecklistTo(subtask.id)}
                                  className="flex items-center gap-2 text-sm px-3 py-2 rounded border-2 border-dashed transition-all duration-200 hover:bg-gray-100"
                                  style={{ 
                                    backgroundColor: currentTheme.bgTertiary,
                                    color: currentTheme.textSecondary,
                                    borderColor: currentTheme.borderColor,
                                    borderRadius: currentTheme.radius
                                  }}
                                >
                                  <PlusIcon className="w-4 h-4" />
                                  <span>Add checklist item</span>
                                </button>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <button
                        onClick={() => onDeleteSubtask(project.id, subtask.id || index)}
                        className="p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity ml-2"
                        style={{ color: '#ef4444' }}
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Add subtask button */}
            {!isAddingSubtask && (
              <div
                className="flex items-center justify-center p-4 rounded-lg border-2 border-dashed cursor-pointer transition-all duration-200 hover:bg-gray-50 group"
                style={{ 
                  backgroundColor: currentTheme.bgTertiary,
                  borderColor: currentTheme.borderColor,
                  borderRadius: currentTheme.radius,
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
      </motion.div>
    </motion.div>
  );
};

export default ProjectDetail;