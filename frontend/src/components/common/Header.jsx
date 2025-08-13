import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useThemeStyles } from "../../context/ThemeProvider";
import { BellIcon, UserIcon } from "@heroicons/react/outline";

const Header = () => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const { logout } = useAuth();
  const { theme: currentTheme } = useThemeStyles();

  const profileRef = useRef(null);
  const location = useLocation();
  const [notificationCount, setNotificationCount] = useState(3); // Example notification count

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfileDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Check if a nav link is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header 
      className="border-b"
      style={{ 
        backgroundColor: currentTheme.bgSecondary,
        borderColor: currentTheme.borderColor
      }}
    >
      <div className="px-8 mx-auto">
        <div className="flex justify-between items-center h-16">
          {/* Left: Navigation Links with better active indicators */}
          <nav className="flex items-center gap-6">
            <Link 
              to="/home" 
              className={`text-base font-medium py-3 border-b-2 transition-colors ${
                isActive('/home') 
                  ? 'text-purple-700' 
                  : 'hover:text-purple-600'
              }`}
              style={{
                borderColor: isActive('/home') ? currentTheme.primaryColor : 'transparent',
                color: isActive('/home') ? currentTheme.primaryColor : currentTheme.textPrimary
              }}
            >
              Home
            </Link>
            <Link 
              to="/inventory" 
              className={`text-base font-medium py-3 border-b-2 transition-colors ${
                isActive('/inventory') 
                  ? 'text-purple-700' 
                  : 'hover:text-purple-600'
              }`}
              style={{
                borderColor: isActive('/inventory') ? currentTheme.primaryColor : 'transparent',
                color: isActive('/inventory') ? currentTheme.primaryColor : currentTheme.textPrimary
              }}
            >
              Inventory
            </Link>
            <Link 
              to="/shop" 
              className={`text-base font-medium py-3 border-b-2 transition-colors ${
                isActive('/shop') 
                  ? 'text-purple-700' 
                  : 'hover:text-purple-600'
              }`}
              style={{
                borderColor: isActive('/shop') ? currentTheme.primaryColor : 'transparent',
                color: isActive('/shop') ? currentTheme.primaryColor : currentTheme.textPrimary
              }}
            >
              Shop
            </Link>
          </nav>
          
          {/* Center: Logo with larger text */}
          <div className="flex items-center flex-shrink-0">
            <div 
              className="h-10 w-10 flex items-center justify-center text-white font-semibold text-lg"
              style={{ 
                background: `linear-gradient(to right, ${currentTheme.primaryColor}, ${currentTheme.secondaryColor})` 
              }}
            >
              P1
            </div>
            <span 
              className="ml-3 text-xl font-bold"
              style={{ color: currentTheme.textPrimary }}
            >
              PlayerOne
            </span>
          </div>

          {/* Right Side Actions with bigger elements */}
          <div className="flex items-center gap-5">
            {/* Currency display with larger text */}
            <div className="flex items-center gap-3">
              <div 
                className="flex items-center gap-2 px-3 py-1.5 text-base"
                style={{ 
                  backgroundColor: currentTheme.bgTertiary,
                  color: currentTheme.textPrimary
                }}
              >
                <span role="img" aria-label="Coin" title="Coins" className="text-base">🪙</span>
                <span className="font-medium">1250</span>
              </div>
              <div 
                className="flex items-center gap-2 px-3 py-1.5 text-base"
                style={{ 
                  backgroundColor: currentTheme.bgTertiary,
                  color: currentTheme.textPrimary
                }}
              >
                <span role="img" aria-label="Gem" title="Gems" className="text-base">💎</span>
                <span className="font-medium">75</span>
              </div>
            </div>
            
            {/* Notifications icon with larger size */}
            <button 
              className="relative p-1.5 transition-colors"
              style={{ 
                color: currentTheme.textSecondary,
              }}
              onMouseEnter={(e) => e.target.style.color = currentTheme.primaryColor}
              onMouseLeave={(e) => e.target.style.color = currentTheme.textSecondary}
            >
              <BellIcon className="w-6 h-6" />
              {notificationCount > 0 && (
                <span 
                  className="absolute top-0 right-0 block w-2.5 h-2.5"
                  style={{ backgroundColor: '#ef4444', borderRadius: '50%' }}
                ></span>
              )}
            </button>
            
            {/* Profile icon dropdown with larger icon */}
            <div className="relative" ref={profileRef}>
              <button
                className="p-1.5 transition-colors"
                title="Profile"
                onClick={() => setShowProfileDropdown((prev) => !prev)}
                style={{ 
                  color: currentTheme.textSecondary,
                }}
                onMouseEnter={(e) => e.target.style.color = currentTheme.primaryColor}
                onMouseLeave={(e) => e.target.style.color = currentTheme.textSecondary}
              >
                <UserIcon className="w-6 h-6" />
              </button>
              {showProfileDropdown && (
                <div 
                  className="absolute right-0 mt-2 w-48 shadow-lg border py-1 z-50"
                  style={{ 
                    backgroundColor: currentTheme.bgSecondary,
                    borderColor: currentTheme.borderColor
                  }}
                >
                  <ul>
                    <li>
                      <Link 
                        to="/profile"
                        className="block px-4 py-2 text-sm hover:bg-opacity-50" 
                        style={{ 
                          color: currentTheme.textPrimary,
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = currentTheme.bgTertiary}
                        onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/settings"
                        className="block px-4 py-2 text-sm hover:bg-opacity-50" 
                        style={{ 
                          color: currentTheme.textPrimary,
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = currentTheme.bgTertiary}
                        onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                      >
                        Settings
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={logout}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-opacity-50"
                        style={{ 
                          color: currentTheme.textPrimary,
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = currentTheme.bgTertiary}
                        onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                      >
                        Log Out
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;