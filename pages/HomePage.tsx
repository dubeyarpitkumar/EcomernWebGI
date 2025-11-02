import React, { useState, useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import { Product } from '../types';

interface HomePageProps {
  products: Product[];
  onProductSelect: (product: Product) => void;
  searchQuery: string;
}

const HomePage: React.FC<HomePageProps> = ({ products, onProductSelect, searchQuery }) => {
  const [sortOption, setSortOption] = useState<string>('relevance');

  const filteredAndSortedProducts = useMemo(() => {
    const filtered = searchQuery
      ? products.filter(product =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : products;

    const sortableProducts = [...filtered];
    switch (sortOption) {
      case 'price-asc':
        sortableProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sortableProducts.sort((a, b) => b.price - a.price);
        break;
      case 'rating-desc':
        sortableProducts.sort((a, b) => b.rating - a.rating);
        break;
      case 'name-asc':
        sortableProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'relevance':
      default:
        // Return a copy in the original order
        break;
    }
    return sortableProducts;
  }, [products, sortOption, searchQuery]);


  return (
    <div className="space-y-8">
      <div className="relative bg-gray-200 rounded-lg overflow-hidden">
        <img 
          src="https://picsum.photos/1200/300?random=1" 
          alt="Promotional banner" 
          className="w-full h-48 md:h-64 object-cover"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
            <h1 className="text-white text-3xl md:text-5xl font-bold text-center">Big Billion Days Sale!</h1>
        </div>
      </div>

      <div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
          <h2 className="text-2xl font-bold text-gray-800">Top Deals</h2>
          <div className="flex items-center space-x-2">
            <label htmlFor="sort-by" className="text-sm font-medium text-gray-700">Sort by:</label>
            <select
              id="sort-by"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="rounded-md border-gray-300 shadow-sm focus:border-flipkart-blue focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-2 text-sm bg-white"
            >
              <option value="relevance">Relevance</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating-desc">Customer Rating</option>
              <option value="name-asc">Name (A-Z)</option>
            </select>
          </div>
        </div>
        {filteredAndSortedProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredAndSortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} onSelect={onProductSelect} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg shadow">
              <h2 className="text-2xl font-bold text-gray-700">No Products Found</h2>
              <p className="text-gray-500 mt-2">Try adjusting your search to find what you're looking for.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;