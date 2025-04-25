// src/pages/Home.jsx
import React, { useState, useContext } from "react";
import ProfilePanel from "../components/layout/ProfilePanel";
import MainContent from "../components/MainContent";
import AddItemModal from "../components/modals/AddItemModal";
import ThemeContext from "../context/ThemeContext";
import ProjectDetail from "../components/projects/ProjectDetail";

const Home = () => {
  const { currentTheme } = useContext(ThemeContext);


  
  const [isCollapsed, setIsCollapsed] = useState(false); // Keep panel expanded by default
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);



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
      due: "2025-04-05",
      status: "In Progress",
      description: "Finish integrating the payment gateway API"
    },
    {
      id: 2,
      title: "Update documentation",
      recurrence: "monthly",
      difficulty: 2,
      due: "2025-04-01",
      status: "Pending",
      description: "Update the user guide with new features"
    },
  ]);

  // Updated projects state in Home.jsx
  const [projects, setProjects] = useState([
    {
      id: 1, 
      title: "Mobile App Launch", 
      progress: 75, 
      difficulty: 4,
      description: "Complete the final testing and launch the mobile app to the app stores",
      due: "2025-04-20",
      subtasks: [
        { id: 101, title: "Complete UI testing", completed: true },
        { id: 102, title: "Fix reported bugs", completed: true },
        { id: 103, title: "Prepare store assets", completed: true },
        { id: 104, title: "Submit to App Store", completed: false },
        { id: 105, title: "Submit to Google Play", completed: false }
      ]
    },
    { 
      id: 2, 
      title: "Server Migration", 
      progress: 35, 
      difficulty: 3,
      description: "Migrate all services from on-premise to cloud infrastructure",
      due: "2025-03-31",
      subtasks: [
        { id: 201, title: "Inventory current services", completed: true },
        { id: 202, title: "Set up cloud environment", completed: true },
        { id: 203, title: "Migrate database", completed: false },
        { id: 204, title: "Migrate web services", completed: false },
        { id: 205, title: "Update DNS records", completed: false }
      ]
    },
    { 
      id: 3, 
      title: "User Analytics Dashboard", 
      progress: 50, 
      difficulty: 2,
      description: "Develop a dashboard that visualizes user engagement metrics",
      due: "2025-04-02",
      subtasks: [
        { id: 301, title: "Design dashboard layout", completed: true },
        { id: 302, title: "Implement data fetching", completed: true },
        { id: 303, title: "Create visualization components", completed: false },
        { id: 304, title: "Add filtering options", completed: false }
      ]
    },
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

  // Toggle subtask completion
const handleToggleSubtask = (projectId, subtaskId) => {
  setProjects(projects.map(project => {
    if (project.id === projectId) {
      const updatedSubtasks = project.subtasks.map(subtask => 
        subtask.id === subtaskId 
          ? { ...subtask, completed: !subtask.completed } 
          : subtask
      );
      
      // Calculate new progress based on completed subtasks
      const completedCount = updatedSubtasks.filter(st => st.completed).length;
      const progress = Math.round((completedCount / updatedSubtasks.length) * 100);
      
      const updatedProject = { 
        ...project, 
        subtasks: updatedSubtasks,
        progress // Update progress based on subtasks
      };
      
      // If this is the currently selected project, update that too
      if (selectedProject && selectedProject.id === projectId) {
        setSelectedProject(updatedProject);
      }
      
      return updatedProject;
    }
    return project;
  }));
};

// Add a new subtask to a project
const handleAddSubtask = (projectId, newSubtask) => {
  setProjects(projects.map(project => {
    if (project.id === projectId) {
      const updatedSubtasks = [...(project.subtasks || []), newSubtask];
      
      // Calculate new progress based on completed subtasks
      const completedCount = updatedSubtasks.filter(st => st.completed).length;
      const progress = Math.round((completedCount / updatedSubtasks.length) * 100);
      
      const updatedProject = { 
        ...project, 
        subtasks: updatedSubtasks,
        progress // Update progress based on subtasks
      };
      
      // If this is the currently selected project, update that too
      if (selectedProject && selectedProject.id === projectId) {
        setSelectedProject(updatedProject);
      }
      
      return updatedProject;
    }
    return project;
  }));
};

// Edit an existing subtask
const handleEditSubtask = (projectId, subtaskId, changes) => {
  setProjects(projects.map(project => {
    if (project.id === projectId) {
      const updatedSubtasks = project.subtasks.map(subtask => 
        subtask.id === subtaskId 
          ? { ...subtask, ...changes } 
          : subtask
      );
      
      const updatedProject = { ...project, subtasks: updatedSubtasks };
      
      // If this is the currently selected project, update that too
      if (selectedProject && selectedProject.id === projectId) {
        setSelectedProject(updatedProject);
      }
      
      return updatedProject;
    }
    return project;
  }));
};

// Delete a subtask
const handleDeleteSubtask = (projectId, subtaskId) => {
  setProjects(projects.map(project => {
    if (project.id === projectId) {
      const updatedSubtasks = project.subtasks.filter(subtask => subtask.id !== subtaskId);
      
      // Calculate new progress based on completed subtasks
      const completedCount = updatedSubtasks.filter(st => st.completed).length;
      const progress = updatedSubtasks.length > 0
        ? Math.round((completedCount / updatedSubtasks.length) * 100)
        : 0;
      
      const updatedProject = { 
        ...project, 
        subtasks: updatedSubtasks,
        progress // Update progress based on subtasks
      };
      
      // If this is the currently selected project, update that too
      if (selectedProject && selectedProject.id === projectId) {
        setSelectedProject(updatedProject);
      }
      
      return updatedProject;
    }
    return project;
  }));
};

// Update the entire project
const handleUpdateProject = (updatedProject) => {
  setProjects(projects.map(project => 
    project.id === updatedProject.id ? updatedProject : project
  ));
  
  // If this is the currently selected project, update that too
  if (selectedProject && selectedProject.id === updatedProject.id) {
    setSelectedProject(updatedProject);
  }
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
        setSelectedProject={setSelectedProject}
      />

      {/* Add/Edit Item Modal */}
      <AddItemModal
        showAddModal={showAddModal}
        setShowAddModal={setShowAddModal}
        onAddItem={handleAddOrUpdateItem}
        editingItem={editingItem}
        setEditingItem={setEditingItem}
      />

      {selectedProject && (
        <ProjectDetail
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onToggleSubtask={handleToggleSubtask}
          onAddSubtask={handleAddSubtask}
          onEditSubtask={handleEditSubtask}
          onDeleteSubtask={handleDeleteSubtask}
          onUpdateProject={handleUpdateProject}
        />
      )}
    </div>
  );
};

export default Home;