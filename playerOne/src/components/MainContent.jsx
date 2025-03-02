import React from "react";
import { PlusIcon, SearchIcon, ChevronRightIcon } from "@heroicons/react/outline";
import HabitItem from "./HabitItem";
import TaskItem from "./TaskItem";
import ProjectItem from "./ProjectItem";

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
  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden">
      {/* Header with fixed horizontal padding that matches grid */}
      <div className="px-24 py-4 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between">
          {/* Left: Toggle Button (visible only when panel is collapsed) */}
          <div className="flex items-center">
            {isCollapsed && (
              <button
                onClick={toggleCollapse}
                className="mr-4 bg-white border border-gray-200 rounded-full p-2 shadow-lg transition-colors"
              >
                <ChevronRightIcon className="w-5 h-5 text-gray-600" />
              </button>
            )}
          </div>
          {/* Center: Fixed-width Search Bar */}
          <div className="flex justify-center flex-1">
            <div className="relative w-[600px]">
              <input
                type="text"
                placeholder="Search items..."
                className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <SearchIcon className="w-5 h-5 absolute left-3 top-2.5 text-gray-500" />
            </div>
          </div>
          {/* Right: Add Item Button */}
          <div className="flex items-center">
            <button
              onClick={() => setShowAddModal(true)}
              className="ml-4 flex items-center gap-2 bg-blue-500/10 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-500/20 transition-colors whitespace-nowrap"
            >
              <PlusIcon className="w-5 h-5" />
              Add Item
            </button>
          </div>
        </div>
      </div>

      {/* Content Area with matching horizontal padding */}
      <div className="flex-1 py-6 bg-gray-100 overflow-y-auto">
        <div className="grid grid-cols-3 gap-12 w-full h-full items-stretch px-24">
          {/* Habits Column */}
          <div className="bg-white flex flex-col h-full rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="pb-2 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">Habits</h3>
            </div>
            <div className="pt-2 space-y-3 flex-1 overflow-auto">
              {habits.map((habit) => (
                <HabitItem key={habit.id} habit={habit} />
              ))}
            </div>
          </div>

          {/* Tasks Column */}
          <div className="bg-white flex flex-col h-full rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="pb-2 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">Tasks</h3>
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
          <div className="bg-white flex flex-col h-full rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="pb-2 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">Projects</h3>
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
