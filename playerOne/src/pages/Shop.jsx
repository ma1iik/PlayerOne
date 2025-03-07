import React, { useState, useContext, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  ShoppingBagIcon, 
  FilterIcon, 
  SearchIcon, 
  ViewGridIcon, 
  ViewListIcon,
  PlusIcon,
  MinusIcon,
  XIcon,
  CurrencyDollarIcon,
  InformationCircleIcon,
  ShoppingCartIcon
} from "@heroicons/react/outline";
import ThemeContext from "../context/ThemeContext";
import { getRarityColor } from "../utils/inventoryUtils";

const Shop = () => {
  const { currentTheme } = useContext(ThemeContext);
  const isNeonTheme = currentTheme.id.includes('neon');
  const isCyberpunk = currentTheme.id === 'cyberpunk';

  // State for shop items, filters, sorting, categories, and view mode
  const [items, setItems] = useState([]);
  const [viewMode, setViewMode] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [sortOption, setSortOption] = useState({ field: "name", direction: "asc" });
  const [activeFilters, setActiveFilters] = useState({
    minPrice: 0,
    maxPrice: 1000,
    type: "",
    rarity: "",
    featured: false
  });

  // Categories for the shop items
  const categories = [
    { id: "all", name: "All Items" },
    { id: "weapons", name: "Weapons" },
    { id: "armor", name: "Armor" },
    { id: "potions", name: "Potions" },
    { id: "scrolls", name: "Scrolls" },
    { id: "materials", name: "Materials" },
    { id: "special", name: "Special Items" }
  ];

  // Filter options
  const filterOptions = {
    types: ["All", "Weapon", "Armor", "Consumable", "Quest Item", "Special", "Material"],
    rarities: ["All", "Common", "Uncommon", "Rare", "Epic", "Legendary"],
  };

  // Initialize with sample shop items
  useEffect(() => {
    setItems(sampleShopItems);
  }, []);

  // Add item to cart
  const addToCart = (item, quantity = 1) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    
    if (existingItem) {
      setCart(cart.map(cartItem => 
        cartItem.id === item.id 
          ? { ...cartItem, quantity: cartItem.quantity + quantity } 
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity }]);
    }
  };

  // Remove item from cart
  const removeFromCart = (itemId) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  // Update cart item quantity
  const updateCartQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    
    setCart(cart.map(item => 
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    ));
  };

  // Calculate total cart value
  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Get cart item count
  const getCartItemCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  // Handle filtering items
  const getFilteredItems = () => {
    return items
      .filter(item => {
        // Search filter
        if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase())) {
          return false;
        }
        
        // Category filter
        if (activeCategory !== "all" && item.category !== activeCategory) {
          return false;
        }
        
        // Price range filter
        if (item.price < activeFilters.minPrice || item.price > activeFilters.maxPrice) {
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
        
        // Featured filter
        if (activeFilters.featured && !item.featured) {
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

  // Reset filters
  const resetFilters = () => {
    setActiveFilters({
      minPrice: 0,
      maxPrice: 1000,
      type: "",
      rarity: "",
      featured: false
    });
    setSearchQuery("");
    setActiveCategory("all");
  };

  // Get themed style for shop panel
  const getShopPanelStyle = () => {
    if (isNeonTheme) {
      return {
        backgroundColor: 'rgba(10, 10, 16, 0.8)',
        border: `1px solid ${currentTheme.borderColor}`,
        boxShadow: `0 0 15px ${currentTheme.shadowColor}`,
        borderRadius: currentTheme.radius,
      };
    } else if (isCyberpunk) {
      return {
        backgroundColor: 'rgba(15, 23, 42, 0.8)',
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

  // Get scan line class (for neon themes)
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
            <ShoppingBagIcon className="w-6 h-6" style={{ color: currentTheme.primaryColor }} />
            <h2 className={`text-xl font-semibold ${isNeonTheme ? 'sl-glow-text' : ''}`}
                style={{ 
                  color: currentTheme.textPrimary,
                  fontFamily: isNeonTheme ? "'Orbitron', 'Rajdhani', sans-serif" : 
                              isCyberpunk ? "'Audiowide', 'Rajdhani', sans-serif" : 
                              currentTheme.font
                }}>
              {isNeonTheme ? '[ SHOP ]' : isCyberpunk ? 'SHOP' : 'Shop'}
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
            
            {/* Shopping cart button */}
            <button
              onClick={() => setShowCart(true)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${isNeonTheme ? 'sl-glow-text' : ''}`}
              style={{ 
                backgroundColor: isNeonTheme || isCyberpunk ? 'transparent' : currentTheme.secondaryColor,
                color: isNeonTheme || isCyberpunk ? currentTheme.secondaryColor : '#ffffff',
                borderRadius: currentTheme.radius,
                border: isNeonTheme || isCyberpunk ? `1px solid ${currentTheme.secondaryColor}` : 'none'
              }}
            >
              <ShoppingCartIcon className="w-5 h-5" />
              <span>
                {isNeonTheme ? `[ ${getCartItemCount()} ]` : 
                 isCyberpunk ? getCartItemCount() : 
                 getCartItemCount()}
              </span>
            </button>
          </div>
        </div>

        {/* Filters panel */}
        {showFilters && (
          <div className="p-4" style={getShopPanelStyle()}>
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
                    onChange={(e) => handleFilterChange('minPrice', parseInt(e.target.value))}
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
                    onChange={(e) => handleFilterChange('maxPrice', parseInt(e.target.value))}
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
                    { field: 'price', label: 'Price' },
                    { field: 'rarity', label: 'Rarity' }
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
                          ? <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                            </svg>
                          : <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
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
        )}
        
        {/* Categories */}
        <div className="flex overflow-x-auto p-2 gap-2 no-scrollbar" 
             style={{ backgroundColor: currentTheme.bgSecondary, borderBottom: `1px solid ${currentTheme.borderColor}` }}>
          {categories.map(category => (
            <button 
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 whitespace-nowrap text-sm transition-colors ${isNeonTheme ? 'sl-glow-text' : ''}`}
              style={getFilterButtonStyle(activeCategory === category.id)}
            >
              {isNeonTheme ? category.name.toUpperCase() : category.name}
            </button>
          ))}
        </div>
        
        {/* Main Content */}
        <div className="p-4" style={{ backgroundColor: 'transparent' }}>
          {/* Item count and results info */}
          <div className="mb-4" style={{ color: currentTheme.textSecondary }}>
            <span className={isNeonTheme ? 'sl-glow-text' : ''}
                  style={{ 
                    fontFamily: isNeonTheme ? "'Orbitron', 'Rajdhani', sans-serif" : 
                                isCyberpunk ? "'Audiowide', 'Rajdhani', sans-serif" : 
                                currentTheme.font
                  }}>
              {isNeonTheme 
                ? `[ ${filteredItems.length} ITEMS AVAILABLE ]` 
                : isCyberpunk 
                ? `${filteredItems.length} ITEMS AVAILABLE` 
                : `${filteredItems.length} items available`}
            </span>
          </div>
          
          {/* Grid View */}
          {viewMode === "grid" && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredItems.map((item) => (
                <motion.div 
                  key={item.id}
                  layoutId={`grid-item-${item.id}`}
                  className={`cursor-pointer transition-all duration-200 ${getScanLineClass(item, isNeonTheme)}`}
                  style={{
                    ...getItemCardStyle(item),
                    ...getScanLineStyle(item, isNeonTheme)
                  }}
                  onClick={() => setSelectedItem(item)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="p-4 flex flex-col">
                    {/* Featured badge */}
                    {item.featured && (
                      <div className="absolute top-2 right-2 z-10">
                        <span className="inline-block text-xs px-2 py-0.5 rounded"
                              style={{ 
                                backgroundColor: isNeonTheme || isCyberpunk ? 'transparent' : currentTheme.secondaryColor,
                                color: isNeonTheme || isCyberpunk ? currentTheme.secondaryColor : '#ffffff',
                                border: isNeonTheme || isCyberpunk ? `1px solid ${currentTheme.secondaryColor}` : 'none',
                                borderRadius: currentTheme.radius,
                                fontFamily: isNeonTheme ? "'Orbitron', 'Rajdhani', sans-serif" : 
                                            isCyberpunk ? "'Audiowide', 'Rajdhani', sans-serif" : 
                                            currentTheme.font
                              }}>
                          {isNeonTheme ? '[ FEATURED ]' : isCyberpunk ? 'FEATURED' : 'Featured'}
                        </span>
                      </div>
                    )}
                    
                    {/* Sale badge */}
                    {item.discounted && (
                      <div className="absolute top-2 left-2 z-10">
                        <span className="inline-block text-xs px-2 py-0.5 rounded"
                              style={{ 
                                backgroundColor: isNeonTheme || isCyberpunk ? 'transparent' : '#ef4444',
                                color: isNeonTheme || isCyberpunk ? '#ef4444' : '#ffffff',
                                border: isNeonTheme || isCyberpunk ? '1px solid #ef4444' : 'none',
                                borderRadius: currentTheme.radius,
                                fontFamily: isNeonTheme ? "'Orbitron', 'Rajdhani', sans-serif" : 
                                            isCyberpunk ? "'Audiowide', 'Rajdhani', sans-serif" : 
                                            currentTheme.font
                              }}>
                          {isNeonTheme ? '[ SALE ]' : isCyberpunk ? 'SALE' : 'Sale'}
                        </span>
                      </div>
                    )}
                    
                    {/* Item image */}
                    <div 
                      className="w-full aspect-square flex items-center justify-center mb-3 relative" 
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
                    
                    {/* Item information */}
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
                    
                    {/* Price and buy button */}
                    <div className="mt-3 flex justify-between items-center">
                      <div className="flex items-center">
                        <span role="img" aria-label="Currency" className="mr-1">
                          {item.currency === 'gems' ? '💎' : '🪙'}
                        </span>
                        <span className="font-semibold" style={{ color: currentTheme.textPrimary }}>
                          {item.discounted ? (
                            <span>
                              <span className="line-through text-xs mr-1 opacity-70">{item.originalPrice}</span>
                              {item.price}
                            </span>
                          ) : (
                            item.price
                          )}
                        </span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(item, 1);
                        }}
                        className={`text-xs p-1 rounded ${isNeonTheme ? 'sl-glow-text' : ''}`}
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
                        <PlusIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
          
          {/* List View */}
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
                <div className="col-span-5">
                  {isNeonTheme ? '[ ITEM ]' : isCyberpunk ? 'ITEM' : 'Item'}
                </div>
                <div className="col-span-2">
                  {isNeonTheme ? '[ TYPE ]' : isCyberpunk ? 'TYPE' : 'Type'}
                </div>
                <div className="col-span-2">
                  {isNeonTheme ? '[ RARITY ]' : isCyberpunk ? 'RARITY' : 'Rarity'}
                </div>
                <div className="col-span-1 text-center">
                  {isNeonTheme ? '[ PRICE ]' : isCyberpunk ? 'PRICE' : 'Price'}
                </div>
                <div className="col-span-2 text-center">
                  {isNeonTheme ? '[ ACTIONS ]' : isCyberpunk ? 'ACTIONS' : 'Actions'}
                </div>
              </div>
              
              {/* Table rows */}
              {filteredItems.map((item) => (
                <motion.div 
                  key={item.id}
                  layoutId={`list-item-${item.id}`}
                  className={`grid grid-cols-12 gap-2 p-3 cursor-pointer items-center ${getScanLineClass(item, isNeonTheme)}`}
                  style={{
                    ...getItemCardStyle(item),
                    ...getScanLineStyle(item, isNeonTheme)
                  }}
                  onClick={() => setSelectedItem(item)}
                  whileHover={{ 
                    backgroundColor: isNeonTheme || isCyberpunk 
                      ? 'rgba(255, 255, 255, 0.05)' 
                      : currentTheme.bgTertiary,
                    transition: { duration: 0.2 }
                  }}
                >
                  <div className="col-span-5 flex items-center gap-3">
                    <div 
                      className="w-12 h-12 relative flex items-center justify-center" 
                      style={{ 
                        backgroundColor: isNeonTheme || isCyberpunk ? 'rgba(0, 0, 0, 0.3)' : currentTheme.bgTertiary,
                        borderRadius: currentTheme.radius
                      }}
                    >
                      {item.featured && (
                        <div className="absolute -top-1 -right-1 z-10">
                          <span className="inline-flex items-center justify-center w-4 h-4 text-xs"
                                style={{ 
                                  backgroundColor: isNeonTheme || isCyberpunk ? 'transparent' : currentTheme.secondaryColor,
                                  color: '#ffffff',
                                  border: isNeonTheme || isCyberpunk ? `1px solid ${currentTheme.secondaryColor}` : 'none',
                                  borderRadius: '9999px'
                                }}>
                            ★
                          </span>
                        </div>
                      )}
                      
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-9 h-9 object-contain"
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
                        {item.discounted && (
                          <span className="ml-2 text-xs py-0.5 px-1 rounded" 
                                style={{ 
                                  backgroundColor: isNeonTheme || isCyberpunk 
                                    ? 'transparent' 
                                    : 'rgba(239, 68, 68, 0.2)',
                                  color: '#ef4444',
                                  border: isNeonTheme || isCyberpunk 
                                    ? '1px solid #ef4444' 
                                    : 'none',
                                  borderRadius: currentTheme.radius
                                }}>
                            {isNeonTheme ? '[SALE]' : isCyberpunk ? 'SALE' : 'Sale'}
                          </span>
                        )}
                      </div>
                      <div className="text-xs" style={{ color: currentTheme.textSecondary }}>
                        {item.description.length > 50 
                          ? item.description.substring(0, 50) + '...' 
                          : item.description}
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-span-2" style={{ color: currentTheme.textSecondary }}>
                    {item.type}
                    {item.subtype && (
                      <div className="text-xs opacity-70">{item.subtype}</div>
                    )}
                  </div>
                  
                  <div className="col-span-2 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: getRarityColor(item.rarity) }}></span>
                    <span style={{ color: getRarityColor(item.rarity) }}>
                      {item.rarity}
                    </span>
                  </div>
                  
                  <div className="col-span-1 text-center flex items-center justify-center gap-1">
                    <span role="img" aria-label="Currency">
                      {item.currency === 'gems' ? '💎' : '🪙'}
                    </span>
                    <span style={{ color: currentTheme.textPrimary, fontWeight: '600' }}>
                      {item.discounted ? (
                        <span>
                          <span className="line-through text-xs mr-1 opacity-70">{item.originalPrice}</span>
                          {item.price}
                        </span>
                      ) : (
                        item.price
                      )}
                    </span>
                  </div>
                  
                  <div className="col-span-2 flex justify-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(item, 1);
                      }}
                      className="p-1.5 rounded transition-colors"
                      style={{ 
                        backgroundColor: isNeonTheme || isCyberpunk 
                          ? 'transparent' 
                          : currentTheme.primaryColor,
                        color: isNeonTheme || isCyberpunk ? currentTheme.primaryColor : '#ffffff',
                        border: isNeonTheme || isCyberpunk 
                          ? `1px solid ${currentTheme.primaryColor}` 
                          : 'none',
                        borderRadius: currentTheme.radius
                      }}
                      title="Add to Cart"
                    >
                      <PlusIcon className="w-5 h-5" />
                    </button>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedItem(item);
                      }}
                      className="p-1.5 rounded transition-colors"
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
                      title="View Details"
                    >
                      <InformationCircleIcon className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
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
              <ShoppingBagIcon className="w-12 h-12 mb-4" style={{ color: currentTheme.textSecondary }} />
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
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedItem(null)}
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
              border: `2px solid ${getRarityColor(selectedItem.rarity)}`,
              boxShadow: isNeonTheme || isCyberpunk 
                ? `0 0 20px ${getRarityColor(selectedItem.rarity)}80` 
                : currentTheme.shadow,
              borderRadius: currentTheme.radius
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full hover:bg-black hover:bg-opacity-20 transition-colors"
              style={{ 
                color: currentTheme.textSecondary,
              }}
            >
              <XIcon className="w-5 h-5" />
            </button>
            
            {/* Header with colored accent based on rarity */}
            <div className="h-2" style={{ backgroundColor: getRarityColor(selectedItem.rarity) }}></div>

            <div className="p-6">
              {/* Item header with image */}
              <div className="flex flex-col items-center mb-6">
                <div 
                  className="w-36 h-36 flex items-center justify-center mb-4 p-2 relative" 
                  style={{ 
                    backgroundColor: isNeonTheme || isCyberpunk ? 'rgba(0, 0, 0, 0.3)' : currentTheme.bgTertiary,
                    borderRadius: currentTheme.radius,
                    boxShadow: isNeonTheme ? `0 0 15px ${getRarityColor(selectedItem.rarity)}40` : 'none'
                  }}
                >
                  {selectedItem.featured && (
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
                    src={selectedItem.image} 
                    alt={selectedItem.name}
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
                  {isNeonTheme ? selectedItem.name.toUpperCase() : selectedItem.name}
                </h3>
                
                {/* Rarity and type badges */}
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-sm font-medium px-3 py-1 rounded-full" 
                        style={{ 
                          backgroundColor: `${getRarityColor(selectedItem.rarity)}20`,
                          color: getRarityColor(selectedItem.rarity),
                          border: isNeonTheme || isCyberpunk ? `1px solid ${getRarityColor(selectedItem.rarity)}` : 'none',
                          fontFamily: isNeonTheme ? "'Orbitron', 'Rajdhani', sans-serif" : 
                                      isCyberpunk ? "'Audiowide', 'Rajdhani', sans-serif" : 
                                      currentTheme.font
                        }}>
                    {selectedItem.rarity}
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
                    {selectedItem.type} {selectedItem.subtype ? `(${selectedItem.subtype})` : ''}
                  </span>
                </div>
                
                {/* Price display */}
                <div className="flex items-center gap-2 mb-3">
                  <span role="img" aria-label="Currency" className="text-xl">
                    {selectedItem.currency === 'gems' ? '💎' : '🪙'}
                  </span>
                  <span className="text-xl font-bold" style={{ color: currentTheme.textPrimary }}>
                    {selectedItem.discounted ? (
                      <span>
                        <span className="line-through mr-2 opacity-70" style={{ color: currentTheme.textSecondary }}>
                          {selectedItem.originalPrice}
                        </span>
                        {selectedItem.price}
                      </span>
                    ) : (
                      selectedItem.price
                    )}
                  </span>
                  {selectedItem.discounted && (
                    <span className="text-sm py-1 px-2 rounded-full" 
                          style={{ 
                            backgroundColor: isNeonTheme || isCyberpunk ? 'transparent' : 'rgba(239, 68, 68, 0.2)',
                            color: '#ef4444',
                            border: isNeonTheme || isCyberpunk ? '1px solid #ef4444' : 'none',
                            borderRadius: "9999px"
                          }}>
                      {isNeonTheme 
                        ? `[ SAVE ${Math.round((1 - selectedItem.price / selectedItem.originalPrice) * 100)}% ]` 
                        : `Save ${Math.round((1 - selectedItem.price / selectedItem.originalPrice) * 100)}%`}
                    </span>
                  )}
                </div>
                
                {/* Description with stylized quote marks */}
                <div className="relative">
                  <div className="opacity-10 text-5xl absolute -top-3 left-0" style={{ color: getRarityColor(selectedItem.rarity) }}>"</div>
                  <p className="text-sm text-center italic my-3 px-4" style={{ color: currentTheme.textSecondary }}>
                    {selectedItem.description}
                  </p>
                  <div className="opacity-10 text-5xl absolute -bottom-8 right-0" style={{ color: getRarityColor(selectedItem.rarity) }}>"</div>
                </div>
              </div>
              
              {/* Divider */}
              <div className="h-px w-full my-4" style={{ backgroundColor: isNeonTheme || isCyberpunk ? getRarityColor(selectedItem.rarity) : currentTheme.borderColor, opacity: isNeonTheme || isCyberpunk ? 0.3 : 1 }}></div>
              
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
                  {selectedItem.effects.map((effect, index) => (
                    <li key={index} 
                        className="text-sm flex items-start gap-2" 
                        style={{ 
                          color: currentTheme.textSecondary,
                          fontFamily: isNeonTheme ? "'Orbitron', 'Rajdhani', sans-serif" : 
                                      isCyberpunk ? "'Audiowide', 'Rajdhani', sans-serif" : 
                                      currentTheme.font
                        }}>
                      <span className="inline-block w-2 h-2 mt-1.5 rounded-full" style={{ backgroundColor: getRarityColor(selectedItem.rarity) }}></span>
                      {effect}
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Stats display if available */}
              {selectedItem.stats && Object.values(selectedItem.stats).some(val => val !== 0) && (
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
                    {Object.entries(selectedItem.stats).map(([stat, value]) => (
                      value !== 0 && (
                        <div key={stat} className="flex items-center justify-between px-3 py-2 rounded"
                             style={{ 
                               backgroundColor: isNeonTheme || isCyberpunk ? 'rgba(0, 0, 0, 0.2)' : currentTheme.bgTertiary,
                               border: isNeonTheme || isCyberpunk ? `1px solid ${getRarityColor(selectedItem.rarity)}20` : 'none',
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
              {selectedItem.requirements && (
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
                    {selectedItem.requirements.map((req, index) => (
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
                  color: selectedItem.inStock 
                    ? '#22c55e' // green
                    : '#ef4444' // red
                }}>
                  {selectedItem.inStock 
                    ? (isNeonTheme ? '[ IN STOCK ]' : isCyberpunk ? 'IN STOCK' : 'In Stock') 
                    : (isNeonTheme ? '[ OUT OF STOCK ]' : isCyberpunk ? 'OUT OF STOCK' : 'Out of Stock')}
                </span>
              </div>
              
              {/* Quantity selector and add to cart */}
              {selectedItem.inStock && (
                <div className="space-y-4 mt-4">
                  <div className="flex items-center">
                    <button
                      onClick={() => {
                        const existingItem = cart.find(i => i.id === selectedItem.id);
                        const newQty = Math.max(1, (existingItem?.quantity || 1) - 1);
                        addToCart(selectedItem, newQty - (existingItem?.quantity || 0));
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
                      {cart.find(i => i.id === selectedItem.id)?.quantity || 1}
                    </span>
                    
                    <button
                      onClick={() => {
                        const existingItem = cart.find(i => i.id === selectedItem.id);
                        const newQty = (existingItem?.quantity || 0) + 1;
                        addToCart(selectedItem, newQty - (existingItem?.quantity || 0));
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
                        const existingItem = cart.find(i => i.id === selectedItem.id);
                        const qty = existingItem?.quantity || 1;
                        addToCart(selectedItem, qty - (existingItem?.quantity || 0));
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
                      const existingItem = cart.find(i => i.id === selectedItem.id);
                      if (existingItem) {
                        removeFromCart(selectedItem.id);
                      }
                      addToCart(selectedItem, 1);
                      setSelectedItem(null);
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
      )}
      
      {/* Shopping Cart Modal */}
      {showCart && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowCart(false)}
        >
          <motion.div
            className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            style={{
              backgroundColor: isNeonTheme 
                ? 'rgba(10, 10, 16, 0.95)' 
                : isCyberpunk 
                ? 'rgba(15, 23, 42, 0.95)' 
                : currentTheme.bgSecondary,
              border: `2px solid ${currentTheme.borderColor}`,
              boxShadow: isNeonTheme || isCyberpunk 
                ? `0 0 20px ${currentTheme.shadowColor}` 
                : currentTheme.shadow,
              borderRadius: currentTheme.radius
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Cart header */}
            <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: currentTheme.borderColor }}>
              <h3 className={`text-xl font-semibold ${isNeonTheme ? 'sl-glow-text' : ''}`}
                  style={{ 
                    color: currentTheme.textPrimary,
                    fontFamily: isNeonTheme ? "'Orbitron', 'Rajdhani', sans-serif" : 
                                isCyberpunk ? "'Audiowide', 'Rajdhani', sans-serif" : 
                                currentTheme.font
                  }}>
                <span className="flex items-center gap-2">
                  <ShoppingCartIcon className="w-5 h-5" />
                  {isNeonTheme ? '[ SHOPPING CART ]' : isCyberpunk ? 'SHOPPING CART' : 'Shopping Cart'}
                </span>
              </h3>
              <button
                onClick={() => setShowCart(false)}
                className="p-2 rounded-full hover:bg-black hover:bg-opacity-20 transition-colors"
                style={{ color: currentTheme.textSecondary }}
              >
                <XIcon className="w-5 h-5" />
              </button>
            </div>
            
            {/* Cart content */}
            <div className="p-4">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12"
                     style={{ 
                       backgroundColor: isNeonTheme || isCyberpunk 
                         ? 'rgba(255, 255, 255, 0.05)' 
                         : currentTheme.bgTertiary,
                       borderRadius: currentTheme.radius,
                       border: `1px solid ${currentTheme.borderColor}`
                     }}>
                  <ShoppingCartIcon className="w-12 h-12 mb-4" style={{ color: currentTheme.textSecondary }} />
                  <p className={`text-lg mb-2 ${isNeonTheme ? 'sl-glow-text' : ''}`}
                     style={{ 
                       color: currentTheme.textPrimary,
                       fontFamily: isNeonTheme ? "'Orbitron', 'Rajdhani', sans-serif" : 
                                   isCyberpunk ? "'Audiowide', 'Rajdhani', sans-serif" : 
                                   currentTheme.font
                     }}>
                    {isNeonTheme ? '[ YOUR CART IS EMPTY ]' : isCyberpunk ? 'YOUR CART IS EMPTY' : 'Your cart is empty'}
                  </p>
                  <p style={{ color: currentTheme.textSecondary }}>
                    {isNeonTheme ? '[ ADD ITEMS TO BEGIN SHOPPING ]' 
                     : isCyberpunk ? 'ADD ITEMS TO BEGIN SHOPPING' 
                     : 'Add items to begin shopping'}
                  </p>
                  <button
                    onClick={() => setShowCart(false)}
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
                    {isNeonTheme ? '[ CONTINUE SHOPPING ]' : isCyberpunk ? 'CONTINUE SHOPPING' : 'Continue Shopping'}
                  </button>
                </div>
              ) : (
                <>
                  {/* Cart items */}
                  <div className="space-y-4 mb-6">
                    {cart.map(item => (
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
                              onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
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
                              onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
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
                            onClick={() => removeFromCart(item.id)}
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
                    ))}
                  </div>
                  
                  {/* Cart summary */}
                  <div className="border-t pt-4" style={{ borderColor: currentTheme.borderColor }}>
                    <div className="flex justify-between items-center mb-3">
                      <span style={{ color: currentTheme.textSecondary }}>
                        {isNeonTheme ? 'SUBTOTAL:' : isCyberpunk ? 'SUBTOTAL:' : 'Subtotal:'}
                      </span>
                      <div className="flex items-center gap-1">
                        <span role="img" aria-label="Currency" className="text-sm">
                          🪙
                        </span>
                        <span className="font-semibold" style={{ color: currentTheme.textPrimary }}>
                          {getCartTotal()}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center mb-3">
                      <span style={{ color: currentTheme.textSecondary }}>
                        {isNeonTheme ? 'TAX:' : isCyberpunk ? 'TAX:' : 'Tax:'}
                      </span>
                      <div className="flex items-center gap-1">
                        <span role="img" aria-label="Currency" className="text-sm">
                          🪙
                        </span>
                        <span className="font-semibold" style={{ color: currentTheme.textPrimary }}>
                          {Math.round(getCartTotal() * 0.1)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center mb-6 pt-3 border-t" style={{ borderColor: currentTheme.borderColor }}>
                      <span className="font-semibold" style={{ color: currentTheme.textPrimary }}>
                        {isNeonTheme ? 'TOTAL:' : isCyberpunk ? 'TOTAL:' : 'Total:'}
                      </span>
                      <div className="flex items-center gap-1">
                        <span role="img" aria-label="Currency" className="text-xl">
                          🪙
                        </span>
                        <span className="text-xl font-bold" style={{ color: currentTheme.textPrimary }}>
                          {Math.round(getCartTotal() * 1.1)}
                        </span>
                      </div>
                    </div>
                    
                    {/* Checkout buttons */}
                    <div className="flex gap-3">
                      <button
                        onClick={() => setShowCart(false)}
                        className={`px-4 py-2.5 rounded ${isNeonTheme ? 'sl-glow-text' : ''}`}
                        style={{ 
                          backgroundColor: isNeonTheme || isCyberpunk ? 'transparent' : 'rgba(239, 68, 68, 0.1)',
                          color: '#ef4444',
                          border: isNeonTheme || isCyberpunk ? '1px solid #ef4444' : 'none',
                          borderRadius: currentTheme.radius,
                          fontFamily: isNeonTheme ? "'Orbitron', 'Rajdhani', sans-serif" : 
                                      isCyberpunk ? "'Audiowide', 'Rajdhani', sans-serif" : 
                                      currentTheme.font
                        }}
                      >
                        {isNeonTheme ? '[ CANCEL ]' : isCyberpunk ? 'CANCEL' : 'Cancel'}
                      </button>
                      
                      <button
                        onClick={() => {
                          alert("Checkout functionality would go here");
                          setCart([]);
                          setShowCart(false);
                        }}
                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded ${isNeonTheme ? 'sl-glow-text' : ''}`}
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
                        <CurrencyDollarIcon className="w-5 h-5" />
                        {isNeonTheme ? '[ CHECKOUT ]' : isCyberpunk ? 'CHECKOUT' : 'Checkout'}
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

// Sample shop items data
const sampleShopItems = [
  { 
    id: 1, 
    name: "Health Potion", 
    type: "Consumable",
    category: "potions", 
    rarity: "Common",
    price: 15,
    currency: 'coins',
    effects: ["Restores 20 HP", "+5% HP regeneration for 10s"],
    description: "A basic healing potion that restores a small amount of health.",
    stats: { power: 0, defense: 0, speed: 0, utility: 2 },
    image: "https://via.placeholder.com/80?text=Potion",
    inStock: true,
    featured: false,
    discounted: false
  },
  { 
    id: 2, 
    name: "Magic Scroll", 
    type: "Quest Item",
    category: "scrolls", 
    rarity: "Rare",
    price: 120,
    originalPrice: 150,
    currency: 'coins',
    effects: ["Required for 'The Ancient Runes' quest"],
    description: "A mysterious scroll with ancient runes. Scholars might be interested in this.",
    stats: { power: 0, defense: 0, speed: 0, utility: 4 },
    image: "https://via.placeholder.com/80?text=Scroll",
    inStock: true,
    featured: false,
    discounted: true
  },
  { 
    id: 3, 
    name: "Steel Sword", 
    type: "Weapon",
    category: "weapons", 
    subtype: "One-Handed",
    rarity: "Uncommon",
    price: 75,
    currency: 'coins',
    effects: ["+10 Attack", "+5% Critical Hit Chance"],
    description: "A well-crafted steel sword. Reliable and durable in combat.",
    stats: { power: 3, defense: 0, speed: 1, utility: 0 },
    image: "https://via.placeholder.com/80?text=Sword",
    inStock: true,
    featured: false,
    discounted: false
  },
  { 
    id: 4, 
    name: "Leather Armor", 
    type: "Armor",
    category: "armor", 
    subtype: "Light",
    rarity: "Common",
    price: 45,
    currency: 'coins',
    effects: ["+15 Defense", "-5% Movement Speed"],
    description: "Basic leather armor offering some protection without significantly restricting movement.",
    stats: { power: 0, defense: 2, speed: -1, utility: 0 },
    image: "https://via.placeholder.com/80?text=Armor",
    inStock: true,
    featured: false,
    discounted: false
  },
  { 
    id: 5, 
    name: "Swift Boots", 
    type: "Armor",
    category: "armor", 
    subtype: "Footwear",
    rarity: "Uncommon",
    price: 60,
    currency: 'coins',
    effects: ["+10% Movement Speed", "+5% Dodge Chance"],
    description: "Lightweight boots that allow for quick movement and nimble footwork.",
    stats: { power: 0, defense: 0, speed: 3, utility: 1 },
    image: "https://via.placeholder.com/80?text=Boots",
    inStock: true,
    featured: false,
    discounted: false
  },
  { 
    id: 6, 
    name: "Golden Key", 
    type: "Special",
    category: "special", 
    rarity: "Epic",
    price: 5,
    currency: 'gems',
    effects: ["Opens special chests", "Required for certain areas"],
    description: "A shimmering golden key. It seems to be made for a special lock.",
    stats: { power: 0, defense: 0, speed: 0, utility: 5 },
    image: "https://via.placeholder.com/80?text=Key",
    inStock: true,
    featured: true,
    discounted: false
  },
  { 
    id: 7, 
    name: "Mana Crystal", 
    type: "Consumable",
    category: "potions", 
    rarity: "Uncommon",
    price: 25,
    currency: 'coins',
    effects: ["Restores 30 MP", "+10% Spell Power for 30s"],
    description: "A crystal pulsing with magical energy. Useful for spellcasters.",
    stats: { power: 0, defense: 0, speed: 0, utility: 3 },
    image: "https://via.placeholder.com/80?text=Crystal",
    inStock: true,
    featured: false,
    discounted: false
  },
  { 
    id: 8, 
    name: "Dragon Scale", 
    type: "Material",
    category: "materials", 
    rarity: "Epic",
    price: 10,
    currency: 'gems',
    effects: ["Crafting material for high-tier equipment"],
    description: "A tough, shimmering scale from a dragon. Highly sought after by crafters.",
    stats: { power: 0, defense: 0, speed: 0, utility: 4 },
    image: "https://via.placeholder.com/80?text=Scale",
    inStock: true,
    featured: true,
    discounted: false
  },
  { 
    id: 9, 
    name: "Enchanted Bow", 
    type: "Weapon",
    category: "weapons", 
    subtype: "Ranged",
    rarity: "Rare",
    price: 180,
    originalPrice: 250,
    currency: 'coins',
    effects: ["+25 Ranged Attack", "Arrows pierce through targets"],
    description: "A finely crafted bow imbued with magical energy. Arrows fired from this bow can pierce through targets.",
    stats: { power: 4, defense: 0, speed: 2, utility: 1 },
    image: "https://via.placeholder.com/80?text=Bow",
    inStock: true,
    featured: true,
    discounted: true
  },
  { 
    id: 10, 
    name: "Frost Staff", 
    type: "Weapon",
    category: "weapons", 
    subtype: "Staff",
    rarity: "Epic",
    price: 15,
    currency: 'gems',
    effects: ["+30 Magic Attack", "Attacks slow enemies by 20%", "15% chance to freeze enemies"],
    description: "A staff forged from enchanted ice crystals. Harnesses the power of frost to slow and freeze enemies.",
    stats: { power: 5, defense: 1, speed: 0, utility: 3 },
    image: "https://via.placeholder.com/80?text=Staff",
    inStock: true,
    featured: false,
    discounted: false
  },
  { 
    id: 11, 
    name: "Phoenix Feather", 
    type: "Material",
    category: "materials", 
    rarity: "Legendary",
    price: 25,
    currency: 'gems',
    effects: ["Crafting material for legendary fire-based equipment", "Can be used to resurrect once when held"],
    description: "A radiant feather from the mythical phoenix. Contains incredible restorative powers and fiery energy.",
    stats: { power: 0, defense: 0, speed: 0, utility: 7 },
    image: "https://via.placeholder.com/80?text=Feather",
    inStock: true,
    featured: true,
    discounted: false
  },
  { 
    id: 12, 
    name: "Healing Herbs", 
    type: "Material",
    category: "materials", 
    rarity: "Common",
    price: 5,
    currency: 'coins',
    effects: ["Crafting material for healing potions"],
    description: "Common herbs with medicinal properties. Used in the creation of various healing potions.",
    stats: { power: 0, defense: 0, speed: 0, utility: 1 },
    image: "https://via.placeholder.com/80?text=Herbs",
    inStock: true,
    featured: false,
    discounted: false
  },
  { 
    id: 13, 
    name: "Obsidian Plate Armor", 
    type: "Armor",
    category: "armor", 
    subtype: "Heavy",
    rarity: "Epic",
    price: 350,
    currency: 'coins',
    effects: ["+45 Defense", "-15% Movement Speed", "20% Fire Resistance"],
    description: "Heavy armor forged from obsidian. Provides exceptional protection at the cost of mobility.",
    stats: { power: 0, defense: 5, speed: -2, utility: 2 },
    image: "https://via.placeholder.com/80?text=PlateArmor",
    inStock: true,
    featured: false,
    discounted: false
  },
  { 
    id: 14, 
    name: "Stealth Cloak", 
    type: "Armor",
    category: "armor", 
    subtype: "Cloak",
    rarity: "Rare",
    price: 200,
    currency: 'coins',
    effects: ["+10 Defense", "+25% Stealth", "Invisible while standing still"],
    description: "A cloak woven with shadow magic. Allows the wearer to blend into the darkness and move undetected.",
    stats: { power: 0, defense: 1, speed: 2, utility: 4 },
    image: "https://via.placeholder.com/80?text=Cloak",
    inStock: true,
    featured: false,
    discounted: false
  },
  { 
    id: 15, 
    name: "Explosive Potion", 
    type: "Consumable",
    category: "potions", 
    rarity: "Uncommon",
    price: 35,
    currency: 'coins',
    effects: ["Deals 50 area damage", "Creates smoke cloud for 10s"],
    description: "An unstable concoction that explodes on impact. Useful for dealing with groups of enemies or creating distractions.",
    stats: { power: 2, defense: 0, speed: 0, utility: 3 },
    image: "https://via.placeholder.com/80?text=Explosive",
    inStock: true,
    featured: false,
    discounted: false
  },
  { 
    id: 16, 
    name: "Ancient Tome", 
    type: "Quest Item",
    category: "scrolls", 
    rarity: "Legendary",
    price: 20,
    currency: 'gems',
    effects: ["Required for 'Secrets of the Ancients' quest", "+1 Skill Point when read"],
    description: "A tome of forgotten knowledge from a lost civilization. Contains powerful secrets and ancient wisdom.",
    stats: { power: 0, defense: 0, speed: 0, utility: 6 },
    image: "https://via.placeholder.com/80?text=Tome",
    inStock: true,
    featured: true,
    discounted: false
  },
  { 
    id: 17, 
    name: "Bottomless Quiver", 
    type: "Special",
    category: "special", 
    rarity: "Rare",
    price: 100,
    originalPrice: 150,
    currency: 'coins',
    effects: ["Provides unlimited basic arrows", "50% chance not to consume special arrows"],
    description: "An enchanted quiver that never runs out of arrows. A must-have for any archer.",
    stats: { power: 1, defense: 0, speed: 1, utility: 5 },
    image: "https://via.placeholder.com/80?text=Quiver",
    inStock: true,
    featured: false,
    discounted: true
  },
  { 
    id: 18, 
    name: "Dragonslayer's Greatsword", 
    type: "Weapon",
    category: "weapons", 
    subtype: "Two-Handed",
    rarity: "Legendary",
    price: 50,
    currency: 'gems',
    effects: ["+60 Attack", "x3 damage against dragon-type enemies", "-10% Movement Speed"],
    description: "A massive greatsword forged specifically to slay dragons. Incredibly powerful but requires great strength to wield.",
    stats: { power: 7, defense: 1, speed: -1, utility: 3 },
    image: "https://via.placeholder.com/80?text=Greatsword",
    inStock: false,
    featured: true,
    discounted: false,
    requirements: ["Level 30+", "Strength 50+"]
  },
  { 
    id: 19, 
    name: "Invisibility Potion", 
    type: "Consumable",
    category: "potions", 
    rarity: "Rare",
    price: 75,
    currency: 'coins',
    effects: ["Invisible for 30s", "Breaking stealth creates smoke cloud"],
    description: "A potion that renders the drinker completely invisible for a short time. Perfect for stealth missions.",
    stats: { power: 0, defense: 0, speed: 0, utility: 5 },
    image: "https://via.placeholder.com/80?text=InvisPotion",
    inStock: true,
    featured: false,
    discounted: false
  },
  { 
    id: 20, 
    name: "Blessed Shield", 
    type: "Armor",
    category: "armor", 
    subtype: "Shield",
    rarity: "Epic",
    price: 200,
    originalPrice: 300,
    currency: 'coins',
    effects: ["+25 Defense", "+15 Holy Resistance", "Reflects 20% of magic damage"],
    description: "A shield blessed by the gods. Offers excellent protection against both physical and magical attacks.",
    stats: { power: 0, defense: 4, speed: 0, utility: 3 },
    image: "https://via.placeholder.com/80?text=Shield",
    inStock: true,
    featured: true,
    discounted: true
  }
];

export default Shop;