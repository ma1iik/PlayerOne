import React from "react";
import { motion } from "framer-motion";
import { PlusIcon, ShoppingCartIcon, EyeIcon } from "@heroicons/react/outline";
import { useThemeStyles } from "../../context/ThemeProvider";
import CoinIcon from '../common/CoinIcon';
import GemIcon from '../common/GemIcon';

const ItemList = ({ 
  items, 
  onSelectItem,
  viewMode,
  mode = "shop", // "shop" or "inventory"
  addToCart = null, // Shop mode only
  toggleEquip = null // Inventory mode only
}) => {
  const { theme: currentTheme } = useThemeStyles();
  
  // Add null checks to prevent React Error #31
  if (!currentTheme) {
    return <div>Loading...</div>;
  }
  
  const isNeonTheme = currentTheme.id && currentTheme.id.includes('neon');
  const isCyberpunk = currentTheme.id === 'cyberpunk';

  if (viewMode !== "list") return null;

  // Get rarity color
  const getRarityColor = (rarity) => {
    switch(rarity) {
      case "Common": return "#9ca3af";
      case "Uncommon": return "#22c55e";
      case "Rare": return "#3b82f6";
      case "Epic": return "#a855f7";
      case "Legendary": return "#f59e0b";
      default: return "#9ca3af";
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="space-y-3"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Clean header */}
      <div 
        className="grid grid-cols-12 gap-4 px-4 py-3 font-medium text-sm"
        style={{ 
          backgroundColor: currentTheme.bgTertiary,
          color: currentTheme.textSecondary,
          borderRadius: currentTheme.radius,
          border: `1px solid ${currentTheme.borderColor}`
        }}
      >
        <div className="col-span-6">Item</div>
        <div className="col-span-2">Type</div>
        <div className="col-span-2">Rarity</div>
        <div className="col-span-1 text-center">
          {mode === 'shop' ? 'Price' : 'Qty'}
        </div>
        <div className="col-span-1 text-center">Actions</div>
      </div>

      {/* Clean item rows */}
      {items.map((item) => (
        <motion.div 
          key={item.id}
          variants={itemVariants}
          className="grid grid-cols-12 gap-4 px-4 py-3 items-center cursor-pointer transition-all duration-100"
          style={{ 
            backgroundColor: currentTheme.bgSecondary,
            borderRadius: currentTheme.radius,
            border: `1px solid ${currentTheme.borderColor}`,
            color: currentTheme.textPrimary
          }}
          onClick={() => onSelectItem(item)}
          whileHover={{ 
            backgroundColor: currentTheme.bgTertiary,
            transform: 'translateY(-1px)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
          }}
        >
          {/* Item info */}
          <div className="col-span-6 flex items-center gap-3">
            <div 
              className="w-14 h-14 flex items-center justify-center rounded-lg"
              style={{ backgroundColor: currentTheme.bgTertiary }}
            >
              <img 
                src={item.image} 
                alt={item.name}
                className="w-10 h-10 object-contain"
              />
            </div>
            
            <div className="min-w-0 flex-1">
              <div className="font-medium truncate" style={{ color: currentTheme.textPrimary }}>
                {item.name}
              </div>
              <div className="text-sm truncate" style={{ color: currentTheme.textSecondary }}>
                {item.description || 'No description'}
              </div>
            </div>
          </div>

          {/* Type */}
          <div className="col-span-2 text-sm" style={{ color: currentTheme.textSecondary }}>
            {item.type}
          </div>

          {/* Rarity */}
          <div className="col-span-2 flex items-center gap-2">
            <div 
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: getRarityColor(item.rarity) }}
            />
            <span className="text-sm" style={{ color: getRarityColor(item.rarity) }}>
              {item.rarity}
            </span>
          </div>

          {/* Price/Quantity */}
          <div className="col-span-1 text-center">
            {mode === 'shop' ? (
              <div className="flex items-center justify-center gap-1">
                {item.currency === 'gems' ? (
                  <GemIcon size="w-4 h-4" />
                ) : (
                  <CoinIcon size="w-4 h-4" />
                )}
                <span className="font-medium" style={{ color: currentTheme.textPrimary }}>
                  {item.price}
                </span>
              </div>
            ) : (
              <span className="text-sm font-medium" style={{ color: currentTheme.textSecondary }}>
                {item.quantity || 1}
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="col-span-1 flex justify-center gap-1">
            {mode === 'shop' ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(item, 1);
                }}
                className="p-2 rounded-lg transition-colors hover:scale-105"
                style={{ 
                  backgroundColor: currentTheme.primaryColor,
                  color: '#ffffff'
                }}
                title="Add to Cart"
              >
                <PlusIcon className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleEquip && toggleEquip(item.id);
                }}
                className="p-2 rounded-lg transition-colors hover:scale-105"
                style={{ 
                  backgroundColor: item.equipped ? currentTheme.primaryColor : currentTheme.bgTertiary,
                  color: item.equipped ? '#ffffff' : currentTheme.textSecondary,
                  border: `1px solid ${currentTheme.borderColor}`
                }}
                title={item.equipped ? "Unequip" : "Equip"}
              >
                <EyeIcon className="w-4 h-4" />
              </button>
            )}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ItemList;