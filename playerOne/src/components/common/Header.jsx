import React, { useState, useRef, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import ThemeContext from "../../context/ThemeContext";
import { motion } from "framer-motion";

const Header = () => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { logout } = useAuth();
  const { currentTheme } = useContext(ThemeContext);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  // Fetch profile data
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data = await response.json();
        setProfileData(data.profile);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

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

  // Logout
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  // Get avatar based on theme
  const getAvatar = () => {
    if (!profileData) return null;
    
    if (currentTheme.id === 'sololeveling') {
      return (
        <div className="w-10 h-10 rounded flex items-center justify-center text-xs font-semibold" 
             style={{ 
               background: `linear-gradient(135deg, ${currentTheme.primaryColor}, ${currentTheme.secondaryColor})`,
               borderRadius: '0.125rem'
             }}>
          {profileData.username.substring(0, 2).toUpperCase()}
        </div>
      );
    }
    
    if (currentTheme.id === 'cyberpunk') {
      return (
        <div className="w-10 h-10 flex items-center justify-center border-2" 
             style={{ 
               borderColor: currentTheme.primaryColor,
               borderRadius: 0
             }}>
          <span className="text-xs font-mono text-primaryColor">{profileData.username.substring(0, 2).toUpperCase()}</span>
        </div>
      );
    }
    
    return (
      <img
        src={`https://ui-avatars.com/api/?name=${profileData.username}&background=random&color=fff`}
        alt="Profile"
        className="w-10 h-10 rounded-full"
        style={{ borderRadius: currentTheme.id === 'forest' ? '1rem' : currentTheme.radius }}
      />
    );
  };

  return (
    <header className="glass p-4 h-16 flex justify-between items-center border-b border-borderColor">
      {/* Profile Section */}
      <div className="flex items-center gap-4">
        {loading && (
          <div className="w-10 h-10 rounded-full bg-bgTertiary animate-pulse" 
               style={{ borderRadius: currentTheme.radius }} />
        )}
        {profileData && (
          <div className="flex items-center gap-2">
            {getAvatar()}
            <div>
              <p className="text-sm font-medium text-textPrimary">
                {profileData.username}
              </p>
              <p className="text-xs text-textSecondary">
                {profileData.email}
              </p>
            </div>
          </div>
        )}
        {error && (
          <div className="text-red-500 text-sm">
            Error loading profile
          </div>
        )}
      </div>

      {/* Logo & Navigation */}
      <div className="flex items-center gap-6">
        <div className="flex items-center">
          <motion.div 
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ 
              background: `linear-gradient(135deg, ${currentTheme.primaryColor}, ${currentTheme.secondaryColor})`,
              borderRadius: currentTheme.id === 'cyberpunk' ? 0 : currentTheme.id === 'forest' ? '1rem' : '9999px' 
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <span className="text-white font-bold">P1</span>
          </motion.div>
          <span className="ml-2 text-2xl font-bold text-gradient">
            PlayerOne
          </span>
        </div>
        <nav className="flex gap-4">
          <Link to="/home" className="text-textPrimary hover:text-primaryColor transition-colors">
            Home
          </Link>
          <Link to="/inventory" className="text-textPrimary hover:text-primaryColor transition-colors">
            Inventory
          </Link>
          <Link to="/shop" className="text-textPrimary hover:text-primaryColor transition-colors">
            Shop
          </Link>
        </nav>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-bgSecondary px-3 py-1 rounded" style={{ borderRadius: currentTheme.radius }}>
            <span role="img" aria-label="Gem" title="Gems">
              💎
            </span>
            <span className="text-textPrimary">123</span>
          </div>
          <div className="flex items-center gap-1 bg-bgSecondary px-3 py-1 rounded" style={{ borderRadius: currentTheme.radius }}>
            <span role="img" aria-label="Coin" title="Coins">
              🪙
            </span>
            <span className="text-textPrimary">456</span>
          </div>
        </div>
        <button className="hover:text-primaryColor transition-colors" title="Notifications">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
        </button>
        <div className="relative" ref={profileRef}>
          <button
            className="hover:text-primaryColor transition-colors"
            title="Profile"
            onClick={() => setShowProfileDropdown((prev) => !prev)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5.121 17.804A8.966 8.966 0 0112 15c2.485 0 4.743.99 6.879 2.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </button>
          {showProfileDropdown && (
            <motion.div 
              className="absolute right-0 mt-2 w-48 card shadow-lg z-50"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              style={{ borderRadius: currentTheme.radius }}
            >
              <ul className="py-2">
                <li>
                  <Link to="/profile" className="block px-4 py-2 hover:bg-bgTertiary transition-colors">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link to="/settings" className="block px-4 py-2 hover:bg-bgTertiary transition-colors">
                    Settings
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-bgTertiary transition-colors"
                  >
                    Log Out
                  </button>
                </li>
              </ul>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;