import React, { useState, useRef, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import ThemeContext from "../../context/ThemeContext";
import { motion } from "framer-motion";

const Header = () => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const { logout } = useAuth();
  const { currentTheme } = useContext(ThemeContext);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  const isNeonTheme = currentTheme.id.includes('neon');
  const isCyberpunk = currentTheme.id === 'cyberpunk';

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
    <header 
      className="glass h-16 flex justify-between items-center px-4 relative z-50"
      style={{ 
        borderBottom: `1px solid ${currentTheme.borderColor}`,
        backgroundColor: isNeonTheme 
          ? 'rgba(10, 10, 16, 0.75)' 
          : isCyberpunk 
            ? 'rgba(15, 23, 42, 0.75)' 
            : currentTheme.bgSecondary,
        backdropFilter: 'blur(8px)',
        boxShadow: isNeonTheme || isCyberpunk ? `0 0 10px ${currentTheme.shadowColor}` : 'none'
      }}
    >
      {/* Navigation (Left) */}
      <nav className="flex gap-6">
        <Link 
          to="/home" 
          className="transition-colors"
          style={{ color: currentTheme.textPrimary }}
          onMouseOver={(e) => e.currentTarget.style.color = currentTheme.primaryColor}
          onMouseOut={(e) => e.currentTarget.style.color = currentTheme.textPrimary}
        >
          {isNeonTheme ? 'HOME' : isCyberpunk ? 'HOME' : 'Home'}
        </Link>
        <Link 
          to="/inventory" 
          className="transition-colors"
          style={{ color: currentTheme.textPrimary }}
          onMouseOver={(e) => e.currentTarget.style.color = currentTheme.primaryColor}
          onMouseOut={(e) => e.currentTarget.style.color = currentTheme.textPrimary}
        >
          {isNeonTheme ? 'INVENTORY' : isCyberpunk ? 'INVENTORY' : 'Inventory'}
        </Link>
        <Link 
          to="/shop" 
          className="transition-colors"
          style={{ color: currentTheme.textPrimary }}
          onMouseOver={(e) => e.currentTarget.style.color = currentTheme.primaryColor}
          onMouseOut={(e) => e.currentTarget.style.color = currentTheme.textPrimary}
        >
          {isNeonTheme ? 'SHOP' : isCyberpunk ? 'SHOP' : 'Shop'}
        </Link>
      </nav>

      {/* Logo (Center) */}
      <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center">
        <motion.div 
          className="w-10 h-10 flex items-center justify-center"
          style={{ 
            background: `linear-gradient(135deg, ${currentTheme.primaryColor}, ${currentTheme.secondaryColor})`,
            borderRadius: currentTheme.id === 'cyberpunk' ? 0 : currentTheme.id === 'forest' ? '1rem' : '9999px',
            boxShadow: isNeonTheme || isCyberpunk ? `0 0 10px ${currentTheme.primaryColor}80` : 'none'
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <span className="text-white font-bold">P1</span>
        </motion.div>
        {isNeonTheme ? (
          // For neon themes, use text with glow effect instead of gradient
          <span 
            className="ml-2 text-2xl font-bold sl-glow-text"
            style={{ 
              color: currentTheme.textPrimary,
              fontFamily: "'Orbitron', 'Rajdhani', sans-serif"
            }}
          >
            PLAYERONE
          </span>
        ) : (
          // For other themes, use gradient text
          <span 
            className="ml-2 text-2xl font-bold"
            style={{ 
              color: currentTheme.textPrimary,
              fontFamily: isCyberpunk ? "'Audiowide', 'Rajdhani', sans-serif" : currentTheme.font
            }}
          >
            <span className="text-gradient">PlayerOne</span>
          </span>
        )}
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 px-3 py-1 rounded" 
               style={{ 
                 backgroundColor: isNeonTheme || isCyberpunk ? 'transparent' : currentTheme.bgTertiary,
                 border: isNeonTheme || isCyberpunk ? `1px solid ${currentTheme.borderColor}` : 'none',
                 borderRadius: currentTheme.radius 
               }}>
            <span role="img" aria-label="Gem" title="Gems">
              💎
            </span>
            <span style={{ color: currentTheme.textPrimary }}>123</span>
          </div>
          <div className="flex items-center gap-1 px-3 py-1 rounded" 
               style={{ 
                 backgroundColor: isNeonTheme || isCyberpunk ? 'transparent' : currentTheme.bgTertiary,
                 border: isNeonTheme || isCyberpunk ? `1px solid ${currentTheme.borderColor}` : 'none',
                 borderRadius: currentTheme.radius 
               }}>
            <span role="img" aria-label="Coin" title="Coins">
              🪙
            </span>
            <span style={{ color: currentTheme.textPrimary }}>456</span>
          </div>
        </div>
        
        {/* Profile dropdown with improved z-index */}
        <div className="relative" ref={profileRef}>
          <button
            className="transition-colors p-2 rounded-full"
            title="Profile"
            onClick={() => setShowProfileDropdown((prev) => !prev)}
            style={{ 
              color: currentTheme.textSecondary,
              backgroundColor: isNeonTheme || isCyberpunk ? 'transparent' : 'transparent'
            }}
            onMouseOver={(e) => e.currentTarget.style.color = currentTheme.primaryColor}
            onMouseOut={(e) => e.currentTarget.style.color = currentTheme.textSecondary}
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
              className="absolute right-0 mt-2 w-48 shadow-lg"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              style={{ 
                backgroundColor: isNeonTheme 
                  ? 'rgba(10, 10, 16, 0.95)'
                  : isCyberpunk 
                    ? 'rgba(15, 23, 42, 0.95)'
                    : currentTheme.bgSecondary,
                borderRadius: currentTheme.radius,
                border: `1px solid ${isNeonTheme || isCyberpunk 
                  ? currentTheme.primaryColor
                  : currentTheme.borderColor}`,
                boxShadow: isNeonTheme || isCyberpunk 
                  ? `0 0 15px ${currentTheme.primaryColor}40`
                  : currentTheme.shadow,
                zIndex: 9999 // Ensure it's above other elements
              }}
            >
              <ul className="py-2">
                <li>
                  <button 
                        onClick={() => handleNavigation('/profile')}
                        className={`w-full text-left px-4 py-2 transition-colors ${isNeonTheme ? 'sl-glow-text' : ''}`} 
                        style={{ color: currentTheme.textPrimary }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.backgroundColor = isNeonTheme || isCyberpunk 
                            ? 'rgba(255, 255, 255, 0.1)' 
                            : currentTheme.bgTertiary;
                        }}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                    {isNeonTheme ? 'PROFILE' : isCyberpunk ? 'PROFILE' : 'Profile'}
                  </button>
                </li>
                <li>
                  <button 
                        onClick={() => handleNavigation('/settings')}
                        className={`w-full text-left px-4 py-2 transition-colors ${isNeonTheme ? 'sl-glow-text' : ''}`} 
                        style={{ color: currentTheme.textPrimary }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.backgroundColor = isNeonTheme || isCyberpunk 
                            ? 'rgba(255, 255, 255, 0.1)' 
                            : currentTheme.bgTertiary;
                        }}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                    {isNeonTheme ? 'SETTINGS' : isCyberpunk ? 'SETTINGS' : 'Settings'}
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className={`w-full text-left px-4 py-2 transition-colors ${isNeonTheme ? 'sl-glow-text' : ''}`}
                    style={{ color: currentTheme.textPrimary }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = isNeonTheme || isCyberpunk 
                        ? 'rgba(255, 255, 255, 0.1)' 
                        : currentTheme.bgTertiary;
                    }}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    {isNeonTheme ? 'LOG OUT' : isCyberpunk ? 'LOG OUT' : 'Log Out'}
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