// src/components/ProfilePanel.jsx
import React from "react";
import { ChevronLeftIcon } from "@heroicons/react/outline";

const ProfilePanel = ({ profile, isCollapsed, toggleCollapse }) => {
  return (
    // Outer container toggles between w-0 and w-96
    <div
      className={`relative h-full transition-all duration-300 ease-in-out ${
        isCollapsed ? "w-0" : "w-112"
      }`}
    >
      {/* Inner "sliding door" for the panel content */}
      <div
        className={`absolute inset-0 bg-white border-r border-gray-200 overflow-hidden
          transition-transform duration-300 ease-in-out
          ${isCollapsed ? "-translate-x-full" : "translate-x-0"}`}
      >
        <div className="p-6 h-full flex flex-col">
          <div className="flex flex-col items-center">
            <img
              src={profile.avatar || "https://via.placeholder.com/150?text=Avatar"}
              alt="Profile"
              className="w-32 h-32 rounded-lg object-cover mb-4 border-2 border-gray-200"
            />
            <h2 className="text-2xl font-semibold text-gray-800 mb-1">
              {profile.name}
            </h2>
            <p className="text-gray-600 text-sm mb-6">{profile.role}</p>

            {/* Example stats */}
            <div className="w-full space-y-6">
              <div>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Level {profile.level}</span>
                  <span>
                    {profile.xp}/{profile.maxXP} XP
                  </span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-full bg-blue-600 rounded-full"
                    style={{
                      width: `${(profile.xp / profile.maxXP) * 100}%`,
                    }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">Energy</p>
                  <p className="text-xl font-semibold text-blue-600">
                    {profile.energy}%
                  </p>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">Day Streak</p>
                  <p className="text-xl font-semibold text-orange-600">
                    {profile.streak}
                  </p>
                </div>
              </div>

              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-600 mb-1">Completed Tasks</p>
                <p className="text-xl font-semibold text-gray-800">
                  {profile.completedTasks}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Toggle Button in the top-right corner - only visible when expanded */}
        {!isCollapsed && (
          <button
            onClick={toggleCollapse}
            className="absolute top-2 right-2 bg-white border border-gray-200
              rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors"
          >
            <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfilePanel;
