import React from 'react';
import starImage from '../../assets/bronze_star.png';

const StarIcon = ({ className = '', size = 'w-5 h-5', ...props }) => {
  return (
    <img 
      src={starImage} 
      alt="Star" 
      className={`${size} ${className}`}
      {...props}
    />
  );
};

export default StarIcon;

