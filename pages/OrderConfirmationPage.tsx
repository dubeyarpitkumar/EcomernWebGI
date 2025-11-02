import React from 'react';
import { Order } from '../types';
import { CheckCircleIcon } from '../components/icons/CheckCircleIcon';

interface OrderConfirmationPageProps {
  order: Order;
  onContinueShopping: () => void;
}

const OrderConfirmationPage: React.FC<OrderConfirmationPageProps> = ({ order, onContinueShopping }) => {
  return (
    <div className="bg-white p-4 md:p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
      <div className="text-center">
        <CheckCircleIcon className="w-24 h-24 text-green-500 mx-auto" />
        <h1 className="text-3xl font-bold text-gray-800 mt-4">Order Placed Successfully!</h1>
        <p className="text-gray-600 mt-2">Thank you for your purchase. Your order is being processed.</p>
        <p className="text-lg font-semibold mt-2">Order ID: <span className="text-flipkart-blue">{order.id}</span></p>
      </div>

      <div className="mt-8 border-t pt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Shipping to:</h2>
          <div className="text-gray-700 space-y-1">
            <p className="font-bold">{order.shippingInfo.name}</p>
            <p>{order.shippingInfo.address}</p>
            <p>{order.shippingInfo.city}, {order.shippingInfo.postalCode}</p>
            <p>{order.shippingInfo.country}</p>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Order Summary:</h2>
          <div className="space-y-2 text-gray-700">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>₹{order.subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping:</span>
              <span>₹{order.shippingCost.toLocaleString()}</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
              <span>Total:</span>
              <span>₹{order.total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 border-t pt-6">
        <h2 className="text-xl font-semibold mb-4">Items Ordered:</h2>
        <div className="space-y-4">
          {order.items.map(item => (
            <div key={item.id} className="flex items-center space-x-4">
              <img src={item.images[0]} alt={item.name} className="w-16 h-16 object-contain border rounded" />
              <div className="flex-grow">
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
              </div>
              <p className="font-semibold">₹{(item.price * item.quantity).toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={onContinueShopping}
          className="bg-flipkart-blue text-white font-bold py-3 px-8 rounded-md hover:bg-blue-700 transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
