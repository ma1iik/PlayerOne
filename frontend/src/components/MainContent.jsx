// src/components/MainContent.jsx
import React, { useState } from "react";
import { PlusIcon, SearchIcon, ChevronRightIcon, CheckIcon } from "@heroicons/react/outline";
import HabitItem from "./habits/HabitItem";
import TaskItem from "./tasks/TaskItem";
import ProjectItem from "./projects/ProjectItem";
import { useThemeStyles } from "../context/ThemeProvider";
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import SortableItem from './dnd/SortableItem';
import { useDrag } from "../context/DragContext";
import CoinIcon from "./common/CoinIcon";
import StarIcon from "./common/StarIcon";
import HeartIcon from "./common/HeartIcon";
import FireIcon from "./common/FireIcon";
import natureBackground from "../assets/backgrounds/nature_4.png";

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
  
  if (!currentTheme) {
    return <div>Loading...</div>;
  }
  
  const { sensors } = useDrag();

  const isNeonTheme = currentTheme.id && currentTheme.id.includes('neon');
  
  return (
    <div className="flex flex-col h-full overflow-hidden" style={{
      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
      borderRadius: currentTheme.radius
    }}>
      <div className="flex items-center justify-between p-4 border-b" style={{
        backgroundColor: currentTheme.bgSecondary,
        borderColor: currentTheme.borderColor,
        borderTopLeftRadius: currentTheme.radius,
        borderTopRightRadius: currentTheme.radius,
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
        minHeight: !showTabs ? '64px' : 'auto'
      }}>
        <div className="flex items-center gap-2">
          {icon}
          <h2 className="text-base font-semibold" style={{ color: currentTheme.textPrimary }}>
            {isNeonTheme ? title.toUpperCase() : title}
          </h2>
          <span className="text-xs font-medium px-2 py-0.5" style={{
            backgroundColor: `${currentTheme.primaryColor}15`,
            color: currentTheme.primaryColor,
            borderRadius: `calc(${currentTheme.radius} / 2)`
          }}>
            {count}
          </span>
        </div>
        
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
      
      <div className="flex-1 flex flex-col overflow-hidden" style={{
        backgroundColor: currentTheme.bgPrimary,
        borderBottomLeftRadius: currentTheme.radius,
        borderBottomRightRadius: currentTheme.radius,
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        borderLeft: `1px solid ${currentTheme.borderColor}`,
        borderRight: `1px solid ${currentTheme.borderColor}`,
        borderBottom: `1px solid ${currentTheme.borderColor}`
      }}>
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
              if ((currentTheme.id && currentTheme.id.includes('neon')) || currentTheme.id === 'cyberpunk') {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.borderColor = `${currentTheme.borderColor}`;
                e.currentTarget.style.color = currentTheme.textSecondary;
                e.currentTarget.style.opacity = "0.9";
              } else {
                const bgColor = currentTheme.bgTertiary;
                if (bgColor.startsWith('#')) {
                  e.currentTarget.style.backgroundColor = bgColor === '#f3f4f6' ? '#ebedf0' : 
                                                         bgColor === '#374151' ? '#333a48' :
                                                         bgColor === '#1e1e35' ? '#1c1c31' : 
                                                         '#e9eaec';
                } else {
                  e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.03)';
                }
                
                e.currentTarget.style.borderColor = currentTheme.borderColor === '#e5e7eb' ? '#dfe3ea' :
                                                   currentTheme.borderColor === '#374151' ? '#3d4759' :
                                                   currentTheme.borderColor; 
              }
              e.currentTarget.style.color = currentTheme.textSecondary;
              e.currentTarget.style.opacity = "0.85";
            }}
            onMouseOut={(e) => {
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
        
        <div className="flex-1 px-4 overflow-hidden">
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
        
        <div className="px-4 py-3 mt-auto border-t" style={{ borderColor: currentTheme.borderColor }}>
          <p className="text-xs text-center" style={{ color: currentTheme.textSecondary }}>
            {footerText}
          </p>
        </div>
      </div>
    </div>
  );
  };

