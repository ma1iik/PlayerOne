import React, { useContext } from "react";
import { ArrowSmDownIcon, ArrowSmUpIcon } from "@heroicons/react/outline";
import ThemeContext from "../../context/ThemeContext";
import { getRarityColor } from "../../utils/itemUtils";

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
  const { currentTheme } = useContext(ThemeContext);
  const isNeonTheme = currentTheme.id.includes('neon');
  const isCyberpunk = currentTheme.id === 'cyberpunk';

  if (!showFilters) return null;

  // Get themed filter/sort panel style
  const getFilterPanelStyle = () => {
    if (isNeonTheme) {
      return {
        backgroundColor: 'rgba(10, 10, 16, 0.9)',
        border: `1px solid ${currentTheme.borderColor}`,
        boxShadow: `0 0 15px ${currentTheme.shadowColor}`,
        borderRadius: currentTheme.radius,
      };
    } else if (isCyberpunk) {
      return {
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        border: `1px solid ${currentTheme.primaryColor}`,
        boxShadow: `0 0 10px ${currentTheme.shadowColor}`,
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

  // Get filter button style
  const getFilterButtonStyle = (isActive, color = null) => {
    if (isNeonTheme || isCyberpunk) {
      return {
        backgroundColor: isActive ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
        color: isActive 
          ? (color || currentTheme.primaryColor)
          : (color || currentTheme.textSecondary),
        borderRadius: currentTheme.radius,
        border: `1px solid ${isActive 
          ? (color || currentTheme.primaryColor) 
          : currentTheme.borderColor}`,
        fontFamily: isNeonTheme 
          ? "'Orbitron', 'Rajdhani', sans-serif" 
          : isCyberpunk 
          ? "'Audiowide', 'Rajdhani', sans-serif" 
          : currentTheme.font
      };
    }
    
    return {
      backgroundColor: isActive 
        ? (color ? `${color}20` : `${currentTheme.primaryColor}20`) 
        : currentTheme.bgTertiary,
      color: isActive 
        ? (color || currentTheme.primaryColor)
        : currentTheme.textSecondary,
      borderRadius: currentTheme.radius,
      fontFamily: currentTheme.font
    };
  };

  return (
    <div className="p-4" style={getFilterPanelStyle()}>
      <div className="flex flex-wrap items-start gap-6">
        {/* Type filter */}
        <div>
          <label className={`block text-sm mb-2 ${isNeonTheme ? 'sl-glow-text' : ''}`}
                 style={{ 
                   color: currentTheme.textSecondary,
                   fontFamily: isNeonTheme ? "'Orbitron', 'Rajdhani', sans-serif" : 
                               isCyberpunk ? "'Audiowide', 'Rajdhani', sans-serif" : 
                               currentTheme.font
                 }}>
            {isNeonTheme ? '[ TYPE ]' : isCyberpunk ? 'TYPE' : 'Type'}
          </label>
          <div className="flex flex-wrap gap-2">
            {filterOptions.types.map(type => (
              <button
                key={type}
                onClick={() => handleFilterChange('type', type === 'All' ? '' : type)}
                className="px-3 py-1.5 text-sm transition-colors"
                style={getFilterButtonStyle(activeFilters.type === (type === 'All' ? '' : type))}
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
                   color: currentTheme.textSecondary,
                   fontFamily: isNeonTheme ? "'Orbitron', 'Rajdhani', sans-serif" : 
                               isCyberpunk ? "'Audiowide', 'Rajdhani', sans-serif" : 
                               currentTheme.font
                 }}>
            {isNeonTheme ? '[ RARITY ]' : isCyberpunk ? 'RARITY' : 'Rarity'}
          </label>
          <div className="flex flex-wrap gap-2">
            {filterOptions.rarities.map(rarity => (
              <button
                key={rarity}
                onClick={() => handleFilterChange('rarity', rarity === 'All' ? '' : rarity)}
                className="px-3 py-1.5 text-sm transition-colors"
                style={getFilterButtonStyle(
                  activeFilters.rarity === (rarity === 'All' ? '' : rarity),
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
                      color: currentTheme.textSecondary,
                      fontFamily: isNeonTheme ? "'Orbitron', 'Rajdhani', sans-serif" : 
                                  isCyberpunk ? "'Audiowide', 'Rajdhani', sans-serif" : 
                                  currentTheme.font
                    }}>
                {isNeonTheme ? '[ PRICE RANGE ]' : isCyberpunk ? 'PRICE RANGE' : 'Price Range'}
              </label>
              <div className="flex items-center gap-2 mb-2">
                <input
                  type="number"
                  min="0"
                  max="1000"
                  value={activeFilters.minPrice}
                  onChange={(e) => handleFilterChange('minPrice', parseInt(e.target.value) || 0)}
                  className={`w-20 px-2 py-1 text-sm ${isNeonTheme ? 'sl-glow-text' : ''}`}
                  style={{ 
                    backgroundColor: currentTheme.inputBg,
                    color: currentTheme.textPrimary,
                    borderColor: currentTheme.inputBorder,
                    borderRadius: currentTheme.radius,
                    border: `1px solid ${currentTheme.borderColor}`,
                    fontFamily: isNeonTheme ? "'Orbitron', 'Rajdhani', sans-serif" : 
                                isCyberpunk ? "'Audiowide', 'Rajdhani', sans-serif" : 
                                currentTheme.font
                  }}
                />
                <span style={{ color: currentTheme.textSecondary }}>to</span>
                <input
                  type="number"
                  min="0"
                  max="1000"
                  value={activeFilters.maxPrice}
                  onChange={(e) => handleFilterChange('maxPrice', parseInt(e.target.value) || 0)}
                  className={`w-20 px-2 py-1 text-sm ${isNeonTheme ? 'sl-glow-text' : ''}`}
                  style={{ 
                    backgroundColor: currentTheme.inputBg,
                    color: currentTheme.textPrimary,
                    borderColor: currentTheme.inputBorder,
                    borderRadius: currentTheme.radius,
                    border: `1px solid ${currentTheme.borderColor}`,
                    fontFamily: isNeonTheme ? "'Orbitron', 'Rajdhani', sans-serif" : 
                                isCyberpunk ? "'Audiowide', 'Rajdhani', sans-serif" : 
                                currentTheme.font
                  }}
                />
              </div>
            </div>
            
            {/* Featured filter */}
            <div>
              <label className={`block text-sm mb-1 ${isNeonTheme ? 'sl-glow-text' : ''}`}
                    style={{ 
                      color: currentTheme.textSecondary,
                      fontFamily: isNeonTheme ? "'Orbitron', 'Rajdhani', sans-serif" : 
                                  isCyberpunk ? "'Audiowide', 'Rajdhani', sans-serif" : 
                                  currentTheme.font
                    }}>
                {isNeonTheme ? '[ OPTIONS ]' : isCyberpunk ? 'OPTIONS' : 'Options'}
              </label>
              <div>
                <button
                  onClick={() => handleFilterChange('featured', !activeFilters.featured)}
                  className="px-3 py-1.5 text-sm transition-colors"
                  style={getFilterButtonStyle(activeFilters.featured)}
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
                     color: currentTheme.textSecondary,
                     fontFamily: isNeonTheme ? "'Orbitron', 'Rajdhani', sans-serif" : 
                                 isCyberpunk ? "'Audiowide', 'Rajdhani', sans-serif" : 
                                 currentTheme.font
                   }}>
              {isNeonTheme ? '[ STATUS ]' : isCyberpunk ? 'STATUS' : 'Status'}
            </label>
            <div>
              <button
                onClick={() => handleFilterChange('showEquipped', !activeFilters.showEquipped)}
                className="px-3 py-1.5 text-sm transition-colors"
                style={getFilterButtonStyle(activeFilters.showEquipped)}
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
                   color: currentTheme.textSecondary,
                   fontFamily: isNeonTheme ? "'Orbitron', 'Rajdhani', sans-serif" : 
                               isCyberpunk ? "'Audiowide', 'Rajdhani', sans-serif" : 
                               currentTheme.font
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
            borderRadius: currentTheme.radius,
            border: isNeonTheme || isCyberpunk ? `1px solid #ef4444` : 'none',
            fontFamily: isNeonTheme ? "'Orbitron', 'Rajdhani', sans-serif" : 
                        isCyberpunk ? "'Audiowide', 'Rajdhani', sans-serif" : 
                        currentTheme.font
          }}
        >
          {isNeonTheme ? '[ RESET FILTERS ]' : isCyberpunk ? 'RESET FILTERS' : 'Reset Filters'}
        </button>
      </div>
    </div>
  );
};

export default FilterPanel;