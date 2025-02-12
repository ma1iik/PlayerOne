import React from "react";

const HabitItem = ({ habit }) => {
  return (
    <div className="p-3 hover:bg-gray-50 rounded-lg transition-colors">
      <div className="flex justify-between items-center">
        <span className="text-gray-800">{habit.title}</span>
        <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
          {habit.recurrence}
        </span>
      </div>
      <div className="mt-2 text-sm text-blue-600">
        🔥 {habit.streak} days
      </div>
    </div>
  );
};

export default HabitItem;
