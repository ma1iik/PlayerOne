// src/pages/Home.jsx
import React, { useState, useContext } from "react";
import ProfilePanel from "../components/ProfilePanel";
import MainContent from "../components/MainContent";
import ThemeContext from "../context/ThemeContext";

const Home = () => {
  const { currentTheme } = useContext(ThemeContext);
  const isNeonTheme = currentTheme.id.includes('neon');
  const isCyberpunk = currentTheme.id === 'cyberpunk';
  
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
        setHabits([...habits, { ...item, streak: 0 }]);
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
    <div className="flex h-full w-full overflow-hidden" style={{ backgroundColor: currentTheme.bgPrimary }}>
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" style={{ backdropFilter: "blur(4px)" }}>
          <div className={`w-full max-w-md ${isNeonTheme ? 'sl-scan-line' : ''}`}
               style={{ 
                 backgroundColor: currentTheme.bgSecondary,
                 borderRadius: currentTheme.radius,
                 border: isNeonTheme || isCyberpunk ? `1px solid ${currentTheme.borderColor}` : 'none',
                 boxShadow: isNeonTheme || isCyberpunk ? `0 0 20px ${currentTheme.shadowColor}` : currentTheme.shadow
               }}>
            <div className="p-4 flex justify-between items-center" 
                 style={{ 
                   borderBottom: `1px solid ${currentTheme.borderColor}`
                 }}>
              <h3 className={`text-lg font-semibold ${isNeonTheme ? 'sl-glow-text' : ''}`}
                  style={{ 
                    color: currentTheme.textPrimary,
                    fontFamily: isNeonTheme ? "'Orbitron', 'Rajdhani', sans-serif" : 
                                isCyberpunk ? "'Audiowide', 'Rajdhani', sans-serif" : 
                                currentTheme.font
                  }}>
                {isNeonTheme 
                  ? `[ NEW ${selectedType.toUpperCase()} ]` 
                  : `New ${selectedType}`}
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                style={{ color: currentTheme.textSecondary }}
                className="hover:text-opacity-80"
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
                    className={`flex-1 capitalize py-2 rounded-md text-sm ${isNeonTheme ? 'sl-glow-text' : ''}`}
                    style={{ 
                      backgroundColor: selectedType === type 
                        ? currentTheme.primaryColor 
                        : currentTheme.bgTertiary,
                      color: selectedType === type 
                        ? '#ffffff' 
                        : currentTheme.textSecondary,
                      borderRadius: currentTheme.radius,
                      fontFamily: isNeonTheme ? "'Orbitron', 'Rajdhani', sans-serif" : 
                                  isCyberpunk ? "'Audiowide', 'Rajdhani', sans-serif" : 
                                  currentTheme.font,
                      textTransform: isNeonTheme ? 'uppercase' : 'capitalize'
                    }}
                  >
                    {isNeonTheme ? `[ ${type} ]` : type}
                  </button>
                ))}
              </div>
              <input
                type="text"
                placeholder={isNeonTheme ? "[ TITLE ]" : "Title"}
                className={`w-full px-4 py-2 border focus:ring-2 ${isNeonTheme ? 'sl-glow-text' : ''}`}
                style={{ 
                  backgroundColor: currentTheme.inputBg,
                  color: currentTheme.textPrimary,
                  borderColor: currentTheme.inputBorder,
                  borderRadius: currentTheme.radius,
                  fontFamily: isNeonTheme ? "'Orbitron', 'Rajdhani', sans-serif" : 
                              isCyberpunk ? "'Audiowide', 'Rajdhani', sans-serif" : 
                              currentTheme.font,
                  boxShadow: isNeonTheme || isCyberpunk ? `0 0 10px ${currentTheme.shadowColor}` : 'none'
                }}
                value={newItem.title}
                onChange={(e) =>
                  setNewItem({ ...newItem, title: e.target.value })
                }
              />
              {(selectedType === "habit" || selectedType === "task") && (
                <select
                  className={`w-full px-4 py-2 border ${isNeonTheme ? 'sl-glow-text' : ''}`}
                  style={{ 
                    backgroundColor: currentTheme.inputBg,
                    color: currentTheme.textPrimary,
                    borderColor: currentTheme.inputBorder,
                    borderRadius: currentTheme.radius,
                    fontFamily: isNeonTheme ? "'Orbitron', 'Rajdhani', sans-serif" : 
                                isCyberpunk ? "'Audiowide', 'Rajdhani', sans-serif" : 
                                currentTheme.font
                  }}
                  value={newItem.recurrence}
                  onChange={(e) =>
                    setNewItem({ ...newItem, recurrence: e.target.value })
                  }
                >
                  <option value="daily">{isNeonTheme ? "DAILY" : "Daily"}</option>
                  <option value="weekly">{isNeonTheme ? "WEEKLY" : "Weekly"}</option>
                  <option value="monthly">{isNeonTheme ? "MONTHLY" : "Monthly"}</option>
                </select>
              )}
              {(selectedType === "task" || selectedType === "project") && (
                <select
                  className={`w-full px-4 py-2 border ${isNeonTheme ? 'sl-glow-text' : ''}`}
                  style={{ 
                    backgroundColor: currentTheme.inputBg,
                    color: currentTheme.textPrimary,
                    borderColor: currentTheme.inputBorder,
                    borderRadius: currentTheme.radius,
                    fontFamily: isNeonTheme ? "'Orbitron', 'Rajdhani', sans-serif" : 
                                isCyberpunk ? "'Audiowide', 'Rajdhani', sans-serif" : 
                                currentTheme.font
                  }}
                  value={newItem.difficulty}
                  onChange={(e) =>
                    setNewItem({
                      ...newItem,
                      difficulty: parseInt(e.target.value),
                    })
                  }
                >
                  <option value="1">{isNeonTheme ? "EASY" : "Easy"}</option>
                  <option value="2">{isNeonTheme ? "MEDIUM" : "Medium"}</option>
                  <option value="3">{isNeonTheme ? "HARD" : "Hard"}</option>
                </select>
              )}
              <button
                onClick={handleAddItem}
                className={`w-full py-2 rounded-lg transition-colors ${isNeonTheme ? 'sl-glow-text' : ''}`}
                style={{ 
                  backgroundColor: isNeonTheme || isCyberpunk ? 'transparent' : currentTheme.primaryColor,
                  color: isNeonTheme || isCyberpunk ? currentTheme.primaryColor : '#ffffff',
                  borderRadius: currentTheme.radius,
                  border: isNeonTheme || isCyberpunk ? `1px solid ${currentTheme.primaryColor}` : 'none',
                  fontFamily: isNeonTheme ? "'Orbitron', 'Rajdhani', sans-serif" : 
                              isCyberpunk ? "'Audiowide', 'Rajdhani', sans-serif" : 
                              currentTheme.font,
                  boxShadow: isNeonTheme || isCyberpunk ? `0 0 10px ${currentTheme.shadowColor}` : 'none'
                }}
              >
                {isNeonTheme 
                  ? `[ CREATE ${selectedType.toUpperCase()} ]` 
                  : `Create ${selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}`}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;