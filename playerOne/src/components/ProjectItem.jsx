import React, { useContext } from "react";
import { PencilIcon } from "@heroicons/react/outline";
import ThemeContext from "../context/ThemeContext";

// Dynamic Segmented Progress Bar Component
const SegmentedProgressBar = ({ project }) => {
  // If project has subtasks property, use that length, otherwise default to 5
  const totalSegments = project.subtasks?.length || 5;
  
  // Calculate how many segments should be filled based on progress percentage
  // and the total number of segments
  const completedSubtasks = Math.round((project.progress / 100) * totalSegments);
  
  return (
    <div className="flex gap-0.5 w-full h-2 mt-2">
      {Array.from({ length: totalSegments }).map((_, index) => (
        <div 
          key={index}
          className={`flex-1 transition-colors ${
            index < completedSubtasks 
              ? 'bg-purple-500' 
              : 'bg-gray-200'
          }`}
        ></div>
      ))}
    </div>
  );
};

const ProjectItem = ({ project, onEdit }) => {
  const { currentTheme } = useContext(ThemeContext);

  // Get difficulty level styling with new design
  const getDifficultyStyle = () => {
    // Map difficulty to emoji or text
    const difficultyLabel = ["Easy", "Medium", "Hard", "Very Hard", "Epic"][project.difficulty - 1] || "Medium";
    
    return {
      1: { bg: "bg-green-50", text: "text-green-600" },
      2: { bg: "bg-blue-50", text: "text-blue-600" },
      3: { bg: "bg-yellow-50", text: "text-yellow-600" },
      4: { bg: "bg-orange-50", text: "text-orange-600" },
      5: { bg: "bg-red-50", text: "text-red-600" }
    }[project.difficulty] || { bg: "bg-gray-50", text: "text-gray-600" };
  };

  const difficultyStyle = getDifficultyStyle();

  // Get number of completed subtasks and total subtasks
  const totalSubtasks = project.subtasks?.length || 5;
  const completedSubtasks = Math.round((project.progress / 100) * totalSubtasks);

  return (
    <div className="group relative bg-white border border-gray-200 rounded-lg px-4 py-3 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start">
        <div className="ml-1 flex-1">
          <div className="flex items-center">
            <h3 className="text-sm font-medium text-gray-900">{project.title}</h3>
            <div className={`ml-2 px-2 py-0.5 rounded-md text-xs font-medium ${difficultyStyle.bg} ${difficultyStyle.text}`}>
              Level {project.difficulty}
            </div>
          </div>
          <div className="mt-2">
            {/* Dynamic segmented progress bar */}
            <SegmentedProgressBar project={project} />
            <div className="flex justify-between mt-1">
              <span className="text-xs text-gray-500">
                {completedSubtasks}/{totalSubtasks} subtasks
              </span>
              <span className="text-xs font-medium text-purple-600">{project.progress}%</span>
            </div>
          </div>
        </div>
        <div className="absolute right-3 top-3 flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            className="text-gray-400 hover:text-gray-500 p-1"
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
          >
            <PencilIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectItem;