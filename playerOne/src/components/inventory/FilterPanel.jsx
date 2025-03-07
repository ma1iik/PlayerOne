import React, { useContext } from "react";
import { ArrowSmDownIcon, ArrowSmUpIcon } from "@heroicons/react/outline";
import ThemeContext from "../../context/ThemeContext";
import { getRarityColor } from "../../utils/inventoryUtils";

const FilterPanel = ({ 
  showFilters, 
  activeFilters, 
  handleFilterChange, 
  sortOption, 
  handleSort, 
  resetFilters,
  filterOptions
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
        ? (color ? `${color}20` : currentTheme.primaryColor) 
        : currentTheme.bgTertiary,
      color: isActive 
        ? (color || '#ffffff')
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
        
        {/* Equipped filter */}
        <div>
          <label className={`block text-sm mb-2 ${isNeonTheme ? 'sl-glow-text' : ''}`}
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
              { field: 'rarity', label: 'Rarity' },
              { field: 'quantity', label: 'Quantity' }
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