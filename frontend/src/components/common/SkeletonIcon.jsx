import React from 'react';
import helmetSkeleton from '../../assets/skeleton_helmet.png';
import armorSkeleton from '../../assets/skeleton_armor.png';
import bootsSkeleton from '../../assets/skeleton_boots.png';
import weaponSkeleton from '../../assets/skeleton_weapon.png';
import offhandSkeleton from '../../assets/skeleton_offhand.png';
import potionSkeleton from '../../assets/skeleton_potion.png';

const SkeletonIcon = ({ slotType, className = '', size = 'w-8 h-8', ...props }) => {
  // Map slot types to their corresponding skeleton assets
  const getSkeletonAsset = (slotType) => {
    const assetMap = {
      helmet: helmetSkeleton,        // Steel Helmet
      armor: armorSkeleton,          // Steel Chestplate
      boots: bootsSkeleton,          // Steel Boots
      weapon: weaponSkeleton,        // Spear
      offhand: offhandSkeleton,      // Steel Gauntlet
      accessory: potionSkeleton       // White Cloak
    };
    return assetMap[slotType] || armorSkeleton;
  };

  return (
    <img 
      src={getSkeletonAsset(slotType)} 
      alt={`${slotType} slot`} 
      className={`${size} ${className}`}
      style={{ 
        filter: 'brightness(0.7) contrast(1.2)',
        ...props.style 
      }}
      {...props}
    />
  );
};

export default SkeletonIcon;
