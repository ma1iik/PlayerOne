import React, { useState, useRef, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import ThemeContext from "../../context/ThemeContext";

const Header = () => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const { logout } = useAuth();
  const { currentTheme } = useContext(ThemeContext);
  const profileRef = useRef(null);
  const navigate = useNavigate();

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

  // Logout with dropdown closing
  const handleLogout = async () => {
    setShowProfileDropdown(false);
    try {
      await logout();
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  // Handle navigation with dropdown closing
  const handleNavigation = (path) => {
    setShowProfileDropdown(false);
    navigate(path);
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="h-8 w-8 rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center text-white font-semibold">
                P1
              </div>
              <span className="ml-2 text-lg font-semibold text-gray-900">PlayerOne</span>
            </div>
          </div>
          
          {/* Navigation (Center) */}
          <nav className="flex gap-6">
            <Link 
              to="/home" 
              className="text-gray-700 hover:text-purple-600 transition-colors"
            >
              Home
            </Link>
            <Link 
              to="/inventory" 
              className="text-gray-700 hover:text-purple-600 transition-colors"
            >
              Inventory
            </Link>
            <Link 
              to="/shop" 
              className="text-gray-700 hover:text-purple-600 transition-colors"
            >
              Shop
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* Currency display (Optional) */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-full text-sm">
                <span role="img" aria-label="Coin" title="Coins">🪙</span>
                <span className="font-medium text-gray-700">1250</span>
              </div>
              <div className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-full text-sm">
                <span role="img" aria-label="Gem" title="Gems">💎</span>
                <span className="font-medium text-gray-700">75</span>
              </div>
            </div>
            
            {/* Profile dropdown */}
            <div className="relative" ref={profileRef}>
              <button
                className="transition-colors rounded-full flex items-center"
                title="Profile"
                onClick={() => setShowProfileDropdown((prev) => !prev)}
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-purple-100">
                  <span className="text-sm font-medium leading-none text-purple-700">SJ</span>
                </span>
              </button>
              {showProfileDropdown && (
                <div 
                  className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50"
                >
                  <ul>
                    <li>
                      <button 
                        onClick={() => handleNavigation('/profile')}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" 
                      >
                        Profile
                      </button>
                    </li>
                    <li>
                      <button 
                        onClick={() => handleNavigation('/settings')}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" 
                      >
                        Settings
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
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