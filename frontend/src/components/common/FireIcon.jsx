import React from 'react';
import fireImage from '../../assets/fire_icon.png';

const FireIcon = ({ className = '', size = 'w-5 h-5', ...props }) => {
  return (
    <img 
      src={fireImage} 
      alt="Fire" 
      className={`${size} ${className}`}
      {...props}
    />
  );
};

export default FireIcon;

