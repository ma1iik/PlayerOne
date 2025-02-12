import React from "react";

const TaskItem = ({ task, onComplete }) => {
  return (
    <div className="p-3 hover:bg-gray-50 rounded-lg transition-colors">
      <div className="flex justify-between items-center">
        <span className="text-gray-800">{task.title}</span>
        <span
          className={`text-sm px-2 py-1 rounded ${
            task.difficulty === 1
              ? "bg-green-100 text-green-800"
              : task.difficulty === 2
              ? "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {["Easy", "Medium", "Hard"][task.difficulty - 1]}
        </span>
      </div>
      <div className="mt-2 flex justify-between items-center text-sm">
        <span className="text-gray-600">{task.recurrence}</span>
        <span className="text-gray-500">Due {task.due}</span>
      </div>
      <button
        onClick={() => onComplete(task.id)}
        className="mt-2 text-blue-600 hover:text-blue-500"
      >
        Complete
      </button>
    </div>
  );
};

export default TaskItem;
