import React, { useState, useContext, useEffect } from "react";
import { 
  ShoppingBagIcon, 
  FilterIcon, 
  SearchIcon, 
  ViewGridIcon, 
  ViewListIcon,
  ShoppingCartIcon,
  PlusIcon
} from "@heroicons/react/outline";
import ThemeContext from "../context/ThemeContext";
import ItemGrid from "../components/shared/ItemGrid";
import ItemList from "../components/shared/ItemList";
import FilterPanel from "../components/shared/FilterPanel";
import CategoryBar from "../components/shop/CategoryBar";
import CartModal from "../components/shop/CartModal";
import ItemDetail from "../components/shop/ItemDetail";
import { sampleShopItems } from "../data/shopData";
import { 
  filterOptions, 
  shopCategories, 
  filterItems, 
  sortItems 
} from "../utils/itemUtils";

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
    featured: false,
    category: "all"
  });

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

  // Update category filter when changing category
  useEffect(() => {
    setActiveFilters({
      ...activeFilters,
      category: activeCategory
    });
  }, [activeCategory]);

  // Apply filters and sorting
  const filteredItems = sortItems(
    filterItems(items, activeFilters, searchQuery, "shop"),
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

    // Update category if category filter changed
    if (filterType === 'category') {
      setActiveCategory(value);
    }
  };

  // Reset filters
  const resetFilters = () => {
    setActiveFilters({
      minPrice: 0,
      maxPrice: 1000,
      type: "",
      rarity: "",
      featured: false,
      category: "all"
    });
    setSearchQuery("");
    setActiveCategory("all");
  };

  return (
    <div className="flex flex-col flex-1 font-sans p-6 overflow-y-auto"
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
            boxShadow: isNeonTheme || isCyberpunk ? `0 0 15px ${currentTheme.shadowColor}` : 'none',
            position: 'relative',
            zIndex: 10
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
        <FilterPanel 
          showFilters={showFilters}
          activeFilters={activeFilters}
          handleFilterChange={handleFilterChange}
          sortOption={sortOption}
          handleSort={handleSort}
          resetFilters={resetFilters}
          filterOptions={filterOptions}
          mode="shop"
        />
        
        {/* Categories */}
        <CategoryBar 
          categories={shopCategories}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
        
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
          <ItemGrid 
            items={filteredItems}
            viewMode={viewMode}
            onSelectItem={setSelectedItem}
            addToCart={addToCart}
            mode="shop"
          />
          
          {/* List View */}
          <ItemList 
            items={filteredItems}
            viewMode={viewMode}
            onSelectItem={setSelectedItem}
            addToCart={addToCart}
            mode="shop"
          />
          
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
        <ItemDetail
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          addToCart={addToCart}
          cartItems={cart}
          setShowCart={setShowCart}
        />
      )}
      
      {/* Shopping Cart Modal */}
      <CartModal
        showCart={showCart}
        setShowCart={setShowCart}
        cart={cart}
        updateCartQuantity={updateCartQuantity}
        removeFromCart={removeFromCart}
        getCartTotal={getCartTotal}
      />
    </div>
  );
};

export default Shop;