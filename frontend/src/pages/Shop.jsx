// src/pages/Shop.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  ShoppingCartIcon
} from "@heroicons/react/outline";
import { useThemeStyles } from "../context/ThemeProvider";
import CategoryBar from "../components/shop/CategoryBar";
import ItemDetail from "../components/shop/ItemDetail";
import CartModal from "../components/shop/CartModal";
import ItemGrid from "../components/shared/ItemGrid";
import ItemList from "../components/shared/ItemList";
import { sampleShopItems } from "../data/shopData";
import { 
  shopCategories, 
  filterItems, 
  sortItems 
} from "../utils/itemUtils";
import bannerGif from "../assets/P_2NNp.gif";

const Shop = () => {
  const { theme: currentTheme } = useThemeStyles();

  // Add null checks to prevent React Error #31
  if (!currentTheme) {
    return <div>Loading...</div>;
  }

  const isNeonTheme = currentTheme.id && currentTheme.id.includes('neon');
  const isCyberpunk = currentTheme.id === 'cyberpunk';

  // State for shop items, categories, and cart
  const [items, setItems] = useState([]);
  const [viewMode, setViewMode] = useState("grid");
  const [selectedItem, setSelectedItem] = useState(null);
  // New filter/search state to enable sidebar filtering UI
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    type: "",
    rarity: "",
    minPrice: 0,
    maxPrice: 1000,
    featured: false,
    category: "all"
  });
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  // Shop category navigation
  const [activeShopType, setActiveShopType] = useState("market");
  const shopTypes = [
    { id: "market", label: "Market", description: "Shop art will be here" },
    { id: "quests", label: "Quests", description: "Mission rewards and quest items" },
    { id: "customizations", label: "Customizations", description: "Character and UI customizations" },
    { id: "seasonal", label: "Seasonal Shop", description: "Limited time seasonal items" },
    { id: "time-travelers", label: "Time Travelers", description: "Exclusive time-limited items" }
  ];

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
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // Apply common filtering utility with search and category
  const filteredItems = filterItems(items, filters, searchQuery, "shop");

  // Group items by category for display with headings
  const groupItemsByCategory = (items) => {
    const grouped = {};
    items.forEach(item => {
      if (!grouped[item.category]) {
        grouped[item.category] = [];
      }
      grouped[item.category].push(item);
    });
    return grouped;
  };

  const groupedItems = groupItemsByCategory(filteredItems);
  const categoryNames = {
    'weapons': 'Weapons',
    'armor': 'Armor', 
    'potions': 'Potions',
    'scrolls': 'Scrolls',
    'materials': 'Materials',
    'special': 'Special Items'
  };

  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
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
      <div className="w-full">

        {/* Shop Header: navigation on the left, cart on right */}
        <div
          className="mb-6 flex items-stretch"
          style={{
            backgroundColor: currentTheme.bgSecondary,
            border: `1px solid ${currentTheme.borderColor}`,
            borderRadius: '3px !important'
          }}
        >
          {/* Left: Shop type selector - now taking full height */}
          <div className="flex items-stretch pl-4">
            <div className="flex items-stretch gap-0 w-full">
              {shopTypes.map((shopType) => {
                const isActive = activeShopType === shopType.id;
                return (
                  <button
                    key={shopType.id}
                    onClick={() => setActiveShopType(shopType.id)}
                    className="px-4 py-4 text-sm font-bold flex items-center justify-center relative"
                    style={{
                      background: 'transparent',
                      color: isActive ? currentTheme.primaryColor : currentTheme.textSecondary,
                      fontFamily: currentTheme.font,
                      height: '100%'
                    }}
                  >
                    {shopType.label}
                    {isActive && (
                      <div 
                        className="absolute bottom-0 left-0 right-0 h-0.5"
                        style={{ backgroundColor: currentTheme.primaryColor }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Cart button */}
          <button
            onClick={() => setShowCart(true)}
            className="ml-auto flex items-center justify-center gap-2 px-4 py-4 h-full transition-all duration-200 hover:bg-opacity-10"
            style={{
              backgroundColor: 'transparent',
              color: currentTheme.primaryColor,
              borderRadius: currentTheme.radius
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = `${currentTheme.primaryColor}15`;
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
            }}
          >
            <ShoppingCartIcon className="w-5 h-5" />
            <span className="text-sm font-bold">{getCartItemCount()}</span>
          </button>
        </div>

        {/* Main Layout: Filters on left, Banner + Items on right */}
        <div className="flex gap-6">
          {/* Left Sidebar - Search + Filters (checkbox style) */}
          <div className="w-64 flex-shrink-0">
            <div className="p-4 rounded-lg"
                 style={{
                   backgroundColor: currentTheme.bgSecondary,
                   border: `1px solid ${currentTheme.borderColor}`,
                   borderRadius: currentTheme.radius
                 }}>
              {/* Search */}
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-3 py-2 text-sm"
                  style={{
                    backgroundColor: currentTheme.inputBg,
                    color: currentTheme.textPrimary,
                    border: `1px solid ${currentTheme.inputBorder || currentTheme.borderColor}`,
                    borderRadius: currentTheme.radius,
                    fontFamily: currentTheme.font
                  }}
                />
              </div>

              {/* Filters heading */}
              <h4 className="text-sm font-semibold mb-3" style={{ color: currentTheme.textPrimary, fontFamily: currentTheme.font }}>
                Filters
              </h4>

              {/* Category checkboxes (single-select for now) */}
              <div className="space-y-3">
                {shopCategories.map((category) => {
                  const checked = filters.category === category.id;
                  return (
                    <label key={category.id} className="flex items-start gap-3 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => updateFilter('category', checked ? 'all' : category.id)}
                        className="mt-0.5 h-4 w-4"
                        style={{
                          accentColor: currentTheme.primaryColor,
                          cursor: 'pointer'
                        }}
                      />
                      <span className="text-sm" style={{ color: currentTheme.textSecondary, fontFamily: currentTheme.font }}>
                        {category.name}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Content Area - Banner + Items */}
          <div className="flex-1">
            {/* Banner */}
            <div className="mb-6">
              <div className="relative h-60 overflow-hidden"
                   style={{
                     border: `1px solid ${currentTheme.borderColor}`,
                     borderRadius: '3px'
                   }}>
                <img 
                  src={bannerGif} 
                  alt="Shop Banner"
                  className="w-full h-full object-cover"
                  style={{
                    borderRadius: '3px',
                    objectPosition: 'center 86%'
                  }}
                />
              </div>
            </div>

            {/* Items Section - EXACTLY same width as banner */}
            <div className="p-4" style={{ 
              backgroundColor: currentTheme.bgSecondary,
              borderRadius: currentTheme.radius,
              border: `1px solid ${currentTheme.borderColor}`
            }}>
              {/* Item count and results info - Updated styling */}
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
              
              {/* Items grouped by category with headings */}
              {Object.keys(groupedItems).length > 0 ? (
                Object.keys(groupedItems).map(categoryId => (
                  <div key={categoryId} className="mb-6">
                    <h3 className="text-lg font-bold mb-3" style={{ 
                      color: currentTheme.textPrimary,
                      fontFamily: currentTheme.font 
                    }}>
                      {categoryNames[categoryId] || categoryId}
                    </h3>
                    {viewMode === 'grid' ? (
                      <ItemGrid 
                        items={groupedItems[categoryId]}
                        viewMode={viewMode}
                        onSelectItem={setSelectedItem}
                        addToCart={addToCart}
                        mode="shop"
                      />
                    ) : (
                      <ItemList 
                        items={groupedItems[categoryId]}
                        viewMode={viewMode}
                        onSelectItem={setSelectedItem}
                        addToCart={addToCart}
                        mode="shop"
                      />
                    )}
                  </div>
                ))
              ) : (
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
                    {isNeonTheme ? '[ NO ITEMS FOUND ]' : isCyberpunk ? 'NO ITEMS FOUND' : 'No items found'}
                  </p>
                  <p className="text-sm" style={{ color: currentTheme.textSecondary, fontFamily: currentTheme.font }}>
                    Try adjusting your filters or search terms
                  </p>
                </div>
              )}
            </div>
          </div>
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
      
      {/* Floating Cart Button removed; cart now in header */}

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