// src/pages/TaskManager.jsx
import React, { useState } from 'react';
import TaskSection from '../components/TaskSection';

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
  </svg>
);

const TaskManager = () => {
  const [habitTab, setHabitTab] = useState('all');
  const [taskTab, setTaskTab] = useState('active');
  const [projectTab, setProjectTab] = useState('all');
  
  const habits = [
    { id: 1, title: 'Morning exercise', streak: 12, frequency: 'Daily', completed: 0, target: 1 },
    { id: 2, title: 'Read 20 pages', streak: 5, frequency: 'Daily', completed: 0, target: 1 }
  ];
  
  const tasks = [
    { 
      id: 1, 
      title: 'Complete API integration', 
      description: 'Finish the REST API implementation',
      priority: 'high', 
      dueDate: { display: 'Today', isSoon: true },
      tags: ['Project X']
    },
    { 
      id: 2, 
      title: 'Update documentation', 
      description: 'Add latest API endpoints to docs',
      priority: 'medium', 
      dueDate: { display: 'Tomorrow', isSoon: false }
    },
    { 
      id: 3, 
      title: 'Review pull requests', 
      description: 'Check pending PRs from team members',
      priority: 'low', 
      dueDate: { display: 'Friday', isSoon: false }
    }
  ];
  
  const projects = [
    { id: 1, title: 'Mobile App Redesign', progress: 75, difficulty: 4 },
    { id: 2, title: 'Backend Migration', progress: 35, difficulty: 3 }
  ];
  
  const handleAdd = (type) => {
    console.log(`Adding a new ${type.slice(0, -1)}`);
  };
  
  const handleEdit = (id) => {
    console.log(`Editing item with id: ${id}`);
  };
  
  const handleToggle = (id) => {
    console.log(`Toggling habit with id: ${id}`);
  };
  
  const handleComplete = (id) => {
    console.log(`Completing task with id: ${id}`);
  };
  
  return (
    <div className="w-full min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="h-8 w-8 rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center text-white font-semibold">
                  TM
                </div>
                <span className="ml-2 text-lg font-semibold text-gray-900">TaskManager</span>
              </div>
            </div>
            
            <div className="max-w-lg w-full lg:max-w-xs relative">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon />
                </div>
                <input
                  className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                  placeholder="Search tasks..."
                  type="search"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg px-4 py-2 flex items-center text-sm font-medium hover:shadow-md transition-shadow">
                  <PlusIcon />
                  <span className="ml-1">Add Task</span>
                </button>
              </div>
              <div className="flex items-center">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-purple-100">
                  <span className="text-sm font-medium leading-none text-purple-700">User</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Habits Section */}
          <TaskSection 
            type="habits"
            items={habits}
            activeTab={habitTab}
            setActiveTab={setHabitTab}
            onAdd={handleAdd}
            onEdit={handleEdit}
            onToggle={handleToggle}
          />

          {/* Tasks Section */}
          <TaskSection 
            type="tasks"
            items={tasks}
            activeTab={taskTab}
            setActiveTab={setTaskTab}
            onAdd={handleAdd}
            onEdit={handleEdit}
            onComplete={handleComplete}
          />

          {/* Projects Section */}
          <TaskSection 
            type="projects"
            items={projects}
            activeTab={projectTab}
            setActiveTab={setProjectTab}
            onAdd={handleAdd}
            onEdit={handleEdit}
          />
        </div>
      </main>
      
      {/* Stats Bar */}
      <div className="bg-gradient-to-r from-purple-700 to-indigo-700 text-white py-3 px-6 fixed bottom-0 w-full z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="font-semibold">17</span>
              <span className="text-purple-200 text-sm">Tasks Completed</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
              </svg>
              <span className="font-semibold">12 Day Streak</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-white bg-opacity-20 px-3 py-1 rounded-lg text-sm">
              5 tasks remaining today
            </div>
            <button className="bg-white text-purple-700 px-3 py-1 rounded-lg text-sm font-medium hover:bg-opacity-90 transition-colors">
              Daily Check-in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskManager;