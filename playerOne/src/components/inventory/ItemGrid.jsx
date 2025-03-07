import React from "react";
import { motion } from "framer-motion";
import ItemCard from "./ItemCard";

const ItemGrid = ({ items, onSelectItem, viewMode }) => {
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
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {items.map((item, index) => (
        <motion.div 
          key={item.id} 
          variants={itemVariants}
          layoutId={`item-${item.id}`}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          <ItemCard 
            item={item} 
            onSelectItem={onSelectItem} 
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ItemGrid;