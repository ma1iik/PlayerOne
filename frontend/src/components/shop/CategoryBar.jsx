import React, { useContext } from "react";
import { motion } from "framer-motion";
import ThemeContext from "../../context/ThemeContext";

const CategoryBar = ({ categories, activeCategory, setActiveCategory }) => {
  const { currentTheme } = useContext(ThemeContext);
  const isNeonTheme = currentTheme.id.includes('neon');
  const isCyberpunk = currentTheme.id === 'cyberpunk';
  
  // Get filter button style
  const getFilterButtonStyle = (isActive) => {
    if (isNeonTheme || isCyberpunk) {
      return {
        backgroundColor: isActive ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
        color: isActive 
          ? currentTheme.primaryColor
          : currentTheme.textSecondary,
        borderRadius: currentTheme.radius,
        border: `1px solid ${isActive 
          ? currentTheme.primaryColor 
          : currentTheme.borderColor}`,
        fontFamily: isNeonTheme 
          ? "'Orbitron', 'Rajdhani', sans-serif" 
          : isCyberpunk 
          ? "'Audiowide', 'Rajdhani', sans-serif" 
          : currentTheme.font
      };
    }
    
    return {
      backgroundColor: isActive 
        ? `${currentTheme.primaryColor}20`
        : currentTheme.bgTertiary,
      color: isActive 
        ? currentTheme.primaryColor
        : currentTheme.textSecondary,
      borderRadius: currentTheme.radius,
      fontFamily: currentTheme.font
    };
  };

  return (
    <div className="flex overflow-x-auto p-2 gap-2 no-scrollbar" 
         style={{ backgroundColor: currentTheme.bgSecondary, borderBottom: `1px solid ${currentTheme.borderColor}` }}>
      {categories.map(category => (
        <motion.button 
          key={category.id}
          onClick={() => setActiveCategory(category.id)}
          className={`px-4 py-2 whitespace-nowrap text-sm transition-colors ${isNeonTheme ? 'sl-glow-text' : ''}`}
          style={getFilterButtonStyle(activeCategory === category.id)}
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.2 }
          }}
          whileTap={{
            scale: 0.95
          }}
        >
          {isNeonTheme ? category.name.toUpperCase() : category.name}
        </motion.button>
      ))}
    </div>
  );
};

export default CategoryBar;