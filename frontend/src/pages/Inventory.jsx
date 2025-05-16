// src/pages/Inventory.jsx
import React, { useState, useEffect } from "react";
import { 
  BriefcaseIcon, 
  SearchIcon, 
  CogIcon
} from "@heroicons/react/outline";
import ItemDetail from "../components/inventory/ItemDetail";
import { sampleInventoryItems } from "../data/inventoryData";
import { 
  filterItems, 
  sortItems,
  getRarityColor 
} from "../utils/itemUtils";

// Equipment slot component - No label version
const EquipmentSlot = ({ item, onSelect, hasEquipped, slotType }) => {
  // Get background shape based on slot type
  const getSlotShape = (type) => {
    switch(type) {
      case "helmet": return "rounded-t-md";
      case "boots": return "rounded-b-md";
      case "weapon": return "rounded-l-md";
      case "necklace": return "rounded-r-md";
      default: return "rounded-md";
    }
  };

  return (
    <div 
      className={`w-24 h-24 flex items-center justify-center cursor-pointer bg-white border-2 ${getSlotShape(slotType)}`}
      style={{
        borderColor: hasEquipped ? "#22c55e" : "#e5e7eb",
        borderWidth: hasEquipped ? "3px" : "2px",
        background: item ? "white" : "#f9fafb",
        borderRadius: "5px" // More pointy corners
      }}
      onClick={() => item && onSelect(item)}
    >
      {item ? (
        <img 
          src={item.image} 
          alt={item.name}
          className="w-4/5 h-4/5 object-contain"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-gray-300">
          <CogIcon className="w-10 h-10" />
        </div>
      )}
    </div>
  );
};

