import React, { createContext, useContext, useState } from 'react';
import { 
  DndContext, 
  MouseSensor, 
  TouchSensor, 
  useSensor, 
  useSensors,
  closestCenter
} from '@dnd-kit/core';
import { 
  SortableContext, 
  arrayMove,
  verticalListSortingStrategy 
} from '@dnd-kit/sortable';

// Create context
const DragContext = createContext();

// Custom hook for using the drag context
export const useDrag = () => {
  const context = useContext(DragContext);
  if (!context) {
    throw new Error('useDrag must be used within a DragProvider');
  }
  return context;
};

export const DragProvider = ({ children }) => {
  // Set up sensors for both mouse and touch interactions
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10, // Minimum drag distance before activation
    },
  });
  
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250, // Delay before touch activation
      tolerance: 5, // Tolerance for movement during delay
    },
  });
  
  const sensors = useSensors(mouseSensor, touchSensor);

  // Handle drag end events across different item types
  const handleDragEnd = (result, itemsArray, setItemsFunction) => {
	const { active, over } = result;
	
	if (over && active.id !== over.id) {
	  setItemsFunction(items => {
		const oldIndex = items.findIndex(item => item.id === active.id);
		const newIndex = items.findIndex(item => item.id === over.id);
		
		// Make sure indexes are valid
		if (oldIndex === -1 || newIndex === -1) {
		  console.error("Invalid indexes detected", { active, over, oldIndex, newIndex });
		  return items;
		}
		
		return arrayMove(items, oldIndex, newIndex);
	  });
	}
  };

  // Context value
  const value = {
    sensors,
    handleDragEnd,
  };

  return (
    <DragContext.Provider value={value}>
      {children}
    </DragContext.Provider>
  );
};

export default DragContext;