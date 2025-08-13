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

  // Get theme-aware border radius
  const getBorderRadius = () => {
    return theme.features?.hasSharpCorners ? '0' : '12px';
  };

  // Get theme-aware button styles
  const getButtonStyles = (isPrimary = false) => {
    const baseStyles = {
      borderRadius: theme.features?.hasSharpCorners ? '0' : '6px',
      fontFamily: theme.font,
      transition: 'all 0.2s ease',
      border: 'none',
      cursor: 'pointer'
    };

    if (isPrimary) {
      const isCyberpunk = theme.id === 'cyberpunk';
      const isNeonTheme = theme.id && theme.id.includes('neon');
      
      if (isCyberpunk || isNeonTheme) {
        // Use gradient background for cyberpunk and neon themes like the add item button
        return {
          ...baseStyles,
          background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.secondaryColor})`,
          color: '#ffffff',
          boxShadow: theme.features?.hasGlowEffects ? `0 0 12px ${theme.primaryColor}40` : '0 2px 4px rgba(0,0,0,0.1)'
        };
      } else {
        // Standard styling for light theme
        return {
          ...baseStyles,
          backgroundColor: theme.primaryColor,
          color: '#ffffff',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        };
      }
    }

    return baseStyles;
  };

  // Get theme-aware input styles
  const getInputStyles = () => {
    return {
      borderRadius: theme.features?.hasSharpCorners ? '0' : '6px',
      border: `1px solid ${theme.borderColor}`,
      backgroundColor: theme.bgTertiary,
      color: theme.textPrimary,
      fontFamily: theme.font,
      outline: 'none',
      transition: 'border-color 0.2s ease'
    };
  };

  return (
    <div style={{ backgroundColor: theme.bgPrimary, minHeight: '100vh', padding: '24px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Simple Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ 
            fontSize: '28px', 
            fontWeight: '600', 
            color: theme.textPrimary,
            margin: '0 0 8px 0',
            fontFamily: theme.font,
            textTransform: theme.features?.useUppercaseText ? 'uppercase' : 'none'
          }}>
            {getThemedText('Settings')}
          </h1>
          <p style={{ 
            fontSize: '14px', 
            color: theme.textSecondary,
            margin: '0'
          }}>
            Manage your account preferences
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '24px' }}>
          
          {/* Simple Sidebar */}
          <div>
            <div style={{ 
              backgroundColor: theme.bgSecondary,
              borderRadius: getBorderRadius(),
              padding: '8px',
              border: `1px solid ${theme.borderColor}`,
              boxShadow: theme.features?.hasGlowEffects ? `0 0 8px ${theme.primaryColor}20` : '0 2px 4px rgba(0,0,0,0.05)'
            }}>
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 16px',
                    borderRadius: theme.features?.hasSharpCorners ? '0' : '8px',
                    border: 'none',
                    backgroundColor: activeTab === tab.id ? theme.primaryColor : 'transparent',
                    color: activeTab === tab.id ? '#ffffff' : theme.textPrimary,
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    fontFamily: theme.font,
                    textAlign: 'left',
                    textTransform: theme.features?.useUppercaseText ? 'uppercase' : 'none',
                    boxShadow: activeTab === tab.id && theme.features?.hasGlowEffects ? `0 0 8px ${theme.primaryColor}40` : 'none'
                  }}
                >
                  <tab.icon style={{ width: '18px', height: '18px' }} />
                  {getThemedText(tab.title)}
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div>
            <div style={{ 
              backgroundColor: theme.bgSecondary,
              borderRadius: getBorderRadius(),
              padding: '32px',
              border: `1px solid ${theme.borderColor}`,
              boxShadow: theme.features?.hasGlowEffects ? `0 0 8px ${theme.primaryColor}20` : '0 2px 4px rgba(0,0,0,0.05)'
            }}>
              
              {/* Theme Settings */}
              {activeTab === "theme" && (
                <div>
                  <h2 style={{ 
                    fontSize: '20px', 
                    fontWeight: '600', 
                    color: theme.textPrimary,
                    margin: '0 0 8px 0',
                    fontFamily: theme.font,
                    textTransform: theme.features?.useUppercaseText ? 'uppercase' : 'none'
                  }}>
                    {getThemedText('Appearance')}
                  </h2>
                  <p style={{ 
                    fontSize: '14px', 
                    color: theme.textSecondary,
                    margin: '0 0 24px 0'
                  }}>
                    Customize your visual experience
                  </p>
                  <ThemeSettings />
                </div>
              )}

              {/* Profile Settings */}
              {activeTab === "account" && (
                <div>
                  <h2 style={{ 
                    fontSize: '20px', 
                    fontWeight: '600', 
                    color: theme.textPrimary,
                    margin: '0 0 8px 0',
                    fontFamily: theme.font,
                    textTransform: theme.features?.useUppercaseText ? 'uppercase' : 'none'
                  }}>
                    {getThemedText('Profile')}
                  </h2>
                  <p style={{ 
                    fontSize: '14px', 
                    color: theme.textSecondary,
                    margin: '0 0 24px 0'
                  }}>
                    Manage your account information
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    
                    {/* Profile Info */}
                    <div style={{ 
                      backgroundColor: theme.bgTertiary,
                      borderRadius: theme.features?.hasSharpCorners ? '0' : '8px',
                      padding: '20px',
                      border: `1px solid ${theme.borderColor}`
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{ 
                          width: '48px', 
                          height: '48px', 
                          borderRadius: theme.features?.hasSharpCorners ? '0' : '50%', 
                          backgroundColor: theme.primaryColor + '20',
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          border: `2px solid ${theme.primaryColor}`
                        }}>
                          <UserIcon style={{ width: '24px', height: '24px', color: theme.primaryColor }} />
                        </div>
                        <div>
                          <h3 style={{ 
                            fontSize: '16px', 
                            fontWeight: '600', 
                            color: theme.textPrimary,
                            margin: '0 0 4px 0',
                            fontFamily: theme.font,
                            textTransform: theme.features?.useUppercaseText ? 'uppercase' : 'none'
                          }}>
                            {getThemedText('Sarah Chen')}
                          </h3>
                          <p style={{ 
                            fontSize: '13px', 
                            color: theme.textSecondary,
                            margin: '0'
                          }}>
                            Level 28 • 4,850 XP
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Form Fields */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                      <div>
                        <label style={{ 
                          display: 'block', 
                          fontSize: '13px', 
                          fontWeight: '500', 
                          color: theme.textPrimary,
                          marginBottom: '8px',
                          fontFamily: theme.font,
                          textTransform: theme.features?.useUppercaseText ? 'uppercase' : 'none'
                        }}>
                          {getThemedText('Username')}
                        </label>
                        <input 
                          type="text" 
                          defaultValue="PlayerOne"
                          style={{ 
                            width: '100%',
                            padding: '12px',
                            fontSize: '14px',
                            ...getInputStyles()
                          }}
                          onFocus={(e) => e.target.style.borderColor = theme.primaryColor}
                          onBlur={(e) => e.target.style.borderColor = theme.borderColor}
                        />
                      </div>
                      
                      <div>
                        <label style={{ 
                          display: 'block', 
                          fontSize: '13px', 
                          fontWeight: '500', 
                          color: theme.textPrimary,
                          marginBottom: '8px',
                          fontFamily: theme.font,
                          textTransform: theme.features?.useUppercaseText ? 'uppercase' : 'none'
                        }}>
                          {getThemedText('Display Name')}
                        </label>
                        <input 
                          type="text" 
                          defaultValue="Sarah Chen"
                          style={{ 
                            width: '100%',
                            padding: '12px',
                            fontSize: '14px',
                            ...getInputStyles()
                          }}
                          onFocus={(e) => e.target.style.borderColor = theme.primaryColor}
                          onBlur={(e) => e.target.style.borderColor = theme.borderColor}
                        />
                      </div>

                      <div style={{ gridColumn: '1 / -1' }}>
                        <label style={{ 
                          display: 'block', 
                          fontSize: '13px', 
                          fontWeight: '500', 
                          color: theme.textPrimary,
                          marginBottom: '8px',
                          fontFamily: theme.font,
                          textTransform: theme.features?.useUppercaseText ? 'uppercase' : 'none'
                        }}>
                          {getThemedText('Email Address')}
                        </label>
                        <input 
                          type="email" 
                          defaultValue="sarah@example.com"
                          style={{ 
                            width: '100%',
                            padding: '12px',
                            fontSize: '14px',
                            ...getInputStyles()
                          }}
                          onFocus={(e) => e.target.style.borderColor = theme.primaryColor}
                          onBlur={(e) => e.target.style.borderColor = theme.borderColor}
                        />
                      </div>
                    </div>

                    {/* Save Button */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <button style={{ 
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '12px 20px',
                        fontSize: '14px',
                        fontWeight: '500',
                        textTransform: theme.features?.useUppercaseText ? 'uppercase' : 'none',
                        ...getButtonStyles(true)
                      }}>
                        <CheckIcon style={{ width: '16px', height: '16px' }} />
                        {getThemedText('Save Changes')}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Notifications */}
              {activeTab === "notifications" && (
                <div>
                  <h2 style={{ 
                    fontSize: '20px', 
                    fontWeight: '600', 
                    color: theme.textPrimary,
                    margin: '0 0 8px 0',
                    fontFamily: theme.font,
                    textTransform: theme.features?.useUppercaseText ? 'uppercase' : 'none'
                  }}>
                    {getThemedText('Notifications')}
                  </h2>
                  <p style={{ 
                    fontSize: '14px', 
                    color: theme.textSecondary,
                    margin: '0 0 24px 0'
                  }}>
                    Configure your notification preferences
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {[
                      { title: "Task Reminders", description: "Get notified about upcoming deadlines", enabled: true },
                      { title: "Achievement Unlocked", description: "Celebrate when you unlock achievements", enabled: true },
                      { title: "Weekly Summary", description: "Receive weekly progress reports", enabled: false },
                      { title: "Habit Streaks", description: "Get reminded about habit streaks", enabled: true },
                      { title: "Level Up", description: "Notifications when you level up", enabled: true }
                    ].map((notification, index) => (
                      <div 
                        key={index}
                        style={{ 
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '16px',
                          borderRadius: theme.features?.hasSharpCorners ? '0' : '8px',
                          backgroundColor: theme.bgTertiary,
                          border: `1px solid ${theme.borderColor}`
                        }}
                      >
                        <div>
                          <h3 style={{ 
                            fontSize: '14px', 
                            fontWeight: '500', 
                            color: theme.textPrimary,
                            margin: '0 0 4px 0',
                            fontFamily: theme.font,
                            textTransform: theme.features?.useUppercaseText ? 'uppercase' : 'none'
                          }}>
                            {getThemedText(notification.title)}
                          </h3>
                          <p style={{ 
                            fontSize: '13px', 
                            color: theme.textSecondary,
                            margin: '0'
                          }}>
                            {notification.description}
                          </p>
                        </div>
                        <label style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}>
                          <input 
                            type="checkbox" 
                            defaultChecked={notification.enabled}
                            style={{ display: 'none' }}
                          />
                          <div style={{ 
                            width: '44px',
                            height: '24px',
                            backgroundColor: notification.enabled ? theme.primaryColor : theme.borderColor,
                            borderRadius: theme.features?.hasSharpCorners ? '0' : '12px',
                            position: 'relative',
                            transition: 'background-color 0.2s ease'
                          }}>
                            <div style={{ 
                              width: '20px',
                              height: '20px',
                              backgroundColor: '#ffffff',
                              borderRadius: theme.features?.hasSharpCorners ? '0' : '50%',
                              position: 'absolute',
                              top: '2px',
                              left: notification.enabled ? '22px' : '2px',
                              transition: 'left 0.2s ease'
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
                  <h2 style={{ 
                    fontSize: '20px', 
                    fontWeight: '600', 
                    color: theme.textPrimary,
                    margin: '0 0 8px 0',
                    fontFamily: theme.font,
                    textTransform: theme.features?.useUppercaseText ? 'uppercase' : 'none'
                  }}>
                    {getThemedText('Security')}
                  </h2>
                  <p style={{ 
                    fontSize: '14px', 
                    color: theme.textSecondary,
                    margin: '0 0 24px 0'
                  }}>
                    Manage your password and account security
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    
                    {/* Change Password */}
                    <div style={{ 
                      backgroundColor: theme.bgTertiary,
                      borderRadius: theme.features?.hasSharpCorners ? '0' : '8px',
                      padding: '20px',
                      border: `1px solid ${theme.borderColor}`
                    }}>
                      <h3 style={{ 
                        fontSize: '16px', 
                        fontWeight: '600', 
                        color: theme.textPrimary,
                        margin: '0 0 16px 0',
                        fontFamily: theme.font,
                        textTransform: theme.features?.useUppercaseText ? 'uppercase' : 'none'
                      }}>
                        {getThemedText('Change Password')}
                      </h3>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {[
                          { key: 'current', label: 'Current Password', placeholder: 'Enter current password' },
                          { key: 'new', label: 'New Password', placeholder: 'Enter new password' },
                          { key: 'confirm', label: 'Confirm Password', placeholder: 'Confirm new password' }
                        ].map((field) => (
                          <div key={field.key}>
                            <label style={{ 
                              display: 'block', 
                              fontSize: '13px', 
                              fontWeight: '500', 
                              color: theme.textPrimary,
                              marginBottom: '8px',
                              fontFamily: theme.font,
                              textTransform: theme.features?.useUppercaseText ? 'uppercase' : 'none'
                            }}>
                              {getThemedText(field.label)}
                            </label>
                            <div style={{ position: 'relative' }}>
                              <input 
                                type={showPassword[field.key] ? "text" : "password"}
                                placeholder={field.placeholder}
                                style={{ 
                                  width: '100%',
                                  padding: '12px 40px 12px 12px',
                                  fontSize: '14px',
                                  ...getInputStyles()
                                }}
                                onFocus={(e) => e.target.style.borderColor = theme.primaryColor}
                                onBlur={(e) => e.target.style.borderColor = theme.borderColor}
                              />
                              <button
                                type="button"
                                onClick={() => togglePasswordVisibility(field.key)}
                                style={{ 
                                  position: 'absolute',
                                  right: '12px',
                                  top: '50%',
                                  transform: 'translateY(-50%)',
                                  border: 'none',
                                  background: 'none',
                                  cursor: 'pointer',
                                  padding: '0'
                                }}
                              >
                                {showPassword[field.key] ? (
                                  <EyeOffIcon style={{ width: '18px', height: '18px', color: theme.textSecondary }} />
                                ) : (
                                  <EyeIcon style={{ width: '18px', height: '18px', color: theme.textSecondary }} />
                                )}
                              </button>
                            </div>
                          </div>
                        ))}
                        <button style={{ 
                          padding: '12px 20px',
                          fontSize: '14px',
                          fontWeight: '500',
                          alignSelf: 'flex-start',
                          textTransform: theme.features?.useUppercaseText ? 'uppercase' : 'none',
                          ...getButtonStyles(true)
                        }}>
                          {getThemedText('Update Password')}
                        </button>
                      </div>
                    </div>

                    {/* Danger Zone */}
                    <div style={{ 
                      backgroundColor: '#fef2f2',
                      borderRadius: theme.features?.hasSharpCorners ? '0' : '8px',
                      padding: '20px',
                      border: '2px dashed #fca5a5'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                        <ExclamationIcon style={{ width: '20px', height: '20px', color: '#ef4444', flexShrink: 0, marginTop: '2px' }} />
                        <div>
                          <h3 style={{ 
                            fontSize: '16px', 
                            fontWeight: '600', 
                            color: '#991b1b',
                            margin: '0 0 8px 0',
                            textTransform: theme.features?.useUppercaseText ? 'uppercase' : 'none'
                          }}>
                            {getThemedText('Danger Zone')}
                          </h3>
                          <p style={{ 
                            fontSize: '13px', 
                            color: '#b91c1c',
                            margin: '0 0 16px 0'
                          }}>
                            These actions cannot be undone. Please proceed with caution.
                          </p>
                          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                            <button style={{ 
                              padding: '10px 16px',
                              borderRadius: theme.features?.hasSharpCorners ? '0' : '6px',
                              border: 'none',
                              backgroundColor: '#dc2626',
                              color: '#ffffff',
                              fontSize: '13px',
                              fontWeight: '500',
                              cursor: 'pointer',
                              textTransform: theme.features?.useUppercaseText ? 'uppercase' : 'none'
                            }}>
                              {getThemedText('Log Out All Devices')}
                            </button>
                            <button style={{ 
                              padding: '10px 16px',
                              borderRadius: theme.features?.hasSharpCorners ? '0' : '6px',
                              border: 'none',
                              backgroundColor: '#dc2626',
                              color: '#ffffff',
                              fontSize: '13px',
                              fontWeight: '500',
                              cursor: 'pointer',
                              textTransform: theme.features?.useUppercaseText ? 'uppercase' : 'none'
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