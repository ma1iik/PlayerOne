import React from 'react';
import gemImage from '../../assets/SODA_Icon_Materials_Gem2.png';

const GemIcon = ({ className = '', size = 'w-5 h-5', ...props }) => {
  return (
    <img 
      src={gemImage} 
      alt="Gem" 
      className={`${size} ${className}`}
      {...props}
    />
  );
};

export default GemIcon;

