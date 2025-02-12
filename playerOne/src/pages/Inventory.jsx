import React from "react";
import { BriefcaseIcon, FilterIcon, GiftIcon } from "@heroicons/react/outline";

const Inventory = () => {
  const items = [
    { id: 1, name: "Health Potion", type: "Consumable", quantity: 5 },
    { id: 2, name: "Magic Scroll", type: "Quest Item", quantity: 2 },
    { id: 3, name: "Steel Sword", type: "Equipment", quantity: 1 },
  ];

  return (
    <div className="flex flex-1 bg-gray-50 font-sans p-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 w-full max-w-6xl mx-auto">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BriefcaseIcon className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-800">Inventory</h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-lg">
              <GiftIcon className="w-5 h-5 text-gray-600" />
              <span className="font-medium">125</span>
            </div>
            <button className="flex items-center gap-2 bg-blue-500/10 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-500/20">
              <FilterIcon className="w-5 h-5" />
              Filters
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-6">
          {items.map((item) => (
            <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
              <div className="bg-gray-100 h-32 rounded-lg mb-3"></div>
              <h3 className="font-medium text-gray-800">{item.name}</h3>
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm text-gray-600">{item.type}</span>
                <span className="text-sm bg-blue-100 text-blue-600 px-2 py-1 rounded">
                  x{item.quantity}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Inventory;