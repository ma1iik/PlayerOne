import React, { useState } from "react";
import { useThemeStyles } from "../../context/ThemeProvider";
import { ArrowSmDownIcon, ArrowSmUpIcon } from "@heroicons/react/outline";

const FilterPanel = ({ 
  showFilters,
  activeFilters,
  handleFilterChange,
  sortOption,
  handleSort,
  resetFilters,
  filterOptions,
  mode = "shop" // "shop" or "inventory"
}) => {
  const { theme, styles } = useThemeStyles();

  // Helper function to get rarity color
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

  const isNeonTheme = theme.id.includes('neon');
  const isCyberpunk = theme.id === 'cyberpunk';

  if (!showFilters) return null;

  // Use the passed filters or create default ones
  const filters = activeFilters || {
    types: ['All', 'Weapon', 'Armor', 'Accessory', 'Consumable'],
    rarities: ['All', 'Common', 'Uncommon', 'Rare', 'Epic', 'Legendary'],
    type: '',
    rarity: '',
    minPrice: 0,
    maxPrice: 1000,
    featured: false,
    showEquipped: false
  };

  // Get themed filter/sort panel style
  const getFilterPanelStyle = () => {
    if (isNeonTheme) {
      return {
        backgroundColor: 'rgba(10, 10, 16, 0.9)',
        border: `1px solid ${theme.borderColor}`,
        boxShadow: `0 0 15px ${theme.shadowColor}`,
        borderRadius: theme.radius,
      };
    } else if (isCyberpunk) {
      return {
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        border: `1px solid ${theme.primaryColor}`,
        boxShadow: `0 0 10px ${theme.shadowColor}`,
        borderRadius: '0',
      };
    } else {
      return {
        backgroundColor: theme.bgSecondary,
        border: `1px solid ${theme.borderColor}`,
        boxShadow: theme.shadow,
        borderRadius: theme.radius,
      };
    }
  };

  // Get filter button style
  const getFilterButtonStyle = (isActive, color = null) => {
    if (isNeonTheme || isCyberpunk) {
      return {
        backgroundColor: isActive ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
        color: isActive 
          ? (color || theme.primaryColor)
          : (color || theme.textSecondary),
        borderRadius: theme.radius,
        border: `1px solid ${isActive 
          ? (color || theme.primaryColor) 
          : theme.borderColor}`,
        fontFamily: isNeonTheme 
          ? "'Orbitron', 'Rajdhani', sans-serif" 
          : isCyberpunk 
          ? "'Audiowide', 'Rajdhani', sans-serif" 
          : theme.font
      };
    }
    
    return {
      backgroundColor: isActive 
        ? (color ? `${color}20` : `${theme.primaryColor}20`) 
        : theme.bgTertiary,
      color: isActive 
        ? (color || theme.primaryColor)
        : theme.textSecondary,
      borderRadius: theme.radius,
      fontFamily: theme.font
    };
  };

  return (
    <div className="p-4" style={getFilterPanelStyle()}>
      <div className="flex flex-wrap items-start gap-6">
        {/* Type filter */}
        <div>
          <label className={`block text-sm mb-2 ${isNeonTheme ? 'sl-glow-text' : ''}`}
                 style={{ 
                   color: theme.textSecondary,
                   fontFamily: isNeonTheme ? "'Orbitron', 'Rajdhani', sans-serif" : 
                               isCyberpunk ? "'Audiowide', 'Rajdhani', sans-serif" : 
                               theme.font
                 }}>
            {isNeonTheme ? '[ TYPE ]' : isCyberpunk ? 'TYPE' : 'Type'}
          </label>
          <div className="flex flex-wrap gap-2">
            {filters.types.map(type => (
              <button
                key={type}
                onClick={() => handleFilterChange('type', type === 'All' ? '' : type)}
                className="px-3 py-1.5 text-sm transition-colors"
                style={getFilterButtonStyle(filters.type === (type === 'All' ? '' : type))}
              >
                {isNeonTheme ? type.toUpperCase() : type}
              </button>
            ))}
          </div>
        </div>
        
        {/* Rarity filter */}
        <div>
          <label className={`block text-sm mb-2 ${isNeonTheme ? 'sl-glow-text' : ''}`}
                 style={{ 
                   color: theme.textSecondary,
                   fontFamily: isNeonTheme ? "'Orbitron', 'Rajdhani', sans-serif" : 
                               isCyberpunk ? "'Audiowide', 'Rajdhani', sans-serif" : 
                               theme.font
                 }}>
            {isNeonTheme ? '[ RARITY ]' : isCyberpunk ? 'RARITY' : 'Rarity'}
          </label>
          <div className="flex flex-wrap gap-2">
            {filters.rarities.map(rarity => (
              <button
                key={rarity}
                onClick={() => handleFilterChange('rarity', rarity === 'All' ? '' : rarity)}
                className="px-3 py-1.5 text-sm transition-colors"
                style={getFilterButtonStyle(
                  filters.rarity === (rarity === 'All' ? '' : rarity),
                  rarity !== 'All' ? getRarityColor(rarity) : null
                )}
              >
                {isNeonTheme ? rarity.toUpperCase() : rarity}
              </button>
            ))}
          </div>
        </div>
        
        {/* Mode-specific filters */}
        {mode === "shop" ? (
          <>
            {/* Price range filter */}
            <div>
              <label className={`block text-sm mb-1 ${isNeonTheme ? 'sl-glow-text' : ''}`}
                    style={{ 
                      color: theme.textSecondary,
                      fontFamily: isNeonTheme ? "'Orbitron', 'Rajdhani', sans-serif" : 
                                  isCyberpunk ? "'Audiowide', 'Rajdhani', sans-serif" : 
                                  theme.font
                    }}>
                {isNeonTheme ? '[ PRICE RANGE ]' : isCyberpunk ? 'PRICE RANGE' : 'Price Range'}
              </label>
              <div className="flex items-center gap-2 mb-2">
                <input
                  type="number"
                  min="0"
                  max="1000"
                  value={filters.minPrice}
                  onChange={(e) => handleFilterChange('minPrice', parseInt(e.target.value) || 0)}
                  className={`w-20 px-2 py-1 text-sm ${isNeonTheme ? 'sl-glow-text' : ''}`}
                  style={{ 
                    backgroundColor: theme.inputBg,
                    color: theme.textPrimary,
                    borderColor: theme.inputBorder,
                    borderRadius: theme.radius,
                    border: `1px solid ${theme.borderColor}`,
                    fontFamily: isNeonTheme ? "'Orbitron', 'Rajdhani', sans-serif" : 
                                isCyberpunk ? "'Audiowide', 'Rajdhani', sans-serif" : 
                                theme.font
                  }}
                />
                <span style={{ color: theme.textSecondary }}>to</span>
                <input
                  type="number"
                  min="0"
                  max="1000"
                  value={filters.maxPrice}
                  onChange={(e) => handleFilterChange('maxPrice', parseInt(e.target.value) || 0)}
                  className={`w-20 px-2 py-1 text-sm ${isNeonTheme ? 'sl-glow-text' : ''}`}
                  style={{ 
                    backgroundColor: theme.inputBg,
                    color: theme.textPrimary,
                    borderColor: theme.inputBorder,
                    borderRadius: theme.radius,
                    border: `1px solid ${theme.borderColor}`,
                    fontFamily: isNeonTheme ? "'Orbitron', 'Rajdhani', sans-serif" : 
                                isCyberpunk ? "'Audiowide', 'Rajdhani', sans-serif" : 
                                theme.font
                  }}
                />
              </div>
            </div>
            
            {/* Featured filter */}
            <div>
              <label className={`block text-sm mb-1 ${isNeonTheme ? 'sl-glow-text' : ''}`}
                    style={{ 
                      color: theme.textSecondary,
                      fontFamily: isNeonTheme ? "'Orbitron', 'Rajdhani', sans-serif" : 
                                  isCyberpunk ? "'Audiowide', 'Rajdhani', sans-serif" : 
                                  theme.font
                    }}>
                {isNeonTheme ? '[ OPTIONS ]' : isCyberpunk ? 'OPTIONS' : 'Options'}
              </label>
              <div>
                <button
                  onClick={() => handleFilterChange('featured', !filters.featured)}
                  className="px-3 py-1.5 text-sm transition-colors"
                  style={getFilterButtonStyle(filters.featured)}
                >
                  {isNeonTheme ? '[ FEATURED ONLY ]' : isCyberpunk ? 'FEATURED ONLY' : 'Featured Only'}
                </button>
              </div>
            </div>
          </>
        ) : (
          <div>
            <label className={`block text-sm mb-1 ${isNeonTheme ? 'sl-glow-text' : ''}`}
                   style={{ 
                     color: theme.textSecondary,
                     fontFamily: isNeonTheme ? "'Orbitron', 'Rajdhani', sans-serif" : 
                                 isCyberpunk ? "'Audiowide', 'Rajdhani', sans-serif" : 
                                 theme.font
                   }}>
              {isNeonTheme ? '[ STATUS ]' : isCyberpunk ? 'STATUS' : 'Status'}
            </label>
            <div>
              <button
                onClick={() => handleFilterChange('showEquipped', !filters.showEquipped)}
                className="px-3 py-1.5 text-sm transition-colors"
                style={getFilterButtonStyle(filters.showEquipped)}
              >
                {isNeonTheme ? '[ EQUIPPED ONLY ]' : isCyberpunk ? 'EQUIPPED ONLY' : 'Equipped Only'}
              </button>
            </div>
          </div>
        )}
        
        {/* Sort options */}
        <div>
          <label className={`block text-sm mb-2 ${isNeonTheme ? 'sl-glow-text' : ''}`}
                 style={{ 
                   color: theme.textSecondary,
                   fontFamily: isNeonTheme ? "'Orbitron', 'Rajdhani', sans-serif" : 
                               isCyberpunk ? "'Audiowide', 'Rajdhani', sans-serif" : 
                               theme.font
                 }}>
            {isNeonTheme ? '[ SORT BY ]' : isCyberpunk ? 'SORT BY' : 'Sort By'}
          </label>
          <div className="flex flex-wrap gap-2">
            {[
              { field: 'name', label: 'Name' },
              ...(mode === 'shop' 
                ? [{ field: 'price', label: 'Price' }]
                : [{ field: 'quantity', label: 'Quantity' }]),
              { field: 'rarity', label: 'Rarity' },
            ].map(sort => (
              <button
                key={sort.field}
                onClick={() => handleSort(sort.field)}
                className="px-3 py-1.5 text-sm transition-colors flex items-center gap-1"
                style={getFilterButtonStyle(sortOption.field === sort.field)}
              >
                {isNeonTheme ? sort.label.toUpperCase() : sort.label}
                {sortOption.field === sort.field && (
                  sortOption.direction === 'asc' 
                    ? <ArrowSmUpIcon className="w-4 h-4" />
                    : <ArrowSmDownIcon className="w-4 h-4" />
                )}
              </button>
            ))}
          </div>
        </div>
        
        {/* Reset button */}
        <button
          onClick={resetFilters}
          className={`px-4 py-1.5 text-sm transition-colors mt-auto ${isNeonTheme ? 'sl-glow-text' : ''}`}
          style={{ 
            backgroundColor: isNeonTheme || isCyberpunk ? 'transparent' : 'rgba(239, 68, 68, 0.1)',
            color: '#ef4444',
            borderRadius: theme.radius,
            border: isNeonTheme || isCyberpunk ? `1px solid #ef4444` : 'none',
            fontFamily: isNeonTheme ? "'Orbitron', 'Rajdhani', sans-serif" : 
                        isCyberpunk ? "'Audiowide', 'Rajdhani', sans-serif" : 
                        theme.font
          }}
        >
          {isNeonTheme ? '[ RESET FILTERS ]' : isCyberpunk ? 'RESET FILTERS' : 'Reset Filters'}
        </button>
      </div>
    </div>
  );
};

export default FilterPanel;