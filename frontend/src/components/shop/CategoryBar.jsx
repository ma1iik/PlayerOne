import React from "react";
import { motion } from "framer-motion";
import { useThemeStyles } from "../../context/ThemeProvider";

const CategoryBar = ({ categories, activeCategory, setActiveCategory }) => {
  const { theme, styles } = useThemeStyles();

  // Helper functions
  const getTextClasses = (baseClasses = '', isHighlighted = false) => {
    let classes = baseClasses;
    if (theme.features.hasGlowEffects && isHighlighted) {
      classes += ' sl-glow-text';
    }
    return classes.trim();
  };

  const getThemedText = (text) => styles.shouldTransform(text);

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {categories.map((category) => {
        // Handle both string and object categories
        const categoryId = typeof category === 'string' ? category : category.id;
        const categoryName = typeof category === 'string' ? category : category.name;
        
        return (
          <motion.button
            key={categoryId}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveCategory(categoryId)}
            className={`px-4 py-2 whitespace-nowrap text-sm transition-colors ${getTextClasses('', theme.features.hasGlowEffects)}`}
            style={{
              backgroundColor: activeCategory === categoryId ? theme.primaryColor : 'transparent',
              color: activeCategory === categoryId ? '#ffffff' : theme.textSecondary,
              border: `1px solid ${activeCategory === categoryId ? theme.primaryColor : theme.borderColor}`,
              borderRadius: theme.features.hasSharpCorners ? '0' : theme.radius,
              fontFamily: theme.font,
            }}
          >
            {getThemedText(categoryName)}
          </motion.button>
        );
      })}
    </div>
  );
};

export default CategoryBar;