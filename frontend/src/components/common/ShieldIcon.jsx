import React from 'react';
import shieldImage from '../../assets/shield_icon.png';

const ShieldIcon = ({ className = '', size = 'w-5 h-5', ...props }) => {
  return (
    <img 
      src={shieldImage} 
      alt="Shield" 
      className={`${size} ${className}`}
      {...props}
    />
  );
};

export default ShieldIcon;

