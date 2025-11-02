import React, { useState } from 'react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { StarIcon } from '../components/icons/StarIcon';
import { ShoppingCartIcon } from '../components/icons/ShoppingCartIcon';
import { ChevronLeftIcon } from '../components/icons/ChevronLeftIcon';
import { HeartIcon } from '../components/icons/HeartIcon';

interface ProductDetailPageProps {
  product: Product;
  onBack: () => void;
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ product, onBack }) => {
  const [mainImage, setMainImage] = useState(product.images[0]);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product.id);
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="bg-white p-4 md:p-8 rounded-lg shadow-lg">
      <button onClick={onBack} className="flex items-center text-flipkart-blue mb-4 font-semibold">
        <ChevronLeftIcon />
        Back to products
      </button>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div className="flex flex-col-reverse md:flex-row gap-4">
          <div className="flex md:flex-col gap-2 justify-center md:justify-start">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${product.name} thumbnail ${index + 1}`}
                className={`w-16 h-16 object-contain border-2 rounded-md cursor-pointer ${mainImage === img ? 'border-flipkart-blue' : 'border-gray-200'}`}
                onMouseEnter={() => setMainImage(img)}
              />
            ))}
          </div>
          <div className="flex-grow flex items-center justify-center p-4 border rounded-lg">
            <img src={mainImage} alt={product.name} className="max-h-96 object-contain" />
          </div>
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{product.name}</h1>
          <p className="text-gray-500 text-lg mt-1">{product.brand}</p>
          <div className="flex items-center my-3">
            <div className="bg-green-600 text-white px-3 py-1 rounded-md text-md flex items-center">
              {product.rating} <StarIcon className="w-4 h-4 ml-1" />
            </div>
            <span className="text-gray-600 text-md ml-3 font-semibold">{product.reviews.toLocaleString()} Ratings & Reviews</span>
          </div>

          <div className="my-4">
            <p className="text-3xl font-extrabold text-gray-900">₹{product.price.toLocaleString()}</p>
            <div className="flex items-baseline space-x-2 mt-1">
              <p className="text-gray-500 line-through text-lg">₹{product.originalPrice.toLocaleString()}</p>
              <p className="text-green-600 font-bold text-lg">{discount}% off</p>
            </div>
          </div>

          <div className="flex items-stretch space-x-4 mt-6">
            <button 
              onClick={() => addToCart(product)}
              className="flex-1 bg-flipkart-yellow text-black font-bold py-3 px-6 rounded-md flex items-center justify-center space-x-2 hover:bg-yellow-500 transition-colors"
            >
              <ShoppingCartIcon />
              <span>ADD TO CART</span>
            </button>
            <button className="flex-1 bg-orange-500 text-white font-bold py-3 px-6 rounded-md hover:bg-orange-600 transition-colors">
              BUY NOW
            </button>
            <button 
               onClick={handleWishlistToggle}
               className={`border-2 p-3 rounded-md transition-colors ${isWishlisted ? 'border-red-500 bg-red-50 text-red-500' : 'border-gray-300 text-gray-500 hover:border-red-500 hover:text-red-500'}`}
               aria-label="Toggle Wishlist"
            >
               <HeartIcon filled={isWishlisted} className="w-6 h-6" />
            </button>
          </div>

          <div className="mt-8 border-t pt-6">
            <h3 className="font-semibold text-lg mb-2">Product Highlights</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              {product.highlights.map((highlight, index) => (
                <li key={index}>{highlight}</li>
              ))}
            </ul>
          </div>
          
          <div className="mt-6 border-t pt-6">
            <h3 className="font-semibold text-lg mb-2">Description</h3>
            <p className="text-gray-600 leading-relaxed">{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;