// Inventory item card component
const InventoryCard = ({ item, onClick }) => {
  return (
    <div 
      className="group relative transition-all duration-150 hover:translate-y-[-2px] cursor-pointer bg-white border border-gray-200 rounded-md overflow-hidden"
      onClick={onClick}
      style={{ height: "240px" }} // 50% larger than before
    >
      <div className="p-4 flex flex-col items-center h-full">
        {/* Item image */}
        <div 
          className="w-full h-3/5 flex items-center justify-center mb-3 bg-gray-50 rounded-md" 
        >
          <img 
            src={item.image} 
            alt={item.name}
            className="w-3/4 h-3/4 object-contain"
          />
          
          {/* Equipped indicator (purple dot) */}
          {item.equipped && (
            <div className="absolute top-3 right-3 w-4 h-4 rounded-full bg-purple-500"></div>
          )}
        </div>
        
        {/* Item name */}
        <h3 className="text-base font-medium text-center mb-2 px-1 text-gray-800">
          {item.name}
        </h3>
        
        {/* Item type and quantity */}
        <div className="text-center mt-auto">
          <span
            className="text-sm font-medium"
            style={{ color: getTypeColor(item.type) }}
          >
            {item.type}
          </span>
          
          {/* Show quantity if greater than 1 */}
          {item.quantity > 1 && (
            <span className="text-sm text-gray-400">
              {" x" + item.quantity}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

// Helper to get color for item type
const getTypeColor = (type) => {
  switch(type) {
    case "Weapon": return "#22c55e"; // Green
    case "Armor": return "#3b82f6"; // Blue
    case "Consumable": return "#22c55e"; // Green
    case "Material": return "#a855f7"; // Purple
    case "Quest Item": return "#f59e0b"; // Amber
    case "Special": return "#3b82f6"; // Blue
    default: return "#6b7280"; // Gray
  }
};

// Character stats display component
const CharacterStats = () => {
  // Sample character stats
  const stats = {
    level: 28,
    hp: 240,
    mp: 120,
    attack: 75,
    defense: 62,
    speed: 45,
    luck: 30
  };
  
  const StatLine = ({ label, value, max = null }) => (
    <div className="flex items-center justify-between mb-3 pb-1">
      <span className="text-sm font-medium text-gray-600">
        {label}
      </span>
      <span className="text-sm font-bold text-gray-800">
        {max ? `${value}/${max}` : value}
      </span>
    </div>
  );
  
  return (
    <div className="p-4">
      <h3 className="text-lg font-medium mb-4 text-center text-purple-600 pb-2 border-b border-gray-100">
        Character Stats
      </h3>
      
      <StatLine label="Level" value={stats.level} />
      <StatLine label="HP" value={stats.hp} max={stats.hp} />
      <StatLine label="MP" value={stats.mp} max={stats.mp} />
      
      <div className="h-px w-full my-2 bg-gray-100"></div>
      
      <StatLine label="Attack" value={stats.attack} />
      <StatLine label="Defense" value={stats.defense} />
      <StatLine label="Speed" value={stats.speed} />
      <StatLine label="Luck" value={stats.luck} />
    </div>
  );
};

const Inventory = () => {
  // State for inventory items, filters, sort and search
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState(""); // Empty string means "All"
  const [sortOption, setSortOption] = useState({ field: "name", direction: "asc" });
  const [equippedItems, setEquippedItems] = useState({
    helmet: null,
    armor: null,
    boots: null,
    weapon1: null,
    weapon2: null,
    necklace: null
  });

  // Load sample inventory data
  useEffect(() => {
    const sampleData = sampleInventoryItems;
    setItems(sampleData);
    
    // Initialize equipped items
    const equipped = {
      helmet: sampleData.find(item => item.type === "Armor" && item.subtype === "Head" && item.equipped),
      armor: sampleData.find(item => item.type === "Armor" && !item.subtype?.includes("Head") && !item.subtype?.includes("Footwear") && item.equipped),
      boots: sampleData.find(item => item.type === "Armor" && item.subtype === "Footwear" && item.equipped),
      weapon1: sampleData.find(item => item.type === "Weapon" && item.equipped),
      weapon2: null,
      necklace: null
    };
    
    setEquippedItems(equipped);
  }, []);

  // Handle toggle equipped state
  const toggleEquip = (id) => {
    if (!id) return;
    
    // Find the item
    const item = items.find(i => i.id === id);
    if (!item) return;
    
    // Determine slot key based on item type
    let slotKey = null;
    
    if (item.type === "Armor") {
      if (item.subtype?.includes("Head")) {
        slotKey = "helmet";
      } else if (item.subtype?.includes("Footwear")) {
        slotKey = "boots";
      } else {
        slotKey = "armor";
      }
    } else if (item.type === "Weapon") {
      // Always use weapon1 as primary slot for weapons
      slotKey = "weapon1"; 
    } else if (item.type === "Special") {
      slotKey = "necklace";
    }
    
    if (!slotKey) return;
    
    // Create new items array
    const newItems = [...items];
    
    // First handle unequipping of currently equipped item in the same slot
    if (!item.equipped) {
      // Get currently equipped item in this slot
      const currentlyEquippedItem = equippedItems[slotKey];
      
      if (currentlyEquippedItem) {
        // Unequip the currently equipped item
        const equippedItemIndex = newItems.findIndex(i => i.id === currentlyEquippedItem.id);
        if (equippedItemIndex !== -1) {
          newItems[equippedItemIndex] = { ...newItems[equippedItemIndex], equipped: false };
        }
      }
    }
    
    // Now toggle the current item's equipped state
    const itemIndex = newItems.findIndex(i => i.id === id);
    if (itemIndex !== -1) {
      newItems[itemIndex] = { ...newItems[itemIndex], equipped: !item.equipped };
    }
    
    // Update state
    setItems(newItems);
    
    // Update equipped items object
    const newEquippedItems = { ...equippedItems };
    newEquippedItems[slotKey] = item.equipped ? null : item;
    setEquippedItems(newEquippedItems);
    
    // If the selected item is being toggled, update it too
    if (selectedItem && selectedItem.id === id) {
      setSelectedItem({ ...selectedItem, equipped: !selectedItem.equipped });
    }
  };

  // Apply filters and sorting
  const filteredItems = sortItems(
    filterItems(items, { type: activeFilter }, searchQuery, "inventory"),
    sortOption
  );

  // Constants for fixed dimensions
  const itemCardHeight = 160; // Height of one item card in px
  const rowsToShow = 3; // Always show space for 3 rows
  const itemsPerRow = 5; // 5 items per row
  
  // Calculate fixed grid height based on 3 rows of items
  const fixedGridHeight = itemCardHeight * rowsToShow; // 480px for 3 rows

  // Check if weapon1 is equipped
  const hasWeapon1 = !!equippedItems.weapon1;
  const hasWeapon2 = !!equippedItems.weapon2;
  const hasHelmet = !!equippedItems.helmet;
  const hasArmor = !!equippedItems.armor;
  const hasBoots = !!equippedItems.boots;
  const hasNecklace = !!equippedItems.necklace;
  
  // Filter options
  const filterOptions = [
    { value: "", label: "All" },
    { value: "Equipment", label: "Equipment" },
    { value: "Weapon", label: "Weapon" },
    { value: "Armor", label: "Armor" },
    { value: "Consumable", label: "Consumable" },
    { value: "Quest Item", label: "Quest Item" },
    { value: "Special", label: "Special" },
    { value: "Material", label: "Material" }
  ];

  return (
    <div className="flex flex-col flex-1 overflow-hidden bg-gray-100 h-screen py-8 px-8">
      <div className="w-full max-w-7xl mx-auto">
        {/* Main content area - Side by side layout with proper spacing */}
        <div className="flex gap-8">
          {/* Left column - Character and Equipment */}
          <div className="w-1/3 flex flex-col bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="p-5 flex flex-col">
              <h2 className="text-xl font-semibold mb-4 text-center text-gray-800 pb-2 border-b border-gray-100">
                Character
              </h2>
              
              <div className="flex mb-6">
                {/* Left side equipment slots */}
                <div className="w-1/4 flex flex-col justify-center items-center gap-5">
                  <EquipmentSlot 
                    item={equippedItems.helmet} 
                    onSelect={setSelectedItem}
                    hasEquipped={hasHelmet}
                    slotType="helmet"
                  />
                  <EquipmentSlot 
                    item={equippedItems.armor} 
                    onSelect={setSelectedItem}
                    hasEquipped={hasArmor}
                    slotType="armor"
                  />
                  <EquipmentSlot 
                    item={equippedItems.boots} 
                    onSelect={setSelectedItem}
                    hasEquipped={hasBoots}
                    slotType="boots"
                  />
                </div>
                
                {/* Middle area - Character display - 50% wider but same spacing */}
                <div className="w-2/4 flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-md mx-6">
                  <p className="text-base text-center px-2 text-gray-500">
                    Character
                  </p>
                </div>
                
                {/* Right side equipment slots */}
                <div className="w-1/4 flex flex-col justify-center items-center gap-5">
                  <EquipmentSlot 
                    item={equippedItems.weapon1} 
                    onSelect={setSelectedItem}
                    hasEquipped={hasWeapon1}
                    slotType="weapon"
                  />
                  <EquipmentSlot 
                    item={equippedItems.weapon2} 
                    onSelect={setSelectedItem}
                    hasEquipped={hasWeapon2}
                    slotType="weapon"
                  />
                  <EquipmentSlot 
                    item={equippedItems.necklace} 
                    onSelect={setSelectedItem}
                    hasEquipped={hasNecklace}
                    slotType="necklace"
                  />
                </div>
              </div>
            </div>
            
            {/* Character stats section with no height restriction */}
            <div className="border-t border-gray-200">
              <CharacterStats />
            </div>
          </div>
          
          {/* Right column - Inventory */}
          <div className="w-2/3 flex flex-col">
            {/* Filter tabs - Redesigned for better UX */}
            <div className="p-4 mb-4 flex flex-col bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xl font-semibold text-gray-800">Inventory</h2>
                
                {/* Search box */}
                <div className="relative w-64 flex-shrink-0">
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search items..."
                    className="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              {/* Item type filter tabs */}
              <div className="flex flex-wrap gap-2">
                {filterOptions.map(filter => (
                  <button
                    key={filter.value}
                    onClick={() => setActiveFilter(filter.value)}
                    className={`px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors rounded-md ${
                      activeFilter === filter.value 
                        ? "bg-purple-500 text-white shadow-sm" 
                        : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Inventory items grid with proper height */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm flex-1 h-[calc(100vh-250px)] overflow-hidden">
              <div className="p-4 overflow-y-auto h-full">
                {filteredItems.length > 0 ? (
                  <div className="grid grid-cols-5 gap-4">
                    {filteredItems.map(item => (
                      <InventoryCard 
                        key={item.id} 
                        item={item} 
                        onClick={() => setSelectedItem(item)}
                      />
                    ))}
                    
                    {/* Add empty placeholders to maintain grid height */}
                    {Array.from({ length: Math.max(0, rowsToShow * 5 - filteredItems.length) }).map((_, index) => (
                      <div 
                        key={`placeholder-${index}`} 
                        className="opacity-0"
                        style={{ height: "240px" }}
                      ></div>
                    ))}
                  </div>
                ) : (
                  // Empty state
                  <div className="h-full flex flex-col items-center justify-center">
                    <BriefcaseIcon className="w-16 h-16 mb-5 text-gray-300" />
                    <p className="text-xl mb-2 text-gray-800 font-medium">
                      No items found
                    </p>
                    <p className="text-gray-500 mb-5 text-center max-w-md">
                      Try adjusting your filters or search query to find what you're looking for
                    </p>
                    <button
                      onClick={() => setActiveFilter("")}
                      className="px-5 py-2.5 bg-purple-500 text-white rounded-md shadow-sm hover:bg-purple-600 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2"
                    >
                      Reset Filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Item Detail Modal */}
      {selectedItem && (
        <ItemDetail 
          item={selectedItem} 
          onClose={() => setSelectedItem(null)} 
          toggleEquip={toggleEquip} 
        />
      )}
    </div>
  );
};

export default Inventory;