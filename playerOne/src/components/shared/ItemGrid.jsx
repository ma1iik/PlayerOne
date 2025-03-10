import React from "react";
import { motion } from "framer-motion";
import ItemCard from "./ItemCard";
import { PlusIcon } from "@heroicons/react/outline";

const ItemGrid = ({ 
  items, 
  onSelectItem, 
  viewMode,
  mode = "shop", // "shop" or "inventory"
  addToCart = null, // Only for shop mode
}) => {
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
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4" 
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
                  className="text-xs p-1 rounded"
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