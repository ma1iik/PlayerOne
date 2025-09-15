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

const DragContext = createContext();

export const useDrag = () => {
  const context = useContext(DragContext);
  if (!context) {
    throw new Error('useDrag must be used within a DragProvider');
  }
  return context;
};

export const DragProvider = ({ children }) => {
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });
  
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 5,
    },
  });
  
  const sensors = useSensors(mouseSensor, touchSensor);

  const handleDragEnd = (result, itemsArray, setItemsFunction) => {
	const { active, over } = result;
	
	if (over && active.id !== over.id) {
	  setItemsFunction(items => {
		const oldIndex = items.findIndex(item => item.id === active.id);
		const newIndex = items.findIndex(item => item.id === over.id);
		
		if (oldIndex === -1 || newIndex === -1) {
		  console.error("Invalid indexes detected", { active, over, oldIndex, newIndex });
		  return items;
		}
		
		return arrayMove(items, oldIndex, newIndex);
	  });
	}
  };

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