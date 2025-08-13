import React from "react";
import { PlusIcon, MinusIcon, XIcon } from "@heroicons/react/outline";
import { useThemeStyles } from "../../context/ThemeProvider";
import { getRarityColor, getScanLineClass, getScanLineStyle } from "../../utils/itemUtils.js";

const CartItem = ({ item, updateQuantity, removeItem }) => {
  const { theme, styles } = useThemeStyles();

  // Helper functions
  const getTextClasses = (baseClasses = '', isHighlighted = false) => {
    let classes = baseClasses;
    if (theme.features.hasGlowEffects && isHighlighted) {
      classes += ' sl-glow-text';
    }
    return classes.trim();
  };

  const getThemedText = (text) => styles.shouldTransform(text);

  return (
    <div 
      className="flex items-center gap-3 p-3 rounded-lg"
      style={styles.getCardStyle()}
    >
      {/* Item Image */}
      <div 
        className="w-16 h-16 rounded-lg flex items-center justify-center relative overflow-hidden"
        style={{ 
          backgroundColor: theme.bgTertiary,
          border: `2px solid ${getRarityColor(item.rarity)}`,
          borderRadius: theme.features.hasSharpCorners ? '0' : theme.radius,
        }}
      >
        <img 
          src={item.image} 
          alt={item.name}
          className="w-full h-full object-cover"
        />
        {theme.features.hasGlowEffects && (
          <div 
            className={getScanLineClass(item.rarity)}
            style={getScanLineStyle(item.rarity)}
          />
        )}
      </div>

      {/* Item Details */}
      <div className="flex-1 min-w-0">
        <h4 className={getTextClasses('font-medium truncate', true)} style={{ color: theme.textPrimary }}>
          {getThemedText(item.name)}
        </h4>
        <p className="text-sm" style={{ color: theme.textSecondary }}>
          {getThemedText(`${item.price} coins each`)}
        </p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
          className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
          style={{
            backgroundColor: theme.bgTertiary,
            color: theme.textSecondary,
            border: `1px solid ${theme.borderColor}`,
          }}
        >
          <MinusIcon className="w-4 h-4" />
        </button>
        
        <span 
          className={getTextClasses('w-8 text-center font-medium', true)}
          style={{ color: theme.textPrimary }}
        >
          {item.quantity}
        </span>
        
        <button
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
          className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
          style={{
            backgroundColor: theme.primaryColor,
            color: '#ffffff',
          }}
        >
          <PlusIcon className="w-4 h-4" />
        </button>
      </div>

      {/* Remove Button */}
      <button
        onClick={() => removeItem(item.id)}
        className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-red-500"
        style={{
          backgroundColor: theme.bgTertiary,
          color: theme.textSecondary,
          border: `1px solid ${theme.borderColor}`,
        }}
      >
        <XIcon className="w-4 h-4" />
      </button>
    </div>
  );
};

export default CartItem;