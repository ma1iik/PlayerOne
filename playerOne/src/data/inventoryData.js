// Sample inventory items data
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
	  type: "Weapon", 
	  subtype: "One-Handed",
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
	  type: "Armor", 
	  subtype: "Light",
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
	  type: "Armor", 
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
	{ 
	  id: 9, 
	  name: "Enchanted Bow", 
	  type: "Weapon", 
	  subtype: "Ranged",
	  rarity: "Rare",
	  quantity: 1, 
	  effects: ["+25 Ranged Attack", "Arrows pierce through targets"],
	  description: "A finely crafted bow imbued with magical energy. Arrows fired from this bow can pierce through targets.",
	  equipped: false,
	  stats: { power: 4, defense: 0, speed: 2, utility: 1 },
	  image: "https://via.placeholder.com/80?text=Bow"
	},
	{ 
	  id: 10, 
	  name: "Healing Herbs", 
	  type: "Material", 
	  rarity: "Common",
	  quantity: 12, 
	  effects: ["Crafting material for healing potions"],
	  description: "Common herbs with medicinal properties. Used in the creation of various healing potions.",
	  equipped: false,
	  stats: { power: 0, defense: 0, speed: 0, utility: 1 },
	  image: "https://via.placeholder.com/80?text=Herbs"
	},
	{ 
	  id: 11, 
	  name: "Stealth Cloak", 
	  type: "Armor", 
	  subtype: "Cloak",
	  rarity: "Rare",
	  quantity: 1, 
	  effects: ["+10 Defense", "+25% Stealth", "Invisible while standing still"],
	  description: "A cloak woven with shadow magic. Allows the wearer to blend into the darkness and move undetected.",
	  equipped: true,
	  stats: { power: 0, defense: 1, speed: 2, utility: 4 },
	  image: "https://via.placeholder.com/80?text=Cloak"
	},
	{ 
	  id: 12, 
	  name: "Explosive Potion", 
	  type: "Consumable", 
	  rarity: "Uncommon",
	  quantity: 3, 
	  effects: ["Deals 50 area damage", "Creates smoke cloud for 10s"],
	  description: "An unstable concoction that explodes on impact. Useful for dealing with groups of enemies or creating distractions.",
	  equipped: false,
	  stats: { power: 2, defense: 0, speed: 0, utility: 3 },
	  image: "https://via.placeholder.com/80?text=Explosive"
	},
	{ 
	  id: 13, 
	  name: "Ancient Tome", 
	  type: "Quest Item", 
	  rarity: "Legendary",
	  quantity: 1, 
	  effects: ["Required for 'Secrets of the Ancients' quest", "+1 Skill Point when read"],
	  description: "A tome of forgotten knowledge from a lost civilization. Contains powerful secrets and ancient wisdom.",
	  equipped: false,
	  stats: { power: 0, defense: 0, speed: 0, utility: 6 },
	  image: "https://via.placeholder.com/80?text=Tome"
	},
	{ 
	  id: 14, 
	  name: "Bottomless Quiver", 
	  type: "Special", 
	  rarity: "Rare",
	  quantity: 1, 
	  effects: ["Provides unlimited basic arrows", "50% chance not to consume special arrows"],
	  description: "An enchanted quiver that never runs out of arrows. A must-have for any archer.",
	  equipped: false,
	  stats: { power: 1, defense: 0, speed: 1, utility: 5 },
	  image: "https://via.placeholder.com/80?text=Quiver"
	},
	{ 
	  id: 15, 
	  name: "Iron Ingot", 
	  type: "Material", 
	  rarity: "Common",
	  quantity: 15, 
	  effects: ["Crafting material for weapons and armor"],
	  description: "A basic crafting material used to create various weapons and armor pieces.",
	  equipped: false,
	  stats: { power: 0, defense: 0, speed: 0, utility: 1 },
	  image: "https://via.placeholder.com/80?text=Ingot"
	}
  ];