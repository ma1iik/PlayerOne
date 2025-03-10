// src/components/TaskSection.jsx
import React from 'react';
import HabitItem from './HabitItem';
import TaskItem from './TaskItem';
import ProjectItem from './ProjectItem';

// Icon components
const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ListIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
  </svg>
);

// Component to render appropriate section
const TaskSection = ({ type, items, activeTab, setActiveTab, onAdd, onEdit, onToggle, onComplete }) => {
  // Get icon based on type
  const getSectionIcon = () => {
    switch (type) {
      case 'habits':
        return <CheckCircleIcon />;
      case 'projects':
        return <ListIcon />;
      default:
        return <ListIcon />;
    }
  };

  // Get section title based on type
  const getSectionTitle = () => {
    switch (type) {
      case 'habits':
        return 'Habits';
      case 'tasks':
        return 'Tasks';
      case 'projects':
        return 'Projects';
      default:
        return '';
    }
  };

  // Render appropriate item component
  const renderItem = (item) => {
    switch (type) {
      case 'habits':
        return <HabitItem key={item.id} habit={item} onToggle={onToggle} onEdit={onEdit} />;
      case 'tasks':
        return <TaskItem key={item.id} task={item} onComplete={onComplete} onEdit={onEdit} />;
      case 'projects':
        return <ProjectItem key={item.id} project={item} onEdit={onEdit} />;
      default:
        return null;
    }
  };

  // Get tab options based on type
  const getTabOptions = () => {
    switch (type) {
      case 'habits':
        return [
          { id: 'all', label: 'All' },
          { id: 'week', label: 'Week' },
          { id: 'strong', label: 'Strong' }
        ];
      case 'tasks':
        return [
          { id: 'active', label: 'Active' },
          { id: 'scheduled', label: 'Scheduled' },
          { id: 'completed', label: 'Done' }
        ];
      case 'projects':
        return [
          { id: 'all', label: 'All' },
          { id: 'active', label: 'Active' },
          { id: 'completed', label: 'Completed' }
        ];
      default:
        return [];
    }
  };

  // Get info text based on type
  const getInfoText = () => {
    switch (type) {
      case 'habits':
        return 'Habits are regular activities you want to track consistently over time.';
      case 'tasks':
        return 'Tasks are one-time activities that need to be completed by a specific date.';
      case 'projects':
        return 'Projects are larger objectives that typically contain multiple tasks.';
      default:
        return '';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-100 bg-white flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {getSectionIcon()}
          <h2 className="text-base font-semibold text-gray-900">{getSectionTitle()}</h2>
          <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            {items.length}
          </span>
        </div>
        <div className="flex bg-gray-100 p-0.5 rounded-lg text-xs font-medium">
          {getTabOptions().map(tab => (
            <button 
              key={tab.id}
              className={`px-2 py-1 rounded-md ${activeTab === tab.id ? 'bg-white text-purple-600 shadow-sm' : 'text-gray-500'}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Add button */}
        <button 
          onClick={() => onAdd(type)}
          className="w-full flex items-center justify-center px-4 py-3 border border-dashed border-gray-300 rounded-lg text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mb-3 bg-gray-50 hover:bg-gray-100 transition-colors"
        >
          <PlusIcon />
          <span className="ml-2">Add a {type.slice(0, -1)}</span>
        </button>
        
        {/* Items */}
        {items.map(item => renderItem(item))}
        
        {/* Section info */}
        <div className="mt-4 border-t border-gray-100 pt-4">
          <p className="text-xs text-center text-gray-500">
            {getInfoText()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TaskSection;