import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { ShippingInfo } from '../types';
import { ChevronLeftIcon } from '../components/icons/ChevronLeftIcon';

interface CheckoutPageProps {
  onPlaceOrder: (shippingInfo: ShippingInfo) => void;
  onBack: () => void;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ onPlaceOrder, onBack }) => {
  const { cartItems } = useCart();
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    name: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'India',
  });
  const [formErrors, setFormErrors] = useState<Partial<ShippingInfo>>({});

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const shippingCost = subtotal > 5000 ? 0 : 99;
  const total = subtotal + shippingCost;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = (): boolean => {
    const errors: Partial<ShippingInfo> = {};
    if (!shippingInfo.name.trim()) errors.name = "Name is required";
    if (!shippingInfo.address.trim()) errors.address = "Address is required";
    if (!shippingInfo.city.trim()) errors.city = "City is required";
    if (!shippingInfo.postalCode.trim()) errors.postalCode = "Postal Code is required";
    else if (!/^\d{6}$/.test(shippingInfo.postalCode)) errors.postalCode = "Invalid Postal Code";
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onPlaceOrder(shippingInfo);
    }
  };

  if (cartItems.length === 0) {
    return (
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
            <p className="text-gray-600 mb-6">You can't proceed to checkout without any items in your cart.</p>
            <button onClick={onBack} className="bg-flipkart-blue text-white font-bold py-2 px-6 rounded-md hover:bg-blue-700 transition-colors">
                Return to Shopping
            </button>
        </div>
    );
  }

  return (
    <div className="bg-white p-4 md:p-8 rounded-lg shadow-lg">
       <button onClick={onBack} className="flex items-center text-flipkart-blue mb-6 font-semibold">
        <ChevronLeftIcon />
        Back to shopping
      </button>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Checkout</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Shipping Information */}
          <div className="border p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                <input type="text" id="name" name="name" value={shippingInfo.name} onChange={handleInputChange} className={`mt-1 block w-full border rounded-md shadow-sm p-2 ${formErrors.name ? 'border-red-500' : 'border-gray-300'}`} />
                {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
              </div>
               <div>
                <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">Postal Code</label>
                <input type="text" id="postalCode" name="postalCode" value={shippingInfo.postalCode} onChange={handleInputChange} className={`mt-1 block w-full border rounded-md shadow-sm p-2 ${formErrors.postalCode ? 'border-red-500' : 'border-gray-300'}`} />
                 {formErrors.postalCode && <p className="text-red-500 text-xs mt-1">{formErrors.postalCode}</p>}
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                <input type="text" id="address" name="address" value={shippingInfo.address} onChange={handleInputChange} className={`mt-1 block w-full border rounded-md shadow-sm p-2 ${formErrors.address ? 'border-red-500' : 'border-gray-300'}`} />
                 {formErrors.address && <p className="text-red-500 text-xs mt-1">{formErrors.address}</p>}
              </div>
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                <input type="text" id="city" name="city" value={shippingInfo.city} onChange={handleInputChange} className={`mt-1 block w-full border rounded-md shadow-sm p-2 ${formErrors.city ? 'border-red-500' : 'border-gray-300'}`} />
                 {formErrors.city && <p className="text-red-500 text-xs mt-1">{formErrors.city}</p>}
              </div>
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
                <input type="text" id="country" name="country" value={shippingInfo.country} onChange={handleInputChange} readOnly className="mt-1 block w-full border rounded-md shadow-sm p-2 bg-gray-100" />
              </div>
            </div>
          </div>
          {/* Payment Information (Simulated) */}
          <div className="border p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Payment Information (Simulation)</h2>
             <p className="text-sm text-gray-500 mb-4">This is a simulated payment form. Do not enter real credit card details.</p>
            <div className="space-y-4">
              <div>
                <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">Card Number</label>
                <input type="text" id="cardNumber" placeholder="1234 5678 9101 1121" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">Expiry Date</label>
                    <input type="text" id="expiryDate" placeholder="MM/YY" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                  </div>
                   <div>
                    <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">CVV</label>
                    <input type="text" id="cvv" placeholder="123" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                  </div>
              </div>
            </div>
          </div>
        </div>
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="border p-6 rounded-lg sticky top-24">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-2">
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between items-center text-sm">
                  <span className="truncate pr-2">{item.name} x {item.quantity}</span>
                  <span className="font-medium whitespace-nowrap">₹{(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="border-t mt-4 pt-4 space-y-2">
               <div className="flex justify-between font-medium">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-medium text-gray-600">
                  <span>Shipping</span>
                  <span>₹{shippingCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
                  <span>Total</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
            </div>
             <button type="submit" className="w-full mt-6 bg-flipkart-yellow text-black font-bold py-3 rounded-md hover:bg-yellow-500 transition-colors">
              Place Order
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
