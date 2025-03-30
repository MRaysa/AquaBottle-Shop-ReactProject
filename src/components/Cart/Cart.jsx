// import React from "react";

// const Cart = ({
//   cart,
//   isOpen,
//   onClose,
//   handleRemoveFromCart,
//   handleCheckout,
// }) => {
//   const calculateTotal = () => {
//     return cart.reduce((sum, item) => sum + item.price, 0);
//   };

//   return (
//     <div
//       className={`fixed inset-0 z-50 overflow-hidden transition-opacity duration-300 ${
//         isOpen ? "opacity-100 visible" : "opacity-0 invisible"
//       }`}
//     >
//       {/* Overlay */}
//       <div
//         className="absolute inset-0 bg-black bg-opacity-50"
//         onClick={onClose}
//       ></div>

//       {/* Cart Drawer */}
//       <div
//         className={`absolute top-0 right-0 h-full w-full sm:w-96 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
//           isOpen ? "translate-x-0" : "translate-x-full"
//         }`}
//       >
//         <div className="h-full flex flex-col">
//           {/* Cart Header */}
//           <div className="flex justify-between items-center p-4 border-b">
//             <h2 className="text-xl font-bold flex items-center gap-2">
//               <span>🛒</span>
//               <span>Your Cart ({cart.length})</span>
//             </h2>
//             <button
//               onClick={onClose}
//               className="text-gray-500 hover:text-black p-1 rounded-full hover:bg-gray-100"
//             >
//               ✕
//             </button>
//           </div>

//           {/* Cart Items */}
//           <div className="flex-1 overflow-y-auto p-4">
//             {cart.length === 0 ? (
//               <div className="h-full flex flex-col items-center justify-center text-center text-gray-500">
//                 <div className="text-5xl mb-4">🛒</div>
//                 <p className="text-lg">Your cart is empty</p>
//                 <p className="text-sm mt-2">Add some bottles to get started!</p>
//                 <button
//                   onClick={onClose}
//                   className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
//                 >
//                   Browse Products
//                 </button>
//               </div>
//             ) : (
//               <div className="space-y-4">
//                 {cart.map((item) => (
//                   <div
//                     key={item.id}
//                     className="flex items-start gap-4 p-3 bg-gray-50 rounded-lg"
//                   >
//                     <img
//                       src={item.img}
//                       alt={item.name}
//                       className="w-16 h-16 object-cover rounded border border-gray-200"
//                     />
//                     <div className="flex-1">
//                       <h3 className="font-medium">{item.name}</h3>
//                       <p className="text-blue-600 font-semibold">
//                         ${item.price}
//                       </p>
//                     </div>
//                     <button
//                       onClick={() => handleRemoveFromCart(item.id)}
//                       className="text-red-500 hover:text-red-700 p-1"
//                       aria-label="Remove item"
//                     >
//                       ✕
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Cart Footer */}
//           {cart.length > 0 && (
//             <div className="border-t p-4 bg-white">
//               <div className="flex justify-between items-center mb-4">
//                 <span className="font-bold text-gray-700">Subtotal:</span>
//                 <span className="font-bold text-blue-600">
//                   ${calculateTotal().toFixed(2)}
//                 </span>
//               </div>
//               <div className="flex justify-between items-center mb-6">
//                 <span className="font-bold text-gray-700">Shipping:</span>
//                 <span className="font-bold text-blue-600">Free</span>
//               </div>
//               <div className="flex justify-between items-center mb-6 text-lg">
//                 <span className="font-bold">Total:</span>
//                 <span className="font-bold text-blue-600">
//                   ${calculateTotal().toFixed(2)}
//                 </span>
//               </div>
//               <button
//                 onClick={handleCheckout}
//                 className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition font-medium shadow-md"
//               >
//                 Proceed to Checkout
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cart;
import React from "react";
import Swal from "sweetalert2";

const Cart = ({
  cart = [],
  isOpen = false,
  onClose,
  handleRemoveFromCart,
  handleCheckout,
}) => {
  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + (item?.price || 0), 0);
  };

  const handleSweetCheckout = async () => {
    const total = calculateTotal().toFixed(2);

    try {
      const result = await Swal.fire({
        title: "Order Confirmation",
        text: `Confirm purchase of $${total}?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, place order!",
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        // Show success alert
        await Swal.fire({
          title: "Success!",
          text: `Your order for $${total} has been placed.`,
          icon: "success",
          confirmButtonText: "OK",
        });

        // Process checkout
        handleCheckout();
      }
    } catch (error) {
      console.error("Alert error:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-30"
        onClick={onClose}
      />

      {/* Cart Drawer */}
      <div className="absolute top-0 right-0 h-full w-full sm:w-96 bg-white shadow-xl">
        <div className="h-full flex flex-col">
          {/* Cart Header */}
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <span>🛒</span>
              <span>Your Cart ({cart.length})</span>
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-black p-1 rounded-full hover:bg-gray-100"
            >
              ✕
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-gray-500">
                <div className="text-5xl mb-4">🛒</div>
                <p className="text-lg font-medium">Your cart is empty</p>
                <button
                  onClick={onClose}
                  className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  Browse Products
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded border border-gray-200"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate">{item.name}</h3>
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
                <span className="font-bold">Total:</span>
                <span className="font-bold text-blue-600">
                  ${calculateTotal().toFixed(2)}
                </span>
              </div>
              <button
                onClick={handleSweetCheckout}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-medium"
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
