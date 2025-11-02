import React from 'react';
import { Product } from '../types';
import { useWishlist } from '../context/WishlistContext';
import { StarIcon } from './icons/StarIcon';
import { HeartIcon } from './icons/HeartIcon';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect }) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product.id);
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click from triggering navigation
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div 
      onClick={() => onSelect(product)}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-2xl transition-shadow duration-300 cursor-pointer flex flex-col h-full relative"
    >
      <button 
        onClick={handleWishlistToggle}
        className="absolute top-2 right-2 z-10 p-1.5 bg-gray-100 bg-opacity-75 rounded-full text-gray-600 hover:text-red-500 hover:bg-gray-200 transition-colors"
        aria-label="Add to wishlist"
      >
        <HeartIcon 
          filled={isWishlisted} 
          className={`w-5 h-5 ${isWishlisted ? 'text-red-500' : ''}`} 
        />
      </button>

      <div className="relative p-4">
        <img 
          src={product.images[0]} 
          alt={product.name} 
          className="w-full h-48 object-contain" 
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="p-4 border-t border-gray-200 flex flex-col flex-grow">
        <p className="text-gray-500 text-sm">{product.brand}</p>
        <h3 className="text-md font-semibold text-gray-800 truncate mt-1">{product.name}</h3>
        <div className="flex items-center my-2">
          <div className="bg-green-600 text-white px-2 py-0.5 rounded-md text-sm flex items-center">
            {product.rating} <StarIcon className="w-3 h-3 ml-1" />
          </div>
          <span className="text-gray-500 text-sm ml-2">({product.reviews.toLocaleString()})</span>
        </div>
        <div className="mt-auto pt-2">
          <div className="flex items-baseline space-x-2">
            <p className="text-xl font-bold">₹{product.price.toLocaleString()}</p>
            <p className="text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</p>
            <p className="text-green-600 font-semibold">{discount}% off</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;