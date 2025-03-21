import React, { useContext } from "react";
import { motion } from "framer-motion";
import { 
  CogIcon, 
  TrashIcon, 
  ExternalLinkIcon,
  InformationCircleIcon,
  PlusIcon
} from "@heroicons/react/outline";
import ThemeContext from "../../context/ThemeContext";

// Import utility functions directly to avoid missing references
const getRarityColor = (rarity) => {
  switch(rarity) {
    case "Common": return "#9ca3af"; // gray-400
    case "Uncommon": return "#22c55e"; // green-500
    case "Rare": return "#3b82f6"; // blue-500
    case "Epic": return "#a855f7"; // purple-500
    case "Legendary": return "#f59e0b"; // amber-500
    default: return "#9ca3af"; // gray-400
  }
};

const getScanLineClass = (item, isNeonTheme) => {
  if (!isNeonTheme) return '';
  return 'sl-scan-line-custom';
};

const getScanLineStyle = (item, isNeonTheme) => {
  if (!isNeonTheme) return {};

  const rarityColor = getRarityColor(item.rarity);
  return {
    '--scan-line-color': rarityColor
  };
};

const ItemList = ({ 
  items, 
  onSelectItem,
  viewMode,
  mode = "shop", // "shop" or "inventory"
  addToCart = null, // Shop mode only
  toggleEquip = null // Inventory mode only
}) => {
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

  // Get themed item row style
  const getItemRowStyle = (item) => {
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

  // Render item row based on mode (shop or inventory)
  const renderItemList = () => {
    // Shared column definitions
    const columns = {
      shop: [
        { name: "ITEM", span: 5 },
        { name: "TYPE", span: 2 },
        { name: "RARITY", span: 2 },
        { name: "PRICE", span: 1 },
        { name: "ACTIONS", span: 2 }
      ],
      inventory: [
        { name: "ITEM", span: 4 },
        { name: "TYPE", span: 2 },
        { name: "RARITY", span: 2 },
        { name: "QTY", span: 1 },
        { name: "ACTIONS", span: 3 }
      ]
    };

    const currentColumns = columns[mode];

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
          {currentColumns.map((col, index) => (
            <div key={index} className={`col-span-${col.span} ${col.span === 1 ? "text-center" : ""}`}>
              {isNeonTheme ? `[ ${col.name} ]` : isCyberpunk ? col.name : col.name.charAt(0) + col.name.slice(1).toLowerCase()}
            </div>
          ))}
        </div>
        
        {/* Table rows */}
        {items.map((item) => (
          <motion.div 
            key={item.id}
            variants={itemVariants}
            layoutId={`list-item-${item.id}`}
            className={`grid grid-cols-12 gap-2 p-3 cursor-pointer items-center ${getScanLineClass(item, isNeonTheme)}`}
            style={{
              ...getItemRowStyle(item),
              ...getScanLineStyle(item, isNeonTheme)
            }}
            onClick={() => onSelectItem(item)}
            whileHover={{ 
              backgroundColor: isNeonTheme || isCyberpunk 
                ? 'rgba(255, 255, 255, 0.05)' 
                : currentTheme.bgTertiary,
              transition: { duration: 0.2 }
            }}
          >
            {/* Item name and image column */}
            <div className={`col-span-${mode === 'shop' ? '5' : '4'} flex items-center gap-3`}>
              <div 
                className="w-12 h-12 flex items-center justify-center relative" 
                style={{ 
                  backgroundColor: isNeonTheme || isCyberpunk ? 'rgba(0, 0, 0, 0.3)' : currentTheme.bgTertiary,
                  borderRadius: currentTheme.radius
                }}
              >
                {mode === 'shop' && item.featured && (
                  <div className="absolute -top-1 -right-1 z-10">
                    <span className="inline-flex items-center justify-center w-4 h-4 text-xs"
                          style={{ 
                            backgroundColor: isNeonTheme || isCyberpunk ? 'transparent' : currentTheme.secondaryColor,
                            color: '#ffffff',
                            border: isNeonTheme || isCyberpunk ? `1px solid ${currentTheme.secondaryColor}` : 'none',
                            borderRadius: '9999px'
                          }}>
                      ★
                    </span>
                  </div>
                )}
                
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
                  
                  {/* Mode-specific badge */}
                  {mode === 'inventory' && item.equipped && (
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
                  
                  {mode === 'shop' && item.discounted && (
                    <span className="ml-2 text-xs py-0.5 px-1 rounded" 
                          style={{ 
                            backgroundColor: isNeonTheme || isCyberpunk 
                              ? 'transparent' 
                              : 'rgba(239, 68, 68, 0.2)',
                            color: '#ef4444',
                            border: isNeonTheme || isCyberpunk 
                              ? '1px solid #ef4444' 
                              : 'none',
                            borderRadius: currentTheme.radius
                          }}>
                      {isNeonTheme ? '[SALE]' : isCyberpunk ? 'SALE' : 'Sale'}
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
            
            {/* Type Column */}
            <div className="col-span-2" style={{ color: currentTheme.textSecondary }}>
              {item.type}
              {item.subtype && (
                <div className="text-xs opacity-70">{item.subtype}</div>
              )}
            </div>
            
            {/* Rarity Column */}
            <div className="col-span-2 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: getRarityColor(item.rarity) }}></span>
              <span style={{ color: getRarityColor(item.rarity) }}>
                {item.rarity}
              </span>
            </div>
            
            {/* Mode-specific column (Price or Quantity) */}
            <div className="col-span-1 text-center flex items-center justify-center">
              {mode === 'shop' ? (
                <div className="flex items-center justify-center gap-1">
                  <span role="img" aria-label="Currency">
                    {item.currency === 'gems' ? '💎' : '🪙'}
                  </span>
                  <span style={{ color: currentTheme.textPrimary, fontWeight: '600' }}>
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
              ) : (
                <span style={{ color: currentTheme.textSecondary }}>
                  {item.quantity}
                </span>
              )}
            </div>
            
            {/* Action buttons */}
            <div className={`col-span-${mode === 'shop' ? '2' : '3'} flex justify-center gap-2`}>
              {mode === 'shop' ? (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(item, 1);
                    }}
                    className="p-1.5 rounded transition-colors"
                    style={{ 
                      backgroundColor: isNeonTheme || isCyberpunk 
                        ? 'transparent' 
                        : currentTheme.primaryColor,
                      color: isNeonTheme || isCyberpunk ? currentTheme.primaryColor : '#ffffff',
                      border: isNeonTheme || isCyberpunk 
                        ? `1px solid ${currentTheme.primaryColor}` 
                        : 'none',
                      borderRadius: currentTheme.radius
                    }}
                    title="Add to Cart"
                  >
                    <PlusIcon className="w-5 h-5" />
                  </button>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectItem(item);
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
                    title="View Details"
                  >
                    <InformationCircleIcon className="w-5 h-5" />
                  </button>
                </>
              ) : (
                <>
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
                </>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    );
  };

  return renderItemList();
};

export default ItemList;