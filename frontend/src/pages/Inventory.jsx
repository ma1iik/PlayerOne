// src/pages/Inventory.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  SearchIcon, 
  FilterIcon, 
  ViewGridIcon, 
  ViewListIcon,
  CogIcon,
  UserIcon,
  ShieldCheckIcon,
  StarIcon,
  SparklesIcon
} from "@heroicons/react/outline";
import ItemDetail from "../components/inventory/ItemDetail";
import ItemList from "../components/shared/ItemList";
import { useThemeStyles } from "../context/ThemeProvider";
import { sampleInventoryItems } from "../data/inventoryData";
import { 
  filterItems, 
  sortItems,
  filterOptions
} from "../utils/itemUtils";

const ShieldIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
  </svg>
);

// Enhanced Equipment Slot component - with shared borders
const EquipmentSlot = ({ item, onSelect, hasEquipped, slotType, borderConfig, adjacentEquipped = {} }) => {
  const { theme: currentTheme } = useThemeStyles();
  
  // Add null checks to prevent React Error #31
  if (!currentTheme) {
    return <div>Loading...</div>;
  }
  
  const isNeonTheme = currentTheme.id && currentTheme.id.includes('neon');
  const isCyberpunk = currentTheme.id === 'cyberpunk';

  // Get slot label text
  const getSlotLabel = (slotType) => {
    const labels = {
      helmet: "Helmet",
      armor: "Armor", 
      boots: "Boots",
      weapon: "Weapon",
      offhand: "Off-hand",
      accessory: "Accessory"
    };
    return labels[slotType] || "Slot";
  };

  // Calculate reduced border radius (half of current radius)
  const reducedRadius = currentTheme.radius.replace(/[\d.]+/, (match) => 
    (parseFloat(match) / 2).toString()
  );

  // Build border style based on configuration
  const borderStyle = `2px dashed ${hasEquipped ? currentTheme.primaryColor : currentTheme.borderColor}`;
  const getBorderStyles = () => {
    const styles = {
      backgroundColor: currentTheme.bgSecondary,
      borderRadius: borderConfig.radius || '0'
    };
    
    if (hasEquipped) {
      // When equipped, show all borders by default
      styles.borderTop = borderStyle;
      styles.borderRight = borderStyle;
      styles.borderBottom = borderStyle;
      styles.borderLeft = borderStyle;
      
      // Only hide borders if BOTH this item and the adjacent item are equipped
      // This creates shared borders between equipped items
      if (!borderConfig.top && adjacentEquipped.top) {
        styles.borderTop = 'none';
      }
      if (!borderConfig.right && adjacentEquipped.right) {
        styles.borderRight = 'none';
      }
      if (!borderConfig.bottom && adjacentEquipped.bottom) {
        styles.borderBottom = 'none';
      }
      if (!borderConfig.left && adjacentEquipped.left) {
        styles.borderLeft = 'none';
      }
    } else {
      // When no item is equipped, use the borderConfig as before
      if (borderConfig.top) styles.borderTop = borderStyle;
      if (borderConfig.right) styles.borderRight = borderStyle;
      if (borderConfig.bottom) styles.borderBottom = borderStyle;
      if (borderConfig.left) styles.borderLeft = borderStyle;
    }
    
    return styles;
  };

  return (
    <div 
      className={`w-20 h-20 md:w-24 md:h-24 flex flex-col items-center justify-center cursor-pointer transition-all duration-200`}
      style={{
        ...getBorderStyles(),
        boxShadow: hasEquipped ? `0 0 8px ${isNeonTheme || isCyberpunk ? currentTheme.primaryColor + '70' : 'rgba(0,0,0,0.1)'}` : 'none',
        position: 'relative',
        zIndex: 1
      }}
      onClick={() => item && onSelect(item)}
      onMouseEnter={(e) => {
        if (item) {
          e.currentTarget.style.boxShadow = `4px 0 8px rgba(0,0,0,0.15), -4px 0 8px rgba(0,0,0,0.15), 0 0 0 1px ${currentTheme.borderColor}`;
          e.currentTarget.style.zIndex = '0'; // Lower z-index on hover so shadow goes behind
        }
      }}
      onMouseLeave={(e) => {
        if (item) {
          e.currentTarget.style.boxShadow = hasEquipped ? `0 0 8px ${isNeonTheme || isCyberpunk ? currentTheme.primaryColor + '70' : 'rgba(0,0,0,0.1)'}` : 'none';
          e.currentTarget.style.zIndex = '1'; // Restore z-index
        }
      }}
    >
      {item ? (
        <img 
          src={item.image} 
          alt={item.name}
          className="w-4/5 h-4/5 object-contain"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <span className="text-xs text-center px-1" style={{ color: currentTheme.textSecondary }}>
            {isNeonTheme ? getSlotLabel(slotType).toUpperCase() : getSlotLabel(slotType)}
          </span>
        </div>
      )}
    </div>
  );
};

