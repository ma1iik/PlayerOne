import React, { useContext } from "react"; 
import { motion } from "framer-motion";
import { PlusIcon } from "@heroicons/react/outline";
import ThemeContext from "../../context/ThemeContext";
import { getRarityColor, getScanLineClass, getScanLineStyle } from "../../utils/itemUtils";

const ItemCard = ({ 
  item, 
  onClick, 
  actionButton, 
  mode = "shop", // "shop" or "inventory"
}) => {
  const { currentTheme } = useContext(ThemeContext);


  const isNeonTheme = currentTheme.id.includes('neon');
  const isCyberpunk = currentTheme.id === 'cyberpunk';

  // Get themed item card style
  const getItemCardStyle = () => {
    const rarityColor = getRarityColor(item.rarity);
    
    if (isNeonTheme) {
      return {
        backgroundColor: 'rgba(10, 10, 16, 0.7)',
        border: `1px solid ${rarityColor}`,
        boxShadow: `0 0 10px ${rarityColor}80`,
        borderRadius: currentTheme.radius,
      };
    } else if (isCyberpunk) {
      return {
        backgroundColor: 'rgba(15, 23, 42, 0.7)',
        border: `1px solid ${rarityColor}`,
        boxShadow: `0 0 5px ${rarityColor}40`,
        borderRadius: '0',
      };
    } else {
      return {
        backgroundColor: currentTheme.bgSecondary,
        border: `1px solid ${currentTheme.borderColor}`,
        boxShadow: currentTheme.shadow,
        borderRadius: currentTheme.radius,
      };
    }
  };

  // Render bottom part based on mode
  const renderBottomSection = () => {
    if (mode === "shop") {
      return (
        <div className="mt-3 flex justify-between items-center">
          <div className="flex items-center">
            <span role="img" aria-label="Currency" className="mr-1">
              {item.currency === 'gems' ? '💎' : '🪙'}
            </span>
            <span className="font-semibold" style={{ color: currentTheme.textPrimary }}>
              {item.discounted ? (
                <span>
                  <span className="line-through text-xs mr-1 opacity-70">{item.originalPrice}</span>
                  {item.price}
                </span>
              ) : (
                item.price
              )}
            </span>
          </div>
          {actionButton}
        </div>
      );
    } else {
      return (
        <div className="mt-2 flex justify-between items-center h-6">
          {item.equipped && (
            <span className="text-xs py-1 px-2 rounded" 
                  style={{ 
                    backgroundColor: isNeonTheme || isCyberpunk 
                      ? 'transparent' 
                      : `${currentTheme.primaryColor}20`,
                    color: currentTheme.primaryColor,
                    border: isNeonTheme || isCyberpunk 
                      ? `1px solid ${currentTheme.primaryColor}` 
                      : 'none',
                    borderRadius: currentTheme.radius,
                    fontFamily: isNeonTheme ? "'Orbitron', 'Rajdhani', sans-serif" : 
                                isCyberpunk ? "'Audiowide', 'Rajdhani', sans-serif" : 
                                currentTheme.font
                  }}>
              {isNeonTheme ? '[ EQUIPPED ]' : isCyberpunk ? 'EQUIPPED' : 'Equipped'}
            </span>
          )}
          {item.quantity > 1 && (
            <span className="text-sm py-1 px-2 rounded ml-auto" 
                  style={{ 
                    backgroundColor: isNeonTheme || isCyberpunk 
                      ? 'transparent' 
                      : currentTheme.bgTertiary,
                    color: currentTheme.textSecondary,
                    border: isNeonTheme || isCyberpunk 
                      ? `1px solid ${currentTheme.borderColor}` 
                      : 'none',
                    borderRadius: currentTheme.radius
                  }}>
              x{item.quantity}
            </span>
          )}
          {actionButton}
        </div>
      );
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className={`h-full cursor-pointer transition-all duration-200 ${getScanLineClass(item, isNeonTheme)}`}
      style={{
        ...getItemCardStyle(),
        ...getScanLineStyle(item, isNeonTheme)
      }}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="p-4 flex flex-col h-full">
        {/* Item image */}
        <div 
          className="w-full aspect-square flex items-center justify-center mb-3 relative" 
          style={{ 
            backgroundColor: isNeonTheme || isCyberpunk ? 'rgba(0, 0, 0, 0.3)' : currentTheme.bgTertiary,
            borderRadius: currentTheme.radius
          }}
        >
          {/* Shop-specific: Featured badge */}
          {mode === "shop" && item.featured && (
            <div className="absolute top-2 right-2">
              <span className="inline-block text-xs px-2 py-0.5 rounded"
                    style={{ 
                      backgroundColor: isNeonTheme || isCyberpunk ? 'transparent' : currentTheme.secondaryColor,
                      color: isNeonTheme || isCyberpunk ? currentTheme.secondaryColor : '#ffffff',
                      border: isNeonTheme || isCyberpunk ? `1px solid ${currentTheme.secondaryColor}` : 'none',
                      borderRadius: currentTheme.radius
                    }}>
                {isNeonTheme ? '★' : isCyberpunk ? '★' : 'Featured'}
              </span>
            </div>
          )}
          
          <img 
            src={item.image} 
            alt={item.name}
            className="w-3/4 h-3/4 object-contain"
          />
        </div>
        
        {/* Item information */}
        <div className="flex-1 min-w-0">
          <h3 className={`font-medium truncate ${isNeonTheme ? 'sl-glow-text' : ''}`}
              style={{ 
                color: currentTheme.textPrimary,
                fontFamily: isNeonTheme ? "'Orbitron', 'Rajdhani', sans-serif" : 
                            isCyberpunk ? "'Audiowide', 'Rajdhani', sans-serif" : 
                            currentTheme.font
              }}>
            {isNeonTheme ? item.name.toUpperCase() : item.name}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs" 
                  style={{ 
                    color: getRarityColor(item.rarity),
                    fontFamily: isNeonTheme ? "'Orbitron', 'Rajdhani', sans-serif" : 
                                isCyberpunk ? "'Audiowide', 'Rajdhani', sans-serif" : 
                                currentTheme.font
                  }}>
              {item.rarity}
            </span>
            <span className="text-xs" style={{ color: currentTheme.textSecondary }}>
              {item.type}
            </span>
          </div>
        </div>
        
        {/* Conditional bottom section (shop vs inventory) */}
        {renderBottomSection()}
      </div>
    </motion.div>
  );
};

export default ItemCard;