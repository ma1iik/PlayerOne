import React, { useContext, useState } from "react";
import { PlusIcon, SearchIcon, ChevronRightIcon } from "@heroicons/react/outline";
import HabitItem from "./HabitItem";
import TaskItem from "./TaskItem";
import ProjectItem from "./ProjectItem";
import ThemeContext from "../context/ThemeContext";

// Section component for DRY code
const Section = ({ 
  title, 
  icon, 
  count, 
  tabs,
  activeTab, 
  setActiveTab, 
  items, 
  emptyMessage, 
  emptyDescription,
  footerText,
  addButtonText,
  onAdd,
  renderItem
}) => {
  const { currentTheme } = useContext(ThemeContext);
  const isNeonTheme = currentTheme.id.includes('neon');
  
  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b" style={{
        backgroundColor: currentTheme.bgSecondary,
        borderColor: currentTheme.borderColor,
        borderTopLeftRadius: currentTheme.radius,
        borderTopRightRadius: currentTheme.radius,
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
      }}>
        <div className="flex items-center gap-2">
          {icon}
          <h2 className="text-base font-semibold" style={{ color: currentTheme.textPrimary }}>
            {isNeonTheme ? title.toUpperCase() : title}
          </h2>
          <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{
            backgroundColor: `${currentTheme.primaryColor}15`,
            color: currentTheme.primaryColor
          }}>
            {count}
          </span>
        </div>
        
        {/* Tabs */}
        <div className="flex bg-gray-100 rounded-lg p-1" style={{
          backgroundColor: currentTheme.bgTertiary,
          borderRadius: currentTheme.radius
        }}>
          {tabs.map(tab => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className="px-2.5 py-1 text-xs font-medium transition-colors"
              style={{
                backgroundColor: activeTab === tab.value ? currentTheme.bgSecondary : 'transparent',
                color: activeTab === tab.value ? currentTheme.primaryColor : currentTheme.textSecondary,
                borderRadius: `calc(${currentTheme.radius} - 2px)`,
                boxShadow: activeTab === tab.value ? '0 1px 2px rgba(0,0,0,0.05)' : 'none'
              }}
            >
              {isNeonTheme ? tab.label.toUpperCase() : tab.label}
            </button>
          ))}
        </div>
      </div>
      
      {/* Content container */}
      <div className="flex-1 flex flex-col" style={{
        backgroundColor: currentTheme.bgPrimary,
        borderBottomLeftRadius: currentTheme.radius,
        borderBottomRightRadius: currentTheme.radius,
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        borderLeft: `1px solid ${currentTheme.borderColor}`,
        borderRight: `1px solid ${currentTheme.borderColor}`,
        borderBottom: `1px solid ${currentTheme.borderColor}`
      }}>
        {/* Add button */}
        <div className="p-4 pb-2">
          <button
            onClick={onAdd}
            className="w-full flex items-center justify-center gap-1.5 px-3 py-2.5 text-sm font-medium transition-colors"
            style={{
              border: `1px dashed ${currentTheme.borderColor}`,
              backgroundColor: currentTheme.bgTertiary,
              color: currentTheme.textSecondary,
              borderRadius: currentTheme.radius
            }}
          >
            <PlusIcon className="h-4 w-4" />
            <span>{isNeonTheme ? addButtonText.toUpperCase() : addButtonText}</span>
          </button>
        </div>
        
        {/* Item list or empty state */}
        <div className="flex-1 px-4 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex items-center justify-center text-center h-full" style={{
              color: currentTheme.textSecondary,
              padding: '2rem 1rem'
            }}>
              <div>
                {icon && React.cloneElement(icon, {
                  className: "h-12 w-12 mx-auto mb-3",
                  style: { color: `${currentTheme.textSecondary}50` }
                })}
                <p className="text-sm font-medium mb-1" style={{ color: currentTheme.textPrimary }}>
                  {isNeonTheme ? emptyMessage.toUpperCase() : emptyMessage}
                </p>
                <p className="text-xs">{emptyDescription}</p>
              </div>
            </div>
          ) : (
            <div className="space-y-3 py-2">
              {items.map(item => renderItem(item))}
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="px-4 py-3">
          <div className="border-t pt-3" style={{ borderColor: currentTheme.borderColor }}>
            <p className="text-xs text-center" style={{ color: currentTheme.textSecondary }}>
              {footerText}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

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
  const isNeonTheme = currentTheme.id.includes('neon');
  
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
    setEditingItem({ type, item: null });
    setShowAddModal(true);
  };
  
  // Filter items based on search query and active tab
  const filteredHabits = habits.filter(habit => 
    searchQuery ? habit.title.toLowerCase().includes(searchQuery.toLowerCase()) : true
  );
  
  const filteredTasks = tasks.filter(task => {
    if (searchQuery && !task.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    if (taskTab === 'active') return task.status !== 'Completed';
    if (taskTab === 'completed') return task.status === 'Completed';
    if (taskTab === 'scheduled') return task.due && task.status !== 'Completed';
    return true;
  });
  
  const filteredProjects = projects.filter(project => {
    if (searchQuery && !project.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    if (projectTab === 'active') return project.progress < 100;
    if (projectTab === 'completed') return project.progress === 100;
    return true;
  });

  // Icons for sections
  const habitIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" style={{ color: currentTheme.textSecondary }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

  const taskIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" style={{ color: currentTheme.textSecondary }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
    </svg>
  );

  const projectIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" style={{ color: currentTheme.textSecondary }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  );

  return (
    <div className="flex-1 flex flex-col overflow-hidden" style={{ backgroundColor: currentTheme.bgPrimary }}>
      {/* Header */}
      <div className="z-10 px-4 sm:px-6 lg:px-8 py-4" style={{
        backgroundColor: currentTheme.bgSecondary,
        borderBottom: `1px solid ${currentTheme.borderColor}`,
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
      }}>
        <div className="flex items-center justify-between">
          {/* Toggle button (when panel is collapsed) */}
          <div className="flex items-center">
            {isCollapsed && (
              <button
                onClick={toggleCollapse}
                className="mr-4 p-2 rounded transition-colors"
                style={{
                  backgroundColor: currentTheme.bgSecondary,
                  color: currentTheme.textSecondary,
                  border: `1px solid ${currentTheme.borderColor}`,
                  borderRadius: currentTheme.radius,
                  boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                }}
              >
                <ChevronRightIcon className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Search bar */}
          <div className="flex justify-center flex-1">
            <div className="relative w-full max-w-2xl">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="w-5 h-5" style={{ color: currentTheme.textSecondary }} />
              </div>
              <input
                type="text"
                placeholder="Search items..."
                className="pl-10 pr-3 py-2 w-full focus:outline-none"
                style={{
                  border: `1px solid ${currentTheme.borderColor}`,
                  borderRadius: currentTheme.radius,
                  backgroundColor: currentTheme.inputBg,
                  color: currentTheme.textPrimary,
                  boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Add item button */}
          <button
            onClick={() => handleAddItem("task")}
            className="ml-4 flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all"
            style={{
              background: `linear-gradient(135deg, ${currentTheme.primaryColor}, ${currentTheme.secondaryColor})`,
              color: '#ffffff',
              borderRadius: currentTheme.radius,
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}
          >
            <PlusIcon className="w-5 h-5" />
            {isNeonTheme ? 'ADD ITEM' : 'Add Item'}
          </button>
        </div>
      </div>

      {/* Content with grid layout */}
      <div className="flex-1 pt-4 pb-6 overflow-hidden px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-full">
          {/* Habits section */}
          <Section
            title="Habits"
            icon={habitIcon}
            count={filteredHabits.length}
            tabs={[
              { value: 'all', label: 'All' },
              { value: 'week', label: 'Week' },
              { value: 'strong', label: 'Strong' }
            ]}
            activeTab={habitTab}
            setActiveTab={setHabitTab}
            items={filteredHabits}
            emptyMessage="No habits found"
            emptyDescription="Create your first habit to start building consistency"
            footerText="Track regular activities with habits. Build streaks and earn rewards for consistency."
            addButtonText="Add a Habit"
            onAdd={() => handleAddItem("habit")}
            renderItem={(habit) => (
              <HabitItem
                key={habit.id}
                habit={habit}
                onEdit={() => handleEditItem(habit, "habit")}
              />
            )}
          />

          {/* Tasks section */}
          <Section
            title="Tasks"
            icon={taskIcon}
            count={filteredTasks.length}
            tabs={[
              { value: 'active', label: 'Active' },
              { value: 'scheduled', label: 'Scheduled' },
              { value: 'completed', label: 'Done' }
            ]}
            activeTab={taskTab}
            setActiveTab={setTaskTab}
            items={filteredTasks}
            emptyMessage="No tasks found"
            emptyDescription="Tasks help you track individual items you need to complete"
            footerText="Complete tasks to earn rewards. Higher difficulty tasks give more experience and coins."
            addButtonText="Add a Task"
            onAdd={() => handleAddItem("task")}
            renderItem={(task) => (
              <TaskItem
                key={task.id}
                task={task}
                onComplete={handleCompleteTask}
                onEdit={() => handleEditItem(task, "task")}
              />
            )}
          />

          {/* Projects section */}
          <Section
            title="Projects"
            icon={projectIcon}
            count={filteredProjects.length}
            tabs={[
              { value: 'all', label: 'All' },
              { value: 'active', label: 'Active' },
              { value: 'completed', label: 'Done' }
            ]}
            activeTab={projectTab}
            setActiveTab={setProjectTab}
            items={filteredProjects}
            emptyMessage="No projects found"
            emptyDescription="Projects help you track longer-term goals with multiple steps"
            footerText="Track long-term goals with projects. Update progress as you complete each step."
            addButtonText="Add a Project"
            onAdd={() => handleAddItem("project")}
            renderItem={(project) => (
              <ProjectItem
                key={project.id}
                project={project}
                onEdit={() => handleEditItem(project, "project")}
              />
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default MainContent;