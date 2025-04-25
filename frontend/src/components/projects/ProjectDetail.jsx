import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { 
  XIcon, 
  CheckIcon, 
  PlusIcon, 
  PencilIcon,
  TrashIcon
} from "@heroicons/react/outline";
import ThemeContext from "../../context/ThemeContext";

const ProjectDetail = ({ 
  project, 
  onClose, 
  onToggleSubtask,
  onAddSubtask,
  onEditSubtask,
  onDeleteSubtask,
  onUpdateProject
}) => {
  if (!project) return null;
  
  const { currentTheme } = useContext(ThemeContext);


  const isNeonTheme = currentTheme.id.includes('neon');
  const isCyberpunk = currentTheme.id === 'cyberpunk';
  
  // State for adding new subtask
  const [newSubtaskTitle, setNewSubtaskTitle] = useState("");
  const [isAddingSubtask, setIsAddingSubtask] = useState(false);
  
  // State for editing subtask
  const [editingSubtaskId, setEditingSubtaskId] = useState(null);
  const [editingSubtaskTitle, setEditingSubtaskTitle] = useState("");
  
  // Calculate completion statistics
  const totalSubtasks = project.subtasks?.length || 0;
  const completedSubtasks = project.subtasks?.filter(subtask => subtask.completed).length || 0;
  const progressPercentage = totalSubtasks > 0 
    ? Math.round((completedSubtasks / totalSubtasks) * 100) 
    : project.progress || 0;

  // Handle submitting a new subtask
  const handleAddSubtask = () => {
    if (!newSubtaskTitle.trim()) return;
    
    const newSubtask = {
      id: Date.now(), // Generate a unique ID
      title: newSubtaskTitle.trim(),
      completed: false
    };
    
    onAddSubtask(project.id, newSubtask);
    setNewSubtaskTitle("");
    setIsAddingSubtask(false);
  };
  
  // Handle submitting an edited subtask
  const handleSaveSubtaskEdit = (subtaskId) => {
    if (!editingSubtaskTitle.trim()) return;
    
    onEditSubtask(project.id, subtaskId, { title: editingSubtaskTitle.trim() });
    setEditingSubtaskId(null);
    setEditingSubtaskTitle("");
  };
  
  // Start editing a subtask
  const startEditingSubtask = (subtask) => {
    setEditingSubtaskId(subtask.id);
    setEditingSubtaskTitle(subtask.title);
  };
  
  // Format the due date
  const formatDueDate = () => {
    if (!project.due) return "";
    
    const dueDate = new Date(project.due);
    return dueDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
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
        className="relative max-w-2xl w-full max-h-[85vh] overflow-y-auto"
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
          style={{ 
            color: currentTheme.textSecondary,
          }}
        >
          <XIcon className="w-5 h-5" />
        </button>

        <div className="p-6">
          {/* Project header */}
          <div className="mb-6">
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
            
            <div className="flex items-center gap-3">
              {/* Due date */}
              <div className="text-sm" style={{ color: currentTheme.textSecondary }}>
                <span className="font-medium">Due: </span>
                <span>{formatDueDate()}</span>
              </div>
              
              {/* Difficulty */}
              <div className="text-sm flex items-center gap-1" style={{ color: currentTheme.textSecondary }}>
                <span className="font-medium">Difficulty: </span>
                <div className="flex">
                  {Array.from({ length: 4 }).map((_, idx) => (
                    <span 
                      key={idx} 
                      className={idx < project.difficulty ? "text-yellow-400" : "text-gray-300 opacity-50"}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium" style={{ color: currentTheme.textPrimary }}>
                Progress
              </span>
              <span className="text-sm font-medium" style={{ color: currentTheme.primaryColor }}>
                {progressPercentage}%
              </span>
            </div>
            
            <div className="bg-gray-200 h-2.5 rounded-full overflow-hidden dark:bg-gray-700" style={{ backgroundColor: `${currentTheme.primaryColor}20` }}>
              <div 
                className="h-2.5 rounded-full" 
                style={{ 
                  width: `${progressPercentage}%`, 
                  backgroundColor: currentTheme.primaryColor 
                }}
              ></div>
            </div>
            
            <div className="text-xs mt-1" style={{ color: currentTheme.textSecondary }}>
              {completedSubtasks} of {totalSubtasks} subtasks completed
            </div>
          </div>
          
          {/* Subtasks section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className={`text-lg font-medium ${isNeonTheme ? 'sl-glow-text' : ''}`}
                  style={{ 
                    color: currentTheme.textPrimary,
                    fontFamily: isNeonTheme ? "'Orbitron', 'Rajdhani', sans-serif" : 
                                isCyberpunk ? "'Audiowide', 'Rajdhani', sans-serif" : 
                                currentTheme.font
                  }}>
                {isNeonTheme ? 'SUBTASKS' : isCyberpunk ? 'SUBTASKS' : 'Subtasks'}
              </h3>
              
              {!isAddingSubtask && (
                <button
                  onClick={() => setIsAddingSubtask(true)}
                  className="flex items-center gap-1 text-sm py-1 px-2 rounded"
                  style={{ 
                    backgroundColor: isNeonTheme || isCyberpunk ? 'transparent' : `${currentTheme.primaryColor}10`,
                    color: currentTheme.primaryColor,
                    border: isNeonTheme || isCyberpunk ? `1px solid ${currentTheme.primaryColor}` : 'none',
                    borderRadius: currentTheme.radius
                  }}
                >
                  <PlusIcon className="w-4 h-4" />
                  <span>{isNeonTheme ? 'ADD' : isCyberpunk ? 'ADD' : 'Add'}</span>
                </button>
              )}
            </div>
            
            {/* Add new subtask form */}
            {isAddingSubtask && (
              <div className="flex items-center gap-2 mb-4">
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
                  onClick={handleAddSubtask}
                  className="p-2 rounded"
                  style={{ 
                    backgroundColor: isNeonTheme || isCyberpunk ? 'transparent' : currentTheme.primaryColor,
                    color: isNeonTheme || isCyberpunk ? currentTheme.primaryColor : 'white',
                    border: isNeonTheme || isCyberpunk ? `1px solid ${currentTheme.primaryColor}` : 'none',
                    borderRadius: currentTheme.radius
                  }}
                >
                  <CheckIcon className="w-5 h-5" />
                </button>
                
                <button
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
                  <XIcon className="w-5 h-5" />
                </button>
              </div>
            )}
            
            {/* List of subtasks */}
            <ul className="space-y-2">
              {project.subtasks && project.subtasks.length > 0 ? (
                project.subtasks.map((subtask) => (
                  <li 
                    key={subtask.id}
                    className="flex items-center p-3 rounded"
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
                      className="mr-3 w-5 h-5 rounded flex items-center justify-center cursor-pointer"
                      style={{ 
                        backgroundColor: subtask.completed ? currentTheme.primaryColor : 'transparent',
                        border: `2px solid ${subtask.completed ? currentTheme.primaryColor : currentTheme.borderColor}`,
                        borderRadius: `calc(${currentTheme.radius} / 2)`
                      }}
                      onClick={() => onToggleSubtask(project.id, subtask.id)}
                    >
                      {subtask.completed && (
                        <CheckIcon className="w-3 h-3 text-white" />
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
                          onClick={() => handleSaveSubtaskEdit(subtask.id)}
                          className="p-1 rounded text-xs"
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
                          <XIcon className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <span 
                          className="flex-1 text-sm transition-all"
                          style={{ 
                            color: subtask.completed ? currentTheme.textSecondary : currentTheme.textPrimary,
                            textDecoration: subtask.completed ? 'line-through' : 'none'
                          }}
                        >
                          {subtask.title}
                        </span>
                        
                        {/* Action buttons */}
                        <div className="flex items-center">
                          <button
                            onClick={() => startEditingSubtask(subtask)}
                            className="p-1 rounded text-xs opacity-0 group-hover:opacity-100 hover:opacity-100 focus:opacity-100"
                            style={{ color: currentTheme.textSecondary }}
                            title="Edit"
                          >
                            <PencilIcon className="w-4 h-4" />
                          </button>
                          
                          <button
                            onClick={() => onDeleteSubtask(project.id, subtask.id)}
                            className="p-1 rounded text-xs opacity-0 group-hover:opacity-100 hover:opacity-100 focus:opacity-100"
                            style={{ color: '#ef4444' }} // red color
                            title="Delete"
                          >
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </>
                    )}
                  </li>
                ))
              ) : (
                <li 
                  className="text-center p-4 rounded"
                  style={{ 
                    backgroundColor: currentTheme.bgTertiary,
                    color: currentTheme.textSecondary,
                    borderRadius: currentTheme.radius
                  }}
                >
                  No subtasks yet. Add some to track progress.
                </li>
              )}
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectDetail;