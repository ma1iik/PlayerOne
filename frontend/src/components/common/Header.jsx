import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useThemeStyles } from "../../context/ThemeProvider";
import { BellIcon, UserIcon } from "@heroicons/react/outline";

const Header = () => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [isNotificationHovered, setIsNotificationHovered] = useState(false);
  const [isProfileHovered, setIsProfileHovered] = useState(false);
  const { logout } = useAuth();
  const { theme: currentTheme, styles } = useThemeStyles();

  const profileRef = useRef(null);
  const location = useLocation();
  const [notificationCount, setNotificationCount] = useState(3);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfileDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = (path) => {
    return location.pathname === path;
  };

  const getThemedText = (text) => {
    return styles.shouldTransform(text);
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
          <nav className="flex items-center gap-6">
            <Link
              to="/home"
              className="text-base font-bold py-3 border-b-2 transition-colors"
              style={{
                borderColor: isActive('/home') ? currentTheme.primaryColor : 'transparent',
                color: isActive('/home') ? currentTheme.primaryColor : currentTheme.textPrimary,
                textTransform: currentTheme.features?.useUppercaseText ? 'uppercase' : 'none',
                fontFamily: currentTheme.font
              }}
            >
              {getThemedText('Home')}
            </Link>
            <Link
              to="/inventory"
              className="text-base font-bold py-3 border-b-2 transition-colors"
              style={{
                borderColor: isActive('/inventory') ? currentTheme.primaryColor : 'transparent',
                color: isActive('/inventory') ? currentTheme.primaryColor : currentTheme.textPrimary,
                textTransform: currentTheme.features?.useUppercaseText ? 'uppercase' : 'none',
                fontFamily: currentTheme.font
              }}
            >
              {getThemedText('Inventory')}
            </Link>
            <Link
              to="/shop"
              className="text-base font-bold py-3 border-b-2 transition-colors"
              style={{
                borderColor: isActive('/shop') ? currentTheme.primaryColor : 'transparent',
                color: isActive('/shop') ? currentTheme.primaryColor : currentTheme.textPrimary,
                textTransform: currentTheme.features?.useUppercaseText ? 'uppercase' : 'none',
                fontFamily: currentTheme.font
              }}
            >
              {getThemedText('Shop')}
            </Link>
          </nav>
          
          <div className="flex items-center flex-shrink-0">
            <div 
              className="h-10 w-10 flex items-center justify-center text-white font-semibold text-lg"
              style={{ 
                background: `linear-gradient(to right, ${currentTheme.primaryColor}, ${currentTheme.secondaryColor})`,
                borderRadius: currentTheme.features?.hasSharpCorners ? '0' : '4px'
              }}
            >
              P1
            </div>
            <span 
              className="ml-3 text-xl font-bold"
              style={{ 
                color: currentTheme.textPrimary,
                fontFamily: currentTheme.font,
                textTransform: currentTheme.features?.useUppercaseText ? 'uppercase' : 'none'
              }}
            >
              {getThemedText('PlayerOne')}
            </span>
          </div>

          <div className="flex items-center gap-5">
            <div className="flex items-center gap-3">
              <div 
                className="flex items-center gap-2 px-3 py-1.5 text-base"
                style={{ 
                  backgroundColor: currentTheme.bgTertiary,
                  color: currentTheme.textPrimary,
                  borderRadius: currentTheme.features?.hasSharpCorners ? '0' : '6px',
                  border: `1px solid ${currentTheme.borderColor}`,
                  fontFamily: currentTheme.font
                }}
              >
                <span role="img" aria-label="Coin" title="Coins" className="text-base">🪙</span>
                <span className="font-medium">1250</span>
              </div>
              <div 
                className="flex items-center gap-2 px-3 py-1.5 text-base"
                style={{ 
                  backgroundColor: currentTheme.bgTertiary,
                  color: currentTheme.textPrimary,
                  borderRadius: currentTheme.features?.hasSharpCorners ? '0' : '6px',
                  border: `1px solid ${currentTheme.borderColor}`,
                  fontFamily: currentTheme.font
                }}
              >
                <span role="img" aria-label="Gem" title="Gems" className="text-base">💎</span>
                <span className="font-medium">75</span>
              </div>
            </div>
            
            <button 
              className="relative p-1.5 transition-colors"
              style={{ 
                color: isNotificationHovered ? currentTheme.primaryColor : currentTheme.textSecondary,
                borderRadius: currentTheme.features?.hasSharpCorners ? '0' : '6px'
              }}
              onMouseEnter={() => setIsNotificationHovered(true)}
              onMouseLeave={() => setIsNotificationHovered(false)}
            >
              <BellIcon className="w-6 h-6" />
              {notificationCount > 0 && (
                <span 
                  className="absolute top-0 right-0 block w-2.5 h-2.5"
                  style={{ 
                    backgroundColor: '#ef4444', 
                    borderRadius: currentTheme.features?.hasSharpCorners ? '0' : '50%'
                  }}
                ></span>
              )}
            </button>
            
            <div className="relative" ref={profileRef}>
              <button
                className="p-1.5 transition-colors"
                title="Profile"
                onClick={() => setShowProfileDropdown((prev) => !prev)}
                style={{ 
                  color: isProfileHovered ? currentTheme.primaryColor : currentTheme.textSecondary,
                  borderRadius: currentTheme.features?.hasSharpCorners ? '0' : '6px'
                }}
                onMouseEnter={() => setIsProfileHovered(true)}
                onMouseLeave={() => setIsProfileHovered(false)}
              >
                <UserIcon className="w-6 h-6" />
              </button>
              {showProfileDropdown && (
                <div 
                  className="absolute right-0 mt-2 w-48 shadow-lg border py-1 z-50"
                  style={{ 
                    backgroundColor: currentTheme.bgSecondary,
                    borderColor: currentTheme.borderColor,
                    borderRadius: currentTheme.features?.hasSharpCorners ? '0' : '8px',
                    boxShadow: currentTheme.features?.hasGlowEffects ? `0 0 20px ${currentTheme.primaryColor}30` : '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  <Link
                    to="/settings"
                    className="block px-4 py-2 text-sm transition-colors"
                    style={{ 
                      color: currentTheme.textPrimary,
                      fontFamily: currentTheme.font,
                      textTransform: currentTheme.features?.useUppercaseText ? 'uppercase' : 'none'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = currentTheme.bgTertiary;
                      e.target.style.color = currentTheme.primaryColor;
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'transparent';
                      e.target.style.color = currentTheme.textPrimary;
                    }}
                  >
                    {getThemedText('Settings')}
                  </Link>
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-sm transition-colors"
                    style={{ 
                      color: currentTheme.textPrimary,
                      fontFamily: currentTheme.font,
                      textTransform: currentTheme.features?.useUppercaseText ? 'uppercase' : 'none'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = currentTheme.bgTertiary;
                      e.target.style.color = currentTheme.primaryColor;
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'transparent';
                      e.target.style.color = currentTheme.textPrimary;
                    }}
                  >
                    {getThemedText('Logout')}
                  </button>
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