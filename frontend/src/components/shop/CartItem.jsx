import React, { useContext } from "react"; 
import { PlusIcon, MinusIcon, XIcon } from "@heroicons/react/outline";
import ThemeContext from "../../context/ThemeContext";
import { getRarityColor, getScanLineClass, getScanLineStyle } from "../../utils/itemUtils.js";

const CartItem = ({ item, updateQuantity, removeItem }) => {
  const { currentTheme } = useContext(ThemeContext);


  const isNeonTheme = currentTheme.id.includes('neon');
  const isCyberpunk = currentTheme.id === 'cyberpunk';

  return (
    <div key={item.id} 
         className={`flex items-center gap-4 p-3 ${getScanLineClass(item, isNeonTheme)}`}
         style={{ 
           backgroundColor: isNeonTheme || isCyberpunk ? 'rgba(255, 255, 255, 0.05)' : currentTheme.bgTertiary,
           borderRadius: currentTheme.radius,
           borderLeft: `3px solid ${getRarityColor(item.rarity)}`,
           ...getScanLineStyle(item, isNeonTheme)
         }}>
      {/* Item image */}
      <div 
        className="w-12 h-12 flex items-center justify-center" 
        style={{ 
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          borderRadius: currentTheme.radius
        }}
      >
        <img 
          src={item.image} 
          alt={item.name}
          className="w-10 h-10 object-contain"
        />
      </div>
      
      {/* Item details */}
      <div className="flex-1 min-w-0">
        <h4 className={`font-medium truncate ${isNeonTheme ? 'sl-glow-text' : ''}`}
            style={{ 
              color: currentTheme.textPrimary,
              fontFamily: isNeonTheme ? "'Orbitron', 'Rajdhani', sans-serif" : 
                          isCyberpunk ? "'Audiowide', 'Rajdhani', sans-serif" : 
                          currentTheme.font
            }}>
          {isNeonTheme ? item.name.toUpperCase() : item.name}
        </h4>
        <div className="flex items-center gap-2 text-sm">
          <span style={{ color: getRarityColor(item.rarity) }}>
            {item.rarity}
          </span>
          <span style={{ color: currentTheme.textSecondary }}>
            {item.type}
          </span>
        </div>
      </div>
      
      {/* Price, quantity and remove */}
      <div className="flex items-center gap-2">
        <div className="flex items-center">
          <button
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="p-1 rounded"
            style={{ 
              backgroundColor: isNeonTheme || isCyberpunk ? 'transparent' : currentTheme.bgSecondary,
              color: currentTheme.textSecondary,
              border: isNeonTheme || isCyberpunk ? `1px solid ${currentTheme.borderColor}` : 'none',
              borderRadius: currentTheme.radius
            }}
          >
            <MinusIcon className="w-4 h-4" />
          </button>
          
          <span className="w-8 text-center" style={{ color: currentTheme.textPrimary }}>
            {item.quantity}
          </span>
          
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="p-1 rounded"
            style={{ 
              backgroundColor: isNeonTheme || isCyberpunk ? 'transparent' : currentTheme.bgSecondary,
              color: currentTheme.textSecondary,
              border: isNeonTheme || isCyberpunk ? `1px solid ${currentTheme.borderColor}` : 'none',
              borderRadius: currentTheme.radius
            }}
          >
            <PlusIcon className="w-4 h-4" />
          </button>
        </div>
        
        <div className="flex items-center gap-1 ml-4 min-w-[70px]">
          <span role="img" aria-label="Currency" className="text-sm">
            {item.currency === 'gems' ? '💎' : '🪙'}
          </span>
          <span className="font-semibold" style={{ color: currentTheme.textPrimary }}>
            {item.price * item.quantity}
          </span>
        </div>
        
        <button
          onClick={() => removeItem(item.id)}
          className="p-1 rounded ml-2"
          style={{ 
            backgroundColor: isNeonTheme || isCyberpunk ? 'transparent' : 'rgba(239, 68, 68, 0.1)',
            color: '#ef4444',
            border: isNeonTheme || isCyberpunk ? '1px solid #ef4444' : 'none',
            borderRadius: currentTheme.radius
          }}
        >
          <XIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;