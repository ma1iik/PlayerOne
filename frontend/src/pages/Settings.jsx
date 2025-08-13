import React, { useState } from "react";
import { CogIcon, BellIcon, LockClosedIcon, UserIcon, SunIcon } from "@heroicons/react/outline";
import ThemeSettings from "../components/ThemeSettings";
import { useThemeStyles } from "../context/ThemeProvider";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("theme");
  const { theme, styles } = useThemeStyles();

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

  // Helper to get text with proper styling based on theme features
  const getThemedText = (text, isHighlighted = false) => {
    const transformed = styles.shouldTransform(text);
    return theme.features.useUppercaseText && isHighlighted 
      ? `[ ${transformed} ]` 
      : transformed;
  };

  // Helper to get classes for text elements
  const getTextClasses = (baseClasses = '', isHighlighted = false) => {
    let classes = baseClasses;
    if (theme.features.hasGlowEffects && isHighlighted) {
      classes += ' sl-glow-text';
    }
    return classes.trim();
  };

  // Get font family based on theme
  const getThemeFont = () => theme.font;

  return (
    <div className="flex flex-1 bg-bg-primary font-sans p-6">
      <div className="card w-full max-w-4xl mx-auto shadow-lg pixel-shadow">
        {/* Settings Header */}
        <div className="p-4 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-2">
            <CogIcon className="w-6 h-6 text-primary" />
            <h2 className={getTextClasses('text-xl font-semibold', true)}>
              {getThemedText('Settings')}
            </h2>
          </div>
          <div className="h-px bg-gray-200 w-15/16"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
          {/* Navigation Sidebar */}
          <div className="md:col-span-1 space-y-1">
            {Object.entries(tabs).map(([id, tab]) => (
              <button 
                key={id} 
                onClick={() => setActiveTab(id)}
                className={`w-full text-left py-3 px-4 rounded transition-colors ${
                  activeTab === id 
                    ? `bg-gradient-primary text-text-primary ${getTextClasses('', true)}`
                    : `hover:bg-bg-secondary text-text-secondary ${getTextClasses('', false)}`
                }`}
                style={{
                  fontFamily: getThemeFont(),
                  letterSpacing: theme.features.useMonospaceFont ? '0.05em' : 'normal'
                }}
              >
                <div className="flex items-center gap-3">
                  <tab.icon className="w-5 h-5" />
                  {getThemedText(tab.title)}
                </div>
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="md:col-span-2">
            {activeTab === "account" && (
              <div>
                <h3 className={getTextClasses('text-lg font-bold', true)}
                  style={{
                    fontFamily: getThemeFont(),
                    letterSpacing: theme.features.useMonospaceFont ? '0.05em' : 'normal'
                  }}
                >
                  {getThemedText('Account Information')}
                </h3>
                
                <div className="mt-4 space-y-4">
                  <div>
                    <label className={getTextClasses('text-sm block mb-1', theme.features.hasGlowEffects) || 'text-text-secondary'}>
                      {getThemedText('Username')}
                    </label>
                    <input 
                      type="text" 
                      className="input w-full" 
                      defaultValue="PlayerOne"
                      style={{ fontFamily: getThemeFont() }}
                    />
                  </div>
                  <div>
                    <label className={getTextClasses('text-sm block mb-1', theme.features.hasGlowEffects) || 'text-text-secondary'}>
                      {getThemedText('Email')}
                    </label>
                    <input 
                      type="email" 
                      className="input w-full" 
                      defaultValue="player@example.com"
                      style={{ fontFamily: getThemeFont() }}
                    />
                  </div>
                  <div>
                    <label className={getTextClasses('text-sm block mb-1', theme.features.hasGlowEffects) || 'text-text-secondary'}>
                      {getThemedText('Avatar')}
                    </label>
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
                      <button className={`btn ${getTextClasses('', theme.features.hasGlowEffects)}`}>
                        {getThemedText('Upload')}
                      </button>
                    </div>
                  </div>
                  <button className={`btn btn-accent w-full mt-4 ${getTextClasses('', theme.features.hasGlowEffects)}`}>
                    {getThemedText('Save Changes')}
                  </button>
                </div>
              </div>
            )}

            {activeTab === "notifications" && (
              <div>
                <h3 className={getTextClasses('text-lg font-bold', true)}
                  style={{
                    fontFamily: getThemeFont(),
                    letterSpacing: theme.features.useMonospaceFont ? '0.05em' : 'normal'
                  }}
                >
                  {getThemedText('Notification Preferences')}
                </h3>
                
                <div className="mt-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className={getTextClasses('font-medium', true)}>
                      {getThemedText('Task Reminders')}
                    </span>
                    <label className="switch">
                      <input type="checkbox" defaultChecked />
                      <span className="slider round"></span>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={getTextClasses('font-medium', true)}>
                      {getThemedText('Achievement Unlocked')}
                    </span>
                    <label className="switch">
                      <input type="checkbox" defaultChecked />
                      <span className="slider round"></span>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={getTextClasses('font-medium', true)}>
                      {getThemedText('Weekly Summary')}
                    </span>
                    <label className="switch">
                      <input type="checkbox" />
                      <span className="slider round"></span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "security" && (
              <div>
                <h3 className={getTextClasses('text-lg font-bold', true)}
                  style={{
                    fontFamily: getThemeFont(),
                    letterSpacing: theme.features.useMonospaceFont ? '0.05em' : 'normal'
                  }}
                >
                  {getThemedText('Security Settings')}
                </h3>
                
                <div className="mt-4 space-y-4">
                  <div>
                    <label className={getTextClasses('text-sm block mb-1', theme.features.hasGlowEffects) || 'text-text-secondary'}>
                      {getThemedText('Current Password')}
                    </label>
                    <input 
                      type="password" 
                      className="input w-full"
                      style={{ fontFamily: getThemeFont() }}
                    />
                  </div>
                  <div>
                    <label className={getTextClasses('text-sm block mb-1', theme.features.hasGlowEffects) || 'text-text-secondary'}>
                      {getThemedText('New Password')}
                    </label>
                    <input 
                      type="password" 
                      className="input w-full"
                      style={{ fontFamily: getThemeFont() }}
                    />
                  </div>
                  <div>
                    <label className={getTextClasses('text-sm block mb-1', theme.features.hasGlowEffects) || 'text-text-secondary'}>
                      {getThemedText('Confirm New Password')}
                    </label>
                    <input 
                      type="password" 
                      className="input w-full"
                      style={{ fontFamily: getThemeFont() }}
                    />
                  </div>
                  <button className={`btn w-full mt-4 ${getTextClasses('', theme.features.hasGlowEffects)}`}>
                    {getThemedText('Update Password')}
                  </button>
                </div>

                <div className="mt-8">
                  <h3 className={getTextClasses('text-lg font-bold mb-4', true) + ' text-color-accent'}
                    style={{
                      fontFamily: getThemeFont(),
                      letterSpacing: theme.features.useMonospaceFont ? '0.05em' : 'normal'
                    }}
                  >
                    {getThemedText('Danger Zone')}
                  </h3>
                  <div className="space-y-2">
                    <button className="btn btn-destructive w-full">
                      {getThemedText('Delete Account')}
                    </button>
                    <button className="btn btn-destructive w-full">
                      {getThemedText('Log Out All Devices')}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "theme" && <ThemeSettings />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;