import React from "react";

const ProjectItem = ({ project }) => {
  return (
    <div className="p-3 hover:bg-gray-50 rounded-lg transition-colors">
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-800">{project.title}</span>
        <span
          className={`text-sm px-2 py-1 rounded ${
            project.difficulty <= 2
              ? "bg-green-100 text-green-800"
              : project.difficulty === 3
              ? "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          Level {project.difficulty}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex-1 h-2 bg-gray-200 rounded-full">
          <div
            className="h-full bg-blue-600 rounded-full transition-all duration-500"
            style={{ width: `${project.progress}%` }}
          />
        </div>
        <span className="text-sm text-gray-600">{project.progress}%</span>
      </div>
    </div>
  );
};

export default ProjectItem;
