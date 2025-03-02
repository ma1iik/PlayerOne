// playerOne/src/pages/Settings.jsx
import React, { useState } from "react";
import { CogIcon, BellIcon, LockClosedIcon, UserIcon, SunIcon } from "@heroicons/react/outline";
import ThemeSettings from "../components/ThemeSettings";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("theme");

  const tabs = {
    account: {
      icon: UserIcon,
      title: "Account Settings"
    },
    theme: {
      icon: SunIcon,
      title: "Theme Settings"
    },
    notifications: {
      icon: BellIcon,
      title: "Notifications"
    },
    security: {
      icon: LockClosedIcon,
      title: "Security"
    }
  };

  return (
    <div className="flex flex-1 bg-bg-primary font-sans p-6">
      <div className="card w-full max-w-4xl mx-auto shadow-lg pixel-shadow">
        {/* Settings Header */}
        <div className="p-4 border-b border-border-themed flex items-center gap-2">
          <CogIcon className="w-6 h-6 text-color-primary" />
          <h2 className="text-xl font-semibold">Settings</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
          {/* Navigation Sidebar */}
          <div className="md:col-span-1 space-y-1">
            {Object.entries(tabs).map(([id, tab]) => (
              <button 
                key={id}
                className={`w-full text-left p-3 rounded-lg transition-colors flex items-center gap-2 ${
                  activeTab === id 
                    ? 'bg-gradient-primary text-text-primary' 
                    : 'hover:bg-bg-secondary text-text-secondary'
                }`}
                onClick={() => setActiveTab(id)}
              >
                <tab.icon className="w-5 h-5" />
                {tab.title}
              </button>
            ))}
          </div>

          {/* Main Content */}
          <div className="md:col-span-2">
            {activeTab === "theme" && <ThemeSettings />}
            
            {activeTab === "account" && (
              <div className="space-y-6">
                <h3 className="text-lg font-bold">Account Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-text-secondary block mb-1">Username</label>
                    <input
                      type="text"
                      className="input"
                      defaultValue="PixelHero99"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-text-secondary block mb-1">Email</label>
                    <input
                      type="email"
                      className="input"
                      defaultValue="player@example.com"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-text-secondary block mb-1">Avatar</label>
                    <div className="flex items-center gap-4">
                      <img 
                        src="https://via.placeholder.com/80" 
                        alt="Avatar" 
                        className="w-20 h-20 rounded-lg pixel-border"
                      />
                      <button className="btn">Upload New</button>
                    </div>
                  </div>
                  <button className="btn btn-accent w-full mt-4">Save Changes</button>
                </div>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="space-y-6">
                <h3 className="text-lg font-bold">Notification Preferences</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 hover:bg-bg-secondary rounded-lg transition-colors">
                    <div className="flex flex-col">
                      <span className="font-medium">Task Reminders</span>
                      <span className="text-sm text-text-secondary">Get notified when tasks are due</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-bg-secondary peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-color-primary"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-3 hover:bg-bg-secondary rounded-lg transition-colors">
                    <div className="flex flex-col">
                      <span className="font-medium">Achievement Unlocked</span>
                      <span className="text-sm text-text-secondary">Get notified when you earn achievements</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-bg-secondary peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-color-primary"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-3 hover:bg-bg-secondary rounded-lg transition-colors">
                    <div className="flex flex-col">
                      <span className="font-medium">Weekly Summary</span>
                      <span className="text-sm text-text-secondary">Receive weekly progress reports</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-bg-secondary peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-color-primary"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "security" && (
              <div className="space-y-6">
                <h3 className="text-lg font-bold">Security Settings</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-text-secondary block mb-1">Current Password</label>
                    <input
                      type="password"
                      className="input"
                      placeholder="••••••••"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-text-secondary block mb-1">New Password</label>
                    <input
                      type="password"
                      className="input"
                      placeholder="••••••••"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-text-secondary block mb-1">Confirm New Password</label>
                    <input
                      type="password"
                      className="input"
                      placeholder="••••••••"
                    />
                  </div>
                  <button className="btn w-full mt-4">Update Password</button>
                </div>

                <div className="border-t border-border-themed pt-6 mt-6">
                  <h3 className="text-lg font-bold text-color-accent mb-4">Danger Zone</h3>
                  <div className="space-y-3">
                    <button className="w-full text-left p-3 rounded-lg border border-red-500 text-red-500 hover:bg-red-500/10 transition-colors">
                      Delete Account
                    </button>
                    <button className="w-full text-left p-3 rounded-lg border border-orange-500 text-orange-500 hover:bg-orange-500/10 transition-colors">
                      Log Out All Devices
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;