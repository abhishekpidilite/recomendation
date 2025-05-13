import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, quantity) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.sku === product.sku);
      if (existingItem) {
        return prevItems.map(item =>
          item.sku === product.sku
            ? {
                ...item,
                quantity: item.quantity + quantity,
                price: (item.quantity + quantity) * item.pricePerUnit
              }
            : item
        );
      }
      return [...prevItems, {
        sku: product.sku,
        name: product.name,
        category: product.category,
        pricePerUnit: product.price,
        price: product.price * quantity,
        quantity: quantity,
        isPremium: product.isPremium,
        imageUrl: product.imageUrl
      }];
    });
  };

  const updateQuantity = (sku, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(sku);
      return;
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.sku === sku
          ? {
              ...item,
              quantity: newQuantity,
              price: newQuantity * item.pricePerUnit
            }
          : item
      )
    );
  };

  const removeFromCart = (sku) => {
    setCartItems(prevItems => prevItems.filter(item => item.sku !== sku));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalAmount = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        getTotalAmount,
        getCartCount,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 