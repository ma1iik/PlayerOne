import React from 'react';
import coinImage from '../../assets/SODA_Icon_Materials_Coins.png';

const CoinIcon = ({ className = '', size = 'w-5 h-5', ...props }) => {
  return (
    <img 
      src={coinImage} 
      alt="Coin" 
      className={`${size} ${className}`}
      {...props}
    />
  );
};

export default CoinIcon;

