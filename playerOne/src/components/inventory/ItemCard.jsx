import React, { useContext } from "react";
import ThemeContext from "../../context/ThemeContext";
import { getRarityColor, getScanLineClass, getScanLineStyle } from "../../utils/inventoryUtils";

const ItemCard = ({ item, onSelectItem }) => {
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

  return (
    <div 
      className={`cursor-pointer transition-all duration-200 ${getScanLineClass(item, isNeonTheme)}`}
      style={{
        ...getItemCardStyle(),
        ...getScanLineStyle(item, isNeonTheme)
      }}
      onClick={() => onSelectItem(item)}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.02)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
      }}
    >
      <div className="p-4 flex flex-col">
        {/* Larger image container */}
        <div 
          className="w-full aspect-square flex items-center justify-center mb-3" 
          style={{ 
            backgroundColor: isNeonTheme || isCyberpunk ? 'rgba(0, 0, 0, 0.3)' : currentTheme.bgTertiary,
            borderRadius: currentTheme.radius
          }}
        >
          <img 
            src={item.image} 
            alt={item.name}
            className="w-3/4 h-3/4 object-contain"
          />
        </div>
        
        {/* Item information below the image */}
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
        
        <div className="mt-2 flex justify-between items-center">
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
        </div>
      </div>
    </div>
  );
};

export default ItemCard;