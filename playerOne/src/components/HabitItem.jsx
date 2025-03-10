import React, { useContext } from "react";
import { PencilIcon } from "@heroicons/react/outline";
import ThemeContext from "../context/ThemeContext";

const HabitItem = ({ habit, onEdit }) => {
  const { currentTheme } = useContext(ThemeContext);
  
  return (
    <div className="group relative bg-white border border-gray-200 rounded-lg px-4 py-3 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start">
        <div className="flex items-center h-5 mt-0.5">
          <div className="flex-shrink-0 w-5 h-5 rounded-md border-2 border-gray-300 hover:border-purple-500 cursor-pointer transition-colors"></div>
        </div>
        <div className="ml-3 flex-1">
          <div className="flex items-center">
            <h3 className="text-sm font-medium text-gray-900">{habit.title}</h3>
            <div className="ml-2 flex items-center text-xs text-amber-500 bg-amber-50 rounded-md px-1.5 py-0.5 font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
              </svg>
              <span>{habit.streak}</span>
            </div>
          </div>
          <div className="flex items-center mt-1">
            <span className="text-xs font-medium bg-purple-50 text-purple-500 rounded-md px-1.5 py-0.5">{habit.recurrence}</span>
            <span className="text-xs text-gray-500 ml-2">0/1</span>
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

export default HabitItem;