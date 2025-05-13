import React, { useState } from "react";
import ComparePrices from "./ComparePrices";

const SearchResultCard = ({ searchData }) => {
  const [quantity, setQuantity] = useState(1);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const handleAddToCart = () => {
    setIsAddedToCart(true);
  };

  const handleQuantityChange = (action) => {
    if (action === "increase") {
      setQuantity((prev) => prev + 1);
    } else if (action === "decrease" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <div className="flex justify-center flex-wrap gap-4">
      {searchData?.map((product, index) => (
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
            <div className="flex justify-between items-center ">
              <span className="text-sm font-bold text-gray-500">
                Multiply price
              </span>
              <span className="text-sm font-bold text-[#000000d9]">
                {product.price}
              </span>
            </div>
            <ComparePrices productName={product.name} />

            {!isAddedToCart ? (
              <button
                onClick={handleAddToCart}
                className="w-full bg-[#360133] text-white py-2 px-4 rounded-md hover:bg-[#4a021f] transition-colors duration-300"
              >
                Add to Cart
              </button>
            ) : (
              <div className="flex items-center justify-between bg-gray-100 p-2 rounded-md">
                <button
                  onClick={() => handleQuantityChange("decrease")}
                  className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300"
                >
                  -
                </button>
                <span className="font-semibold">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange("increase")}
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

export default SearchResultCard;
