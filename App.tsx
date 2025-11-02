import React, { useState } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import WishlistPage from './pages/WishlistPage';
import { Product, Order, ShippingInfo } from './types';
import { products } from './constants';
import { useDebounce } from './hooks/useDebounce';

const AppContent: React.FC = () => {
  const [currentView, setCurrentView] = useState<'home' | 'product' | 'checkout' | 'orderConfirmation' | 'wishlist'>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [orderDetails, setOrderDetails] = useState<Order | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const { cartItems, clearCart } = useCart();

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('product');
  };

  const navigateHome = () => {
    setCurrentView('home');
    setSelectedProduct(null);
    setSearchQuery('');
  };
  
  const handleNavigateToCheckout = () => {
    setCurrentView('checkout');
  };
  
  const handleNavigateToWishlist = () => {
    setCurrentView('wishlist');
  };

  const handlePlaceOrder = (shippingInfo: ShippingInfo) => {
    const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const shippingCost = subtotal > 5000 ? 0 : 99;
    const total = subtotal + shippingCost;
    
    const newOrder: Order = {
      id: `OD${Date.now()}`,
      items: [...cartItems],
      shippingInfo,
      subtotal,
      shippingCost,
      total,
    };
    
    setOrderDetails(newOrder);
    clearCart();
    setCurrentView('orderConfirmation');
  };

  const handleContinueShopping = () => {
      setOrderDetails(null);
      navigateHome();
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header 
        onLogoClick={navigateHome} 
        onNavigateToCheckout={handleNavigateToCheckout}
        onNavigateToWishlist={handleNavigateToWishlist} 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <main className="flex-grow container mx-auto px-4 py-8">
        {currentView === 'home' && <HomePage onProductSelect={handleProductSelect} products={products} searchQuery={debouncedSearchQuery} />}
        {currentView === 'product' && selectedProduct && (
          <ProductDetailPage product={selectedProduct} onBack={navigateHome} />
        )}
        {currentView === 'checkout' && <CheckoutPage onPlaceOrder={handlePlaceOrder} onBack={navigateHome} />}
        {currentView === 'orderConfirmation' && orderDetails && (
          <OrderConfirmationPage order={orderDetails} onContinueShopping={handleContinueShopping} />
        )}
        {currentView === 'wishlist' && (
          <WishlistPage onProductSelect={handleProductSelect} onBack={navigateHome} />
        )}
      </main>
      <Footer />
    </div>
  );
}

const App: React.FC = () => {
  return (
    <CartProvider>
      <WishlistProvider>
        <AppContent />
      </WishlistProvider>
    </CartProvider>
  );
};

export default App;