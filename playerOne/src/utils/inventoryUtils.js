// Helper functions for the inventory components

// Get rarity color
export const getRarityColor = (rarity) => {
	switch(rarity) {
	  case "Common": return "#9ca3af"; // gray-400
	  case "Uncommon": return "#22c55e"; // green-500
	  case "Rare": return "#3b82f6"; // blue-500
	  case "Epic": return "#a855f7"; // purple-500
	  case "Legendary": return "#f59e0b"; // amber-500
	  default: return "#9ca3af"; // gray-400
	}
  };
  
  // Get scan line class (for neon themes)
  export const getScanLineClass = (item, isNeonTheme) => {
	if (!isNeonTheme) return '';
	return 'sl-scan-line-custom';
  };
  
  // Get custom scan line style for an item
  export const getScanLineStyle = (item, isNeonTheme) => {
	if (!isNeonTheme) return {};
  
	const rarityColor = getRarityColor(item.rarity);
	return {
	  '--scan-line-color': rarityColor
	};
  };
  
  // Sample inventory data
  export const sampleInventoryItems = [
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
  ];