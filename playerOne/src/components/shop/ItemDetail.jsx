import React, { useContext } from "react";
import { motion } from "framer-motion";
import { 
  XIcon, 
  CurrencyDollarIcon, 
  PlusIcon, 
  MinusIcon, 
  ShoppingCartIcon 
} from "@heroicons/react/outline";
import ThemeContext from "../../context/ThemeContext";
import { getRarityColor } from "../../utils/shopUtils";

const ItemDetail = ({ 
  item, 
  onClose, 
  addToCart, 
  cartItems, 
  setShowCart 
}) => {
  if (!item) return null;
  
  const { currentTheme } = useContext(ThemeContext);
  const isNeonTheme = currentTheme.id.includes('neon');
  const isCyberpunk = currentTheme.id === 'cyberpunk';

  const existingItem = cartItems.find(i => i.id === item.id);
  const quantity = existingItem?.quantity || 1;

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
        style={{
          backgroundColor: isNeonTheme 
            ? 'rgba(10, 10, 16, 0.95)' 
            : isCyberpunk 
            ? 'rgba(15, 23, 42, 0.95)' 
            : currentTheme.bgSecondary,
          border: `2px solid ${getRarityColor(item.rarity)}`,
          boxShadow: isNeonTheme || isCyberpunk 
            ? `0 0 20px ${getRarityColor(item.rarity)}80` 
            : currentTheme.shadow,
          borderRadius: currentTheme.radius
        }}
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
              className="w-36 h-36 flex items-center justify-center mb-4 p-2 relative" 
              style={{ 
                backgroundColor: isNeonTheme || isCyberpunk ? 'rgba(0, 0, 0, 0.3)' : currentTheme.bgTertiary,
                borderRadius: currentTheme.radius,
                boxShadow: isNeonTheme ? `0 0 15px ${getRarityColor(item.rarity)}40` : 'none'
              }}
            >
              {item.featured && (
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
            
            {/* Price display */}
            <div className="flex items-center gap-2 mb-3">
              <span role="img" aria-label="Currency" className="text-xl">
                {item.currency === 'gems' ? '💎' : '🪙'}
              </span>
              <span className="text-xl font-bold" style={{ color: currentTheme.textPrimary }}>
                {item.discounted ? (
                  <span>
                    <span className="line-through mr-2 opacity-70" style={{ color: currentTheme.textSecondary }}>
                      {item.originalPrice}
                    </span>
                    {item.price}
                  </span>
                ) : (
                  item.price
                )}
              </span>
              {item.discounted && (
                <span className="text-sm py-1 px-2 rounded-full" 
                      style={{ 
                        backgroundColor: isNeonTheme || isCyberpunk ? 'transparent' : 'rgba(239, 68, 68, 0.2)',
                        color: '#ef4444',
                        border: isNeonTheme || isCyberpunk ? '1px solid #ef4444' : 'none',
                        borderRadius: "9999px"
                      }}>
                  {isNeonTheme 
                    ? `[ SAVE ${Math.round((1 - item.price / item.originalPrice) * 100)}% ]` 
                    : `Save ${Math.round((1 - item.price / item.originalPrice) * 100)}%`}
                </span>
              )}
            </div>
            
            {/* Description with stylized quote marks */}
            <div className="relative">
              <div className="opacity-10 text-5xl absolute -top-3 left-0" style={{ color: getRarityColor(item.rarity) }}>"</div>
              <p className="text-sm text-center italic my-3 px-4" style={{ color: currentTheme.textSecondary }}>
                {item.description}
              </p>
              <div className="opacity-10 text-5xl absolute -bottom-8 right-0" style={{ color: getRarityColor(item.rarity) }}>"</div>
            </div>
          </div>
          
          {/* Divider */}
          <div className="h-px w-full my-4" style={{ backgroundColor: isNeonTheme || isCyberpunk ? getRarityColor(item.rarity) : currentTheme.borderColor, opacity: isNeonTheme || isCyberpunk ? 0.3 : 1 }}></div>
          
          {/* Item effects and properties */}
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
          
          {/* Requirements if any */}
          {item.requirements && (
            <div className="mb-6">
              <h4 className={`text-sm font-semibold mb-3 ${isNeonTheme ? 'sl-glow-text' : ''}`}
                  style={{ 
                    color: currentTheme.textPrimary,
                    fontFamily: isNeonTheme ? "'Orbitron', 'Rajdhani', sans-serif" : 
                                isCyberpunk ? "'Audiowide', 'Rajdhani', sans-serif" : 
                                currentTheme.font
                  }}>
                {isNeonTheme ? '[ REQUIREMENTS ]' : isCyberpunk ? 'REQUIREMENTS' : 'Requirements'}
              </h4>
              <ul className="space-y-2 pl-4">
                {item.requirements.map((req, index) => (
                  <li key={index} 
                      className="text-sm flex items-start gap-2" 
                      style={{ 
                        color: currentTheme.textSecondary,
                        fontFamily: isNeonTheme ? "'Orbitron', 'Rajdhani', sans-serif" : 
                                    isCyberpunk ? "'Audiowide', 'Rajdhani', sans-serif" : 
                                    currentTheme.font
                      }}>
                    <span className="inline-block w-2 h-2 mt-1.5 rounded-full" style={{ backgroundColor: '#ef4444' }}></span>
                    {req}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* In stock indicator */}
          <div className="flex items-center gap-1 mb-4">
            <span className="text-sm" style={{ color: currentTheme.textSecondary }}>
              {isNeonTheme ? 'AVAILABILITY:' : isCyberpunk ? 'AVAILABILITY:' : 'Availability:'}
            </span>
            <span className="text-sm font-medium" style={{ 
              color: item.inStock 
                ? '#22c55e' // green
                : '#ef4444' // red
            }}>
              {item.inStock 
                ? (isNeonTheme ? '[ IN STOCK ]' : isCyberpunk ? 'IN STOCK' : 'In Stock') 
                : (isNeonTheme ? '[ OUT OF STOCK ]' : isCyberpunk ? 'OUT OF STOCK' : 'Out of Stock')}
            </span>
          </div>
          
          {/* Quantity selector and add to cart */}
          {item.inStock && (
            <div className="space-y-4 mt-4">
              <div className="flex items-center">
                <button
                  onClick={() => {
                    const newQty = Math.max(1, quantity - 1);
                    addToCart(item, newQty - (existingItem?.quantity || 0));
                  }}
                  className="p-2 rounded"
                  style={{ 
                    backgroundColor: isNeonTheme || isCyberpunk ? 'transparent' : currentTheme.bgTertiary,
                    color: currentTheme.textSecondary,
                    border: isNeonTheme || isCyberpunk ? `1px solid ${currentTheme.borderColor}` : 'none',
                    borderRadius: currentTheme.radius
                  }}
                >
                  <MinusIcon className="w-4 h-4" />
                </button>
                
                <span className="w-10 text-center" style={{ color: currentTheme.textPrimary }}>
                  {quantity}
                </span>
                
                <button
                  onClick={() => {
                    const newQty = quantity + 1;
                    addToCart(item, 1);
                  }}
                  className="p-2 rounded"
                  style={{ 
                    backgroundColor: isNeonTheme || isCyberpunk ? 'transparent' : currentTheme.bgTertiary,
                    color: currentTheme.textSecondary,
                    border: isNeonTheme || isCyberpunk ? `1px solid ${currentTheme.borderColor}` : 'none',
                    borderRadius: currentTheme.radius
                  }}
                >
                  <PlusIcon className="w-4 h-4" />
                </button>
                
                <button
                  onClick={() => {
                    addToCart(item, quantity - (existingItem?.quantity || 0));
                    setShowCart(true);
                  }}
                  className={`ml-4 flex-1 py-2 rounded flex items-center justify-center gap-2 ${isNeonTheme ? 'sl-glow-text' : ''}`}
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
                  <ShoppingCartIcon className="w-5 h-5" />
                  {isNeonTheme 
                    ? '[ ADD TO CART ]' 
                    : isCyberpunk 
                    ? 'ADD TO CART' 
                    : 'Add to Cart'}
                </button>
              </div>
              
              <button
                onClick={() => {
                  if (existingItem) {
                    // Remove and add again to ensure correct quantity
                    addToCart(item, 1 - existingItem.quantity);
                  } else {
                    addToCart(item, 1);
                  }
                  onClose();
                  setShowCart(true);
                }}
                className={`w-full py-2.5 rounded-lg flex items-center justify-center gap-2 ${isNeonTheme ? 'sl-glow-text' : ''}`}
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
                <CurrencyDollarIcon className="w-5 h-5" />
                {isNeonTheme ? '[ BUY NOW ]' : isCyberpunk ? 'BUY NOW' : 'Buy Now'}
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ItemDetail;