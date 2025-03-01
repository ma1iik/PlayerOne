// src/pages/Home.jsx
import React, { useState } from "react";
import ProfilePanel from "../components/ProfilePanel";
import MainContent from "../components/MainContent";

const Home = () => {
  const [isCollapsed, setIsCollapsed] = useState(true); // start collapsed if desired
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedType, setSelectedType] = useState("task");
  const [searchQuery, setSearchQuery] = useState("");
  const [newItem, setNewItem] = useState({
    title: "",
    recurrence: "daily",
    difficulty: 1,
  });

  // Placeholder profile data
  const [profile] = useState({
    name: "Sarah Johnson",
    role: "Full Stack Developer",
    level: 28,
    xp: 4850,
    maxXP: 5000,
    energy: 88,
    streak: 45,
    avatar: "https://via.placeholder.com/150?text=Avatar",
    completedTasks: 327,
  });

  // Sample data for habits, tasks, and projects
  const [habits, setHabits] = useState([
    { id: 1, title: "Morning jog", recurrence: "daily", streak: 18 },
    { id: 2, title: "Review goals", recurrence: "daily", streak: 45 },
  ]);

  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Complete API integration",
      recurrence: "weekly",
      difficulty: 3,
      due: "2024-03-20",
      status: "In Progress",
    },
    {
      id: 2,
      title: "Update documentation",
      recurrence: "monthly",
      difficulty: 2,
      due: "2024-03-18",
      status: "Pending",
    },
  ]);

  const [projects, setProjects] = useState([
    { id: 1, title: "Mobile App Launch", progress: 75, difficulty: 4 },
    { id: 2, title: "Server Migration", progress: 35, difficulty: 3 },
  ]);

  // Handler for adding a new item
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
        setTasks([...tasks, { ...item, status: "Pending" }]);
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
    <div className="flex h-screen bg-gray-50 font-sans">
      {/* Profile Panel */}
      <ProfilePanel
        profile={profile}
        isCollapsed={isCollapsed}
        toggleCollapse={() => setIsCollapsed(!isCollapsed)}
      />

      {/* Main Content */}
      <MainContent
        setShowAddModal={setShowAddModal}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        habits={habits}
        tasks={tasks}
        projects={projects}
        setTasks={setTasks}
        isCollapsed={isCollapsed}
        toggleCollapse={() => setIsCollapsed(!isCollapsed)}
      />

      {/* Add Item Modal */}
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
