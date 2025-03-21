// src/pages/Home.jsx
import React, { useState, useContext } from "react";
import ProfilePanel from "../components/ProfilePanel";
import MainContent from "../components/MainContent";
import AddItemModal from "../components/AddItemModal";
import ThemeContext from "../context/ThemeContext";

const Home = () => {
  const { currentTheme } = useContext(ThemeContext);
  
  const [isCollapsed, setIsCollapsed] = useState(false); // Keep panel expanded by default
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

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
  { 
    id: 3, 
    title: "Drink water", 
    recurrence: "daily", 
    streak: 3, 
    difficulty: 1,
    countable: true,
    currentCount: 5,
    targetCount: 8
  }
]);

  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Complete API integration",
      recurrence: "weekly",
      difficulty: 3,
      due: "2024-03-20",
      status: "In Progress",
      description: "Finish integrating the payment gateway API"
    },
    {
      id: 2,
      title: "Update documentation",
      recurrence: "monthly",
      difficulty: 2,
      due: "2024-03-18",
      status: "Pending",
      description: "Update the user guide with new features"
    },
  ]);

  const [projects, setProjects] = useState([
    { id: 1, title: "Mobile App Launch", progress: 75, difficulty: 4 },
    { id: 2, title: "Server Migration", progress: 35, difficulty: 3 },
  ]);

  // Handler for adding or updating an item
  const handleAddOrUpdateItem = (type, item, isUpdate) => {
    switch (type) {
      case "habit":
        if (isUpdate) {
          setHabits(habits.map(h => h.id === item.id ? item : h));
        } else {
          setHabits([...habits, item]);
        }
        break;
      case "task":
        if (isUpdate) {
          setTasks(tasks.map(t => t.id === item.id ? item : t));
        } else {
          setTasks([...tasks, item]);
        }
        break;
      case "project":
        if (isUpdate) {
          setProjects(projects.map(p => p.id === item.id ? item : p));
        } else {
          setProjects([...projects, item]);
        }
        break;
      default:
        break;
    }
    setEditingItem(null);
  };

  return (
    <div className="flex h-full w-full overflow-hidden bg-gray-50">
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
        setHabits={setHabits}
        setTasks={setTasks}
        setProjects={setProjects}
        isCollapsed={isCollapsed}
        toggleCollapse={() => setIsCollapsed(!isCollapsed)}
        setEditingItem={setEditingItem}
      />

      {/* Add/Edit Item Modal */}
      <AddItemModal
        showAddModal={showAddModal}
        setShowAddModal={setShowAddModal}
        onAddItem={handleAddOrUpdateItem}
        editingItem={editingItem}
        setEditingItem={setEditingItem}
      />
    </div>
  );
};

export default Home;