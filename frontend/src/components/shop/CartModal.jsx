import React from "react"; 
import { motion } from "framer-motion";
import { XIcon, CurrencyDollarIcon, ShoppingCartIcon } from "@heroicons/react/outline";
import { useThemeStyles } from "../../context/ThemeProvider";
import CartItem from "./CartItem";
import CoinIcon from '../common/CoinIcon';
import GemIcon from '../common/GemIcon';

const CartModal = ({ showCart, setShowCart, cart, updateCartQuantity, removeFromCart, getCartTotal }) => {
  const { theme: currentTheme } = useThemeStyles();
  
  // Add null checks to prevent React Error #31
  if (!currentTheme) {
    return <div>Loading...</div>;
  }
  
  const isNeonTheme = currentTheme.id && currentTheme.id.includes('neon');
  const isCyberpunk = currentTheme.id === 'cyberpunk';

  if (!showCart) return null;

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setShowCart(false)}
    >
      <motion.div
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        style={{
          backgroundColor: isNeonTheme 
            ? 'rgba(10, 10, 16, 0.95)' 
            : isCyberpunk 
            ? 'rgba(15, 23, 42, 0.95)' 
            : currentTheme.bgSecondary,
          border: `2px solid ${currentTheme.borderColor}`,
          boxShadow: isNeonTheme || isCyberpunk 
            ? `0 0 20px ${currentTheme.shadowColor}` 
            : currentTheme.shadow,
          borderRadius: currentTheme.radius
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cart header */}
        <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: currentTheme.borderColor }}>
          <h3 className={`text-xl font-semibold ${isNeonTheme ? 'sl-glow-text' : ''}`}
              style={{ 
                color: currentTheme.textPrimary,
                fontFamily: isNeonTheme ? "'Orbitron', 'Rajdhani', sans-serif" : 
                            isCyberpunk ? "'Audiowide', 'Rajdhani', sans-serif" : 
                            currentTheme.font
              }}>
            <span className="flex items-center gap-2">
              <ShoppingCartIcon className="w-5 h-5" />
              {isNeonTheme ? '[ SHOPPING CART ]' : isCyberpunk ? 'SHOPPING CART' : 'Shopping Cart'}
            </span>
          </h3>
          <button
            onClick={() => setShowCart(false)}
            className="p-2 rounded-full hover:bg-black hover:bg-opacity-20 transition-colors"
            style={{ color: currentTheme.textSecondary }}
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>
        
        {/* Cart content */}
        <div className="p-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12"
                 style={{ 
                   backgroundColor: isNeonTheme || isCyberpunk 
                     ? 'rgba(255, 255, 255, 0.05)' 
                     : currentTheme.bgTertiary,
                   borderRadius: currentTheme.radius,
                   border: `1px solid ${currentTheme.borderColor}`
                 }}>
              <ShoppingCartIcon className="w-12 h-12 mb-4" style={{ color: currentTheme.textSecondary }} />
              <p className={`text-lg mb-2 ${isNeonTheme ? 'sl-glow-text' : ''}`}
                 style={{ 
                   color: currentTheme.textPrimary,
                   fontFamily: isNeonTheme ? "'Orbitron', 'Rajdhani', sans-serif" : 
                               isCyberpunk ? "'Audiowide', 'Rajdhani', sans-serif" : 
                               currentTheme.font
                 }}>
                {isNeonTheme ? '[ YOUR CART IS EMPTY ]' : isCyberpunk ? 'YOUR CART IS EMPTY' : 'Your cart is empty'}
              </p>
              <p style={{ color: currentTheme.textSecondary }}>
                {isNeonTheme ? '[ ADD ITEMS TO BEGIN SHOPPING ]' 
                 : isCyberpunk ? 'ADD ITEMS TO BEGIN SHOPPING' 
                 : 'Add items to begin shopping'}
              </p>
              <button
                onClick={() => setShowCart(false)}
                className={`mt-4 px-4 py-2 rounded ${isNeonTheme ? 'sl-glow-text' : ''}`}
                style={{ 
                  backgroundColor: isNeonTheme || isCyberpunk ? 'transparent' : currentTheme.primaryColor,
                  color: isNeonTheme || isCyberpunk ? currentTheme.primaryColor : '#ffffff',
                  border: isNeonTheme || isCyberpunk ? `1px solid ${currentTheme.primaryColor}` : 'none',
                  borderRadius: currentTheme.radius,
                  fontFamily: isNeonTheme ? "'Orbitron', 'Rajdhani', sans-serif" : 
                              isCyberpunk ? "'Audiowide', 'Rajdhani', sans-serif" : 
                              currentTheme.font
                }}
              >
                {isNeonTheme ? '[ CONTINUE SHOPPING ]' : isCyberpunk ? 'CONTINUE SHOPPING' : 'Continue Shopping'}
              </button>
            </div>
          ) : (
            <>
              {/* Cart items */}
              <div className="space-y-4 mb-6">
                {cart.map(item => (
                  <CartItem 
                    key={item.id} 
                    item={item} 
                    updateQuantity={updateCartQuantity} 
                    removeItem={removeFromCart} 
                  />
                ))}
              </div>
              
              {/* Cart summary */}
              <div className="border-t pt-4" style={{ borderColor: currentTheme.borderColor }}>
                <div className="flex justify-between items-center mb-3">
                  <span style={{ color: currentTheme.textSecondary }}>
                    {isNeonTheme ? 'SUBTOTAL:' : isCyberpunk ? 'SUBTOTAL:' : 'Subtotal:'}
                  </span>
                  <div className="flex items-center gap-1">
                    <CoinIcon size="w-4 h-4" />
                    <span className="font-semibold" style={{ color: currentTheme.textPrimary }}>
                      {getCartTotal()}
                    </span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mb-3">
                  <span style={{ color: currentTheme.textSecondary }}>
                    {isNeonTheme ? 'TAX:' : isCyberpunk ? 'TAX:' : 'Tax:'}
                  </span>
                  <div className="flex items-center gap-1">
                    <CoinIcon size="w-4 h-4" />
                    <span className="font-semibold" style={{ color: currentTheme.textPrimary }}>
                      {Math.round(getCartTotal() * 0.1)}
                    </span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mb-6 pt-3 border-t" style={{ borderColor: currentTheme.borderColor }}>
                  <span className="font-semibold" style={{ color: currentTheme.textPrimary }}>
                    {isNeonTheme ? 'TOTAL:' : isCyberpunk ? 'TOTAL:' : 'Total:'}
                  </span>
                  <div className="flex items-center gap-1">
                    <CoinIcon size="w-6 h-6" />
                    <span className="text-xl font-bold" style={{ color: currentTheme.textPrimary }}>
                      {Math.round(getCartTotal() * 1.1)}
                    </span>
                  </div>
                </div>
                
                {/* Checkout buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowCart(false)}
                    className={`px-4 py-2.5 rounded ${isNeonTheme ? 'sl-glow-text' : ''}`}
                    style={{ 
                      backgroundColor: isNeonTheme || isCyberpunk ? 'transparent' : 'rgba(239, 68, 68, 0.1)',
                      color: '#ef4444',
                      border: isNeonTheme || isCyberpunk ? '1px solid #ef4444' : 'none',
                      borderRadius: currentTheme.radius,
                      fontFamily: isNeonTheme ? "'Orbitron', 'Rajdhani', sans-serif" : 
                                  isCyberpunk ? "'Audiowide', 'Rajdhani', sans-serif" : 
                                  currentTheme.font
                    }}
                  >
                    {isNeonTheme ? '[ CANCEL ]' : isCyberpunk ? 'CANCEL' : 'Cancel'}
                  </button>
                  
                  <button
                    onClick={() => {
                      alert("Checkout functionality would go here");
                      // Typically would call a function here to process the checkout
                      setShowCart(false);
                    }}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded ${isNeonTheme ? 'sl-glow-text' : ''}`}
                    style={{ 
                      backgroundColor: isNeonTheme || isCyberpunk ? 'transparent' : currentTheme.primaryColor,
                      color: isNeonTheme || isCyberpunk ? currentTheme.primaryColor : '#ffffff',
                      border: isNeonTheme || isCyberpunk ? `1px solid ${currentTheme.primaryColor}` : 'none',
                      borderRadius: currentTheme.radius,
                      fontFamily: isNeonTheme ? "'Orbitron', 'Rajdhani', sans-serif" : 
                                  isCyberpunk ? "'Audiowide', 'Rajdhani', sans-serif" : 
                                  currentTheme.font
                    }}
                  >
                    <CurrencyDollarIcon className="w-5 h-5" />
                    {isNeonTheme ? '[ CHECKOUT ]' : isCyberpunk ? 'CHECKOUT' : 'Checkout'}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CartModal;