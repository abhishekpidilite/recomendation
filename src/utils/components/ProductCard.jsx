import React from "react";
import { useCart } from "../../context/CartContext";

const ProductCard = ({ recommendedData }) => {
  const { addToCart, updateQuantity, cartItems } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product, 1);
  };

  const handleQuantityChange = (action, product) => {
    const currentQuantity = cartItems.find(item => item.sku === product.sku)?.quantity || 0;
    
    if (action === "increase") {
      updateQuantity(product.sku, currentQuantity + 1);
    } else if (action === "decrease") {
      updateQuantity(product.sku, currentQuantity - 1);
    }
  };

  const isInCart = (sku) => {
    return cartItems.some(item => item.sku === sku);
  };

  const getQuantity = (sku) => {
    return cartItems.find(item => item.sku === sku)?.quantity || 0;
  };

  return (
    <div className="flex justify-center flex-wrap gap-4">
      {recommendedData?.data?.map((product, index) => (
        <div
          key={index}
          className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300  w-[180px] flex flex-col justify-between "
        >
          <div className="relative h-[100px]">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-28 object-cover "
            />
          </div>

          <div className="p-4">
            <h3 className="text-xs font-semibold text-gray-800 mb-2">
              {product.name}
            </h3>
            <p className="text-gray-600 mb-2">{product.description}</p>
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-bold text-[#360133]">
                ₹{product.price}
              </span>
              <span className="text-sm text-gray-500">{product.category}</span>
            </div>

            {!isInCart(product.sku) ? (
              <button
                onClick={() => handleAddToCart(product)}
                className="w-full bg-[#360133] text-white py-2 px-4 rounded-md hover:bg-[#4a021f] transition-colors duration-300"
              >
                Add to Cart
              </button>
            ) : (
              <div className="flex items-center justify-between bg-gray-100 p-2 rounded-md">
                <button
                  onClick={() => handleQuantityChange("decrease", product)}
                  className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300"
                >
                  -
                </button>
                <span className="font-semibold">{getQuantity(product.sku)}</span>
                <button
                  onClick={() => handleQuantityChange("increase", product)}
                  className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300"
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCard;
