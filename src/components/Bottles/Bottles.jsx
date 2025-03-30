import React, { use, useEffect, useState } from "react";
import Bottle from "../Bottle/Bottle";
import Cart from "../Cart/Cart";
import Swal from "sweetalert2";
import {
  addToStoredCart,
  getStoreCart,
  removeFromCart,
  clearCart,
} from "../../utilities/localstorage";

const Bottles = ({ bottlesPromise }) => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBottle, setSelectedBottle] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddToCart = (bottle) => {
    const newCart = [...cart, bottle];
    setCart(newCart);
    addToStoredCart(bottle.id);

    // Animation trigger
    const button = document.getElementById(`add-to-cart-${bottle.id}`);
    if (button) {
      button.classList.add("animate-ping");
      setTimeout(() => button.classList.remove("animate-ping"), 500);
    }
  };

  const bottles = use(bottlesPromise);

  useEffect(() => {
    if (bottles.length) setIsLoading(false);
    const storedCartIds = getStoreCart();
    const storedCart = bottles.filter((bottle) =>
      storedCartIds.includes(bottle.id)
    );
    setCart(storedCart);
  }, [bottles]);

  const handleRemoveFromCart = (id) => {
    const remainingCart = cart.filter((bottle) => bottle.id !== id);
    setCart(remainingCart);
    removeFromCart(id);
  };

  // const handleCheckout = () => {
  //   // alert(`Order placed successfully! Total: $${calculateTotal().toFixed(2)}`);
  //   setCart([]);
  //   clearCart();
  //   setIsCartOpen(false);
  // };
  const handleCheckout = () => {
    // Calculate total before clearing cart
    const total = cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);

    // Show success alert
    Swal.fire({
      title: "Order Successful!",
      html: `
      <div style="text-align: center;">
        <p>Thank you for your purchase!</p>
        <p style="font-weight: bold; font-size: 1.2rem; margin-top: 10px;">
          Total: $${total}
        </p>
        <p style="font-size: 0.9rem; color: #666; margin-top: 10px;">
          Your items will be shipped soon.
        </p>
      </div>
    `,
      icon: "success",
      confirmButtonText: "OK",
      confirmButtonColor: "#3085d6",
      customClass: {
        popup: "rounded-lg",
        confirmButton: "px-4 py-2 rounded-lg",
      },
    });

    // Clear cart and close
    setCart([]);
    clearCart();
    setIsCartOpen(false);
  };
  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + item.price, 0);
  };

  const openProductModal = (bottle) => {
    setSelectedBottle(bottle);
    setIsModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="bg-gray-100 rounded-xl overflow-hidden animate-pulse"
          >
            <div className="h-60 bg-gray-200"></div>
            <div className="p-4 space-y-3">
              <div className="h-5 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              <div className="h-10 bg-gray-200 rounded mt-2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-blue-600 flex items-center">
          <span className="text-blue-400 mr-2">💧</span> AquaBottle Shop
        </h1>
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition shadow-md"
        >
          🛒 Cart
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
              {cart.length}
            </span>
          )}
        </button>
      </header>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {bottles.map((bottle) => (
          <Bottle
            key={bottle.id}
            bottle={bottle}
            handleAddToCart={handleAddToCart}
            openModal={openProductModal}
          />
        ))}
      </div>

      {/* Cart Drawer - Fixed visibility */}
      <div className={`fixed inset-0 z-50 ${isCartOpen ? "block" : "hidden"}`}>
        <div
          className="absolute inset-0 bg-gray-900/30"
          onClick={() => setIsCartOpen(false)}
        />
        <div className="absolute top-0 right-0 h-full w-full sm:w-96 bg-white shadow-xl overflow-y-auto">
          <div className="h-full flex flex-col">
            {/* Cart Header */}
            <div className="p-4 border-b flex justify-between items-center bg-white">
              <h2 className="text-xl font-bold text-gray-800">
                🛒 Your Cart ({cart.length})
              </h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
              >
                ✕
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-gray-500">
                  <p className="text-lg">Your cart is empty</p>
                  <p className="text-sm mt-2">
                    Add some bottles to get started!
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 p-3 bg-white rounded-lg shadow-sm"
                    >
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded border border-gray-200"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-800 truncate">
                          {item.name}
                        </h3>
                        <p className="text-blue-600 font-semibold">
                          ${item.price}
                        </p>
                      </div>
                      <button
                        onClick={() => handleRemoveFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Cart Footer */}
            {cart.length > 0 && (
              <div className="border-t p-4 bg-white">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-bold text-gray-700">Total:</span>
                  <span className="font-bold text-blue-600">
                    ${calculateTotal().toFixed(2)}
                  </span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition font-medium"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Product Modal */}
      {isModalOpen && selectedBottle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-gray-900/30"
            onClick={() => setIsModalOpen(false)}
          />
          <div
            className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative z-50 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold">{selectedBottle.name}</h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
                >
                  ✕
                </button>
              </div>

              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/2">
                  <img
                    src={selectedBottle.img}
                    alt={selectedBottle.name}
                    className="w-full h-auto rounded-lg object-cover shadow-md"
                  />
                </div>
                <div className="md:w-1/2">
                  <p className="text-blue-600 text-2xl font-bold mb-4">
                    ${selectedBottle.price}
                  </p>
                  <p className="mb-4">
                    <span
                      className={`font-semibold ${
                        selectedBottle.stock < 10
                          ? "text-red-500"
                          : "text-green-600"
                      }`}
                    >
                      {selectedBottle.stock}{" "}
                      {selectedBottle.stock < 10
                        ? "Left (Low Stock!)"
                        : "Available"}
                    </span>
                  </p>
                  <p className="text-gray-700 mb-6">
                    {selectedBottle.description ||
                      "Premium quality water bottle with durable design."}
                  </p>
                  <button
                    id={`add-to-cart-modal-${selectedBottle.id}`}
                    onClick={() => {
                      handleAddToCart(selectedBottle);
                      setIsModalOpen(false);
                    }}
                    className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition flex items-center justify-center gap-2 font-medium"
                  >
                    Add to Cart 🛒
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bottles;
