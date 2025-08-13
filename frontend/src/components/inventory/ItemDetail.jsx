import React from "react"; 
import { motion } from "framer-motion";
import { CogIcon, TrashIcon, XIcon, ExternalLinkIcon } from "@heroicons/react/outline";
import { useThemeStyles } from "../../context/ThemeProvider";
import { getRarityColor } from "../../utils/itemUtils.js";

const ItemDetail = ({ item, onClose, toggleEquip }) => {
  const { theme: currentTheme } = useThemeStyles();
  
  // Add null checks to prevent React Error #31
  if (!currentTheme) {
    return <div>Loading...</div>;
  }
  
  if (!item) return null;
  
  const isNeonTheme = currentTheme.id && currentTheme.id.includes('neon');
  const isCyberpunk = currentTheme.id === 'cyberpunk';

  // Get themed detail panel style
  const getDetailPanelStyle = () => {
    const rarityColor = getRarityColor(item.rarity);
    
    if (isNeonTheme) {
      return {
        backgroundColor: 'rgba(10, 10, 16, 0.95)',
        border: `2px solid ${rarityColor}`,
        boxShadow: `0 0 20px ${rarityColor}80`,
        borderRadius: currentTheme.radius,
      };
    } else if (isCyberpunk) {
      return {
        backgroundColor: 'rgba(15, 23, 42, 0.95)',
        border: `2px solid ${rarityColor}`,
        boxShadow: `0 0 15px ${rarityColor}40`,
        borderRadius: '0',
      };
    } else {
      return {
        backgroundColor: currentTheme.bgSecondary,
        border: `1px solid ${currentTheme.borderColor}`,
        boxShadow: `0 10px 25px -5px rgba(0, 0, 0, 0.3)`,
        borderRadius: currentTheme.radius,
      };
    }
  };

  // New function to handle equipping and closing
  const handleEquipAndClose = (id) => {
    toggleEquip(id);
    onClose();
  };

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative max-w-md w-full max-h-[85vh] overflow-y-auto"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        style={getDetailPanelStyle()}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full hover:bg-black hover:bg-opacity-20 transition-colors"
          style={{ 
            color: currentTheme.textSecondary,
          }}
        >
          <XIcon className="w-5 h-5" />
        </button>
        
        {/* Header with colored accent based on rarity */}
        <div className="h-2" style={{ backgroundColor: getRarityColor(item.rarity) }}></div>

        <div className="p-6">
          {/* Item header with image */}
          <div className="flex flex-col items-center mb-6">
            <div 
              className="w-36 h-36 flex items-center justify-center mb-4 p-2" 
              style={{ 
                backgroundColor: isNeonTheme || isCyberpunk ? 'rgba(0, 0, 0, 0.3)' : currentTheme.bgTertiary,
                borderRadius: currentTheme.radius,
                boxShadow: isNeonTheme ? `0 0 15px ${getRarityColor(item.rarity)}40` : 'none'
              }}
            >
              <img 
                src={item.image} 
                alt={item.name}
                className="w-28 h-28 object-contain"
              />
            </div>
            <h3 className={`text-2xl font-semibold text-center mb-2 ${isNeonTheme ? 'sl-glow-text' : ''}`}
                style={{ 
                  color: currentTheme.textPrimary,
                  fontFamily: isNeonTheme ? "'Orbitron', 'Rajdhani', sans-serif" : 
                              isCyberpunk ? "'Audiowide', 'Rajdhani', sans-serif" : 
                              currentTheme.font
                }}>
              {isNeonTheme ? item.name.toUpperCase() : item.name}
            </h3>
            
            {/* Rarity and type badges */}
            <div className="flex items-center gap-3 mb-3">
              <span className="text-sm font-medium px-3 py-1 rounded-full" 
                    style={{ 
                      backgroundColor: `${getRarityColor(item.rarity)}20`,
                      color: getRarityColor(item.rarity),
                      border: isNeonTheme || isCyberpunk ? `1px solid ${getRarityColor(item.rarity)}` : 'none',
                      fontFamily: isNeonTheme ? "'Orbitron', 'Rajdhani', sans-serif" : 
                                  isCyberpunk ? "'Audiowide', 'Rajdhani', sans-serif" : 
                                  currentTheme.font
                    }}>
                {item.rarity}
              </span>
              <span className="text-sm px-3 py-1 rounded-full" 
                    style={{ 
                      backgroundColor: isNeonTheme || isCyberpunk ? 'transparent' : currentTheme.bgTertiary,
                      color: currentTheme.textSecondary,
                      border: isNeonTheme || isCyberpunk ? `1px solid ${currentTheme.borderColor}` : 'none',
                      fontFamily: isNeonTheme ? "'Orbitron', 'Rajdhani', sans-serif" : 
                                  isCyberpunk ? "'Audiowide', 'Rajdhani', sans-serif" : 
                                  currentTheme.font
                    }}>
                {item.type} {item.subtype ? `(${item.subtype})` : ''}
              </span>
            </div>
            
            {/* Description with stylized quote marks */}
            <div className="relative">
              <div className="opacity-10 text-5xl absolute -top-3 left-0" style={{ color: getRarityColor(item.rarity) }}>"</div>
              <p className="text-sm text-center italic my-3 px-4" style={{ color: currentTheme.textSecondary }}>
                {item.description}
              </p>
              <div className="opacity-10 text-5xl absolute -bottom-8 right-0" style={{ color: getRarityColor(item.rarity) }}>"</div>
            </div>
            
            {/* Equipped status badge */}
            {item.equipped && (
              <span className="text-sm py-1 px-3 mt-3 rounded-full" 
                    style={{ 
                      backgroundColor: isNeonTheme || isCyberpunk 
                        ? 'transparent' 
                        : `${currentTheme.primaryColor}20`,
                      color: currentTheme.primaryColor,
                      border: isNeonTheme || isCyberpunk 
                        ? `1px solid ${currentTheme.primaryColor}` 
                        : 'none',
                      borderRadius: "9999px",
                      fontFamily: isNeonTheme ? "'Orbitron', 'Rajdhani', sans-serif" : 
                                  isCyberpunk ? "'Audiowide', 'Rajdhani', sans-serif" : 
                                  currentTheme.font
                    }}>
                {isNeonTheme ? '[ EQUIPPED ]' : isCyberpunk ? 'EQUIPPED' : 'Equipped'}
              </span>
            )}
          </div>
          
          {/* Divider */}
          <div className="h-px w-full my-4" style={{ backgroundColor: isNeonTheme || isCyberpunk ? getRarityColor(item.rarity) : currentTheme.borderColor, opacity: isNeonTheme || isCyberpunk ? 0.3 : 1 }}></div>
          
          {/* Item effects and stats */}
          <div className="mb-6">
            <h4 className={`text-sm font-semibold mb-3 ${isNeonTheme ? 'sl-glow-text' : ''}`}
                style={{ 
                  color: currentTheme.textPrimary,
                  fontFamily: isNeonTheme ? "'Orbitron', 'Rajdhani', sans-serif" : 
                              isCyberpunk ? "'Audiowide', 'Rajdhani', sans-serif" : 
                              currentTheme.font
                }}>
              {isNeonTheme ? '[ EFFECTS ]' : isCyberpunk ? 'EFFECTS' : 'Effects'}
            </h4>
            <ul className="space-y-2 pl-4">
              {item.effects.map((effect, index) => (
                <li key={index} 
                    className="text-sm flex items-start gap-2" 
                    style={{ 
                      color: currentTheme.textSecondary,
                      fontFamily: isNeonTheme ? "'Orbitron', 'Rajdhani', sans-serif" : 
                                  isCyberpunk ? "'Audiowide', 'Rajdhani', sans-serif" : 
                                  currentTheme.font
                    }}>
                  <span className="inline-block w-2 h-2 mt-1.5 rounded-full" style={{ backgroundColor: getRarityColor(item.rarity) }}></span>
                  {effect}
                </li>
              ))}
            </ul>
          </div>
          
          {/* Stats display if available */}
          {item.stats && Object.values(item.stats).some(val => val !== 0) && (
            <div className="mb-6">
              <h4 className={`text-sm font-semibold mb-3 ${isNeonTheme ? 'sl-glow-text' : ''}`}
                  style={{ 
                    color: currentTheme.textPrimary,
                    fontFamily: isNeonTheme ? "'Orbitron', 'Rajdhani', sans-serif" : 
                                isCyberpunk ? "'Audiowide', 'Rajdhani', sans-serif" : 
                                currentTheme.font
                  }}>
                {isNeonTheme ? '[ STATISTICS ]' : isCyberpunk ? 'STATISTICS' : 'Statistics'}
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(item.stats).map(([stat, value]) => (
                  value !== 0 && (
                    <div key={stat} className="flex items-center justify-between px-3 py-2 rounded"
                         style={{ 
                           backgroundColor: isNeonTheme || isCyberpunk ? 'rgba(0, 0, 0, 0.2)' : currentTheme.bgTertiary,
                           border: isNeonTheme || isCyberpunk ? `1px solid ${getRarityColor(item.rarity)}20` : 'none',
                        }}>
                      <span className="text-sm capitalize" style={{ color: currentTheme.textSecondary }}>
                        {stat}
                      </span>
                      <span className={`text-sm font-medium ${value > 0 ? 'text-green-500' : value < 0 ? 'text-red-500' : ''}`}>
                        {value > 0 ? `+${value}` : value}
                      </span>
                    </div>
                  )
                ))}
              </div>
            </div>
          )}
          
          {/* Quantity indicator */}
          {item.quantity > 1 && (
            <div className="text-center mb-5">
              <span className="inline-block px-4 py-1 rounded-full text-sm"
                    style={{ 
                      backgroundColor: isNeonTheme || isCyberpunk 
                        ? 'transparent' 
                        : currentTheme.bgTertiary,
                      color: currentTheme.textSecondary,
                      border: isNeonTheme || isCyberpunk 
                        ? `1px solid ${currentTheme.borderColor}` 
                        : 'none',
                    }}>
                You have <span style={{ color: currentTheme.primaryColor, fontWeight: "600" }}>{item.quantity}</span> of these items
              </span>
            </div>
          )}
          
          {/* Action buttons */}
          <div className="space-y-3 mt-6">
            <button
              onClick={() => handleEquipAndClose(item.id)}
              className={`w-full py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors ${isNeonTheme ? 'sl-glow-text' : ''}`}
              style={{ 
                backgroundColor: isNeonTheme || isCyberpunk ? 'transparent' : currentTheme.primaryColor,
                color: isNeonTheme || isCyberpunk ? currentTheme.primaryColor : '#ffffff',
                border: isNeonTheme || isCyberpunk ? `1px solid ${currentTheme.primaryColor}` : 'none',
                borderRadius: currentTheme.radius,
                fontFamily: isNeonTheme ? "'Orbitron', 'Rajdhani', sans-serif" : 
                            isCyberpunk ? "'Audiowide', 'Rajdhani', sans-serif" : 
                            currentTheme.font
              }}
            >
              <CogIcon className="w-5 h-5" />
              {isNeonTheme
                ? item.equipped ? '[ UNEQUIP ]' : '[ EQUIP ]'
                : isCyberpunk 
                ? item.equipped ? 'UNEQUIP' : 'EQUIP'
                : item.equipped ? 'Unequip' : 'Equip'}
            </button>
            
            {item.type === "Consumable" && (
              <button
                className={`w-full py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors ${isNeonTheme ? 'sl-glow-text' : ''}`}
                style={{ 
                  backgroundColor: isNeonTheme || isCyberpunk ? 'transparent' : currentTheme.secondaryColor,
                  color: isNeonTheme || isCyberpunk ? currentTheme.secondaryColor : '#ffffff',
                  border: isNeonTheme || isCyberpunk ? `1px solid ${currentTheme.secondaryColor}` : 'none',
                  borderRadius: currentTheme.radius,
                  fontFamily: isNeonTheme ? "'Orbitron', 'Rajdhani', sans-serif" : 
                              isCyberpunk ? "'Audiowide', 'Rajdhani', sans-serif" : 
                              currentTheme.font
                }}
              >
                <ExternalLinkIcon className="w-5 h-5" />
                {isNeonTheme ? '[ USE ITEM ]' : isCyberpunk ? 'USE ITEM' : 'Use Item'}
              </button>
            )}
            
            <button
              className={`w-full py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors ${isNeonTheme ? 'sl-glow-text' : ''}`}
              style={{ 
                backgroundColor: isNeonTheme || isCyberpunk ? 'transparent' : 'rgba(239, 68, 68, 0.1)',
                color: '#ef4444', // red
                border: isNeonTheme || isCyberpunk ? `1px solid #ef4444` : 'none',
                borderRadius: currentTheme.radius,
                fontFamily: isNeonTheme ? "'Orbitron', 'Rajdhani', sans-serif" : 
                            isCyberpunk ? "'Audiowide', 'Rajdhani', sans-serif" : 
                            currentTheme.font
              }}
            >
              <TrashIcon className="w-5 h-5" />
              {isNeonTheme ? '[ DISCARD ]' : isCyberpunk ? 'DISCARD' : 'Discard'}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ItemDetail;