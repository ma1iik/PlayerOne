// src/components/Settings.jsx
import React from "react";
import { CogIcon, BellIcon, LockClosedIcon, UserIcon } from "@heroicons/react/outline";

const Settings = () => {
  return (
    <div className="flex flex-1 bg-gray-50 font-sans p-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 w-full max-w-4xl mx-auto">
        {/* Settings Header */}
        <div className="p-4 border-b border-gray-200 flex items-center gap-2">
          <CogIcon className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-800">Settings</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
          {/* Navigation Sidebar */}
          <div className="md:col-span-1 space-y-1">
            <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 flex items-center gap-2">
              <UserIcon className="w-5 h-5 text-gray-600" />
              Account Settings
            </button>
            <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 flex items-center gap-2">
              <CogIcon className="w-5 h-5 text-gray-600" />
              Preferences
            </button>
            <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 flex items-center gap-2">
              <BellIcon className="w-5 h-5 text-gray-600" />
              Notifications
            </button>
            <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 flex items-center gap-2">
              <LockClosedIcon className="w-5 h-5 text-gray-600" />
              Security
            </button>
          </div>

          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            {/* Account Settings */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Account Information</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-gray-600">Username</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg mt-1"
                    value="SarahJ"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg mt-1"
                    value="sarah@example.com"
                  />
                </div>
              </div>
            </div>

            {/* Notification Preferences */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Notification Preferences</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                  <span>Task Reminders</span>
                  <div className="relative inline-block w-10 mr-2 align-middle select-none">
                    <input type="checkbox" className="toggle-checkbox" id="task-reminders" />
                    <label htmlFor="task-reminders" className="toggle-label" />
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                  <span>Weekly Reports</span>
                  <div className="relative inline-block w-10 mr-2 align-middle select-none">
                    <input type="checkbox" className="toggle-checkbox" id="weekly-reports" />
                    <label htmlFor="weekly-reports" className="toggle-label" />
                  </div>
                </div>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="border-t border-red-100 pt-6">
              <h3 className="text-lg font-semibold text-red-600 mb-4">Danger Zone</h3>
              <div className="space-y-3">
                <button className="w-full text-left p-3 rounded-lg border border-red-200 hover:bg-red-50 text-red-600">
                  Delete Account
                </button>
                <button className="w-full text-left p-3 rounded-lg border border-red-200 hover:bg-red-50 text-red-600">
                  Log Out All Devices
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;