const ProfileSection = () => {
  const { theme: currentTheme } = useThemeStyles();
  
  if (!currentTheme) {
    return <div>Loading...</div>;
  }

  const isNeonTheme = currentTheme.id && currentTheme.id.includes('neon');
  
  // Profile data
  const profile = {
    username: "ma1iik",
    handle: "@ma1iik",
    level: 12,
    class: "Warrior",
    xp: 2850,
    maxXP: 5000,
    health: 8,
    maxHealth: 50,
    streak: 7,
    tasksToday: 6,
    totalTasksToday: 10,
    coinsEarned: 80,
    xpGained: 150
  };

  const hasCheckedIn = true;

  return (
    <div className="flex flex-col h-full overflow-hidden" style={{
      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
      borderRadius: currentTheme.radius
    }}>
      {/* Unique Profile Header - Stands out from task cards */}
      <div className="p-5 border-b" style={{
        background: `linear-gradient(135deg, ${currentTheme.primaryColor}08, ${currentTheme.secondaryColor}08)`,
        borderColor: currentTheme.borderColor,
        borderTopLeftRadius: currentTheme.radius,
        borderTopRightRadius: currentTheme.radius,
      }}>
        <div className="flex items-center justify-between">
          {/* User Info */}
          <div>
            <h3 className="text-base font-bold" style={{ 
              color: currentTheme.textPrimary,
              fontFamily: currentTheme.font,
              lineHeight: '1.2'
            }}>
              {profile.username}
            </h3>
            <p className="text-xs" style={{ 
              color: currentTheme.textSecondary,
              fontFamily: currentTheme.font,
              marginTop: '2px'
            }}>
              {profile.handle} • Level {profile.level} {profile.class}
            </p>
          </div>

          {/* Streak Badge - Just number x fire emoji */}
          <div 
            className="flex items-center gap-1 px-2.5 py-1.5"
            style={{
              background: `linear-gradient(135deg, #f59e0b15, #f59e0b10)`,
              borderRadius: currentTheme.radius,
              border: `1px solid #f59e0b30`
            }}
          >
            <span className="text-sm font-bold" style={{ 
              color: '#f59e0b',
              fontFamily: currentTheme.font
            }}>
              {profile.streak}
            </span>
            <FireIcon size="w-4 h-4" />
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="flex-1 flex flex-col overflow-hidden" style={{
        backgroundColor: currentTheme.bgPrimary,
        borderBottomLeftRadius: currentTheme.radius,
        borderBottomRightRadius: currentTheme.radius,
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        borderLeft: `1px solid ${currentTheme.borderColor}`,
        borderRight: `1px solid ${currentTheme.borderColor}`,
        borderBottom: `1px solid ${currentTheme.borderColor}`
      }}>
        <div className="p-4 space-y-3 overflow-y-auto">
          
          {/* Character Image - Right under header */}
          <div className="w-full" style={{ height: '210px' }}>
            <div 
              className="w-full h-full flex items-center justify-center relative overflow-hidden"
              style={{
                borderRadius: currentTheme.radius,
                border: `1px solid ${currentTheme.borderColor}`
              }}
            >
              <img 
                src={natureBackground} 
                alt="Character Background"
                className="w-full h-full object-cover"
                style={{
                  borderRadius: currentTheme.radius
                }}
              />
            </div>
          </div>

          {/* Health Bar */}
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span 
                className="flex items-center gap-1.5"
                style={{ 
                  color: currentTheme.textPrimary,
                  fontFamily: currentTheme.font
                }}
              >
                <HeartIcon size="w-4 h-4" />
                Health
              </span>
              <span 
                style={{ 
                  color: currentTheme.textSecondary,
                  fontFamily: currentTheme.font
                }}
              >
                {profile.health}/{profile.maxHealth}
              </span>
            </div>
            <div 
              className="h-4 overflow-hidden"
              style={{
                backgroundColor: currentTheme.bgTertiary,
                borderRadius: currentTheme.radius,
                border: `1px solid ${currentTheme.borderColor}`
              }}
            >
              <div
                className="h-full transition-all duration-500"
                style={{ 
                  background: currentTheme.id === 'cyberpunk' ? 
                    'linear-gradient(90deg, #ff0040, #cc0033)' :
                    currentTheme.id === 'neon' ? 
                    'linear-gradient(90deg, #ff0080, #ff0066)' :
                    'linear-gradient(90deg, #E74C3C, #C0392B)',
                  width: `${(profile.health / profile.maxHealth) * 100}%`,
                  boxShadow: currentTheme.features?.hasGlowEffects ? 
                    `0 0 6px ${currentTheme.id === 'cyberpunk' ? '#ff0040' : 
                     currentTheme.id === 'neon' ? '#ff0080' : '#E74C3C'}60` : 
                    'none'
                }}
              />
            </div>
          </div>

          {/* Experience Bar */}
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span 
                className="flex items-center gap-1.5"
                style={{ 
                  color: currentTheme.textPrimary,
                  fontFamily: currentTheme.font
                }}
              >
                <StarIcon size="w-4 h-4" />
                Experience
              </span>
              <span 
                style={{ 
                  color: currentTheme.textSecondary,
                  fontFamily: currentTheme.font
                }}
              >
                {profile.xp}/{profile.maxXP} XP
              </span>
            </div>
            <div 
              className="h-4 overflow-hidden"
              style={{
                backgroundColor: currentTheme.bgTertiary,
                borderRadius: currentTheme.radius,
                border: `1px solid ${currentTheme.borderColor}`
              }}
            >
              <div
                className="h-full transition-all duration-500"
                style={{ 
                  background: `linear-gradient(to right, ${currentTheme.primaryColor}, ${currentTheme.secondaryColor})`,
                  width: `${(profile.xp / profile.maxXP) * 100}%`,
                  boxShadow: currentTheme.features?.hasGlowEffects ? `0 0 6px ${currentTheme.primaryColor}60` : 'none'
                }}
              />
            </div>
          </div>
          
          {/* Daily Check-in - Dopamine Trigger */}
          <button
            className="w-full px-4 py-3 transition-all duration-200"
            style={{
              background: hasCheckedIn ? 
                `linear-gradient(135deg, ${currentTheme.bgTertiary}, ${currentTheme.bgSecondary})` :
                `linear-gradient(135deg, ${currentTheme.primaryColor}, ${currentTheme.secondaryColor})`,
              borderRadius: currentTheme.radius,
              border: hasCheckedIn ? `1px solid ${currentTheme.borderColor}` : 'none',
              boxShadow: hasCheckedIn ? 
                '0 1px 2px rgba(0,0,0,0.05)' :
                currentTheme.features?.hasGlowEffects ? 
                  `0 0 16px ${currentTheme.primaryColor}40` : 
                  '0 2px 8px rgba(0,0,0,0.15)',
              cursor: hasCheckedIn ? 'default' : 'pointer'
            }}
          >
            <div className="flex items-center justify-center gap-2">
              {hasCheckedIn ? (
                <>
                  <div 
                    className="w-5 h-5 flex items-center justify-center rounded-full"
                    style={{
                      backgroundColor: '#10b981',
                      color: '#ffffff'
                    }}
                  >
                    <CheckIcon className="w-3.5 h-3.5" />
                  </div>
                  <span 
                    className="text-sm font-semibold"
                    style={{ 
                      color: currentTheme.textPrimary,
                      fontFamily: currentTheme.font
                    }}
                  >
                    {isNeonTheme ? 'CHECKED IN TODAY!' : 'Checked in today!'}
                  </span>
                </>
              ) : (
                <span 
                  className="text-sm font-semibold"
                  style={{ 
                    color: '#ffffff',
                    fontFamily: currentTheme.font
                  }}
                >
                  {isNeonTheme ? 'DAILY CHECK-IN' : 'Daily Check-in'}
                </span>
              )}
            </div>
          </button>

          {/* Today's Progress - Like the image */}
          <div 
            className="p-4"
            style={{
              backgroundColor: currentTheme.bgTertiary,
              borderRadius: currentTheme.radius,
              border: `1px solid ${currentTheme.borderColor}`
            }}
          >
            {/* Header */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">📊</span>
              <h4 className="text-sm font-bold" style={{ 
                color: currentTheme.primaryColor,
                fontFamily: currentTheme.font
              }}>
                Today's Progress
              </h4>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-2">
              {/* Tasks */}
              <div 
                className="p-2.5 rounded-lg"
                style={{
                  backgroundColor: currentTheme.bgSecondary,
                  border: `1px solid ${currentTheme.borderColor}`
                }}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <div 
                    className="w-5 h-5 rounded flex items-center justify-center"
                    style={{
                      backgroundColor: '#10b98120'
                    }}
                  >
                    <span className="text-xs">✓</span>
                  </div>
                  <span className="text-xs font-medium" style={{ 
                    color: currentTheme.textSecondary,
                    fontFamily: currentTheme.font
                  }}>
                    Tasks
                  </span>
                </div>
                <div className="text-base font-bold" style={{ 
                  color: currentTheme.textPrimary,
                  fontFamily: currentTheme.font
                }}>
                  {profile.tasksToday}/{profile.totalTasksToday}
                </div>
              </div>

              {/* Coins Earned */}
              <div 
                className="p-2.5 rounded-lg"
                style={{
                  backgroundColor: currentTheme.bgSecondary,
                  border: `1px solid ${currentTheme.borderColor}`
                }}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <div 
                    className="w-5 h-5 rounded flex items-center justify-center"
                    style={{
                      backgroundColor: '#f59e0b20'
                    }}
                  >
                    <CoinIcon size="w-3 h-3" />
                  </div>
                  <span className="text-xs font-medium" style={{ 
                    color: currentTheme.textSecondary,
                    fontFamily: currentTheme.font
                  }}>
                    Earned
                  </span>
                </div>
                <div className="text-base font-bold" style={{ 
                  color: currentTheme.textPrimary,
                  fontFamily: currentTheme.font
                }}>
                  {profile.coinsEarned}
                </div>
              </div>

              {/* XP Gained */}
              <div 
                className="p-2.5 rounded-lg"
                style={{
                  backgroundColor: currentTheme.bgSecondary,
                  border: `1px solid ${currentTheme.borderColor}`
                }}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <div 
                    className="w-5 h-5 rounded flex items-center justify-center"
                    style={{
                      backgroundColor: `${currentTheme.primaryColor}20`
                    }}
                  >
                    <StarIcon size="w-3 h-3" />
                  </div>
                  <span className="text-xs font-medium" style={{ 
                    color: currentTheme.textSecondary,
                    fontFamily: currentTheme.font
                  }}>
                    XP
                  </span>
                </div>
                <div className="text-base font-bold" style={{ 
                  color: currentTheme.textPrimary,
                  fontFamily: currentTheme.font
                }}>
                  +{profile.xpGained}
                </div>
              </div>
            </div>
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
  setHabits,
  setTasks,
  setProjects,
  setEditingItem,
  setSelectedProject
}) => {
  const { theme: currentTheme } = useThemeStyles();
  
  if (!currentTheme) {
    return <div>Loading...</div>;
  }
  
  const { handleDragEnd } = useDrag();

  const isNeonTheme = currentTheme.id && currentTheme.id.includes('neon');

  const [habitTab, setHabitTab] = useState('all');
  const [taskTab, setTaskTab] = useState('all');
  const [projectTab, setProjectTab] = useState('all');

  const handleCompleteTask = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, status: t.status === "Completed" ? "Pending" : "Completed" } : t
      )
    );
  };

  const handleToggleHabit = (id) => {
    setHabits(
      habits.map((h) =>
        h.id === id ? { ...h, completed: !h.completed } : h
      )
    );
  };

  const handleUpdateHabitCount = (id, newCount) => {
    setHabits(
      habits.map((h) =>
        h.id === id ? { ...h, currentCount: newCount } : h
      )
    );
  };

  const handleEditItem = (item, type) => {
    setEditingItem({ item, type });
    setShowAddModal(true);
  };

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
    
    console.log(`${itemType} array before update:`, currentItems);
    
    handleDragEnd(event, currentItems, setItemsFunction);
    
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

  const filteredHabits = habits.filter(habit => 
    searchQuery ? habit.title.toLowerCase().includes(searchQuery.toLowerCase()) : true
  ).sort((a, b) => {
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
      default:
        return true;
    }
  }).sort((a, b) => {
    const aCompleted = a.status === "Completed";
    const bCompleted = b.status === "Completed";
    
    if (aCompleted !== bCompleted) {
      return aCompleted ? 1 : -1;
    }
  
    if (taskTab === 'scheduled' && a.due && b.due) {
      return new Date(a.due) - new Date(b.due);
    }
    
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
      <div className="z-10 px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
          </div>

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

      <div className="flex-1 overflow-hidden pt-4 pb-6 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
          <ProfileSection />

          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
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
            showTabs={false}
            onDragEnd={handleItemDragEnd}
            itemType="habit"
          />

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
    </div>
  );
}

export default MainContent;