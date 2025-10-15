import React from 'react';
import heartImage from '../../assets/heart_icon.png';

const HeartIcon = ({ className = '', size = 'w-5 h-5', ...props }) => {
  return (
    <img 
      src={heartImage} 
      alt="Heart" 
      className={`${size} ${className}`}
      {...props}
    />
  );
};

export default HeartIcon;

