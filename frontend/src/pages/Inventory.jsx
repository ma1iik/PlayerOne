// src/pages/Inventory.jsx
import React, { useState, useContext, useEffect } from "react";
import { 
  BriefcaseIcon, 
  FilterIcon, 
  SearchIcon, 
  ViewGridIcon, 
  ViewListIcon,
} from "@heroicons/react/outline";
import ThemeContext from "../context/ThemeContext";
import ItemGrid from "../components/shared/ItemGrid";
import ItemList from "../components/shared/ItemList";
import ItemDetail from "../components/inventory/ItemDetail";
import FilterPanel from "../components/ui/FilterPanel";
import { sampleInventoryItems } from "../data/inventoryData";
import { 
  filterOptions, 
  filterItems, 
  sortItems 
} from "../utils/itemUtils";

const Inventory = () => {
  const { currentTheme } = useContext(ThemeContext);


  const isNeonTheme = currentTheme.id.includes('neon');
  const isCyberpunk = currentTheme.id === 'cyberpunk';

  // State for view options, filters, sort and search
  const [items, setItems] = useState([]);
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

  // Load sample inventory data
  useEffect(() => {
    setItems(sampleInventoryItems);
  }, []);

  // Handle toggling item equip status
  const toggleEquip = (id) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, equipped: !item.equipped } : item
    ));
  };

  // Apply filters and sorting
  const filteredItems = sortItems(
    filterItems(items, activeFilters, searchQuery, "inventory"),
    sortOption
  );

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

  // Handle selecting an item
  const handleSelectItem = (item) => {
    setSelectedItem(item);
  };

  // Close item detail
  const handleCloseItemDetail = () => {
    setSelectedItem(null);
  };

  return (
    <div className="flex flex-col flex-1 p-6 overflow-y-auto"
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
        {/* Header - Updated styling */}
        <div className="p-4 flex items-center justify-between" 
             style={{ 
               backgroundColor: currentTheme.bgSecondary, 
               borderRadius: `${currentTheme.radius} ${currentTheme.radius} 0 0`,
               boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
               borderBottom: `1px solid ${currentTheme.borderColor}`
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
            {/* Currency display - Updated styling */}
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

            {/* Search bar - Updated styling */}
            <div className="relative">
              <input
                type="text"
                placeholder={isNeonTheme ? "[ SEARCH ]" : isCyberpunk ? "SEARCH" : "Search items..."}
                className={`pl-9 pr-4 py-2 w-48 border focus:outline-none ${isNeonTheme ? 'sl-glow-text' : ''}`}
                style={{ 
                  backgroundColor: currentTheme.inputBg,
                  color: currentTheme.textPrimary,
                  borderColor: currentTheme.borderColor,
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
            
            {/* View mode toggle - Updated styling */}
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
            
            {/* Filter toggle button - Updated styling */}
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

        {/* Filters Panel */}
        <FilterPanel 
          showFilters={showFilters}
          activeFilters={activeFilters}
          handleFilterChange={handleFilterChange}
          sortOption={sortOption}
          handleSort={handleSort}
          resetFilters={resetFilters}
          filterOptions={filterOptions}
          mode="inventory"
        />
        
        {/* Main Content Area */}
        <div className="p-4" style={{ 
          backgroundColor: currentTheme.bgSecondary,
          borderBottomLeftRadius: currentTheme.radius,
          borderBottomRightRadius: currentTheme.radius,
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          borderLeft: `1px solid ${currentTheme.borderColor}`,
          borderRight: `1px solid ${currentTheme.borderColor}`,
          borderBottom: `1px solid ${currentTheme.borderColor}`
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
          
          {/* Grid View */}
          <ItemGrid 
            items={filteredItems} 
            onSelectItem={handleSelectItem} 
            viewMode={viewMode}
            mode="inventory"
          />
          
          {/* List View */}
          <ItemList 
            items={filteredItems} 
            onSelectItem={handleSelectItem} 
            toggleEquip={toggleEquip} 
            viewMode={viewMode}
            mode="inventory"
          />
          
          {/* Empty State */}
          {filteredItems.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12"
                 style={{ 
                   backgroundColor: isNeonTheme || isCyberpunk 
                     ? 'rgba(255, 255, 255, 0.05)' 
                     : currentTheme.bgTertiary,
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
      </div>
      
      {/* Item Detail Modal */}
      {selectedItem && (
        <ItemDetail 
          item={selectedItem} 
          onClose={handleCloseItemDetail} 
          toggleEquip={toggleEquip} 
        />
      )}
    </div>
  );
};

export default Inventory;