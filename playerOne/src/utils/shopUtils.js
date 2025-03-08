
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
  
  // Filter options
  export const filterOptions = {
	types: ["All", "Weapon", "Armor", "Consumable", "Quest Item", "Special", "Material"],
	rarities: ["All", "Common", "Uncommon", "Rare", "Epic", "Legendary"],
  };
  
  // Categories for the shop items
  export const categories = [
	{ id: "all", name: "All Items" },
	{ id: "weapons", name: "Weapons" },
	{ id: "armor", name: "Armor" },
	{ id: "potions", name: "Potions" },
	{ id: "scrolls", name: "Scrolls" },
	{ id: "materials", name: "Materials" },
	{ id: "special", name: "Special Items" }
  ];
  
  // Sample shop items data
  export const sampleShopItems = [
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