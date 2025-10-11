import React from "react";
import { motion } from "framer-motion";
import { useThemeStyles } from "../../context/ThemeProvider";
import ItemCard from "./ItemCard";
import { PlusIcon } from "@heroicons/react/outline";

const ItemGrid = ({ 
  items, 
  viewMode, 
  onSelectItem, 
  addToCart, 
  mode = "inventory",
  toggleEquip = null 
}) => {
  const { theme: currentTheme } = useThemeStyles();
  
  // Add null checks to prevent React Error #31
  if (!currentTheme) {
    return <div>Loading...</div>;
  }

  if (viewMode !== "grid") return null;

  // Animation variants for container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  // Animation variants for items
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  };

  return (
    <motion.div 
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3" 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {items.map((item) => (
        <motion.div 
          key={item.id} 
          variants={itemVariants}
          layoutId={`item-${item.id}`}
        >
          <ItemCard 
            item={item} 
            onClick={() => onSelectItem(item)}
            mode={mode}
            actionButton={
              mode === "shop" ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(item, 1);
                  }}
                  className="text-xs p-1 rounded hover:bg-opacity-20"
                  style={{ 
                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                    borderRadius: '4px'
                  }}
                >
                  <PlusIcon className="w-4 h-4" />
                </button>
              ) : null
            }
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ItemGrid;