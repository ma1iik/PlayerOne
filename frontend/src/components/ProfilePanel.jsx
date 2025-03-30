import React, { useContext } from "react";
import { ChevronLeftIcon, CheckIcon } from "@heroicons/react/outline";
import ThemeContext from "../context/ThemeContext";

const ProfilePanel = ({ profile, isCollapsed, toggleCollapse }) => {
  const { currentTheme } = useContext(ThemeContext);
  
  // Assuming the user is online and has checked in for the day
  const hasCheckedIn = true; 
  // Placeholder data for daily stats
  const dailyStats = {
    tasksCompleted: 6,
    totalTasks: 10,
    coinsEarned: 80,
    experienceGained: 150
  };

  return (
    <div className={`relative h-full transition-all duration-300 ease-in-out ${
      isCollapsed ? "w-0" : "w-104" // Increased width from 72 to 96
    }`}>
      {/* Inner "sliding door" for the panel content */}
      <div
        className={`absolute inset-0 border-r overflow-hidden bg-white shadow-sm
          transition-transform duration-300 ease-in-out
          ${isCollapsed ? "-translate-x-full" : "translate-x-0"}`}
        style={{ 
          borderColor: "rgb(229, 231, 235)" // gray-200
        }}
      >
        <div className="p-6 h-full flex flex-col">
          <div className="flex flex-col items-center">
            {/* Avatar with pixel-style border */}
            <div className="mb-4 relative">
              <img
                src={profile.avatar || "https://via.placeholder.com/150?text=Avatar"}
                alt="Profile"
                className="w-24 h-24 object-cover rounded-sm border-2 border-purple-100 shadow-sm"
              />
              {/* Pixel-styled level badge */}
              <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold px-2 py-1 rounded-sm shadow-sm">
                LVL {profile.level}
              </div>
            </div>
            
            {/* Name and Role */}
            <h2 className="text-xl font-semibold mb-1 text-gray-900">
              {profile.name}
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              {profile.role}
            </p>

            {/* Daily Check-in Button with pixel-style */}
            <div className="w-full mb-6">
              <button 
                className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-sm ${
                  hasCheckedIn 
                    ? 'bg-green-50 text-green-600 border border-green-200' 
                    : 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white'
                } text-sm font-medium transition-shadow`}
                disabled={hasCheckedIn}
              >
                {hasCheckedIn ? (
                  <>
                    <CheckIcon className="w-5 h-5" />
                    Daily Check-in Completed!
                  </>
                ) : (
                  <>Daily Check-in</>
                )}
              </button>
            </div>

            {/* Stats section with pixel-style cards */}
            <div className="w-full space-y-5">
              {/* Today's Progress */}
              <div className="bg-purple-50 rounded-sm p-4">
                <h3 className="text-sm font-semibold text-purple-700 mb-2 flex items-center">
                  <span role="img" aria-label="Today" className="mr-2">📅</span>
                  Today's Progress
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white p-2 rounded-sm shadow-sm flex items-center justify-between">
                    <div className="flex items-center">
                      <span role="img" aria-label="Tasks" className="mr-2">✅</span>
                      <span className="text-xs text-gray-500">Tasks</span>
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {dailyStats.tasksCompleted}/{dailyStats.totalTasks}
                    </span>
                  </div>
                  <div className="bg-white p-2 rounded-sm shadow-sm flex items-center justify-between">
                    <div className="flex items-center">
                      <span role="img" aria-label="Coins" className="mr-2">🪙</span>
                      <span className="text-xs text-gray-500">Earned</span>
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {dailyStats.coinsEarned}
                    </span>
                  </div>
                </div>
              </div>

              {/* Level and XP with pixel-style progress bar */}
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 font-medium flex items-center">
                    <span role="img" aria-label="Level" className="mr-2">⭐</span>
                    Experience
                  </span>
                  <span className="text-gray-500">
                    {profile.xp}/{profile.maxXP} XP
                  </span>
                </div>
                <div className="h-3 bg-gray-100 rounded-sm overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 transition-all duration-500"
                    style={{ width: `${(profile.xp / profile.maxXP) * 100}%` }}
                  />
                </div>
                <div className="mt-1 text-xs text-gray-500 text-right">
                  {profile.maxXP - profile.xp} XP to next level
                </div>
              </div>

              {/* Stats Grid with pixel-style cards */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 bg-amber-50 rounded-sm col-span-1 flex flex-col items-center">
                  <div className="text-2xl mb-1">⚡</div>
                  <p className="text-xs font-medium text-amber-700 mb-1">Energy</p>
                  <p className="text-xl font-semibold text-amber-700">{profile.energy}%</p>
                </div>
                <div className="p-3 bg-red-50 rounded-sm col-span-1 flex flex-col items-center">
                  <div className="text-2xl mb-1">🔥</div>
                  <p className="text-xs font-medium text-red-700 mb-1">Streak</p>
                  <p className="text-xl font-semibold text-red-700">{profile.streak}</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-sm col-span-1 flex flex-col items-center">
                  <div className="text-2xl mb-1">📋</div>
                  <p className="text-xs font-medium text-blue-700 mb-1">Tasks</p>
                  <p className="text-xl font-semibold text-blue-700">{profile.completedTasks}</p>
                </div>
              </div>
              
              {/* Currency display with pixel-style */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 rounded-sm flex items-center justify-between">
                  <div className="flex items-center">
                    <span role="img" aria-label="Coin" className="mr-2">🪙</span>
                    <p className="text-xs text-gray-500">Coins</p>
                  </div>
                  <p className="text-md font-semibold text-gray-700">1,250</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-sm flex items-center justify-between">
                  <div className="flex items-center">
                    <span role="img" aria-label="Gem" className="mr-2">💎</span>
                    <p className="text-xs text-gray-500">Gems</p>
                  </div>
                  <p className="text-md font-semibold text-gray-700">75</p>
                </div>
              </div>
              
              {/* Current Character Class with pixel-style */}
              <div className="p-3 bg-indigo-50 rounded-sm flex items-center justify-between">
                <div className="flex items-center">
                  <span role="img" aria-label="Character" className="text-2xl mr-3">🧙‍♀️</span>
                  <div>
                    <p className="text-xs text-indigo-600">Character Class</p>
                    <p className="text-sm font-semibold text-indigo-700">Master Developer</p>
                  </div>
                </div>
                <span className="text-xs py-1 px-2 bg-indigo-200 text-indigo-800 rounded-sm">
                  +15% XP
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Pixel-styled toggle button */}
        {!isCollapsed && (
          <button
            onClick={toggleCollapse}
            className="absolute top-2 right-2 p-2 rounded-sm border border-gray-200 shadow-sm bg-white hover:bg-gray-50 transition-colors"
          >
            <ChevronLeftIcon className="w-5 h-5 text-gray-500" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfilePanel;