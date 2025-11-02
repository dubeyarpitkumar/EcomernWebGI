import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import CartModal from './CartModal';
import { ShoppingCartIcon } from './icons/ShoppingCartIcon';
import { HeartIcon } from './icons/HeartIcon';

interface HeaderProps {
    onLogoClick: () => void;
    onNavigateToCheckout: () => void;
    onNavigateToWishlist: () => void;
    searchQuery: string;
    onSearchChange: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onLogoClick, onNavigateToCheckout, onNavigateToWishlist, searchQuery, onSearchChange }) => {
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <header className="bg-flipkart-blue text-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <button onClick={onLogoClick} className="text-2xl font-bold italic">
              Flipkart
            </button>
          </div>
          <div className="hidden md:flex flex-grow max-w-lg mx-4">
            <input
              type="text"
              placeholder="Search for products, brands and more"
              className="w-full px-4 py-2 text-black rounded-l-md focus:outline-none"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
            <button className="bg-white text-flipkart-blue px-4 rounded-r-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
          <div className="flex items-center space-x-6">
            <button className="hidden md:block bg-white text-flipkart-blue font-semibold px-8 py-2 rounded-sm">
              Login
            </button>
            <button onClick={onNavigateToWishlist} className="relative flex items-center space-x-2">
              <HeartIcon className="h-6 w-6"/>
              <span className="hidden md:block">Wishlist</span>
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-flipkart-yellow text-black text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>
            <button onClick={() => setIsCartOpen(true)} className="relative flex items-center space-x-2">
              <ShoppingCartIcon />
              <span className="hidden md:block">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-flipkart-yellow text-black text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>
      <CartModal 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        onCheckout={onNavigateToCheckout} 
      />
    </>
  );
};

export default Header;