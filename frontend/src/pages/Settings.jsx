import React, { useState } from "react";
import { 
  CogIcon, 
  BellIcon, 
  LockClosedIcon, 
  UserIcon, 
  SunIcon,
  CheckIcon,
  ExclamationIcon,
  EyeIcon,
  EyeOffIcon
} from "@heroicons/react/outline";
import ThemeSettings from "../components/ThemeSettings";
import { useThemeStyles } from "../context/ThemeProvider";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("theme");
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const { theme, styles } = useThemeStyles();

  const tabs = [
    {
      id: "theme",
      icon: SunIcon,
      title: "Appearance"
    },
    {
      id: "account", 
      icon: UserIcon,
      title: "Profile"
    },
    {
      id: "notifications",
      icon: BellIcon,
      title: "Notifications"
    },
    {
      id: "security",
      icon: LockClosedIcon,
      title: "Security"
    }
  ];

  const togglePasswordVisibility = (field) => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const getThemedText = (text) => {
    return styles.shouldTransform(text);
  };


  return (
    <div className="flex flex-col flex-1 font-sans p-6 overflow-y-auto"
         style={{ 
           backgroundColor: theme.bgPrimary,
           backgroundImage: theme.features?.hasGradientBackground ? 
             `linear-gradient(135deg, ${theme.bgPrimary}, ${theme.bgSecondary})` : 'none'
         }}>
      <div className="w-full max-w-7xl mx-auto">
        
        {/* Modern Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{ 
            color: theme.textPrimary,
            fontFamily: theme.font,
            textTransform: theme.features?.useUppercaseText ? 'uppercase' : 'none'
          }}>
            {getThemedText('Settings')}
          </h1>
          <p className="text-base" style={{ color: theme.textSecondary }}>
            Manage your account preferences and customize your experience
          </p>
        </div>

        <div className="flex gap-6">
          
          {/* Modern Sidebar */}
          <div className="w-64 flex-shrink-0">
            <div className="p-4 rounded-lg"
                 style={{
                   backgroundColor: theme.bgSecondary,
                   border: `1px solid ${theme.borderColor}`,
                   borderRadius: theme.radius
                 }}>
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                    activeTab === tab.id ? 'text-white' : 'hover:bg-opacity-10'
                  }`}
                  style={{
                    backgroundColor: activeTab === tab.id ? theme.primaryColor : 'transparent',
                    color: activeTab === tab.id ? '#ffffff' : theme.textPrimary,
                    fontFamily: theme.font,
                    textTransform: theme.features?.useUppercaseText ? 'uppercase' : 'none',
                    marginBottom: '4px'
                  }}
                >
                  <tab.icon className="w-5 h-5" />
                  {getThemedText(tab.title)}
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="p-6 rounded-lg"
                 style={{ 
                   backgroundColor: theme.bgSecondary,
                   borderRadius: theme.radius,
                   border: `1px solid ${theme.borderColor}`
                 }}>
              
              {/* Theme Settings */}
              {activeTab === "theme" && (
                <div>
                  <h2 className="text-2xl font-bold mb-2" style={{ 
                    color: theme.textPrimary,
                    fontFamily: theme.font,
                    textTransform: theme.features?.useUppercaseText ? 'uppercase' : 'none'
                  }}>
                    {getThemedText('Appearance')}
                  </h2>
                  <p className="text-base mb-6" style={{ color: theme.textSecondary }}>
                    Customize your visual experience
                  </p>
                  <ThemeSettings />
                </div>
              )}

              {/* Profile Settings */}
              {activeTab === "account" && (
                <div>
                  <h2 className="text-2xl font-bold mb-2" style={{ 
                    color: theme.textPrimary,
                    fontFamily: theme.font,
                    textTransform: theme.features?.useUppercaseText ? 'uppercase' : 'none'
                  }}>
                    {getThemedText('Profile')}
                  </h2>
                  <p className="text-base mb-6" style={{ color: theme.textSecondary }}>
                    Manage your account information
                  </p>

                  <div className="flex flex-col gap-6">
                    
                    {/* Profile Info */}
                    <div className="p-5 rounded-lg"
                         style={{ 
                           backgroundColor: theme.bgTertiary,
                           borderRadius: theme.radius,
                           border: `1px solid ${theme.borderColor}`
                         }}>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center"
                             style={{ 
                               backgroundColor: theme.primaryColor + '20',
                               border: `2px solid ${theme.primaryColor}`
                             }}>
                          <UserIcon className="w-6 h-6" style={{ color: theme.primaryColor }} />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-1" style={{ 
                            color: theme.textPrimary,
                            fontFamily: theme.font,
                            textTransform: theme.features?.useUppercaseText ? 'uppercase' : 'none'
                          }}>
                            {getThemedText('Sarah Chen')}
                          </h3>
                          <p className="text-sm" style={{ color: theme.textSecondary }}>
                            Level 28 • 4,850 XP
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Form Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ 
                          color: theme.textPrimary,
                          fontFamily: theme.font,
                          textTransform: theme.features?.useUppercaseText ? 'uppercase' : 'none'
                        }}>
                          {getThemedText('Username')}
                        </label>
                        <input 
                          type="text" 
                          defaultValue="PlayerOne"
                          className="w-full px-4 py-3 text-sm rounded-lg border transition-colors focus:outline-none"
                          style={{ 
                            backgroundColor: theme.bgTertiary,
                            borderColor: theme.borderColor,
                            color: theme.textPrimary,
                            fontFamily: theme.font,
                            borderRadius: theme.radius
                          }}
                          onFocus={(e) => e.target.style.borderColor = theme.primaryColor}
                          onBlur={(e) => e.target.style.borderColor = theme.borderColor}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ 
                          color: theme.textPrimary,
                          fontFamily: theme.font,
                          textTransform: theme.features?.useUppercaseText ? 'uppercase' : 'none'
                        }}>
                          {getThemedText('Display Name')}
                        </label>
                        <input 
                          type="text" 
                          defaultValue="Sarah Chen"
                          className="w-full px-4 py-3 text-sm rounded-lg border transition-colors focus:outline-none"
                          style={{ 
                            backgroundColor: theme.bgTertiary,
                            borderColor: theme.borderColor,
                            color: theme.textPrimary,
                            fontFamily: theme.font,
                            borderRadius: theme.radius
                          }}
                          onFocus={(e) => e.target.style.borderColor = theme.primaryColor}
                          onBlur={(e) => e.target.style.borderColor = theme.borderColor}
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-2" style={{ 
                          color: theme.textPrimary,
                          fontFamily: theme.font,
                          textTransform: theme.features?.useUppercaseText ? 'uppercase' : 'none'
                        }}>
                          {getThemedText('Email Address')}
                        </label>
                        <input 
                          type="email" 
                          defaultValue="sarah@example.com"
                          className="w-full px-4 py-3 text-sm rounded-lg border transition-colors focus:outline-none"
                          style={{ 
                            backgroundColor: theme.bgTertiary,
                            borderColor: theme.borderColor,
                            color: theme.textPrimary,
                            fontFamily: theme.font,
                            borderRadius: theme.radius
                          }}
                          onFocus={(e) => e.target.style.borderColor = theme.primaryColor}
                          onBlur={(e) => e.target.style.borderColor = theme.borderColor}
                        />
                      </div>
                    </div>

                    {/* Save Button */}
                    <div className="flex justify-end">
                      <button className="flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-lg transition-all duration-200 hover:opacity-90"
                              style={{ 
                                backgroundColor: theme.primaryColor,
                                color: '#ffffff',
                                fontFamily: theme.font,
                                textTransform: theme.features?.useUppercaseText ? 'uppercase' : 'none',
                                borderRadius: theme.radius
                              }}>
                        <CheckIcon className="w-4 h-4" />
                        {getThemedText('Save Changes')}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Notifications */}
              {activeTab === "notifications" && (
                <div>
                  <h2 className="text-2xl font-bold mb-2" style={{ 
                    color: theme.textPrimary,
                    fontFamily: theme.font,
                    textTransform: theme.features?.useUppercaseText ? 'uppercase' : 'none'
                  }}>
                    {getThemedText('Notifications')}
                  </h2>
                  <p className="text-base mb-6" style={{ color: theme.textSecondary }}>
                    Configure your notification preferences
                  </p>

                  <div className="flex flex-col gap-3">
                    {[
                      { title: "Task Reminders", description: "Get notified about upcoming deadlines", enabled: true },
                      { title: "Achievement Unlocked", description: "Celebrate when you unlock achievements", enabled: true },
                      { title: "Weekly Summary", description: "Receive weekly progress reports", enabled: false },
                      { title: "Habit Streaks", description: "Get reminded about habit streaks", enabled: true },
                      { title: "Level Up", description: "Notifications when you level up", enabled: true }
                    ].map((notification, index) => (
                      <div 
                        key={index}
                        className="flex items-center justify-between p-4 rounded-lg"
                        style={{ 
                          backgroundColor: theme.bgTertiary,
                          borderRadius: theme.radius,
                          border: `1px solid ${theme.borderColor}`
                        }}
                      >
                        <div>
                          <h3 className="text-sm font-medium mb-1" style={{ 
                            color: theme.textPrimary,
                            fontFamily: theme.font,
                            textTransform: theme.features?.useUppercaseText ? 'uppercase' : 'none'
                          }}>
                            {getThemedText(notification.title)}
                          </h3>
                          <p className="text-xs" style={{ color: theme.textSecondary }}>
                            {notification.description}
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            defaultChecked={notification.enabled}
                            className="sr-only"
                          />
                          <div className="w-11 h-6 rounded-full relative transition-colors"
                               style={{ 
                                 backgroundColor: notification.enabled ? theme.primaryColor : theme.borderColor
                               }}>
                            <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all duration-200"
                                 style={{ 
                                   left: notification.enabled ? '1.25rem' : '0.125rem'
                                 }} />
                          </div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Security */}
              {activeTab === "security" && (
                <div>
                  <h2 className="text-2xl font-bold mb-2" style={{ 
                    color: theme.textPrimary,
                    fontFamily: theme.font,
                    textTransform: theme.features?.useUppercaseText ? 'uppercase' : 'none'
                  }}>
                    {getThemedText('Security')}
                  </h2>
                  <p className="text-base mb-6" style={{ color: theme.textSecondary }}>
                    Manage your password and account security
                  </p>

                  <div className="flex flex-col gap-6">
                    
                    {/* Change Password */}
                    <div className="p-5 rounded-lg"
                         style={{ 
                           backgroundColor: theme.bgTertiary,
                           borderRadius: theme.radius,
                           border: `1px solid ${theme.borderColor}`
                         }}>
                      <h3 className="text-lg font-semibold mb-4" style={{ 
                        color: theme.textPrimary,
                        fontFamily: theme.font,
                        textTransform: theme.features?.useUppercaseText ? 'uppercase' : 'none'
                      }}>
                        {getThemedText('Change Password')}
                      </h3>
                      <div className="flex flex-col gap-4">
                        {[
                          { key: 'current', label: 'Current Password', placeholder: 'Enter current password' },
                          { key: 'new', label: 'New Password', placeholder: 'Enter new password' },
                          { key: 'confirm', label: 'Confirm Password', placeholder: 'Confirm new password' }
                        ].map((field) => (
                          <div key={field.key}>
                            <label className="block text-sm font-medium mb-2" style={{ 
                              color: theme.textPrimary,
                              fontFamily: theme.font,
                              textTransform: theme.features?.useUppercaseText ? 'uppercase' : 'none'
                            }}>
                              {getThemedText(field.label)}
                            </label>
                            <div className="relative">
                              <input 
                                type={showPassword[field.key] ? "text" : "password"}
                                placeholder={field.placeholder}
                                className="w-full px-4 py-3 pr-12 text-sm rounded-lg border transition-colors focus:outline-none"
                                style={{ 
                                  backgroundColor: theme.bgSecondary,
                                  borderColor: theme.borderColor,
                                  color: theme.textPrimary,
                                  fontFamily: theme.font,
                                  borderRadius: theme.radius
                                }}
                                onFocus={(e) => e.target.style.borderColor = theme.primaryColor}
                                onBlur={(e) => e.target.style.borderColor = theme.borderColor}
                              />
                              <button
                                type="button"
                                onClick={() => togglePasswordVisibility(field.key)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-opacity-10 rounded"
                                style={{ color: theme.textSecondary }}
                              >
                                {showPassword[field.key] ? (
                                  <EyeOffIcon className="w-5 h-5" />
                                ) : (
                                  <EyeIcon className="w-5 h-5" />
                                )}
                              </button>
                            </div>
                          </div>
                        ))}
                        <button className="px-6 py-3 text-sm font-medium rounded-lg transition-all duration-200 hover:opacity-90 self-start"
                                style={{ 
                                  backgroundColor: theme.primaryColor,
                                  color: '#ffffff',
                                  fontFamily: theme.font,
                                  textTransform: theme.features?.useUppercaseText ? 'uppercase' : 'none',
                                  borderRadius: theme.radius
                                }}>
                          {getThemedText('Update Password')}
                        </button>
                      </div>
                    </div>

                    {/* Danger Zone */}
                    <div className="p-5 rounded-lg border-2 border-dashed"
                         style={{ 
                           backgroundColor: '#fef2f2',
                           borderRadius: theme.radius,
                           borderColor: '#fca5a5'
                         }}>
                      <div className="flex items-start gap-3">
                        <ExclamationIcon className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <h3 className="text-lg font-semibold mb-2 text-red-800" style={{ 
                            textTransform: theme.features?.useUppercaseText ? 'uppercase' : 'none'
                          }}>
                            {getThemedText('Danger Zone')}
                          </h3>
                          <p className="text-sm text-red-700 mb-4">
                            These actions cannot be undone. Please proceed with caution.
                          </p>
                          <div className="flex gap-3 flex-wrap">
                            <button className="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:opacity-90"
                                    style={{ 
                                      backgroundColor: '#dc2626',
                                      color: '#ffffff',
                                      textTransform: theme.features?.useUppercaseText ? 'uppercase' : 'none',
                                      borderRadius: theme.radius
                                    }}>
                              {getThemedText('Log Out All Devices')}
                            </button>
                            <button className="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:opacity-90"
                                    style={{ 
                                      backgroundColor: '#dc2626',
                                      color: '#ffffff',
                                      textTransform: theme.features?.useUppercaseText ? 'uppercase' : 'none',
                                      borderRadius: theme.radius
                                    }}>
                              {getThemedText('Delete Account')}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;