import React, { useState, useRef, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import ThemeContext from "../../context/ThemeContext";
import { BellIcon, UserIcon } from "@heroicons/react/outline";

const Header = () => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const { logout } = useAuth();
  const { currentTheme } = useContext(ThemeContext);


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
    <header className="bg-white border-b border-gray-200">
      <div className="px-8 mx-auto">
        <div className="flex justify-between items-center h-16">
          {/* Left: Navigation Links with better active indicators */}
          <nav className="flex items-center gap-6">
            <Link 
              to="/home" 
              className={`text-base font-medium py-3 border-b-2 transition-colors ${
                isActive('/home') 
                  ? 'border-purple-600 text-purple-700' 
                  : 'border-transparent text-gray-700 hover:text-purple-600'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/inventory" 
              className={`text-base font-medium py-3 border-b-2 transition-colors ${
                isActive('/inventory') 
                  ? 'border-purple-600 text-purple-700' 
                  : 'border-transparent text-gray-700 hover:text-purple-600'
              }`}
            >
              Inventory
            </Link>
            <Link 
              to="/shop" 
              className={`text-base font-medium py-3 border-b-2 transition-colors ${
                isActive('/shop') 
                  ? 'border-purple-600 text-purple-700' 
                  : 'border-transparent text-gray-700 hover:text-purple-600'
              }`}
            >
              Shop
            </Link>
          </nav>
          
          {/* Center: Logo with larger text */}
          <div className="flex items-center flex-shrink-0">
            <div className="h-10 w-10 bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center text-white font-semibold text-lg">
              P1
            </div>
            <span className="ml-3 text-xl font-bold text-gray-900">PlayerOne</span>
          </div>

          {/* Right Side Actions with bigger elements */}
          <div className="flex items-center gap-5">
            {/* Currency display with larger text */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 text-base">
                <span role="img" aria-label="Coin" title="Coins" className="text-base">🪙</span>
                <span className="font-medium text-gray-700">1250</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 text-base">
                <span role="img" aria-label="Gem" title="Gems" className="text-base">💎</span>
                <span className="font-medium text-gray-700">75</span>
              </div>
            </div>
            
            {/* Notifications icon with larger size */}
            <button className="relative p-1.5 text-gray-600 hover:text-purple-600 transition-colors">
              <BellIcon className="w-6 h-6" />
              {notificationCount > 0 && (
                <span className="absolute top-0 right-0 block w-2.5 h-2.5 bg-red-500"></span>
              )}
            </button>
            
            {/* Profile icon dropdown with larger icon */}
            <div className="relative" ref={profileRef}>
              <button
                className="p-1.5 text-gray-600 hover:text-purple-600 transition-colors"
                title="Profile"
                onClick={() => setShowProfileDropdown((prev) => !prev)}
              >
                <UserIcon className="w-6 h-6" />
              </button>
              {showProfileDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg border border-gray-200 py-1 z-50">
                  <ul>
                    <li>
                      <Link 
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" 
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/settings"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" 
                      >
                        Settings
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={logout}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
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