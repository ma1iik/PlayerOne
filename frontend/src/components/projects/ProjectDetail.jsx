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
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)' }}
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
        {/* Colorful accent bar */}
        <div 
          className="h-1" 
          style={{ 
            background: `linear-gradient(to right, ${currentTheme.primaryColor}, ${currentTheme.secondaryColor})` 
          }}
        ></div>
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full hover:bg-gray-100 hover:text-gray-500 transition-colors"
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
              Progress {completedSubtasks}/{totalSubtasks}
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
              {isNeonTheme ? 'TASKS' : isCyberpunk ? 'TASKS' : 'Tasks'}
            </h3>
          </div>
          
          {/* Add new subtask form */}
          {isAddingSubtask && (
            <div className="mb-4 border rounded-lg overflow-hidden"
                 style={{ 
                   backgroundColor: '#ffffff',
                   borderColor: currentTheme.borderColor,
                   borderRadius: currentTheme.radius
                 }}>
              <div className="p-3">
                <div className="flex-1">
                  {/* First line: Title on left, Date on right */}
                  <div className="flex items-center gap-3 mb-2">
                    <input
                      type="text"
                      placeholder="Task title..."
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
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleAddSubtask();
                        }
                      }}
                    />
                    
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
                  
                  {/* Second line: Description */}
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
                  
                  {/* Confirmation area with grey background */}
                  <div 
                    className="flex items-center justify-end gap-2 py-3 px-3 -mx-3 -mb-3"
                    style={{ 
                      backgroundColor: currentTheme.bgTertiary,
                      borderRadius: `0 0 ${currentTheme.radius} ${currentTheme.radius}`
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setIsAddingSubtask(false)}
                      className="px-4 py-2 text-sm rounded transition-colors"
                      style={{ 
                        backgroundColor: currentTheme.bgSecondary,
                        color: currentTheme.textSecondary,
                        border: `1px solid ${currentTheme.borderColor}`,
                        borderRadius: currentTheme.radius
                      }}
                    >
                      Cancel
                    </button>
                    
                    <button
                      type="button"
                      onClick={handleAddSubtask}
                      className="px-4 py-2 text-sm rounded transition-colors"
                      style={{ 
                        backgroundColor: currentTheme.primaryColor,
                        color: 'white',
                        borderRadius: currentTheme.radius
                      }}
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Subtasks list */}
          <div className="max-h-96 overflow-y-auto">
            {project.subtasks && project.subtasks.length > 0 ? (
              <ul className="space-y-3">
                {project.subtasks.map((subtask, index) => (
                  <li 
                    key={subtask.id || index}
                    className="border rounded-lg overflow-hidden group"
                    style={{ 
                      backgroundColor: editingSubtask?.id === subtask.id 
                        ? '#ffffff' 
                        : subtask.completed 
                          ? `${currentTheme.primaryColor}08` 
                          : currentTheme.bgSecondary,
                      borderColor: editingSubtask?.id === subtask.id 
                        ? currentTheme.borderColor 
                        : subtask.completed 
                          ? `${currentTheme.primaryColor}30` 
                          : currentTheme.borderColor,
                      borderRadius: currentTheme.radius,
                      opacity: editingSubtask?.id === subtask.id ? 1 : (subtask.completed ? 0.9 : 1)
                    }}
                  >
                    {/* Subtask header */}
                    <div className="p-3">
                      <div className="flex items-center gap-3">
                        {/* Enhanced Checkbox - hidden when editing */}
                        {editingSubtask?.id !== subtask.id && (
                          <div 
                            className="w-5 h-5 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110"
                            style={{ 
                              backgroundColor: subtask.completed ? currentTheme.primaryColor : 'transparent',
                              border: `2px solid ${subtask.completed ? currentTheme.primaryColor : currentTheme.borderColor}`,
                              borderRadius: `calc(${currentTheme.radius} / 2)`
                            }}
                            onClick={() => onToggleSubtask(project.id, subtask.id || index)}
                          >
                            {subtask.completed && (
                              <CheckIcon className="w-3 h-3 text-white" />
                            )}
                          </div>
                        )}
                        
                        
                        {/* Subtask title - either display or edit mode */}
                        {editingSubtask?.id === subtask.id ? (
                          <div className="flex-1">
                            {/* First line: Title on left, Date on right */}
                            <div className="flex items-center gap-3 mb-2">
                              <input
                                type="text"
                                value={editingSubtaskTitle}
                                onChange={(e) => setEditingSubtaskTitle(e.target.value)}
                                className="flex-1 px-3 py-2 text-sm rounded"
                                style={{ 
                                  backgroundColor: currentTheme.inputBg,
                                  color: currentTheme.textPrimary,
                                  border: `1px solid ${currentTheme.borderColor}`,
                                  borderRadius: currentTheme.radius
                                }}
                                placeholder="Task title..."
                                autoFocus
                              />
                              <div className="flex items-center gap-2">
                                <CalendarIcon className="w-4 h-4" style={{ color: currentTheme.textSecondary }} />
                                <input
                                  type="date"
                                  value={editingSubtaskDueDate}
                                  onChange={(e) => setEditingSubtaskDueDate(e.target.value)}
                                  className="px-3 py-2 text-sm rounded"
                                  style={{ 
                                    backgroundColor: currentTheme.inputBg,
                                    color: currentTheme.textPrimary,
                                    border: `1px solid ${currentTheme.borderColor}`,
                                    borderRadius: currentTheme.radius
                                  }}
                                />
                              </div>
                            </div>
                            
                            {/* Second line: Description */}
                            <textarea
                              placeholder="Description..."
                              value={editingSubtaskDescription}
                              onChange={(e) => setEditingSubtaskDescription(e.target.value)}
                              className="w-full px-3 py-2 text-sm rounded resize-none"
                              rows="2"
                              style={{ 
                                backgroundColor: currentTheme.inputBg,
                                color: currentTheme.textPrimary,
                                border: `1px solid ${currentTheme.borderColor}`,
                                borderRadius: currentTheme.radius
                              }}
                            />
                            
                            {/* Confirmation area with grey background */}
                            <div 
                              className="flex items-center justify-end gap-2 py-3 px-3 -mx-3 -mb-3"
                              style={{ 
                                backgroundColor: currentTheme.bgTertiary,
                                borderRadius: `0 0 ${currentTheme.radius} ${currentTheme.radius}`
                              }}
                            >
                              <button
                                type="button"
                                onClick={() => setEditingSubtask(null)}
                                className="px-4 py-2 text-sm rounded transition-colors"
                                style={{ 
                                  backgroundColor: currentTheme.bgSecondary,
                                  color: currentTheme.textSecondary,
                                  border: `1px solid ${currentTheme.borderColor}`,
                                  borderRadius: currentTheme.radius
                                }}
                              >
                                Cancel
                              </button>
                              
                              <button
                                type="button"
                                onClick={() => handleSaveSubtaskEdit(subtask.id)}
                                className="px-4 py-2 text-sm rounded transition-colors"
                                style={{ 
                                  backgroundColor: currentTheme.primaryColor,
                                  color: 'white',
                                  borderRadius: currentTheme.radius
                                }}
                              >
                                Save Changes
                              </button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span 
                                  className="text-sm font-medium transition-all duration-200"
                                  style={{ 
                                    color: subtask.completed ? currentTheme.textSecondary : currentTheme.textPrimary,
                                    textDecoration: subtask.completed ? 'line-through' : 'none'
                                  }}
                                >
                                  {subtask.title}
                                </span>
                                
                              </div>
                              
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
                            </div>
                            
                            {/* Enhanced Action buttons */}
                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                              <button
                                type="button"
                                onClick={() => startEditingSubtask(subtask)}
                                className="p-1.5 rounded-lg transition-all duration-200 hover:scale-105 hover:bg-gray-100"
                                style={{ 
                                  color: currentTheme.textSecondary,
                                  backgroundColor: 'transparent'
                                }}
                                title="Edit task"
                              >
                                <PencilIcon className="w-4 h-4" />
                              </button>
                              
                              <button
                                type="button"
                                onClick={() => onDeleteSubtask(project.id, subtask.id || index)}
                                className="p-1.5 rounded-lg transition-all duration-200 hover:scale-105 hover:bg-red-50"
                                style={{ 
                                  color: '#ef4444',
                                  backgroundColor: 'transparent'
                                }}
                                title="Delete task"
                              >
                                <TrashIcon className="w-4 h-4" />
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    
                  </li>
                ))}
                
              </ul>
            ) : null}
          </div>
        </div>
        
        {/* Fixed Add Task button - always at bottom, outside scrollable area */}
        {!isAddingSubtask && (
          <div className="px-6 pb-6">
            <div 
              className="flex items-center justify-center gap-2 p-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-100"
              style={{ 
                backgroundColor: currentTheme.bgTertiary,
                color: currentTheme.textSecondary,
                borderRadius: currentTheme.radius,
                border: `1px dashed ${currentTheme.borderColor}`,
                minHeight: '45px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
              }}
              onClick={() => setIsAddingSubtask(true)}
            >
              <PlusIcon className="w-5 h-5" />
              <span className="font-medium">Add a Task</span>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ProjectDetail;