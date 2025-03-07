import React, { useContext } from "react";
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
  isCollapsed,
  toggleCollapse,
}) => {
  const { currentTheme } = useContext(ThemeContext);
  const isNeonTheme = currentTheme.id.includes('neon');
  const isCyberpunk = currentTheme.id === 'cyberpunk';

  // Get theme-specific styling for section titles
  const getSectionTitleStyle = () => {
    if (isNeonTheme) {
      return "text-lg font-semibold sl-glow-text selected";
    } else if (isCyberpunk) {
      return "text-lg font-semibold";
    } else {
      return "text-lg font-semibold text-gray-800";
    }
  };

  // Get theme-specific column styling 
  const getColumnStyle = () => {
    if (isNeonTheme) {
      return {
        background: "rgba(19, 19, 32, 0.8)",
        border: `1px solid ${currentTheme.borderColor}`,
        boxShadow: currentTheme.shadow,
        borderRadius: currentTheme.radius,
        backdropFilter: "blur(5px)",
        WebkitBackdropFilter: "blur(5px)"
      };
    } else if (isCyberpunk) {
      return {
        background: "rgba(15, 23, 42, 0.7)",
        border: `1px solid ${currentTheme.borderColor}`,
        boxShadow: `0 0 15px ${currentTheme.shadowColor}`,
        borderRadius: currentTheme.radius,
        backdropFilter: "blur(3px)",
        WebkitBackdropFilter: "blur(3px)"
      };
    } else {
      return {
        backgroundColor: currentTheme.bgSecondary,
        border: `${currentTheme.borderWidth} solid ${currentTheme.borderColor}`,
        boxShadow: currentTheme.shadow,
        borderRadius: currentTheme.radius
      };
    }
  };

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden">
      {/* Header with fixed horizontal padding that matches grid */}
      <div className="px-24 py-4" 
           style={{ 
             backgroundColor: currentTheme.bgSecondary, 
             borderBottom: `1px solid ${currentTheme.borderColor}`,
             boxShadow: isNeonTheme || isCyberpunk ? `0 0 15px ${currentTheme.shadowColor}` : 'none'
           }}>
        <div className="flex items-center justify-between">
          {/* Left: Toggle Button (visible only when panel is collapsed) */}
          <div className="flex items-center">
            {isCollapsed && (
              <button
                onClick={toggleCollapse}
                className="mr-4 border p-2 shadow-lg transition-colors"
                style={{ 
                  backgroundColor: currentTheme.bgSecondary, 
                  borderColor: currentTheme.borderColor,
                  borderRadius: isNeonTheme || isCyberpunk ? '0' : '9999px',
                  boxShadow: isNeonTheme || isCyberpunk ? `0 0 10px ${currentTheme.shadowColor}` : 'none'
                }}
              >
                <ChevronRightIcon className="w-5 h-5" style={{ color: currentTheme.textSecondary }} />
              </button>
            )}
          </div>
          {/* Center: Fixed-width Search Bar */}
          <div className="flex justify-center flex-1">
            <div className="relative w-[600px]">
              <input
                type="text"
                placeholder={isNeonTheme ? "[ SEARCH ITEMS ]" : isCyberpunk ? "SEARCH ITEMS..." : "Search items..."}
                className={`pl-10 pr-4 py-2 w-full border focus:outline-none focus:ring-2 ${isNeonTheme ? 'sl-glow-text' : ''}`}
                style={{ 
                  backgroundColor: currentTheme.inputBg,
                  color: currentTheme.textPrimary,
                  borderColor: currentTheme.inputBorder,
                  borderRadius: currentTheme.radius,
                  fontFamily: isNeonTheme ? "'Orbitron', 'Rajdhani', sans-serif" : 
                              isCyberpunk ? "'Audiowide', 'Rajdhani', sans-serif" : 
                              currentTheme.font,
                  boxShadow: isNeonTheme || isCyberpunk ? `0 0 10px ${currentTheme.shadowColor}` : 'none',
                  letterSpacing: isNeonTheme || isCyberpunk ? '0.05em' : 'normal'
                }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <SearchIcon className="w-5 h-5 absolute left-3 top-2.5" style={{ color: currentTheme.textSecondary }} />
            </div>
          </div>
          {/* Right: Add Item Button */}
          <div className="flex items-center">
            <button
              onClick={() => setShowAddModal(true)}
              className={`ml-4 flex items-center gap-2 px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${isNeonTheme ? 'sl-glow-text' : ''}`}
              style={{ 
                backgroundColor: isNeonTheme || isCyberpunk ? 'transparent' : `${currentTheme.primaryColor}10`, 
                color: currentTheme.primaryColor,
                borderRadius: currentTheme.radius,
                border: isNeonTheme || isCyberpunk ? `1px solid ${currentTheme.primaryColor}` : 'none',
                fontFamily: isNeonTheme ? "'Orbitron', 'Rajdhani', sans-serif" : 
                            isCyberpunk ? "'Audiowide', 'Rajdhani', sans-serif" : 
                            currentTheme.font,
                boxShadow: isNeonTheme || isCyberpunk ? `0 0 10px ${currentTheme.shadowColor}` : 'none'
              }}
            >
              <PlusIcon className="w-5 h-5" />
              {isNeonTheme ? "[ ADD ITEM ]" : isCyberpunk ? "ADD ITEM" : "Add Item"}
            </button>
          </div>
        </div>
      </div>

      {/* Content Area with matching horizontal padding */}
      <div className="flex-1 py-6 overflow-y-auto" 
           style={{ 
             backgroundColor: currentTheme.bgPrimary,
             backgroundImage: isNeonTheme ? 
               `linear-gradient(to bottom, rgba(10, 10, 16, 0.95), rgba(10, 10, 16, 0.98)),
                repeating-linear-gradient(45deg, rgba(30, 30, 41, 0.2) 0px, rgba(30, 30, 41, 0.2) 1px, transparent 1px, transparent 10px),
                repeating-linear-gradient(-45deg, rgba(30, 30, 41, 0.2) 0px, rgba(30, 30, 41, 0.2) 1px, transparent 1px, transparent 10px)` : 
               isCyberpunk ?
               `linear-gradient(to bottom, rgba(2, 6, 23, 0.98), rgba(2, 6, 23, 0.95)),
                repeating-linear-gradient(90deg, rgba(244, 63, 94, 0.05) 0px, rgba(244, 63, 94, 0.05) 1px, transparent 1px, transparent 10px),
                repeating-linear-gradient(0deg, rgba(14, 165, 233, 0.05) 0px, rgba(14, 165, 233, 0.05) 1px, transparent 1px, transparent 10px)` : 
               'none'
           }}>
        <div className="grid grid-cols-3 gap-12 w-full h-full items-stretch px-24">
          {/* Habits Column */}
          <div className="flex flex-col h-full p-4" style={getColumnStyle()}>
            <div className="pb-2" style={{ borderBottom: `1px solid ${currentTheme.borderColor}` }}>
              <h3 className={getSectionTitleStyle()}>
                {isNeonTheme ? "[ HABITS ]" : isCyberpunk ? "HABITS" : "Habits"}
              </h3>
            </div>
            <div className="pt-2 space-y-3 flex-1 overflow-auto">
              {habits.map((habit) => (
                <HabitItem key={habit.id} habit={habit} />
              ))}
            </div>
          </div>

          {/* Tasks Column */}
          <div className="flex flex-col h-full p-4" style={getColumnStyle()}>
            <div className="pb-2" style={{ borderBottom: `1px solid ${currentTheme.borderColor}` }}>
              <h3 className={getSectionTitleStyle()}>
                {isNeonTheme ? "[ TASKS ]" : isCyberpunk ? "TASKS" : "Tasks"}
              </h3>
            </div>
            <div className="pt-2 space-y-3 flex-1 overflow-auto">
              {tasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onComplete={(id) =>
                    setTasks(
                      tasks.map((t) =>
                        t.id === id ? { ...t, status: "Completed" } : t
                      )
                    )
                  }
                />
              ))}
            </div>
          </div>

          {/* Projects Column */}
          <div className="flex flex-col h-full p-4" style={getColumnStyle()}>
            <div className="pb-2" style={{ borderBottom: `1px solid ${currentTheme.borderColor}` }}>
              <h3 className={getSectionTitleStyle()}>
                {isNeonTheme ? "[ PROJECTS ]" : isCyberpunk ? "PROJECTS" : "Projects"}
              </h3>
            </div>
            <div className="pt-2 space-y-3 flex-1 overflow-auto">
              {projects.map((project) => (
                <ProjectItem key={project.id} project={project} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;