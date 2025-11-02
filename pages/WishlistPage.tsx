import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';
import { Product } from '../types';
import { ChevronLeftIcon } from '../components/icons/ChevronLeftIcon';

interface WishlistPageProps {
  onProductSelect: (product: Product) => void;
  onBack: () => void;
}

const WishlistPage: React.FC<WishlistPageProps> = ({ onProductSelect, onBack }) => {
  const { wishlistItems } = useWishlist();

  return (
    <div className="space-y-8">
      <button onClick={onBack} className="flex items-center text-flipkart-blue mb-4 font-semibold">
        <ChevronLeftIcon />
        Back to shopping
      </button>

      <h1 className="text-3xl font-bold text-gray-800">My Wishlist</h1>

      {wishlistItems.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg shadow">
          <img src="https://rukminim2.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90" alt="Empty Wishlist" className="w-48 h-48 mx-auto"/>
          <p className="mt-4 text-xl text-gray-700">Your wishlist is empty!</p>
          <p className="text-gray-500">Looks like you haven't added anything to your wishlist yet.</p>
          <button onClick={onBack} className="mt-6 bg-flipkart-blue text-white font-semibold px-8 py-2 rounded-sm">
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {wishlistItems.map((product) => (
            <ProductCard key={product.id} product={product} onSelect={onProductSelect} />
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
