import React, { useContext } from "react";
import { motion } from "framer-motion";
import { CogIcon, TrashIcon, ExternalLinkIcon } from "@heroicons/react/outline";
import ThemeContext from "../../context/ThemeContext";
import { getRarityColor, getScanLineClass } from "../../utils/inventoryUtils";

const ItemList = ({ items, onSelectItem, toggleEquip, viewMode }) => {
  const { currentTheme } = useContext(ThemeContext);
  const isNeonTheme = currentTheme.id.includes('neon');
  const isCyberpunk = currentTheme.id === 'cyberpunk';

  if (viewMode !== "list") return null;

  // Animation variants for container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03
      }
    }
  };

  // Animation variants for items
  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    }
  };

  return (
    <motion.div 
      className="flex flex-col space-y-2"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Table header */}
      <div className="grid grid-cols-12 gap-2 p-3 mb-2 font-medium"
           style={{ 
             backgroundColor: currentTheme.bgSecondary,
             borderRadius: currentTheme.radius,
             color: currentTheme.textSecondary,
             fontFamily: isNeonTheme ? "'Orbitron', 'Rajdhani', sans-serif" : 
                         isCyberpunk ? "'Audiowide', 'Rajdhani', sans-serif" : 
                         currentTheme.font
           }}>
        <div className="col-span-4">
          {isNeonTheme ? '[ NAME ]' : isCyberpunk ? 'NAME' : 'Name'}
        </div>
        <div className="col-span-2">
          {isNeonTheme ? '[ TYPE ]' : isCyberpunk ? 'TYPE' : 'Type'}
        </div>
        <div className="col-span-2">
          {isNeonTheme ? '[ RARITY ]' : isCyberpunk ? 'RARITY' : 'Rarity'}
        </div>
        <div className="col-span-1 text-center">
          {isNeonTheme ? '[ QTY ]' : isCyberpunk ? 'QTY' : 'Qty'}
        </div>
        <div className="col-span-3 text-center">
          {isNeonTheme ? '[ ACTIONS ]' : isCyberpunk ? 'ACTIONS' : 'Actions'}
        </div>
      </div>
      
      {/* Table rows */}
      {items.map((item) => (
        <motion.div 
          key={item.id}
          variants={itemVariants}
          layoutId={`list-item-${item.id}`}
          whileHover={{ 
            backgroundColor: isNeonTheme || isCyberpunk 
              ? 'rgba(255, 255, 255, 0.05)' 
              : currentTheme.bgTertiary,
            transition: { duration: 0.2 }
          }}
          className={`grid grid-cols-12 gap-2 p-3 cursor-pointer items-center ${getScanLineClass(item, isNeonTheme)}`}
          style={{
            backgroundColor: currentTheme.bgSecondary,
            border: `1px solid ${currentTheme.borderColor}`,
            boxShadow: item.rarity === 'Epic' || item.rarity === 'Legendary' 
              ? `0 0 10px ${getRarityColor(item.rarity)}40` 
              : currentTheme.shadow,
            borderRadius: currentTheme.radius
          }}
          onClick={() => onSelectItem(item)}
        >
          <div className="col-span-4 flex items-center gap-3">
            <div 
              className="w-12 h-12 flex items-center justify-center" 
              style={{ 
                backgroundColor: isNeonTheme || isCyberpunk ? 'rgba(0, 0, 0, 0.3)' : currentTheme.bgTertiary,
                borderRadius: currentTheme.radius,
                border: isNeonTheme || isCyberpunk 
                  ? `1px solid ${getRarityColor(item.rarity)}40` 
                  : 'none'
              }}
            >
              <img 
                src={item.image} 
                alt={item.name}
                className="w-9 h-9 object-contain"
              />
            </div>
            <div>
              <div className={`font-medium ${isNeonTheme ? 'sl-glow-text' : ''}`}
                   style={{ 
                     color: currentTheme.textPrimary,
                     fontFamily: isNeonTheme ? "'Orbitron', 'Rajdhani', sans-serif" : 
                                 isCyberpunk ? "'Audiowide', 'Rajdhani', sans-serif" : 
                                 currentTheme.font
                   }}>
                {isNeonTheme ? item.name.toUpperCase() : item.name}
                {item.equipped && (
                  <span className="ml-2 text-xs py-0.5 px-1 rounded" 
                        style={{ 
                          backgroundColor: isNeonTheme || isCyberpunk 
                            ? 'transparent' 
                            : `${currentTheme.primaryColor}20`,
                          color: currentTheme.primaryColor,
                          border: isNeonTheme || isCyberpunk 
                            ? `1px solid ${currentTheme.primaryColor}` 
                            : 'none',
                          borderRadius: currentTheme.radius
                        }}>
                    {isNeonTheme ? '[E]' : isCyberpunk ? 'E' : 'Equipped'}
                  </span>
                )}
              </div>
              <div className="text-xs" style={{ color: currentTheme.textSecondary }}>
                {item.description.length > 50 
                  ? item.description.substring(0, 50) + '...' 
                  : item.description}
              </div>
            </div>
          </div>
          <div className="col-span-2" style={{ color: currentTheme.textSecondary }}>
            {item.type}
            {item.subtype && (
              <div className="text-xs opacity-70">{item.subtype}</div>
            )}
          </div>
          <div className="col-span-2 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: getRarityColor(item.rarity) }}></span>
            <span style={{ color: getRarityColor(item.rarity) }}>
              {item.rarity}
            </span>
          </div>
          <div className="col-span-1 text-center" style={{ color: currentTheme.textSecondary }}>
            {item.quantity}
          </div>
          <div className="col-span-3 flex justify-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleEquip(item.id);
              }}
              className="p-1.5 rounded group transition-colors"
              style={{ 
                backgroundColor: isNeonTheme || isCyberpunk 
                  ? 'transparent' 
                  : currentTheme.bgTertiary,
                color: currentTheme.primaryColor,
                border: isNeonTheme || isCyberpunk 
                  ? `1px solid ${currentTheme.borderColor}` 
                  : 'none',
                borderRadius: currentTheme.radius
              }}
              title={item.equipped ? "Unequip" : "Equip"}
            >
              <CogIcon className="w-5 h-5 transition-transform group-hover:rotate-45" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                // Handle use item 
              }}
              className="p-1.5 rounded transition-colors"
              style={{ 
                backgroundColor: isNeonTheme || isCyberpunk 
                  ? 'transparent' 
                  : currentTheme.bgTertiary,
                color: currentTheme.secondaryColor,
                border: isNeonTheme || isCyberpunk 
                  ? `1px solid ${currentTheme.borderColor}` 
                  : 'none',
                borderRadius: currentTheme.radius
              }}
              title="Use Item"
            >
              <ExternalLinkIcon className="w-5 h-5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                // Handle delete item
              }}
              className="p-1.5 rounded transition-colors"
              style={{ 
                backgroundColor: isNeonTheme || isCyberpunk 
                  ? 'transparent' 
                  : currentTheme.bgTertiary,
                color: '#ef4444', // red
                border: isNeonTheme || isCyberpunk 
                  ? `1px solid ${currentTheme.borderColor}` 
                  : 'none',
                borderRadius: currentTheme.radius
              }}
              title="Discard"
            >
              <TrashIcon className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ItemList;