// Enhanced Character equipment section
const CharacterEquipmentSection = ({ equippedItems, setSelectedItem, currentTheme, isNeonTheme, isCyberpunk }) => {
  // Calculate reduced border radius (half of current radius)
  const reducedRadius = currentTheme.radius.replace(/[\d.]+/, (match) => 
    (parseFloat(match) / 2).toString()
  );

  return (
    <div className="flex-shrink-0 p-3 border-b" style={{ borderColor: currentTheme.borderColor }}>
      <h3 className={`text-lg font-semibold mb-3 text-center ${isNeonTheme ? 'sl-glow-text' : ''}`}
          style={{ color: currentTheme.textPrimary }}>
        {isNeonTheme ? 'EQUIPMENT' : 'Equipment'}
      </h3>
      
      <div className="flex">
        {/* Left side equipment slots - shared borders */}
        <div className="w-1/4 flex flex-col justify-center items-center">
          <EquipmentSlot 
            item={equippedItems.helmet} 
            onSelect={setSelectedItem}
            hasEquipped={!!equippedItems.helmet}
            slotType="helmet"
            borderConfig={{
              top: true,
              left: true,
              right: true,
              bottom: true,
              radius: `${reducedRadius} 0 0 0`
            }}
            adjacentEquipped={{ 
              bottom: !!equippedItems.armor  // helmet is above armor
            }}
          />
          <EquipmentSlot 
            item={equippedItems.armor} 
            onSelect={setSelectedItem}
            hasEquipped={!!equippedItems.armor}
            slotType="armor"
            borderConfig={{
              top: false,
              left: true,
              right: true,
              bottom: true
            }}
            adjacentEquipped={{ 
              top: !!equippedItems.helmet,    // armor is below helmet
              bottom: !!equippedItems.boots   // armor is above boots
            }}
          />
          <EquipmentSlot 
            item={equippedItems.boots} 
            onSelect={setSelectedItem}
            hasEquipped={!!equippedItems.boots}
            slotType="boots"
            borderConfig={{
              top: false,
              left: true,
              right: true,
              bottom: true,
              radius: `0 0 0 ${reducedRadius}`
            }}
            adjacentEquipped={{ 
              top: !!equippedItems.armor  // boots is below armor
            }}
          />
        </div>
        
        {/* Middle area - Character display */}
        <div className="w-2/4 flex flex-col items-center justify-center px-2"
             style={{ 
               borderTop: `2px dashed ${currentTheme.borderColor}`,
               borderBottom: `2px dashed ${currentTheme.borderColor}`,
               minHeight: "200px",
               backgroundColor: currentTheme.bgSecondary
             }}>
          <p className="text-sm text-center" style={{ color: currentTheme.textSecondary }}>
            {isNeonTheme ? 'CHARACTER' : 'Character'}
          </p>
        </div>
        
        {/* Right side equipment slots - shared borders */}
        <div className="w-1/4 flex flex-col justify-center items-center">
          <EquipmentSlot 
            item={equippedItems.accessory} 
            onSelect={setSelectedItem}
            hasEquipped={!!equippedItems.accessory}
            slotType="accessory"
            borderConfig={{
              top: true,
              left: true,
              right: true,
              bottom: true,
              radius: `0 ${reducedRadius} 0 0`
            }}
            adjacentEquipped={{ 
              bottom: !!equippedItems.weapon  // accessory is above weapon
            }}
          />
          <EquipmentSlot 
            item={equippedItems.weapon} 
            onSelect={setSelectedItem}
            hasEquipped={!!equippedItems.weapon}
            slotType="weapon"
            borderConfig={{
              top: false,
              left: true,
              right: true,
              bottom: true
            }}
            adjacentEquipped={{ 
              top: !!equippedItems.accessory,  // weapon is below accessory
              bottom: !!equippedItems.offhand  // weapon is above offhand
            }}
          />
          <EquipmentSlot 
            item={equippedItems.offhand} 
            onSelect={setSelectedItem}
            hasEquipped={!!equippedItems.offhand}
            slotType="offhand"
            borderConfig={{
              top: false,
              left: true,
              right: true,
              bottom: true,
              radius: `0 0 ${reducedRadius} 0`
            }}
            adjacentEquipped={{ 
              top: !!equippedItems.weapon  // offhand is below weapon
            }}
          />
        </div>
      </div>
    </div>
  );
};

