import React from 'react'

function Cart() {
  return (
    <div className="flex flex-col h-full w-[300px]">
      <div className="flex-1 overflow-y-auto">
        <div className="flex items-center gap-6 p-4 border-b border-gray-200 hover:bg-gray-50/50 transition-colors bg-white">
          {/* Product Image */}
          <div className="w-24 h-24 flex-shrink-0">
            <img 
              src="..." 
              alt="Product" 
              className="w-full h-full object-cover rounded-lg shadow-sm"
            />
          </div>
          
          {/* Product Details in Column */}
          <div className="flex-1 flex items-center justify-center flex-col gap-1">
            <h3 className="font-medium text-gray-800 text-md">Product Name</h3>
            <p className="font-semibold text-indigo-600 text-lg">₹999</p>
            
            {/* Quantity Controls */}
            <div className="flex items-center gap-2 mt-1">
              <button 
                className="w-7 h-7 flex items-center justify-center rounded-full bg-indigo-50 hover:bg-indigo-100 text-indigo-600 font-medium transition-colors"
                onClick={() => {/* Decrease quantity */}}
              >
                -
              </button>
              <span className="w-7 text-center font-medium text-gray-700">1</span>
              <button 
                className="w-7 h-7 flex items-center justify-center rounded-full bg-indigo-50 hover:bg-indigo-100 text-indigo-600 font-medium transition-colors"
                onClick={() => {/* Increase quantity */}}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Total Amount and Checkout Section */}
      <div className="border-t border-gray-200 p-6 bg-white">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-600 font-medium">Total Amount:</span>
          <span className="text-lg font-semibold text-indigo-600">₹999</span>
        </div>
        <button 
          className="w-full py-2 px-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
          onClick={() => {/* Handle checkout */}}
        >
          Place Order
        </button>
      </div>
    </div>
  )
}

export default Cart