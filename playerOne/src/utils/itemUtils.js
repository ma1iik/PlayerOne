// Common utility functions for shop and inventory items

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
  
  // Common filter options
  export const filterOptions = {
	types: ["All", "Equipment", "Weapon", "Armor", "Consumable", "Quest Item", "Special", "Material"],
	rarities: ["All", "Common", "Uncommon", "Rare", "Epic", "Legendary"],
  };
  
  // Shop categories 
  export const shopCategories = [
	{ id: "all", name: "All Items" },
	{ id: "weapons", name: "Weapons" },
	{ id: "armor", name: "Armor" },
	{ id: "potions", name: "Potions" },
	{ id: "scrolls", name: "Scrolls" },
	{ id: "materials", name: "Materials" },
	{ id: "special", name: "Special Items" }
  ];
  
  // Function to filter items based on common filter patterns
  export const filterItems = (items, filters, searchQuery, mode = "shop") => {
	return items.filter(item => {
	  // Common filters
	  
	  // Search filter
	  if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase())) {
		return false;
	  }
	  
	  // Type filter
	  if (filters.type && filters.type !== "All" && item.type !== filters.type) {
		return false;
	  }
	  
	  // Rarity filter
	  if (filters.rarity && filters.rarity !== "All" && item.rarity !== filters.rarity) {
		return false;
	  }
	  
	  // Mode-specific filters
	  if (mode === "shop") {
		// Price range filter
		if (item.price < filters.minPrice || item.price > filters.maxPrice) {
		  return false;
		}
		
		// Featured filter
		if (filters.featured && !item.featured) {
		  return false;
		}
		
		// Category filter
		if (filters.category && filters.category !== "all" && item.category !== filters.category) {
		  return false;
		}
	  } else {
		// Equipped filter
		if (filters.showEquipped && !item.equipped) {
		  return false;
		}
	  }
	  
	  return true;
	});
  };
  
  // Function to sort items based on common sort patterns
  export const sortItems = (items, sortOption) => {
	return [...items].sort((a, b) => {
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