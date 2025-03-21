import React, { useState, useContext } from "react";
import { CogIcon, BellIcon, LockClosedIcon, UserIcon, SunIcon } from "@heroicons/react/outline";
import ThemeSettings from "../components/ThemeSettings";
import ThemeContext from "../context/ThemeContext";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("theme");
  const { currentTheme } = useContext(ThemeContext);
  
  const isNeonTheme = currentTheme.id.includes('neon');
  const isCyberpunk = currentTheme.id === 'cyberpunk';

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
        <div className="p-4 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-2">
            <CogIcon className="w-6 h-6 text-primary" />
            <h2 className={`text-xl font-semibold ${isNeonTheme ? 'sl-glow-text' : ''}`}>Settings</h2>
          </div>
          <div className="h-px bg-gray-200 w-15/16"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
          {/* Navigation Sidebar */}
          <div className="md:col-span-1 space-y-1">
            {Object.entries(tabs).map(([id, tab]) => (
              <button 
                key={id}
                className={`w-full text-left p-3 rounded-lg transition-colors flex items-center gap-2 ${
                  activeTab === id 
                    ? `bg-gradient-primary text-text-primary ${isNeonTheme ? 'sl-glow-text' : ''}`
                    : `hover:bg-bg-secondary text-text-secondary ${isNeonTheme ? 'sl-glow-text' : ''}`
                }`}
                style={{ 
                  fontFamily: isNeonTheme ? "'Orbitron', 'Rajdhani', sans-serif" : 
                            isCyberpunk ? "'Audiowide', 'Rajdhani', sans-serif" : 
                            currentTheme.font,
                  letterSpacing: isNeonTheme || isCyberpunk ? '0.05em' : 'normal'
                }}
                onClick={() => setActiveTab(id)}
              >
                <tab.icon className="w-5 h-5" />
                {isNeonTheme ? `[ ${tab.title.toUpperCase()} ]` : tab.title}
              </button>
            ))}
          </div>

          {/* Main Content */}
          <div className="md:col-span-2">
            {activeTab === "theme" && <ThemeSettings />}
            
            {activeTab === "account" && (
              <div className="space-y-6">
                <h3 className={`text-lg font-bold ${isNeonTheme ? 'sl-glow-text' : ''}`}
                    style={{ 
                      fontFamily: isNeonTheme ? "'Orbitron', 'Rajdhani', sans-serif" : 
                                isCyberpunk ? "'Audiowide', 'Rajdhani', sans-serif" : 
                                currentTheme.font
                    }}>
                  {isNeonTheme ? '[ ACCOUNT INFORMATION ]' : 'Account Information'}
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className={`text-sm block mb-1 ${isNeonTheme ? 'sl-glow-text' : 'text-text-secondary'}`}>Username</label>
                    <input
                      type="text"
                      className="input"
                      defaultValue="PixelHero99"
                    />
                  </div>
                  <div>
                    <label className={`text-sm block mb-1 ${isNeonTheme ? 'sl-glow-text' : 'text-text-secondary'}`}>Email</label>
                    <input
                      type="email"
                      className="input"
                      defaultValue="player@example.com"
                    />
                  </div>
                  <div>
                    <label className={`text-sm block mb-1 ${isNeonTheme ? 'sl-glow-text' : 'text-text-secondary'}`}>Avatar</label>
                    <div className="flex items-center gap-4">
                      <img 
                        src="https://via.placeholder.com/80" 
                        alt="Avatar" 
                        className="w-20 h-20 rounded-lg pixel-border"
                        style={{ borderRadius: currentTheme.radius }}
                      />
                      <button className={`btn ${isNeonTheme ? 'sl-glow-text' : ''}`}>
                        {isNeonTheme ? '[ UPLOAD ]' : 'Upload New'}
                      </button>
                    </div>
                  </div>
                  <button className={`btn btn-accent w-full mt-4 ${isNeonTheme ? 'sl-glow-text' : ''}`}>
                    {isNeonTheme ? '[ SAVE CHANGES ]' : 'Save Changes'}
                  </button>
                </div>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="space-y-6">
                <h3 className={`text-lg font-bold ${isNeonTheme ? 'sl-glow-text' : ''}`}
                    style={{ 
                      fontFamily: isNeonTheme ? "'Orbitron', 'Rajdhani', sans-serif" : 
                                isCyberpunk ? "'Audiowide', 'Rajdhani', sans-serif" : 
                                currentTheme.font
                    }}>
                  {isNeonTheme ? '[ NOTIFICATION PREFERENCES ]' : 'Notification Preferences'}
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 hover:bg-bg-secondary rounded-lg transition-colors">
                    <div className="flex flex-col">
                      <span className={`font-medium ${isNeonTheme ? 'sl-glow-text' : ''}`}>
                        {isNeonTheme ? '[ TASK REMINDERS ]' : 'Task Reminders'}
                      </span>
                      <span className="text-sm text-text-secondary">Get notified when tasks are due</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-bg-secondary peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-color-primary"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-3 hover:bg-bg-secondary rounded-lg transition-colors">
                    <div className="flex flex-col">
                      <span className={`font-medium ${isNeonTheme ? 'sl-glow-text' : ''}`}>
                        {isNeonTheme ? '[ ACHIEVEMENT UNLOCKED ]' : 'Achievement Unlocked'}
                      </span>
                      <span className="text-sm text-text-secondary">Get notified when you earn achievements</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-bg-secondary peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-color-primary"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-3 hover:bg-bg-secondary rounded-lg transition-colors">
                    <div className="flex flex-col">
                      <span className={`font-medium ${isNeonTheme ? 'sl-glow-text' : ''}`}>
                        {isNeonTheme ? '[ WEEKLY SUMMARY ]' : 'Weekly Summary'}
                      </span>
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
                <h3 className={`text-lg font-bold ${isNeonTheme ? 'sl-glow-text' : ''}`}
                    style={{ 
                      fontFamily: isNeonTheme ? "'Orbitron', 'Rajdhani', sans-serif" : 
                                isCyberpunk ? "'Audiowide', 'Rajdhani', sans-serif" : 
                                currentTheme.font
                    }}>
                  {isNeonTheme ? '[ SECURITY SETTINGS ]' : 'Security Settings'}
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className={`text-sm block mb-1 ${isNeonTheme ? 'sl-glow-text' : 'text-text-secondary'}`}>Current Password</label>
                    <input
                      type="password"
                      className="input"
                      placeholder="••••••••"
                    />
                  </div>
                  <div>
                    <label className={`text-sm block mb-1 ${isNeonTheme ? 'sl-glow-text' : 'text-text-secondary'}`}>New Password</label>
                    <input
                      type="password"
                      className="input"
                      placeholder="••••••••"
                    />
                  </div>
                  <div>
                    <label className={`text-sm block mb-1 ${isNeonTheme ? 'sl-glow-text' : 'text-text-secondary'}`}>Confirm New Password</label>
                    <input
                      type="password"
                      className="input"
                      placeholder="••••••••"
                    />
                  </div>
                  <button className={`btn w-full mt-4 ${isNeonTheme ? 'sl-glow-text' : ''}`}>
                    {isNeonTheme ? '[ UPDATE PASSWORD ]' : 'Update Password'}
                  </button>
                </div>

                <div className="border-t border-border-themed pt-6 mt-6">
                  <h3 className={`text-lg font-bold mb-4 ${isNeonTheme ? 'sl-glow-text text-color-accent' : 'text-color-accent'}`}
                      style={{ 
                        fontFamily: isNeonTheme ? "'Orbitron', 'Rajdhani', sans-serif" : 
                                  isCyberpunk ? "'Audiowide', 'Rajdhani', sans-serif" : 
                                  currentTheme.font
                      }}>
                    {isNeonTheme ? '[ DANGER ZONE ]' : 'Danger Zone'}
                  </h3>
                  <div className="space-y-3">
                    <button className="w-full text-left p-3 rounded-lg border border-red-500 text-red-500 hover:bg-red-500/10 transition-colors"
                            style={{ borderRadius: currentTheme.radius }}>
                      {isNeonTheme ? '[ DELETE ACCOUNT ]' : 'Delete Account'}
                    </button>
                    <button className="w-full text-left p-3 rounded-lg border border-orange-500 text-orange-500 hover:bg-orange-500/10 transition-colors"
                            style={{ borderRadius: currentTheme.radius }}>
                      {isNeonTheme ? '[ LOG OUT ALL DEVICES ]' : 'Log Out All Devices'}
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