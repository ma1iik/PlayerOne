import React, { useState, useContext, useEffect } from "react";
import { 
  BriefcaseIcon, 
  FilterIcon, 
  SearchIcon, 
  ViewGridIcon, 
  ViewListIcon,
  ArrowSmDownIcon,
  ArrowSmUpIcon,
  CogIcon,
  TrashIcon
} from "@heroicons/react/outline";
import ThemeContext from "../context/ThemeContext";

const Inventory = () => {
  const { currentTheme } = useContext(ThemeContext);
  const isNeonTheme = currentTheme.id.includes('neon');
  const isCyberpunk = currentTheme.id === 'cyberpunk';

  // Sample inventory data
  const [items, setItems] = useState([
    { 
      id: 1, 
      name: "Health Potion", 
      type: "Consumable", 
      rarity: "Common",
      quantity: 5, 
      effects: ["Restores 20 HP", "+5% HP regeneration for 10s"],
      description: "A basic healing potion that restores a small amount of health.",
      equipped: false,
      stats: { power: 0, defense: 0, speed: 0, utility: 2 },
      image: "https://via.placeholder.com/80?text=Potion"
    },
    { 
      id: 2, 
      name: "Magic Scroll", 
      type: "Quest Item", 
      rarity: "Rare",
      quantity: 2, 
      effects: ["Required for 'The Ancient Runes' quest"],
      description: "A mysterious scroll with ancient runes. Scholars might be interested in this.",
      equipped: false,
      stats: { power: 0, defense: 0, speed: 0, utility: 4 },
      image: "https://via.placeholder.com/80?text=Scroll"
    },
    { 
      id: 3, 
      name: "Steel Sword", 
      type: "Equipment", 
      subtype: "Weapon",
      rarity: "Uncommon",
      quantity: 1, 
      effects: ["+10 Attack", "+5% Critical Hit Chance"],
      description: "A well-crafted steel sword. Reliable and durable in combat.",
      equipped: true,
      stats: { power: 3, defense: 0, speed: 1, utility: 0 },
      image: "https://via.placeholder.com/80?text=Sword"
    },
    { 
      id: 4, 
      name: "Leather Armor", 
      type: "Equipment", 
      subtype: "Armor",
      rarity: "Common",
      quantity: 1, 
      effects: ["+15 Defense", "-5% Movement Speed"],
      description: "Basic leather armor offering some protection without significantly restricting movement.",
      equipped: true,
      stats: { power: 0, defense: 2, speed: -1, utility: 0 },
      image: "https://via.placeholder.com/80?text=Armor"
    },
    { 
      id: 5, 
      name: "Swift Boots", 
      type: "Equipment", 
      subtype: "Footwear",
      rarity: "Uncommon",
      quantity: 1, 
      effects: ["+10% Movement Speed", "+5% Dodge Chance"],
      description: "Lightweight boots that allow for quick movement and nimble footwork.",
      equipped: false,
      stats: { power: 0, defense: 0, speed: 3, utility: 1 },
      image: "https://via.placeholder.com/80?text=Boots"
    },
    { 
      id: 6, 
      name: "Golden Key", 
      type: "Special", 
      rarity: "Epic",
      quantity: 3, 
      effects: ["Opens special chests", "Required for certain areas"],
      description: "A shimmering golden key. It seems to be made for a special lock.",
      equipped: false,
      stats: { power: 0, defense: 0, speed: 0, utility: 5 },
      image: "https://via.placeholder.com/80?text=Key"
    },
    { 
      id: 7, 
      name: "Mana Crystal", 
      type: "Consumable", 
      rarity: "Uncommon",
      quantity: 8, 
      effects: ["Restores 30 MP", "+10% Spell Power for 30s"],
      description: "A crystal pulsing with magical energy. Useful for spellcasters.",
      equipped: false,
      stats: { power: 0, defense: 0, speed: 0, utility: 3 },
      image: "https://via.placeholder.com/80?text=Crystal"
    },
    { 
      id: 8, 
      name: "Dragon Scale", 
      type: "Material", 
      rarity: "Epic",
      quantity: 2, 
      effects: ["Crafting material for high-tier equipment"],
      description: "A tough, shimmering scale from a dragon. Highly sought after by crafters.",
      equipped: false,
      stats: { power: 0, defense: 0, speed: 0, utility: 4 },
      image: "https://via.placeholder.com/80?text=Scale"
    },
  ]);

  // State for view options, filters, sort and search
  const [viewMode, setViewMode] = useState("grid"); // "grid" or "list"
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState({
    type: "",
    rarity: "",
    equipped: false,
    showEquipped: false
  });
  const [sortOption, setSortOption] = useState({ field: "name", direction: "asc" });
  const [showFilters, setShowFilters] = useState(false);

  // Filter options
  const filterOptions = {
    types: ["All", "Equipment", "Consumable", "Quest Item", "Special", "Material"],
    rarities: ["All", "Common", "Uncommon", "Rare", "Epic", "Legendary"],
  };

  // Handle toggling item equip status
  const toggleEquip = (id) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, equipped: !item.equipped } : item
    ));
  };

  // Function to get filtered and sorted items
  const getFilteredItems = () => {
    return items
      .filter(item => {
        // Search filter
        if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase())) {
          return false;
        }
        
        // Type filter
        if (activeFilters.type && activeFilters.type !== "All" && item.type !== activeFilters.type) {
          return false;
        }
        
        // Rarity filter
        if (activeFilters.rarity && activeFilters.rarity !== "All" && item.rarity !== activeFilters.rarity) {
          return false;
        }
        
        // Equipped filter
        if (activeFilters.showEquipped && !item.equipped) {
          return false;
        }
        
        return true;
      })
      .sort((a, b) => {
        const fieldA = a[sortOption.field];
        const fieldB = b[sortOption.field];
        
        if (typeof fieldA === 'string') {
          return sortOption.direction === 'asc' 
            ? fieldA.localeCompare(fieldB) 
            : fieldB.localeCompare(fieldA);
        } else {
          return sortOption.direction === 'asc' 
            ? fieldA - fieldB 
            : fieldB - fieldA;
        }
      });
  };

  // Get filtered items
  const filteredItems = getFilteredItems();

  // Handle sort changes
  const handleSort = (field) => {
    if (sortOption.field === field) {
      // Toggle direction if same field
      setSortOption({
        field,
        direction: sortOption.direction === 'asc' ? 'desc' : 'asc'
      });
    } else {
      // New field, default to asc
      setSortOption({
        field,
        direction: 'asc'
      });
    }
  };

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    setActiveFilters({
      ...activeFilters,
      [filterType]: value
    });
  };

  // Reset all filters
  const resetFilters = () => {
    setActiveFilters({
      type: "",
      rarity: "",
      equipped: false,
      showEquipped: false
    });
    setSearchQuery("");
  };

  // Get rarity color
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

  // Get themed item card style
  const getItemCardStyle = (item) => {
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

  // Get themed detail panel style
  const getDetailPanelStyle = () => {
    if (selectedItem) {
      const rarityColor = getRarityColor(selectedItem.rarity);
      
      if (isNeonTheme) {
        return {
          backgroundColor: 'rgba(10, 10, 16, 0.8)',
          border: `1px solid ${rarityColor}`,
          boxShadow: `0 0 15px ${rarityColor}80`,
          borderRadius: currentTheme.radius,
        };
      } else if (isCyberpunk) {
        return {
          backgroundColor: 'rgba(15, 23, 42, 0.8)',
          border: `1px solid ${rarityColor}`,
          boxShadow: `0 0 10px ${rarityColor}40`,
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
    }
    
    return {
      backgroundColor: currentTheme.bgSecondary,
      border: `1px solid ${currentTheme.borderColor}`,
      boxShadow: currentTheme.shadow,
      borderRadius: currentTheme.radius,
    };
  };

  const getScanLineClass = (item, isNeonTheme) => {
    if (!isNeonTheme) return '';
  
    return 'sl-scan-line-custom';
  };
  // Get custom scan line style for an item
  const getScanLineStyle = (item, isNeonTheme) => {
    if (!isNeonTheme) return {};
  
    const rarityColor = getRarityColor(item.rarity);
    return {
      '--scan-line-color': rarityColor
    };
  };

  return (
    <div className="flex flex-col flex-1 font-sans p-6"
         style={{ 
           backgroundColor: currentTheme.bgPrimary,
           backgroundImage: isNeonTheme ? 
             `linear-gradient(to bottom, rgba(10, 10, 16, 0.95), rgba(10, 10, 16, 0.98)),
              repeating-linear-gradient(45deg, rgba(30, 30, 41, 0.2) 0px, rgba(30, 30, 41, 0.2) 1px, transparent 1px, transparent 10px),
              repeating-linear-gradient(-45deg, rgba(30, 30, 41, 0.2) 0px, rgba(30, 30, 41, 0.2) 1px, transparent 1px, transparent 10px)` : 
             isCyberpunk ?
             `linear-gradient(to bottom, rgba(2, 6, 23, 0.98), rgba(2, 6, 23, 0.95)),
              repeating-linear-gradient(90deg, rgba(244, 63, 94, 0.05) 0px, rgba(244, 63, 94, 0.05) 1px, transparent 1px, transparent 10px),
              repeating-linear-gradient(0deg, rgba(14, 165, 233, 0.05) 0px, rgba(14, 165, 233, 0.05) 1px, transparent 1px, transparent 10px)` : 
             'none'
         }}>
      <div className="w-full max-w-7xl mx-auto">
        {/* Header */}
        <div className="p-4 flex items-center justify-between" 
             style={{ 
               backgroundColor: currentTheme.bgSecondary, 
               borderBottom: `1px solid ${currentTheme.borderColor}`,
               borderRadius: `${currentTheme.radius} ${currentTheme.radius} 0 0`,
               boxShadow: isNeonTheme || isCyberpunk ? `0 0 15px ${currentTheme.shadowColor}` : 'none'
             }}>
          <div className="flex items-center gap-2">
            <BriefcaseIcon className="w-6 h-6" style={{ color: currentTheme.primaryColor }} />
            <h2 className={`text-xl font-semibold ${isNeonTheme ? 'sl-glow-text' : ''}`}
                style={{ 
                  color: currentTheme.textPrimary,
                  fontFamily: isNeonTheme ? "'Orbitron', 'Rajdhani', sans-serif" : 
                              isCyberpunk ? "'Audiowide', 'Rajdhani', sans-serif" : 
                              currentTheme.font
                }}>
              {isNeonTheme ? '[ INVENTORY ]' : isCyberpunk ? 'INVENTORY' : 'Inventory'}
            </h2>
          </div>
          <div className="flex items-center gap-3">
            {/* Currency display */}
            <div className="flex items-center gap-1 px-3 py-1 rounded"
                 style={{ 
                   backgroundColor: isNeonTheme || isCyberpunk ? 'transparent' : currentTheme.bgTertiary,
                   border: isNeonTheme || isCyberpunk ? `1px solid ${currentTheme.borderColor}` : 'none',
                   borderRadius: currentTheme.radius
                 }}>
              <span role="img" aria-label="Coin" title="Coins">🪙</span>
              <span style={{ color: currentTheme.textPrimary }}>1,250</span>
            </div>
            <div className="flex items-center gap-1 px-3 py-1 rounded"
                 style={{ 
                   backgroundColor: isNeonTheme || isCyberpunk ? 'transparent' : currentTheme.bgTertiary,
                   border: isNeonTheme || isCyberpunk ? `1px solid ${currentTheme.borderColor}` : 'none',
                   borderRadius: currentTheme.radius
                 }}>
              <span role="img" aria-label="Gem" title="Gems">💎</span>
              <span style={{ color: currentTheme.textPrimary }}>75</span>
            </div>

            {/* Search bar */}
            <div className="relative">
              <input
                type="text"
                placeholder={isNeonTheme ? "[ SEARCH ]" : isCyberpunk ? "SEARCH" : "Search items..."}
                className={`pl-9 pr-4 py-2 w-48 border focus:outline-none ${isNeonTheme ? 'sl-glow-text' : ''}`}
                style={{ 
                  backgroundColor: currentTheme.inputBg,
                  color: currentTheme.textPrimary,
                  borderColor: currentTheme.inputBorder,
                  borderRadius: currentTheme.radius,
                  fontFamily: isNeonTheme ? "'Orbitron', 'Rajdhani', sans-serif" : 
                              isCyberpunk ? "'Audiowide', 'Rajdhani', sans-serif" : 
                              currentTheme.font
                }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <SearchIcon className="w-4 h-4 absolute left-3 top-3" style={{ color: currentTheme.textSecondary }} />
            </div>
            
            {/* View mode toggle */}
            <div className="flex border rounded"
                 style={{ 
                   backgroundColor: currentTheme.bgTertiary,
                   borderColor: currentTheme.borderColor,
                   borderRadius: currentTheme.radius
                 }}>
              <button
                onClick={() => setViewMode("grid")}
                className="p-2 transition-colors"
                style={{ 
                  backgroundColor: viewMode === "grid" ? currentTheme.primaryColor : 'transparent',
                  color: viewMode === "grid" ? '#ffffff' : currentTheme.textSecondary,
                  borderTopLeftRadius: currentTheme.radius,
                  borderBottomLeftRadius: currentTheme.radius
                }}
              >
                <ViewGridIcon className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className="p-2 transition-colors"
                style={{ 
                  backgroundColor: viewMode === "list" ? currentTheme.primaryColor : 'transparent',
                  color: viewMode === "list" ? '#ffffff' : currentTheme.textSecondary,
                  borderTopRightRadius: currentTheme.radius,
                  borderBottomRightRadius: currentTheme.radius
                }}
              >
                <ViewListIcon className="w-5 h-5" />
              </button>
            </div>
            
            {/* Filter toggle button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${isNeonTheme ? 'sl-glow-text' : ''}`}
              style={{ 
                backgroundColor: isNeonTheme || isCyberpunk ? 'transparent' : 
                  showFilters ? currentTheme.primaryColor : `${currentTheme.primaryColor}20`,
                color: showFilters ? (isNeonTheme || isCyberpunk ? currentTheme.primaryColor : '#ffffff') : currentTheme.primaryColor,
                borderRadius: currentTheme.radius,
                border: isNeonTheme || isCyberpunk ? `1px solid ${currentTheme.primaryColor}` : 'none'
              }}
            >
              <FilterIcon className="w-5 h-5" />
              {isNeonTheme ? '[ FILTERS ]' : isCyberpunk ? 'FILTERS' : 'Filters'}
            </button>
          </div>
        </div>
        
        {/* Filters panel (collapsible) */}
        {showFilters && (
          <div className="p-4" style={getFilterPanelStyle()}>
            <div className="flex flex-wrap items-start gap-6">
              {/* Type filter */}
              <div>
                <label className={`block text-sm mb-1 ${isNeonTheme ? 'sl-glow-text' : ''}`}
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
                      className="px-3 py-1 text-sm transition-colors"
                      style={{ 
                        backgroundColor: activeFilters.type === (type === 'All' ? '' : type) 
                          ? currentTheme.primaryColor 
                          : isNeonTheme || isCyberpunk ? 'transparent' : currentTheme.bgTertiary,
                        color: activeFilters.type === (type === 'All' ? '' : type)
                          ? '#ffffff'
                          : currentTheme.textSecondary,
                        borderRadius: currentTheme.radius,
                        border: isNeonTheme || isCyberpunk ? `1px solid ${currentTheme.borderColor}` : 'none',
                        fontFamily: isNeonTheme ? "'Orbitron', 'Rajdhani', sans-serif" : 
                                    isCyberpunk ? "'Audiowide', 'Rajdhani', sans-serif" : 
                                    currentTheme.font
                      }}
                    >
                      {isNeonTheme ? type.toUpperCase() : type}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Rarity filter */}
              <div>
                <label className={`block text-sm mb-1 ${isNeonTheme ? 'sl-glow-text' : ''}`}
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
                      className="px-3 py-1 text-sm transition-colors"
                      style={{ 
                        backgroundColor: activeFilters.rarity === (rarity === 'All' ? '' : rarity)
                          ? rarity === 'All' ? currentTheme.primaryColor : getRarityColor(rarity)
                          : isNeonTheme || isCyberpunk ? 'transparent' : currentTheme.bgTertiary,
                        color: activeFilters.rarity === (rarity === 'All' ? '' : rarity)
                          ? '#ffffff'
                          : rarity === 'All' ? currentTheme.textSecondary : getRarityColor(rarity),
                        borderRadius: currentTheme.radius,
                        border: isNeonTheme || isCyberpunk 
                          ? `1px solid ${rarity === 'All' ? currentTheme.borderColor : getRarityColor(rarity)}` 
                          : 'none',
                        fontFamily: isNeonTheme ? "'Orbitron', 'Rajdhani', sans-serif" : 
                                    isCyberpunk ? "'Audiowide', 'Rajdhani', sans-serif" : 
                                    currentTheme.font
                      }}
                    >
                      {isNeonTheme ? rarity.toUpperCase() : rarity}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Equipped filter */}
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
                    className="px-3 py-1 text-sm transition-colors"
                    style={{ 
                      backgroundColor: activeFilters.showEquipped 
                        ? currentTheme.primaryColor 
                        : isNeonTheme || isCyberpunk ? 'transparent' : currentTheme.bgTertiary,
                      color: activeFilters.showEquipped ? '#ffffff' : currentTheme.textSecondary,
                      borderRadius: currentTheme.radius,
                      border: isNeonTheme || isCyberpunk ? `1px solid ${currentTheme.borderColor}` : 'none',
                      fontFamily: isNeonTheme ? "'Orbitron', 'Rajdhani', sans-serif" : 
                                  isCyberpunk ? "'Audiowide', 'Rajdhani', sans-serif" : 
                                  currentTheme.font
                    }}
                  >
                    {isNeonTheme ? '[ EQUIPPED ONLY ]' : isCyberpunk ? 'EQUIPPED ONLY' : 'Equipped Only'}
                  </button>
                </div>
              </div>
              
              {/* Sort options */}
              <div>
                <label className={`block text-sm mb-1 ${isNeonTheme ? 'sl-glow-text' : ''}`}
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
                      className="px-3 py-1 text-sm transition-colors flex items-center gap-1"
                      style={{ 
                        backgroundColor: sortOption.field === sort.field 
                          ? currentTheme.primaryColor 
                          : isNeonTheme || isCyberpunk ? 'transparent' : currentTheme.bgTertiary,
                        color: sortOption.field === sort.field ? '#ffffff' : currentTheme.textSecondary,
                        borderRadius: currentTheme.radius,
                        border: isNeonTheme || isCyberpunk ? `1px solid ${currentTheme.borderColor}` : 'none',
                        fontFamily: isNeonTheme ? "'Orbitron', 'Rajdhani', sans-serif" : 
                                    isCyberpunk ? "'Audiowide', 'Rajdhani', sans-serif" : 
                                    currentTheme.font
                      }}
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
                className={`px-3 py-1 text-sm transition-colors mt-auto ${isNeonTheme ? 'sl-glow-text' : ''}`}
                style={{ 
                  backgroundColor: isNeonTheme || isCyberpunk ? 'transparent' : currentTheme.bgTertiary,
                  color: currentTheme.textSecondary,
                  borderRadius: currentTheme.radius,
                  border: isNeonTheme || isCyberpunk ? `1px solid ${currentTheme.borderColor}` : 'none',
                  fontFamily: isNeonTheme ? "'Orbitron', 'Rajdhani', sans-serif" : 
                              isCyberpunk ? "'Audiowide', 'Rajdhani', sans-serif" : 
                              currentTheme.font
                }}
              >
                {isNeonTheme ? '[ RESET FILTERS ]' : isCyberpunk ? 'RESET FILTERS' : 'Reset Filters'}
              </button>
            </div>
          </div>
        )}
        
        <div className="flex flex-1 gap-6">
          {/* Main content */}
          <div className="flex-1 p-4" style={{ 
            backgroundColor: 'transparent',
          }}>
            {/* Item count and results info */}
            <div className="mb-4" style={{ color: currentTheme.textSecondary }}>
              <span className={isNeonTheme ? 'sl-glow-text' : ''}
                    style={{ 
                      fontFamily: isNeonTheme ? "'Orbitron', 'Rajdhani', sans-serif" : 
                                  isCyberpunk ? "'Audiowide', 'Rajdhani', sans-serif" : 
                                  currentTheme.font
                    }}>
                {isNeonTheme 
                  ? `[ ${filteredItems.length} ITEMS ]` 
                  : isCyberpunk 
                  ? `${filteredItems.length} ITEMS FOUND` 
                  : `${filteredItems.length} items found`}
              </span>
            </div>
            
            {/* Grid view */}
            {viewMode === "grid" && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredItems.map((item) => (
                  <div 
                  key={item.id} 
                  className={`grid grid-cols-12 gap-2 p-3 cursor-pointer items-center ${getScanLineClass(item, isNeonTheme)}`}
                  style={{
                    ...getItemCardStyle(item),
                    backgroundColor: selectedItem?.id === item.id 
                      ? isNeonTheme || isCyberpunk 
                        ? 'rgba(255, 255, 255, 0.05)' 
                        : `${currentTheme.primaryColor}10`
                      : 'transparent',
                    ...getScanLineStyle(item, isNeonTheme)
                  }}
                  onClick={() => setSelectedItem(item)}
                
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.02)';
                    }}
                    onMouseLeave={(e) => {
                      if (selectedItem?.id !== item.id) {
                        e.currentTarget.style.transform = 'scale(1)';
                      }
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
                ))}
              </div>
            )}
            
            {/* List view */}
            {viewMode === "list" && (
              <div className="flex flex-col space-y-2">
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
                  <div className="col-span-4">
                    {isNeonTheme ? '[ NAME ]' : isCyberpunk ? 'NAME' : 'Name'}
                  </div>
                  <div className="col-span-2">
                    {isNeonTheme ? '[ TYPE ]' : isCyberpunk ? 'TYPE' : 'Type'}
                  </div>
                  <div className="col-span-2">
                    {isNeonTheme ? '[ RARITY ]' : isCyberpunk ? 'RARITY' : 'Rarity'}
                  </div>
                  <div className="col-span-1 text-center">
                    {isNeonTheme ? '[ QTY ]' : isCyberpunk ? 'QTY' : 'Qty'}
                  </div>
                  <div className="col-span-3 text-center">
                    {isNeonTheme ? '[ ACTIONS ]' : isCyberpunk ? 'ACTIONS' : 'Actions'}
                  </div>
                </div>
                
                {/* Table rows */}
                {filteredItems.map((item) => (
                  <div 
                    key={item.id} 
                    className={`grid grid-cols-12 gap-2 p-3 cursor-pointer items-center ${getScanLineClass(item, isNeonTheme)}`}
                    style={{
                      ...getItemCardStyle(item),
                      backgroundColor: selectedItem?.id === item.id 
                        ? isNeonTheme || isCyberpunk 
                          ? 'rgba(255, 255, 255, 0.05)' 
                          : `${currentTheme.primaryColor}10`
                        : 'transparent'
                    }}
                    onClick={() => setSelectedItem(item)}
                  >
                    <div className="col-span-4 flex items-center gap-3">
                      <div 
                        className="w-10 h-10 flex items-center justify-center" 
                        style={{ 
                          backgroundColor: isNeonTheme || isCyberpunk ? 'rgba(0, 0, 0, 0.3)' : currentTheme.bgTertiary,
                          borderRadius: currentTheme.radius
                        }}
                      >
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-8 h-8 object-contain"
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
                          {item.equipped && (
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
                        </div>
                      </div>
                    </div>
                    <div className="col-span-2" style={{ color: currentTheme.textSecondary }}>
                      {item.type}
                    </div>
                    <div className="col-span-2" style={{ color: getRarityColor(item.rarity) }}>
                      {item.rarity}
                    </div>
                    <div className="col-span-1 text-center" style={{ color: currentTheme.textSecondary }}>
                      {item.quantity}
                    </div>
                    <div className="col-span-3 flex justify-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleEquip(item.id);
                        }}
                        className="p-1.5 rounded"
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
                      >
                        <CogIcon className="w-5 h-5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle use item 
                        }}
                        className="p-1.5 rounded"
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
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 002 2h14a2 2 0 002-2V7a2 2 0 00-2-2H5z" />
                        </svg>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle delete item
                        }}
                        className="p-1.5 rounded"
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
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Empty state */}
            {filteredItems.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12"
                   style={{ 
                     backgroundColor: isNeonTheme || isCyberpunk 
                       ? 'rgba(255, 255, 255, 0.05)' 
                       : currentTheme.bgSecondary,
                     borderRadius: currentTheme.radius,
                     border: `1px solid ${currentTheme.borderColor}`
                   }}>
                <BriefcaseIcon className="w-12 h-12 mb-4" style={{ color: currentTheme.textSecondary }} />
                <p className={`text-lg mb-2 ${isNeonTheme ? 'sl-glow-text' : ''}`}
                   style={{ 
                     color: currentTheme.textPrimary,
                     fontFamily: isNeonTheme ? "'Orbitron', 'Rajdhani', sans-serif" : 
                                 isCyberpunk ? "'Audiowide', 'Rajdhani', sans-serif" : 
                                 currentTheme.font
                   }}>
                  {isNeonTheme ? '[ NO ITEMS FOUND ]' : isCyberpunk ? 'NO ITEMS FOUND' : 'No items found'}
                </p>
                <p style={{ color: currentTheme.textSecondary }}>
                  {isNeonTheme ? '[ TRY ADJUSTING YOUR FILTERS ]' 
                   : isCyberpunk ? 'TRY ADJUSTING YOUR FILTERS' 
                   : 'Try adjusting your filters or search query'}
                </p>
                <button
                  onClick={resetFilters}
                  className={`mt-4 px-4 py-2 rounded ${isNeonTheme ? 'sl-glow-text' : ''}`}
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
                  {isNeonTheme ? '[ RESET FILTERS ]' : isCyberpunk ? 'RESET FILTERS' : 'Reset Filters'}
                </button>
              </div>
            )}
          </div>
          {/* Item details panel */}
          {selectedItem && (
            <div className="w-80 p-4" style={getDetailPanelStyle()}>
              <div className="flex flex-col h-full">
                {/* Item header with image */}
                <div className="flex flex-col items-center mb-4">
                  <div 
                    className="w-24 h-24 flex items-center justify-center mb-3" 
                    style={{ 
                      backgroundColor: isNeonTheme || isCyberpunk ? 'rgba(0, 0, 0, 0.3)' : currentTheme.bgTertiary,
                      borderRadius: currentTheme.radius
                    }}
                  >
                    <img 
                      src={selectedItem.image} 
                      alt={selectedItem.name}
                      className="w-20 h-20 object-contain"
                    />
                  </div>
                  <h3 className={`text-lg font-semibold text-center mb-1 ${isNeonTheme ? 'sl-glow-text' : ''}`}
                      style={{ 
                        color: currentTheme.textPrimary,
                        fontFamily: isNeonTheme ? "'Orbitron', 'Rajdhani', sans-serif" : 
                                    isCyberpunk ? "'Audiowide', 'Rajdhani', sans-serif" : 
                                    currentTheme.font
                      }}>
                    {isNeonTheme ? selectedItem.name.toUpperCase() : selectedItem.name}
                  </h3>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium" 
                          style={{ 
                            color: getRarityColor(selectedItem.rarity),
                            fontFamily: isNeonTheme ? "'Orbitron', 'Rajdhani', sans-serif" : 
                                        isCyberpunk ? "'Audiowide', 'Rajdhani', sans-serif" : 
                                        currentTheme.font
                          }}>
                      {selectedItem.rarity}
                    </span>
                    <span className="text-sm" style={{ color: currentTheme.textSecondary }}>
                      {selectedItem.type} {selectedItem.subtype ? `(${selectedItem.subtype})` : ''}
                    </span>
                  </div>
                  <p className="text-sm text-center mb-3" style={{ color: currentTheme.textSecondary }}>
                    {selectedItem.description}
                  </p>
                  
                  {/* Equipped status badge */}
                  {selectedItem.equipped && (
                    <span className="text-sm py-1 px-2 rounded mb-2" 
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
                </div>
                
                {/* Item effects and stats */}
                <div className="mb-4">
                  <h4 className={`text-sm font-semibold mb-2 ${isNeonTheme ? 'sl-glow-text' : ''}`}
                      style={{ 
                        color: currentTheme.textPrimary,
                        fontFamily: isNeonTheme ? "'Orbitron', 'Rajdhani', sans-serif" : 
                                    isCyberpunk ? "'Audiowide', 'Rajdhani', sans-serif" : 
                                    currentTheme.font
                      }}>
                    {isNeonTheme ? '[ EFFECTS ]' : isCyberpunk ? 'EFFECTS' : 'Effects'}
                  </h4>
                  <ul className="space-y-1 pl-4">
                    {selectedItem.effects.map((effect, index) => (
                      <li key={index} 
                          className="text-sm list-disc" 
                          style={{ 
                            color: currentTheme.textSecondary,
                            fontFamily: isNeonTheme ? "'Orbitron', 'Rajdhani', sans-serif" : 
                                        isCyberpunk ? "'Audiowide', 'Rajdhani', sans-serif" : 
                                        currentTheme.font
                          }}>
                        {effect}
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Stats display if available */}
                {selectedItem.stats && (
                  <div className="mb-6">
                    <h4 className={`text-sm font-semibold mb-2 ${isNeonTheme ? 'sl-glow-text' : ''}`}
                        style={{ 
                          color: currentTheme.textPrimary,
                          fontFamily: isNeonTheme ? "'Orbitron', 'Rajdhani', sans-serif" : 
                                      isCyberpunk ? "'Audiowide', 'Rajdhani', sans-serif" : 
                                      currentTheme.font
                        }}>
                      {isNeonTheme ? '[ STATISTICS ]' : isCyberpunk ? 'STATISTICS' : 'Statistics'}
                    </h4>
                    <div className="space-y-2">
                      {Object.entries(selectedItem.stats).map(([stat, value]) => (
                        value !== 0 && (
                          <div key={stat} className="flex items-center justify-between">
                            <span className="text-sm capitalize" style={{ color: currentTheme.textSecondary }}>
                              {stat}
                            </span>
                            <span className={`text-sm ${value > 0 ? 'text-green-500' : value < 0 ? 'text-red-500' : ''}`}>
                              {value > 0 ? `+${value}` : value}
                            </span>
                          </div>
                        )
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Action buttons */}
                <div className="mt-auto space-y-2">
                  <button
                    onClick={() => toggleEquip(selectedItem.id)}
                    className={`w-full py-2 rounded flex items-center justify-center gap-2 ${isNeonTheme ? 'sl-glow-text' : ''}`}
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
                      ? selectedItem.equipped ? '[ UNEQUIP ]' : '[ EQUIP ]'
                      : isCyberpunk 
                      ? selectedItem.equipped ? 'UNEQUIP' : 'EQUIP'
                      : selectedItem.equipped ? 'Unequip' : 'Equip'}
                  </button>
                  
                  {selectedItem.type === "Consumable" && (
                    <button
                      className={`w-full py-2 rounded flex items-center justify-center gap-2 ${isNeonTheme ? 'sl-glow-text' : ''}`}
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
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 002 2h14a2 2 0 002-2V7a2 2 0 00-2-2H5z" />
                      </svg>
                      {isNeonTheme ? '[ USE ITEM ]' : isCyberpunk ? 'USE ITEM' : 'Use Item'}
                    </button>
                  )}
                  
                  <button
                    className={`w-full py-2 rounded flex items-center justify-center gap-2 ${isNeonTheme ? 'sl-glow-text' : ''}`}
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
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
};

export default Inventory;