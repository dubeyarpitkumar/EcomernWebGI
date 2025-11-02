import React from 'react';
import { useCart } from '../context/CartContext';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose, onCheckout }) => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  if (!isOpen) return null;

  const handleCheckout = () => {
    onClose();
    onCheckout();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end" onClick={onClose}>
      <div 
        className="bg-white w-full max-w-md h-full flex flex-col shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">My Cart</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-3xl leading-none">&times;</button>
        </div>

        {cartItems.length === 0 ? (
          <div className="flex-grow flex flex-col items-center justify-center text-gray-500">
            <img src="https://rukminim2.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90" alt="Empty Cart" className="w-48 h-48"/>
            <p className="mt-4 text-lg">Your cart is empty!</p>
            <p className="text-sm">Add items to it now.</p>
            <button onClick={onClose} className="mt-6 bg-flipkart-blue text-white font-semibold px-8 py-2 rounded-sm">
              Shop now
            </button>
          </div>
        ) : (
          <div className="flex-grow overflow-y-auto p-4 space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-start space-x-4">
                <img src={item.images[0]} alt={item.name} className="w-20 h-20 object-contain border rounded"/>
                <div className="flex-grow">
                  <h3 className="text-sm font-semibold">{item.name}</h3>
                  <p className="text-lg font-bold mt-1">₹{item.price.toLocaleString()}</p>
                  <div className="flex items-center mt-2">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="border rounded-full w-7 h-7 flex items-center justify-center font-bold text-gray-600 hover:bg-gray-100">-</button>
                    <span className="px-4 font-semibold">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="border rounded-full w-7 h-7 flex items-center justify-center font-bold text-gray-600 hover:bg-gray-100">+</button>
                  </div>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 text-sm font-semibold">Remove</button>
              </div>
            ))}
          </div>
        )}

        {cartItems.length > 0 && (
          <div className="p-4 border-t space-y-4">
            <div className="flex justify-between text-lg font-semibold">
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString()}</span>
            </div>
            <button 
              onClick={handleCheckout}
              className="w-full bg-flipkart-yellow text-black font-bold py-3 rounded-md hover:bg-yellow-500 transition-colors"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;