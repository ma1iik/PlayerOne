// src/components/MainContent.jsx
import React, { useState } from "react";
import { PlusIcon, SearchIcon, ChevronRightIcon } from "@heroicons/react/outline";
import HabitItem from "./habits/HabitItem";
import TaskItem from "./tasks/TaskItem";
import ProjectItem from "./projects/ProjectItem";
import { useThemeStyles } from "../context/ThemeProvider";
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import SortableItem from './dnd/SortableItem';
import { useDrag } from "../context/DragContext";

// Section component for DRY code - with optional tabs
// In MainContent.jsx, find the Section component and modify the div structure to support scrolling

// Section component for DRY code - with optional tabs
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
  renderItem,
  showTabs = true,
  onDragEnd,
  itemType
  }) => {
  const { theme: currentTheme } = useThemeStyles();
  
  // Add null checks to prevent React Error #31
  if (!currentTheme) {
    return <div>Loading...</div>;
  }
  
  const { sensors } = useDrag();

  const isNeonTheme = currentTheme.id && currentTheme.id.includes('neon');
  
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
          <span className="text-xs font-medium px-2 py-0.5" style={{
            backgroundColor: `${currentTheme.primaryColor}15`,
            color: currentTheme.primaryColor,
            borderRadius: `calc(${currentTheme.radius} / 2)` // Make it less round, more square
          }}>
            {count}
          </span>
        </div>
        
        {/* Tabs - only shown if showTabs is true */}
        {showTabs && tabs && (
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
        )}
      </div>
      
      {/* Content container with fixed height and scrollable content */}
      <div className="flex-1 flex flex-col overflow-hidden" style={{
        backgroundColor: currentTheme.bgPrimary,
        borderBottomLeftRadius: currentTheme.radius,
        borderBottomRightRadius: currentTheme.radius,
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        borderLeft: `1px solid ${currentTheme.borderColor}`,
        borderRight: `1px solid ${currentTheme.borderColor}`,
        borderBottom: `1px solid ${currentTheme.borderColor}`
      }}>
        {/* Add button - fixed at the top */}
        <div className="p-4 pb-2">
          <button
            onClick={onAdd}
            className="w-full flex items-center justify-center gap-1.5 px-3 py-2.5 text-sm font-medium transition-all duration-200"
            style={{
              border: `1px dashed ${currentTheme.borderColor}`,
              backgroundColor: currentTheme.bgTertiary,
              color: currentTheme.textSecondary,
              borderRadius: currentTheme.radius
            }}
            onMouseOver={(e) => {
              // Slightly darken background and border on hover, keeping same color family
              if ((currentTheme.id && currentTheme.id.includes('neon')) || currentTheme.id === 'cyberpunk') {
                // For neon/cyberpunk themes - just slightly increase opacity
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.borderColor = `${currentTheme.borderColor}`;
                // Just slightly increase text brightness
                e.currentTarget.style.color = currentTheme.textSecondary;
                e.currentTarget.style.opacity = "0.9";
              } else {
                // For regular themes - make background just slightly darker
                const bgColor = currentTheme.bgTertiary;
                if (bgColor.startsWith('#')) {
                  // Subtle darkening - just reduce brightness by about 5-10%
                  e.currentTarget.style.backgroundColor = bgColor === '#f3f4f6' ? '#ebedf0' : 
                                                         bgColor === '#374151' ? '#333a48' :
                                                         bgColor === '#1e1e35' ? '#1c1c31' : 
                                                         '#e9eaec'; // fallback
                } else {
                  // For non-hex colors, use opacity trick
                  e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.03)';
                }
                
                // Slightly darken border
                e.currentTarget.style.borderColor = currentTheme.borderColor === '#e5e7eb' ? '#dfe3ea' :
                                                   currentTheme.borderColor === '#374151' ? '#3d4759' :
                                                   currentTheme.borderColor; 
              }
              // Make text just slightly darker, not dramatically different
              e.currentTarget.style.color = currentTheme.textSecondary;
              e.currentTarget.style.opacity = "0.85";
            }}
            onMouseOut={(e) => {
              // Reset on mouse out
              e.currentTarget.style.backgroundColor = currentTheme.bgTertiary;
              e.currentTarget.style.color = currentTheme.textSecondary;
              e.currentTarget.style.borderColor = currentTheme.borderColor;
              e.currentTarget.style.opacity = "1";
            }}
          >
            <PlusIcon className="h-4 w-4" />
            <span>{isNeonTheme ? addButtonText.toUpperCase() : addButtonText}</span>
          </button>
        </div>
        
        {/* Scrollable item list area with fixed height */}
        <div className="flex-1 px-4 overflow-y-auto custom-scrollbar">
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
            <DndContext 
              sensors={sensors} 
              collisionDetection={closestCenter}
              onDragEnd={(event) => onDragEnd(event, itemType)}
            >
              <SortableContext items={items.map(item => item.id)} strategy={verticalListSortingStrategy}>
                <div className="space-y-3 py-2 pb-16">
                  {items.map(item => (
                    <SortableItem key={item.id} id={item.id}>
                      {renderItem(item)}
                    </SortableItem>
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          )}
        </div>
        
        {/* Footer - fixed at the bottom */}
        <div className="px-4 py-3 mt-auto border-t" style={{ borderColor: currentTheme.borderColor }}>
          <p className="text-xs text-center" style={{ color: currentTheme.textSecondary }}>
            {footerText}
          </p>
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
  setHabits,
  setTasks,
  setProjects,
  isCollapsed,
  toggleCollapse,
  setEditingItem,
  setSelectedProject
}) => {
  const { theme: currentTheme } = useThemeStyles();
  
  // Add null checks to prevent React Error #31
  if (!currentTheme) {
    return <div>Loading...</div>;
  }
  
  const { handleDragEnd } = useDrag();

  const isNeonTheme = currentTheme.id && currentTheme.id.includes('neon');

  // Tab states for each section - Keep habits tab functionality but don't show it
  const [habitTab, setHabitTab] = useState('all');
  const [taskTab, setTaskTab] = useState('all');
  const [projectTab, setProjectTab] = useState('all');

  // Handle completing a task
  const handleCompleteTask = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, status: t.status === "Completed" ? "Pending" : "Completed" } : t
      )
    );
  };

  // Handle toggling a habit completion
  const handleToggleHabit = (id) => {
    setHabits(
      habits.map((h) =>
        h.id === id ? { ...h, completed: !h.completed } : h
      )
    );
  };

  // Handle updating a countable habit
  const handleUpdateHabitCount = (id, newCount) => {
    setHabits(
      habits.map((h) =>
        h.id === id ? { ...h, currentCount: newCount } : h
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

  const handleItemDragEnd = (event, itemType) => {
    console.log(`Drag ended for itemType: ${itemType}`, event);
    
    let currentItems, setItemsFunction;
    
    switch(itemType) {
      case 'habit':
        currentItems = habits;
        setItemsFunction = setHabits;
        break;
      case 'task':
        currentItems = tasks;
        setItemsFunction = setTasks;
        break;
      case 'project':
        currentItems = projects;
        setItemsFunction = setProjects;
        break;
      default:
        console.error(`Unknown item type: ${itemType}`);
        return;
    }
    
    // Log the relevant item arrays before update
    console.log(`${itemType} array before update:`, currentItems);
    
    // Call the drag handler
    handleDragEnd(event, currentItems, setItemsFunction);
    
    // For tasks specifically - add extra validation
    if (itemType === 'task') {
      console.log('Verifying task IDs are correct:');
      currentItems.forEach(task => {
        if (typeof task.id !== 'number' && task.id === undefined) {
          console.error('Task has invalid ID:', task);
        } else {
          console.log(`Task ID: ${task.id}, Title: ${task.title}`);
        }
      });
    }
  }

  // Filter items based on search query and active tab
  const filteredHabits = habits.filter(habit => 
    searchQuery ? habit.title.toLowerCase().includes(searchQuery.toLowerCase()) : true
  ).sort((a, b) => {
    // Sort by completion status - completed habits go to the bottom
    const aCompleted = a.completed || (a.countable && a.targetCount > 0 && (a.currentCount || 0) >= a.targetCount);
    const bCompleted = b.completed || (b.countable && b.targetCount > 0 && (b.currentCount || 0) >= b.targetCount);
    
    if (aCompleted && !bCompleted) return 1;
    if (!aCompleted && bCompleted) return -1;
    return 0;
  });

  const filteredTasks = tasks.filter(task => {
    if (searchQuery && !task.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    switch(taskTab) {
      case 'scheduled':
        return task.due;
      case 'completed':
        return task.status === "Completed";
      default: // 'all'
        return true;
    }
  }).sort((a, b) => {
    // First sort by completion status
    const aCompleted = a.status === "Completed";
    const bCompleted = b.status === "Completed";
    
    if (aCompleted !== bCompleted) {
      return aCompleted ? 1 : -1;
    }
  
    // In scheduled view, sort by due date
    if (taskTab === 'scheduled' && a.due && b.due) {
      return new Date(a.due) - new Date(b.due);
    }
    
    // Otherwise maintain current order (for drag and drop)
    return 0;
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
      {/* Header - Modified to remove background */}
      <div className="z-10 px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Toggle button (when panel is collapsed) */}
          <div className="flex items-center">
            {isCollapsed && (
              <button
                onClick={toggleCollapse}
                className="mr-4 p-2 rounded transition-colors"
                style={{
                  backgroundColor: 'transparent',
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
                className="pl-10 pr-3 py-2 w-full focus:outline-none transition-colors duration-150"
                style={{
                  border: `1px solid ${currentTheme.borderColor}`,
                  borderRadius: currentTheme.radius,
                  backgroundColor: currentTheme.bgSecondary,
                  color: currentTheme.textPrimary,
                  boxShadow: currentTheme.features?.hasGlowEffects ? `0 0 8px ${currentTheme.primaryColor}20` : '0 1px 2px rgba(0,0,0,0.05)',
                  fontFamily: currentTheme.font
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = currentTheme.primaryColor;
                  if (currentTheme.features?.hasGlowEffects) {
                    e.target.style.boxShadow = `0 0 12px ${currentTheme.primaryColor}40`;
                  }
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = currentTheme.borderColor;
                  if (currentTheme.features?.hasGlowEffects) {
                    e.target.style.boxShadow = `0 0 8px ${currentTheme.primaryColor}20`;
                  } else {
                    e.target.style.boxShadow = '0 1px 2px rgba(0,0,0,0.05)';
                  }
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

      {/* Content with grid layout - this container is scrollable */}
      <div className="flex-1 overflow-hidden pt-4 pb-6 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-full">
          {/* Habits section - No tabs */}
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
                onToggle={handleToggleHabit}
                onUpdateCount={handleUpdateHabitCount}
              />
            )}
            showTabs={false} // This is the key change - hide tabs for habits
            onDragEnd={handleItemDragEnd}
            itemType="habit"
          />

          {/* Tasks section */}
          <Section
            title="Tasks"
            icon={taskIcon}
            count={filteredTasks.length}
            tabs={[
              { value: 'all', label: 'All' },
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
            onDragEnd={handleItemDragEnd}
            itemType="task"
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
                onClick={setSelectedProject}
              />
            )}
            onDragEnd={handleItemDragEnd}
            itemType="project"
          />
        </div>
      </div>
    </div>
  );
}

export default MainContent;