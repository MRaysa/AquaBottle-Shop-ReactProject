import React from "react";

const Bottle = ({ bottle, handleAddToCart, openModal }) => {
  const { img, name, price, stock, id } = bottle;
  const isLowStock = stock < 10;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300 group">
      <div
        className="h-60 overflow-hidden cursor-pointer"
        onClick={() => openModal(bottle)}
      >
        <img
          src={img}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
        />
      </div>
      <div className="p-4">
        <h3
          className="font-semibold text-lg mb-1 cursor-pointer hover:text-blue-600"
          onClick={() => openModal(bottle)}
        >
          {name}
        </h3>
        <p className="text-blue-600 font-bold mb-2">${price}</p>
        <p
          className={`text-sm mb-3 ${
            isLowStock ? "text-red-500" : "text-green-600"
          }`}
        >
          {stock} {isLowStock ? "Left (Low Stock!)" : "Available"}
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => openModal(bottle)}
            className="flex-1 border border-blue-500 text-blue-500 py-2 rounded-lg hover:bg-blue-50 transition"
          >
            View Details
          </button>
          <button
            id={`add-to-cart-${id}`}
            onClick={() => handleAddToCart(bottle)}
            className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition flex items-center justify-center gap-1"
          >
            <span>Add</span>
            <span className="hidden sm:inline">to Cart</span>
            <span>🛒</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Bottle;
