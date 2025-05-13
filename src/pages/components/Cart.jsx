import React, { useEffect, useState } from 'react';
import { useCart } from '../../context/CartContext';
import { usePlaceOrder } from '../../api/products';
import { useComparePrice } from '../../api/comparePrice';
import { CircularProgress } from "@mui/material";

function Cart({ onClose }) {
  const { cartItems, updateQuantity, getTotalAmount, clearCart } = useCart();
  const placeOrderMutation = usePlaceOrder();
  const comparePriceMutation = useComparePrice();
  const [comparisonData, setComparisonData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [hasFetchedComparison, setHasFetchedComparison] = useState(false);

  useEffect(() => {
    const fetchComparisonData = async () => {
      if (hasFetchedComparison) return; // Skip if we already have the data
      
      setIsLoading(true);
      const comparisonResults = {};
      for (const item of cartItems) {
        try {
          const result = await comparePriceMutation.mutateAsync({ productName: item.name });
          comparisonResults[item.sku] = result?.data;
        } catch (error) {
          console.error(`Failed to fetch comparison data for ${item.name}:`, error);
        }
      }
      setComparisonData(comparisonResults);
      setHasFetchedComparison(true);
      setIsLoading(false);
    };

    if (cartItems.length > 0) {
      fetchComparisonData();
    }
  }, [cartItems.length]); // Only depend on cartItems.length instead of cartItems array

  const getTotalSavings = () => {
    return cartItems.reduce((total, item) => {
      const comparison = comparisonData[item.sku];
      if (comparison && comparison.savings) {
        return total + (parseFloat(comparison.savings) * item.quantity);
      }
      return total;
    }, 0);
  };

  const handlePlaceOrder = async () => {
    const username = localStorage.getItem('username') || '8123968551'; // fallback to default if not found
    
    const orderPayload = {
      totalPrice: getTotalAmount(),
      username: username,
      orderItems: cartItems.map(item => ({
        sku: item.sku,
        name: item.name,
        category: item.category || 'General', // fallback if category not present
        price: item.price,
        pricePerUnit: item.pricePerUnit,
        quantity: item.quantity,
        isPremium: item.isPremium || false
      }))
    };

    try {
      await placeOrderMutation.mutateAsync({ orderDetails: orderPayload });
      clearCart(); // Clear the cart after successful order
      alert('Your order is placed successfully!');
      onClose(); // Close the cart after successful order
    } catch (error) {
      alert('Failed to place order. Please try again.');
      console.error('Order placement failed:', error);
    }
  };

  return (
    <div className="flex flex-col h-full w-[300px] md:w-[400px]">
      <div className="flex-1 overflow-y-auto">
        {cartItems.map((item) => (
          <div key={item.sku} className="flex items-center gap-6 p-4 border-b border-gray-200 hover:bg-gray-50/50 transition-colors bg-white">
            {/* Product Image */}
            <div className="w-24 h-24 flex-shrink-0">
              <img 
                src={item.imageUrl} 
                alt={item.name} 
                className="w-full h-full object-cover rounded-lg shadow-sm"
              />
            </div>
            
            {/* Product Details in Column */}
            <div className="flex-1 flex items-center justify-center flex-col gap-1">
              <h3 className="font-medium text-gray-800 text-md">{item.name}</h3>
              <div className="flex flex-col items-center">
                <p className="font-semibold text-[#360133] text-lg">₹{item.price}</p>
                <p className="text-sm text-gray-500">₹{item.pricePerUnit} per unit</p>
                {isLoading ? (
                  <CircularProgress size={16} className="text-green-600" />
                ) : comparisonData[item.sku]?.savings > 0 && (
                  <p className="text-sm text-green-600 font-medium">
                    Save ₹{comparisonData[item.sku].savings} per unit
                  </p>
                )}
              </div>
              {item.isPremium && (
                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                  Premium
                </span>
              )}
              
              {/* Quantity Controls */}
              <div className="flex items-center gap-2 mt-1">
                <button 
                  className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 font-medium transition-colors"
                  onClick={() => updateQuantity(item.sku, item.quantity - 1)}
                >
                  -
                </button>
                <span className="w-7 text-center font-medium text-gray-700">{item.quantity}</span>
                <button 
                  className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 font-medium transition-colors"
                  onClick={() => updateQuantity(item.sku, item.quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Total Amount and Checkout Section */}
      <div className="border-t border-gray-200 p-6 bg-white">
        <div className="flex flex-col gap-2 mb-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">Total Amount:</span>
            <span className="text-lg font-semibold text-[#360133]">₹{getTotalAmount().toFixed(2)}</span>
          </div>
          {isLoading ? (
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">Total Savings:</span>
              <CircularProgress size={16} className="text-green-600" />
            </div>
          ) : getTotalSavings() > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">Total Savings:</span>
              <span className="text-lg font-semibold text-green-600">₹{getTotalSavings().toFixed(2)}</span>
            </div>
          )}
        </div>
        <button 
          className="w-full py-2 px-3 bg-[#360133] text-white font-medium rounded-lg hover:bg-[#4a021f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handlePlaceOrder}
          disabled={placeOrderMutation.isPending || cartItems.length === 0}
        >
          {placeOrderMutation.isPending ? 'Placing Order...' : 'Place Order'}
        </button>
      </div>
    </div>
  );
}

export default Cart;