// Sectioned Inventory Grid - replaces the grid view in inventory
const SectionedInventoryGrid = ({ filteredItems, setSelectedItem, toggleEquip, currentTheme, isNeonTheme }) => {
  
  // Function to categorize items into sections
  const categorizeItems = (items) => {
    const sections = {
      "Main-Hand Item": [],
      "Off-Hand Item": [], 
      "Headgear": [],
      "Armor": [],
      "Consumables": [],
      "Materials": [],
      "Quest Items": [],
      "Special": []
    };

    items.forEach(item => {
      if (item.type === "Weapon") {
        if (item.subtype === "Two-Handed") {
          sections["Main-Hand Item"].push(item);
        } else if (item.subtype === "Shield" || item.subtype === "Off-Hand") {
          sections["Off-Hand Item"].push(item);
        } else {
          sections["Main-Hand Item"].push(item);
        }
      } else if (item.type === "Armor") {
        if (item.subtype === "Head" || item.subtype === "Helmet") {
          sections["Headgear"].push(item);
        } else {
          sections["Armor"].push(item);
        }
      } else if (item.type === "Consumable") {
        sections["Consumables"].push(item);
      } else if (item.type === "Material") {
        sections["Materials"].push(item);
      } else if (item.type === "Quest Item") {
        sections["Quest Items"].push(item);
      } else {
        sections["Special"].push(item);
      }
    });

    // Filter out empty sections
    return Object.entries(sections).filter(([_, items]) => items.length > 0);
  };

const InventoryCard = ({ item, onClick, toggleEquip }) => {
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [isCardHovered, setIsCardHovered] = useState(false);

  const getRarityColor = (rarity) => {
    switch(rarity) {
      case "Common": return "#64748b";
      case "Uncommon": return "#10b981";
      case "Rare": return "#3b82f6";
      case "Epic": return "#8b5cf6";
      case "Legendary": return "#f59e0b";
      default: return "#64748b";
    }
  };

  const rarityColor = getRarityColor(item.rarity);

  const handleEquipToggle = (e) => {
    e.stopPropagation();
    toggleEquip(item.id);
  };

  const getButtonStyle = () => {
    const baseStyle = {
      border: '3px solid white',
      zIndex: 10,
      transition: 'all 0.2s ease'
    };

    // Determine visibility
    const shouldShow = item.equipped || isCardHovered;
    
    if (!shouldShow) {
      return {
        ...baseStyle,
        backgroundColor: '#6b7280',
        opacity: 0,
        visibility: 'hidden',
        transform: 'scale(0.8)'
      };
    }

    // Button is visible, now determine color/state
    if (item.equipped && isButtonHovered) {
      return {
        ...baseStyle,
        backgroundColor: '#ef4444',
        opacity: 1,
        visibility: 'visible',
        transform: 'scale(1)'
      };
    } else if (item.equipped) {
      return {
        ...baseStyle,
        backgroundColor: '#3b82f6',
        opacity: 1,
        visibility: 'visible',
        transform: 'scale(1)'
      };
    } else {
      return {
        ...baseStyle,
        backgroundColor: '#6b7280',
        opacity: 0.7,
        visibility: 'visible',
        transform: 'scale(1)'
      };
    }
  };

  const getButtonIcon = () => {
    if (item.equipped && isButtonHovered) {
      return <ShieldCheckIcon className="w-5 h-5 text-white" />;
    } else if (item.equipped) {
      return <ShieldIcon className="w-5 h-5 text-white" />;
    } else {
      return <ShieldCheckIcon className="w-5 h-5 text-white" />;
    }
  };

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsCardHovered(true)}
      onMouseLeave={() => setIsCardHovered(false)}
    >
      <div 
        className="relative transition-all duration-150 cursor-pointer overflow-hidden hover:translate-y-[-2px]"
        style={{ 
          backgroundColor: currentTheme.bgSecondary,
          border: `1px solid ${currentTheme.borderColor}`,
          borderRadius: currentTheme.radius,
          height: '180px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}
        onClick={onClick}
      >
        <div 
          className="absolute top-0 left-0 right-0 h-1"
          style={{ 
            background: `linear-gradient(90deg, ${rarityColor}4D, ${rarityColor})`,
            borderTopLeftRadius: currentTheme.radius,
            borderTopRightRadius: currentTheme.radius
          }}
        />

        <div className="p-3 flex flex-col h-full relative z-[2]">
          <div 
            className="flex items-center justify-center mb-3 relative" 
            style={{ 
              backgroundColor: `${currentTheme.bgTertiary}`,
              borderRadius: `calc(${currentTheme.radius} - 2px)`,
              aspectRatio: '1',
              width: '100%',
              maxHeight: '120px'
            }}
          >
            <img 
              src={item.image} 
              alt={item.name}
              className="w-4/5 h-4/5 object-contain"
              style={{
                filter: item.rarity === 'Legendary' ? 'drop-shadow(0 0 8px rgba(245, 158, 11, 0.3))' :
                       item.rarity === 'Epic' ? 'drop-shadow(0 0 6px rgba(139, 92, 246, 0.2))' : 'none'
              }}
            />
          </div>
          
          <div className="flex-1 flex flex-col justify-between">
            <h3 
              className="text-sm font-medium text-center leading-tight mb-2"
              style={{ 
                color: currentTheme.textPrimary,
                lineHeight: '1.2',
                height: '2.4em',
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical'
              }}
            >
              {item.name}
            </h3>
            
            <div className="text-center space-y-1">
              <div 
                className="inline-block px-2 py-1 text-xs font-medium rounded-full"
                style={{ 
                  backgroundColor: `${rarityColor}15`,
                  color: rarityColor,
                  border: `1px solid ${rarityColor}30`
                }}
              >
                {item.rarity}
              </div>
              
              <div className="text-xs" style={{ color: currentTheme.textSecondary }}>
                {item.type}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div 
        className="absolute -top-3 -right-3 w-9 h-9 rounded-full flex items-center justify-center cursor-pointer"
        style={getButtonStyle()}
        onClick={handleEquipToggle}
        onMouseEnter={() => {
          if (item.equipped) {
            setIsButtonHovered(true);
          }
        }}
        onMouseLeave={() => {
          if (item.equipped) {
            setIsButtonHovered(false);
          }
        }}
        title={
          item.equipped 
            ? (isButtonHovered ? "Unequip item" : "Item equipped") 
            : "Equip item"
        }
      >
        {getButtonIcon()}
      </div>
    </div>
  );
};
  const categorizedSections = categorizeItems(filteredItems);

  return (
    <div className="space-y-6">
      {categorizedSections.map(([sectionName, sectionItems]) => (
        <div key={sectionName}>
          {/* Section Header - Left aligned */}
          <div className="flex items-center mb-4">
            <h4 className={`text-base font-semibold ${isNeonTheme ? 'sl-glow-text' : ''}`}
                style={{ color: currentTheme.textPrimary }}>
              {isNeonTheme ? sectionName.toUpperCase() : sectionName}
            </h4>
            <span 
              className="text-xs px-2 py-1 rounded-full font-medium ml-2"
              style={{ 
                backgroundColor: `${currentTheme.primaryColor}15`,
                color: currentTheme.primaryColor 
              }}
            >
              {sectionItems.length}
            </span>
          </div>
          
          {/* Section Items Grid */}
          <div className="grid grid-cols-5 gap-3 mb-4">
            {sectionItems.map(item => (
              <InventoryCard 
                key={item.id} 
                item={item} 
                onClick={() => setSelectedItem(item)}
                toggleEquip={toggleEquip}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

// Character stats component with progress bars
const CharacterStats = () => {
  const { theme: currentTheme } = useThemeStyles();
  
  // Add null checks to prevent React Error #31
  if (!currentTheme) {
    return <div>Loading...</div>;
  }
  
  const isNeonTheme = currentTheme.id && currentTheme.id.includes('neon');

  // Sample character stats
  const stats = {
    level: 28,
    hp: { current: 240, max: 240 },
    mp: { current: 100, max: 120 },
    attack: 75,
    defense: 62,
    speed: 45,
    luck: 30
  };
  
  const ProgressBar = ({ value, max, color }) => (
    <div className="w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: `${color}20` }}>
      <div 
        className="h-full transition-all duration-300"
        style={{ 
          width: `${(value / max) * 100}%`,
          backgroundColor: color 
        }}
      />
    </div>
  );
  
  const StatLine = ({ label, value, max = null, color = currentTheme.primaryColor }) => (
    <div className="mb-3">
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm" style={{ color: currentTheme.textSecondary }}>
          {isNeonTheme ? label.toUpperCase() : label}
        </span>
        <span className="text-sm font-medium" style={{ color: currentTheme.textPrimary }}>
          {max ? `${value}/${max}` : value}
        </span>
      </div>
      {max && <ProgressBar value={value} max={max} color={color} />}
    </div>
  );
  
  return (
    <div className="p-4">
      <h3 className={`text-lg font-semibold mb-4 pb-2 text-center ${isNeonTheme ? 'sl-glow-text' : ''}`}
          style={{ 
            color: currentTheme.textPrimary,
            borderBottom: `1px solid ${currentTheme.borderColor}`
          }}>
        {isNeonTheme ? 'CHARACTER STATS' : 'Character Stats'}
      </h3>
      
      <StatLine label="Level" value={stats.level} />
      <StatLine label="HP" value={stats.hp.current} max={stats.hp.max} color="#ef4444" />
      <StatLine label="MP" value={stats.mp.current} max={stats.mp.max} color="#3b82f6" />
      
      <div className="h-px w-full my-3" style={{ backgroundColor: currentTheme.borderColor }}></div>
      
      <StatLine label="Attack" value={stats.attack} />
      <StatLine label="Defense" value={stats.defense} />
      <StatLine label="Speed" value={stats.speed} />
      <StatLine label="Luck" value={stats.luck} />
    </div>
  );
};

const FilterButton = ({ active, onClick, children }) => {
  const { theme: currentTheme } = useThemeStyles();
  
  // Add null checks to prevent React Error #31
  if (!currentTheme) {
    return <div>Loading...</div>;
  }
  
  const isNeonTheme = currentTheme.id && currentTheme.id.includes('neon');
  const isCyberpunk = currentTheme.id === 'cyberpunk';
  
  return (
    <button
      onClick={onClick}
      className="px-3 py-1.5 text-sm font-medium transition-colors"
      style={{
        backgroundColor: active 
          ? (isNeonTheme || isCyberpunk ? 'rgba(255, 255, 255, 0.1)' : `${currentTheme.primaryColor}15`) 
          : (isNeonTheme || isCyberpunk ? 'transparent' : currentTheme.bgTertiary),
        color: active ? currentTheme.primaryColor : currentTheme.textSecondary,
        borderRadius: currentTheme.radius,
        border: isNeonTheme || isCyberpunk 
          ? `1px solid ${active ? currentTheme.primaryColor : currentTheme.borderColor}` 
          : 'none'
      }}
    >
      {isNeonTheme ? children.toUpperCase() : children}
    </button>
  );
};

const Inventory = () => {
  const { theme: currentTheme } = useThemeStyles();
  
  // Add null checks to prevent React Error #31
  if (!currentTheme) {
    return <div>Loading...</div>;
  }
  
  const isNeonTheme = currentTheme.id && currentTheme.id.includes('neon');
  const isCyberpunk = currentTheme.id === 'cyberpunk';

  // State for inventory management
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [activeFilter, setActiveFilter] = useState("");
  const [showStats, setShowStats] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    type: "",
    rarity: "",
    showEquipped: false
  });
  const [sortOption, setSortOption] = useState({ field: "name", direction: "asc" });
  const [equippedItems, setEquippedItems] = useState({
    helmet: null,
    armor: null,
    boots: null,
    weapon: null,
    offhand: null,
    accessory: null
  });

  // Load sample inventory data
  useEffect(() => {
    const sampleData = sampleInventoryItems;
    setItems(sampleData);
    
    // Initialize equipped items
    const equipped = {
      helmet: sampleData.find(item => item.type === "Armor" && item.subtype === "Head" && item.equipped),
      armor: sampleData.find(item => item.type === "Armor" && item.subtype === "Light" && item.equipped),
      boots: sampleData.find(item => item.type === "Armor" && item.subtype === "Footwear" && item.equipped),
      weapon: sampleData.find(item => item.type === "Weapon" && item.equipped),
      offhand: null,
      accessory: sampleData.find(item => item.type === "Armor" && item.subtype === "Cloak" && item.equipped)
    };
    
    setEquippedItems(equipped);
  }, []);

  // Toggle equipped state
  const toggleEquip = (id) => {
    if (!id) return;
    
    // Find the item
    const item = items.find(i => i.id === id);
    if (!item) return;
    
    // Determine slot key based on item type
    let slotKey = null;
    
    if (item.type === "Armor") {
      if (item.subtype === "Head") {
        slotKey = "helmet";
      } else if (item.subtype === "Footwear") {
        slotKey = "boots";
      } else if (item.subtype === "Cloak") {
        slotKey = "accessory";
      } else {
        slotKey = "armor";
      }
    } else if (item.type === "Weapon") {
      if (item.subtype === "One-Handed") {
        slotKey = "weapon";
      } else {
        slotKey = "weapon";
      }
    } else if (item.type === "Special") {
      slotKey = "accessory";
    }
    
    if (!slotKey) return;
    
    // If item is already equipped, just unequip it
    if (item.equipped) {
      const newItems = items.map(i => 
        i.id === id ? { ...i, equipped: false } : i
      );
      
      setItems(newItems);
      
      // Update equipped items object
      const newEquippedItems = { ...equippedItems };
      newEquippedItems[slotKey] = null;
      setEquippedItems(newEquippedItems);
      
      // Update selected item if it's the one being unequipped
      if (selectedItem && selectedItem.id === id) {
        setSelectedItem({ ...selectedItem, equipped: false });
      }
      return;
    }
    
    // If trying to equip: first unequip any currently equipped item in the same slot
    const currentlyEquippedItem = equippedItems[slotKey];
    
    const newItems = items.map(i => {
      if (i.id === id) {
        // Equip this item
        return { ...i, equipped: true };
      } else if (currentlyEquippedItem && i.id === currentlyEquippedItem.id) {
        // Unequip the currently equipped item in this slot
        return { ...i, equipped: false };
      }
      return i;
    });
    
    setItems(newItems);
    
    // Update equipped items object
    const newEquippedItems = { ...equippedItems };
    newEquippedItems[slotKey] = { ...item, equipped: true };
    setEquippedItems(newEquippedItems);
    
    // Update selected item if it's one of the affected items
    if (selectedItem) {
      if (selectedItem.id === id) {
        setSelectedItem({ ...selectedItem, equipped: true });
      } else if (currentlyEquippedItem && selectedItem.id === currentlyEquippedItem.id) {
        setSelectedItem({ ...selectedItem, equipped: false });
      }
    }
  };

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

  // Reset filters
  const resetFilters = () => {
    setActiveFilters({
      type: "",
      rarity: "",
      showEquipped: false
    });
    setActiveFilter("");
    setSearchQuery("");
  };

  // Apply filters and sorting
  const filteredItems = sortItems(
    filterItems(items, { ...activeFilters, type: activeFilter }, searchQuery, "inventory"),
    sortOption
  );

  return (
    <div className="flex flex-col h-screen overflow-hidden"
         style={{ backgroundColor: currentTheme.bgPrimary }}>
      {/* Header */}
      <div className="flex-shrink-0 p-4 md:p-6">
        <div className="w-full max-w-7xl mx-auto">
          {/* Page header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
            <div className="flex items-center gap-2">
              <ShieldCheckIcon className="w-6 h-6" style={{ color: currentTheme.primaryColor }} />
              <h1 className={`text-xl font-semibold ${isNeonTheme ? 'sl-glow-text' : ''}`}
                  style={{ color: currentTheme.textPrimary }}>
                {isNeonTheme ? 'INVENTORY' : 'Inventory'}
              </h1>
            </div>
            
            <div className="flex flex-col md:flex-row gap-3">
              {/* Search bar */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`pl-9 pr-3 py-2 w-full md:w-60 text-sm focus:outline-none ${isNeonTheme ? 'sl-glow-text' : ''}`}
                  style={{ 
                    backgroundColor: currentTheme.inputBg,
                    border: `1px solid ${currentTheme.borderColor}`,
                    color: currentTheme.textPrimary,
                    borderRadius: currentTheme.radius
                  }}
                />
                <SearchIcon 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" 
                  style={{ color: currentTheme.textSecondary }} 
                />
              </div>
              
              {/* View toggle and filters */}
              <div className="flex items-center justify-between gap-3">
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
                    title="Grid View"
                  >
                    <ViewGridIcon className="h-5 w-5" />
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
                    title="List View"
                  >
                    <ViewListIcon className="h-5 w-5" />
                  </button>
                </div>
                
                {/* Filter toggle button */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`flex items-center gap-2 px-3 py-2 rounded transition-colors ${isNeonTheme ? 'sl-glow-text' : ''}`}
                  style={{ 
                    backgroundColor: isNeonTheme || isCyberpunk ? 'transparent' : 
                      showFilters ? currentTheme.primaryColor : `${currentTheme.primaryColor}20`,
                    color: showFilters ? (isNeonTheme || isCyberpunk ? currentTheme.primaryColor : '#ffffff') : currentTheme.primaryColor,
                    borderRadius: currentTheme.radius,
                    border: isNeonTheme || isCyberpunk ? `1px solid ${currentTheme.primaryColor}` : 'none'
                  }}
                >
                  <FilterIcon className="w-4 h-4" />
                  {isNeonTheme ? 'FILTER' : 'Filter'}
                </button>
                
                {/* Character stats toggle on mobile */}
                <button
                  className="md:hidden p-2 transition-colors"
                  style={{ 
                    backgroundColor: currentTheme.bgTertiary,
                    color: currentTheme.textSecondary,
                    borderRadius: currentTheme.radius,
                    border: `1px solid ${currentTheme.borderColor}`
                  }}
                  onClick={() => setShowStats(!showStats)}
                >
                  <ShieldCheckIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content area - Fixed height and internal scrolling */}
      <div className="flex-1 min-h-0 px-4 md:px-6 pb-4 md:pb-6">
        <div className="w-full max-w-7xl mx-auto h-full">
          <div className="flex flex-col md:flex-row gap-4 h-full">
            {/* Left side - Character panel - Fixed height */}
            <div 
              className={`md:w-1/3 transition-all duration-300 ${showStats ? 'h-auto' : 'h-0 overflow-hidden md:h-auto md:overflow-visible'} md:h-full flex flex-col`}
              style={{ 
                backgroundColor: currentTheme.bgSecondary,
                borderRadius: currentTheme.radius,
                border: `1px solid ${currentTheme.borderColor}`,
                boxShadow: isNeonTheme || isCyberpunk ? `0 0 10px ${currentTheme.shadowColor}` : currentTheme.shadow
              }}
            >
              {/* Character equipment - Fixed size */}
              <CharacterEquipmentSection 
                equippedItems={equippedItems}
                setSelectedItem={setSelectedItem}
                currentTheme={currentTheme}
                isNeonTheme={isNeonTheme}
                isCyberpunk={isCyberpunk}
              />
              
              {/* Character stats - Scrollable if needed */}
              <div className="flex-1 min-h-0 overflow-y-auto">
                <CharacterStats />
              </div>
            </div>
            
            {/* Right side - Inventory items - Fixed height with internal scrolling */}
            <div className="md:w-2/3 flex flex-col h-full min-h-0"
                 style={{
                   backgroundColor: currentTheme.bgSecondary, 
                   borderRadius: currentTheme.radius,
                   border: `1px solid ${currentTheme.borderColor}`,
                   boxShadow: isNeonTheme || isCyberpunk ? `0 0 10px ${currentTheme.shadowColor}` : currentTheme.shadow
                 }}>
              
              {/* Filters panel - positioned over inventory only */}
              {showFilters && (
                <div className="absolute top-0 left-0 right-0 z-10 p-4 m-4"
                     style={{ 
                       backgroundColor: currentTheme.bgSecondary,
                       borderRadius: currentTheme.radius,
                       border: `1px solid ${currentTheme.borderColor}`,
                       boxShadow: isNeonTheme || isCyberpunk ? `0 0 15px ${currentTheme.shadowColor}` : '0 4px 12px rgba(0,0,0,0.15)'
                     }}>
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className={`text-base font-medium ${isNeonTheme ? 'sl-glow-text' : ''}`}
                        style={{ color: currentTheme.textPrimary }}>
                      {isNeonTheme ? 'FILTERS' : 'Filters'}
                    </h3>
                    
                    <button
                      onClick={resetFilters}
                      className="text-xs px-2 py-1 transition-colors"
                      style={{ 
                        color: '#ef4444',
                        backgroundColor: isNeonTheme || isCyberpunk ? 'transparent' : 'rgba(239, 68, 68, 0.1)',
                        border: isNeonTheme || isCyberpunk ? '1px solid #ef4444' : 'none',
                        borderRadius: currentTheme.radius
                      }}
                    >
                      {isNeonTheme ? 'RESET' : 'Reset'}
                    </button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {filterOptions.types.map(type => (
                      <FilterButton
                        key={type}
                        active={activeFilter === (type === 'All' ? '' : type)}
                        onClick={() => setActiveFilter(type === 'All' ? '' : type)}
                      >
                        {type}
                      </FilterButton>
                    ))}
                  </div>
                  
                  <div className="mt-3">
                    <button
                      onClick={() => setActiveFilters({
                        ...activeFilters,
                        showEquipped: !activeFilters.showEquipped
                      })}
                      className="text-sm py-1 px-3 transition-colors"
                      style={{ 
                        backgroundColor: activeFilters.showEquipped 
                          ? (isNeonTheme || isCyberpunk ? 'rgba(255, 255, 255, 0.1)' : `${currentTheme.primaryColor}15`)
                          : (isNeonTheme || isCyberpunk ? 'transparent' : currentTheme.bgTertiary),
                        color: activeFilters.showEquipped ? currentTheme.primaryColor : currentTheme.textSecondary,
                        borderRadius: currentTheme.radius,
                        border: isNeonTheme || isCyberpunk 
                          ? `1px solid ${activeFilters.showEquipped ? currentTheme.primaryColor : currentTheme.borderColor}`
                          : 'none'
                      }}
                    >
                      {isNeonTheme ? 'EQUIPPED ONLY' : 'Equipped Only'}
                    </button>
                  </div>
                </div>
              )}
              
              {/* Header - centered heading */}
              <div className="flex-shrink-0 p-4 border-b" style={{ borderColor: currentTheme.borderColor }}>
                <h3 className={`text-lg font-semibold text-center ${isNeonTheme ? 'sl-glow-text' : ''}`}
                    style={{ color: currentTheme.textPrimary }}>
                  {isNeonTheme ? 'ITEMS' : 'Items'}
                </h3>
              </div>
              
              {/* Scrollable inventory content */}
              <div className="flex-1 min-h-0 overflow-y-auto p-4">
                {filteredItems.length > 0 ? (
                  <div>
                    {/* Grid View - Sectioned */}
                    {viewMode === "grid" && (
                      <SectionedInventoryGrid 
                        filteredItems={filteredItems}
                        setSelectedItem={setSelectedItem}
                        toggleEquip={toggleEquip}
                        currentTheme={currentTheme}
                        isNeonTheme={isNeonTheme}
                      />
                    )}

                    {/* List View */}
                    {viewMode === "list" && (
                      <ItemList 
                        items={filteredItems}
                        viewMode={viewMode}
                        onSelectItem={setSelectedItem}
                        toggleEquip={toggleEquip}
                        mode="inventory"
                      />
                    )}
                  </div>
                ) : (
                  // Empty state
                  <div className="flex flex-col items-center justify-center py-12 h-full"
                       style={{ 
                         backgroundColor: isNeonTheme || isCyberpunk 
                           ? 'rgba(255, 255, 255, 0.05)' 
                           : currentTheme.bgTertiary,
                         borderRadius: currentTheme.radius,
                         border: `1px solid ${currentTheme.borderColor}`
                       }}>
                    <ShieldCheckIcon className="w-12 h-12 mb-4" style={{ color: currentTheme.textSecondary }} />
                    <p className={`text-lg mb-2 ${isNeonTheme ? 'sl-glow-text' : ''}`}
                       style={{ color: currentTheme.textPrimary }}>
                      {isNeonTheme ? 'NO ITEMS FOUND' : 'No items found'}
                    </p>
                    <p className="text-sm text-center mx-4" style={{ color: currentTheme.textSecondary }}>
                      {isNeonTheme 
                        ? 'TRY ADJUSTING YOUR SEARCH OR FILTERS'
                        : 'Try adjusting your search or filters to find what you\'re looking for'}
                    </p>
                    <button
                      onClick={resetFilters}
                      className="mt-4 px-4 py-2 text-sm font-medium"
                      style={{ 
                        backgroundColor: isNeonTheme || isCyberpunk ? 'transparent' : currentTheme.primaryColor,
                        color: isNeonTheme || isCyberpunk ? currentTheme.primaryColor : '#ffffff',
                        border: isNeonTheme || isCyberpunk ? `1px solid ${currentTheme.primaryColor}` : 'none',
                        borderRadius: currentTheme.radius
                      }}
                    >
                      {isNeonTheme ? 'RESET FILTERS' : 'Reset Filters'}
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