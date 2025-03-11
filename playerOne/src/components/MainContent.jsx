import React, { useContext, useState } from "react";
import { PlusIcon, SearchIcon, ChevronRightIcon } from "@heroicons/react/outline";
import HabitItem from "./HabitItem";
import TaskItem from "./TaskItem";
import ProjectItem from "./ProjectItem";
import ThemeContext from "../context/ThemeContext";

const MainContent = ({
  setShowAddModal,
  searchQuery,
  setSearchQuery,
  habits,
  tasks,
  projects,
  setTasks,
  setHabits,
  setProjects,
  isCollapsed,
  toggleCollapse,
  setEditingItem
}) => {
  const { currentTheme } = useContext(ThemeContext);
  
  // Tab states for each section
  const [habitTab, setHabitTab] = useState('all');
  const [taskTab, setTaskTab] = useState('active');
  const [projectTab, setProjectTab] = useState('all');

  // Handle completing a task
  const handleCompleteTask = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, status: t.status === "Completed" ? "Pending" : "Completed" } : t
      )
    );
  };

  // Handle editing an item
  const handleEditItem = (item, type) => {
    setEditingItem({ item, type });
    setShowAddModal(true);
  };

  // Handle adding a new item based on type
  const handleAddItem = (type) => {
    setEditingItem({ type, item: null }); // Set type but no item (for new items)
    setShowAddModal(true);
  };
  
  // Filter items based on search query
  const filteredHabits = habits.filter(habit => 
    searchQuery ? habit.title.toLowerCase().includes(searchQuery.toLowerCase()) : true
  );
  
  const filteredTasks = tasks.filter(task => {
    // First filter by search query
    if (searchQuery && !task.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Then filter by tab
    if (taskTab === 'active') return task.status !== 'Completed';
    if (taskTab === 'completed') return task.status === 'Completed';
    if (taskTab === 'scheduled') return task.due && task.status !== 'Completed';
    return true;
  });
  
  const filteredProjects = projects.filter(project => {
    // First filter by search query
    if (searchQuery && !project.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Then filter by tab
    if (projectTab === 'active') return project.progress < 100;
    if (projectTab === 'completed') return project.progress === 100;
    return true;
  });

  // Function to render tab buttons with pixel-friendly styling
  const renderTabButtons = (activeTab, setActiveTab, options) => (
    <div className="flex bg-gray-100 p-0.5 rounded-sm text-xs font-medium">
      {options.map(option => (
        <button 
          key={option.value}
          className={`px-2 py-1 rounded-sm ${activeTab === option.value 
            ? 'bg-white text-purple-600 shadow-sm' 
            : 'text-gray-500'}`}
          onClick={() => setActiveTab(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
      {/* Header floating on top of content */}
      <div className="z-10 px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Left: Toggle Button (visible only when panel is collapsed) */}
          <div className="flex items-center">
            {isCollapsed && (
              <button
                onClick={toggleCollapse}
                className="mr-4 p-2 rounded-sm border border-gray-200 shadow-sm bg-white transition-colors hover:bg-gray-50"
              >
                <ChevronRightIcon className="w-5 h-5 text-gray-500" />
              </button>
            )}
          </div>
          {/* Center: Fixed-width Search Bar */}
          <div className="flex justify-center flex-1">
            <div className="relative w-full max-w-2xl">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search items..."
                className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-sm text-sm placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 bg-white shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          {/* Right: Add Item Button */}
          <div className="flex items-center">
            <button
              onClick={() => handleAddItem("task")}
              className="ml-4 flex items-center gap-2 px-4 py-2 rounded-sm bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm font-medium hover:shadow-md transition-shadow"
            >
              <PlusIcon className="w-5 h-5" />
              Add Item
            </button>
          </div>
        </div>
      </div>

      {/* Content Area with grid layout - fills remaining space */}
      <div className="flex-1 pt-2 pb-6 overflow-hidden px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-full">
          {/* HABITS COLUMN */}
          <div className="flex flex-col h-full overflow-hidden">
            {/* Fixed header */}
            <div className="px-4 py-3 border-b border-gray-100 bg-white flex items-center justify-between rounded-none shadow-sm">
              <div className="flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h2 className="text-base font-semibold text-gray-900">Habits</h2>
                <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-sm">{filteredHabits.length}</span>
              </div>
              {renderTabButtons(habitTab, setHabitTab, [
                { value: 'all', label: 'All' },
                { value: 'week', label: 'Week' },
                { value: 'strong', label: 'Strong' }
              ])}
            </div>

            {/* Container for both content and footer */}
            <div className="bg-gray-100 flex-1 flex flex-col rounded-none shadow-sm overflow-hidden">
              {/* Fixed Add Habit button */}
              <div className="p-4 pb-2">
                <button 
                  onClick={() => handleAddItem("habit")}
                  className="w-full flex items-center justify-center px-4 py-3 border border-dashed border-gray-300 rounded-sm text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 bg-gray-200 hover:bg-gray-300 transition-colors"
                >
                  <PlusIcon className="h-4 w-4" />
                  <span className="ml-2">Add a Habit</span>
                </button>
              </div>
              
              {/* Scrollable content area */}
              <div className="px-4 flex-1 overflow-y-auto">
                {filteredHabits.length === 0 ? (
                  <div className="flex items-center justify-center text-center p-6 text-gray-400 h-full">
                    <div>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-2 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-sm font-medium">No habits found</p>
                      <p className="text-xs mt-1">Create your first habit to start building consistency</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3 pt-2 pb-4">
                    {filteredHabits.map((habit) => (
                      <HabitItem 
                        key={habit.id} 
                        habit={habit} 
                        onEdit={() => handleEditItem(habit, "habit")}
                      />
                    ))}
                  </div>
                )}
              </div>
              
              {/* Fixed footer area */}
              <div className="px-4 pb-4">
                <div className="border-t border-gray-200 pt-3">
                  <p className="text-xs text-center text-gray-500">
                    Track regular activities with habits. Build streaks and earn rewards for consistency.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* TASKS COLUMN */}
          <div className="flex flex-col h-full overflow-hidden">
            {/* Fixed header */}
            <div className="px-4 py-3 border-b border-gray-100 bg-white flex items-center justify-between rounded-none shadow-sm">
              <div className="flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
                <h2 className="text-base font-semibold text-gray-900">Tasks</h2>
                <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-sm">{filteredTasks.length}</span>
              </div>
              {renderTabButtons(taskTab, setTaskTab, [
                { value: 'active', label: 'Active' },
                { value: 'scheduled', label: 'Scheduled' },
                { value: 'completed', label: 'Done' }
              ])}
            </div>

            {/* Container for both content and footer */}
            <div className="bg-gray-100 flex-1 flex flex-col rounded-none shadow-sm overflow-hidden">
              {/* Fixed Add Task button */}
              <div className="p-4 pb-2">
                <button 
                  onClick={() => handleAddItem("task")}
                  className="w-full flex items-center justify-center px-4 py-3 border border-dashed border-gray-300 rounded-sm text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 bg-gray-200 hover:bg-gray-300 transition-colors"
                >
                  <PlusIcon className="h-4 w-4" />
                  <span className="ml-2">Add a Task</span>
                </button>
              </div>
              
              {/* Scrollable content area */}
              <div className="px-4 flex-1 overflow-y-auto">
                {filteredTasks.length === 0 ? (
                  <div className="flex items-center justify-center text-center p-6 text-gray-400 h-full">
                    <div>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-2 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                      </svg>
                      <p className="text-sm font-medium">No tasks found</p>
                      <p className="text-xs mt-1">Tasks help you track individual items you need to complete</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3 pt-2 pb-4">
                    {filteredTasks.map((task) => (
                      <TaskItem 
                        key={task.id} 
                        task={task} 
                        onComplete={handleCompleteTask}
                        onEdit={() => handleEditItem(task, "task")}
                      />
                    ))}
                  </div>
                )}
              </div>
              
              {/* Fixed footer area */}
              <div className="px-4 pb-4">
                <div className="border-t border-gray-200 pt-3">
                  <p className="text-xs text-center text-gray-500">
                    Complete tasks to earn rewards. Higher difficulty tasks give more experience and coins.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* PROJECTS COLUMN */}
          <div className="flex flex-col h-full overflow-hidden">
            {/* Fixed header */}
            <div className="px-4 py-3 border-b border-gray-100 bg-white flex items-center justify-between rounded-none shadow-sm">
              <div className="flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
                <h2 className="text-base font-semibold text-gray-900">Projects</h2>
                <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-sm">{filteredProjects.length}</span>
              </div>
              {renderTabButtons(projectTab, setProjectTab, [
                { value: 'all', label: 'All' },
                { value: 'active', label: 'Active' },
                { value: 'completed', label: 'Done' }
              ])}
            </div>

            {/* Container for both content and footer */}
            <div className="bg-gray-100 flex-1 flex flex-col rounded-none shadow-sm overflow-hidden">
              {/* Fixed Add Project button */}
              <div className="p-4 pb-2">
                <button 
                  onClick={() => handleAddItem("project")}
                  className="w-full flex items-center justify-center px-4 py-3 border border-dashed border-gray-300 rounded-sm text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 bg-gray-200 hover:bg-gray-300 transition-colors"
                >
                  <PlusIcon className="h-4 w-4" />
                  <span className="ml-2">Add a Project</span>
                </button>
              </div>
              
              {/* Scrollable content area */}
              <div className="px-4 flex-1 overflow-y-auto">
                {filteredProjects.length === 0 ? (
                  <div className="flex items-center justify-center text-center p-6 text-gray-400 h-full">
                    <div>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-2 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                      <p className="text-sm font-medium">No projects found</p>
                      <p className="text-xs mt-1">Projects help you track longer-term goals with multiple steps</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3 pt-2 pb-4">
                    {filteredProjects.map((project) => (
                      <ProjectItem 
                        key={project.id} 
                        project={project} 
                        onEdit={() => handleEditItem(project, "project")}
                      />
                    ))}
                  </div>
                )}
              </div>
              
              {/* Fixed footer area */}
              <div className="px-4 pb-4">
                <div className="border-t border-gray-200 pt-3">
                  <p className="text-xs text-center text-gray-500">
                    Track long-term goals with projects. Update progress as you complete each step.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;