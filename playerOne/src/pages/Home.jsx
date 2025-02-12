import React, { useState } from "react";
import { PlusIcon, SearchIcon } from "@heroicons/react/outline";
import TaskItem from "../components/TaskItem";
import HabitItem from "../components/HabitItem";
import ProjectItem from "../components/ProjectItem";

const Home = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedType, setSelectedType] = useState("task");
  const [searchQuery, setSearchQuery] = useState("");
  const [newItem, setNewItem] = useState({ title: "", recurrence: "daily", difficulty: 1 });

  // Placeholder for Profile Data
  const [profile] = useState({
    name: "Sarah Johnson",
    role: "Full Stack Developer",
    level: 28,
    xp: 4850,
    maxXP: 5000,
    energy: 88,
    streak: 45,
    avatar: "https://via.placeholder.com/150",
    completedTasks: 327,
  });

  // Placeholder for Sample Data for habits, tasks, and projects
  const [habits, setHabits] = useState([
    { id: 1, title: "Morning jog", recurrence: "daily", streak: 18 },
    { id: 2, title: "Review goals", recurrence: "daily", streak: 45 },
  ]);

  const [tasks, setTasks] = useState([
    { id: 1, title: "Complete API integration", recurrence: "weekly", difficulty: 3, due: "2024-03-20" },
    { id: 2, title: "Update documentation", recurrence: "monthly", difficulty: 2, due: "2024-03-18" },
  ]);

  const [projects, setProjects] = useState([
    { id: 1, title: "Mobile App Launch", progress: 75, difficulty: 4 },
    { id: 2, title: "Server Migration", progress: 35, difficulty: 3 },
  ]);

  const handleAddItem = () => {
    const item = {
      id: Date.now(),
      ...newItem,
      ...(selectedType === "project" && { progress: 0 }),
    };

    switch (selectedType) {
      case "habit":
        setHabits([...habits, item]);
        break;
      case "task":
        setTasks([...tasks, item]);
        break;
      case "project":
        setProjects([...projects, item]);
        break;
      default:
        break;
    }

    setShowAddModal(false);
    setNewItem({ title: "", recurrence: "daily", difficulty: 1 });
  };

  return (
    <div className="flex flex-1 bg-gray-50 font-sans">
      {/* Profile Panel */}
      <div className="w-[25%] bg-white border-r border-gray-200 p-6">
        <div className="flex flex-col items-center">
          <img
            src={profile.avatar}
            className="w-32 h-32 rounded-lg object-cover mb-4 border-2 border-gray-200"
            alt="Profile"
          />
          <h2 className="text-2xl font-semibold text-gray-800 mb-1">{profile.name}</h2>
          <p className="text-gray-600 text-sm mb-6">{profile.role}</p>
          <div className="w-full space-y-6">
            <div>
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Level {profile.level}</span>
                <span>{profile.xp}/{profile.maxXP} XP</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div
                  className="h-full bg-blue-600 rounded-full"
                  style={{ width: `${(profile.xp / profile.maxXP) * 100}%` }}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-xs text-gray-600 mb-1">Energy</p>
                <p className="text-xl font-semibold text-blue-600">{profile.energy}%</p>
              </div>
              <div className="p-3 bg-orange-50 rounded-lg">
                <p className="text-xs text-gray-600 mb-1">Day Streak</p>
                <p className="text-xl font-semibold text-orange-600">{profile.streak}</p>
              </div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-600 mb-1">Completed Tasks</p>
              <p className="text-xl font-semibold text-gray-800">{profile.completedTasks}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        {/* Header (Search & Add Item) */}
        <div className="p-4">
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-4">
            <div className="relative flex-1 max-w-xl">
              <input
                type="text"
                placeholder="Search items..."
                className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <SearchIcon className="w-5 h-5 absolute left-3 top-2.5 text-gray-500" />
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 bg-blue-500/10 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-500/20 transition-colors whitespace-nowrap"
            >
              <PlusIcon className="w-5 h-5" />
              Add Item
            </button>
          </div>
        </div>

        <div className="flex-1 p-6 bg-gray-100">
          <div className="grid grid-cols-3 gap-6 max-w-7xl mx-auto h-full">
            {/* Habits Column */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">Habits</h3>
              </div>
              <div className="p-4 space-y-3">
                {habits.map((habit) => (
                  <HabitItem key={habit.id} habit={habit} />
                ))}
              </div>
            </div>

            {/* Tasks Column */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">Tasks</h3>
              </div>
              <div className="p-4 space-y-3">
                {tasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onComplete={(id) =>
                      setTasks(tasks.map((t) => (t.id === id ? { ...t, status: "Completed" } : t)))
                    }
                  />
                ))}
              </div>
            </div>

            {/* Projects Column */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">Projects</h3>
              </div>
              <div className="p-4 space-y-3">
                {projects.map((project) => (
                  <ProjectItem key={project.id} project={project} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-semibold">New {selectedType}</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div className="flex gap-2">
                {["habit", "task", "project"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`flex-1 capitalize py-2 rounded-md text-sm ${
                      selectedType === type
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
              <input
                type="text"
                placeholder="Title"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={newItem.title}
                onChange={(e) =>
                  setNewItem({ ...newItem, title: e.target.value })
                }
              />
              {(selectedType === "habit" || selectedType === "task") && (
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  value={newItem.recurrence}
                  onChange={(e) =>
                    setNewItem({ ...newItem, recurrence: e.target.value })
                  }
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              )}
              {(selectedType === "task" || selectedType === "project") && (
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  value={newItem.difficulty}
                  onChange={(e) =>
                    setNewItem({
                      ...newItem,
                      difficulty: parseInt(e.target.value),
                    })
                  }
                >
                  <option value="1">Easy</option>
                  <option value="2">Medium</option>
                  <option value="3">Hard</option>
                </select>
              )}
              <button
                onClick={handleAddItem}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create {selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;