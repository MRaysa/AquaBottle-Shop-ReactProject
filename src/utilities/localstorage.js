// /**
//  * 1. to get something from local storage, you will get it as a string
//  * 2. convert this to javascript object/array
//  */

// const getCartFromLocalStorage = () => {
//   const storedCartString = localStorage.getItem("cart");

//   if (storedCartString) {
//     const storedCart = JSON.parse(storedCartString);
//     return storedCart;
//   }
//   return [];
// };

// const saveCartToLocalStorage = (cart) => {
//   const cartStringified = JSON.stringify(cart);
//   localStorage.setItem("cart", cartStringified);
// };

// const addItemToCartLocalStorage = (id) => {
//   const cart = getCartFromLocalStorage();
//   const newCart = [...cart, id];

//   // save new cart to the local storage
//   saveCartToLocalStorage(newCart);
// };

// const removeFromLocalStorage = (id) => {
//   const storedCart = getCartFromLocalStorage();
//   const remainingCart = storedCart.filter((storedId) => storedId !== id);
//   saveCartToLocalStorage(remainingCart);
// };

// // const add = (a, b) => a + b;

// export {
//   getCartFromLocalStorage as getStoreCart,
//   addItemToCartLocalStorage as addToStoredCart,
//   removeFromLocalStorage as removeFromCart,
// };
/**
 * Enhanced localStorage utilities with quantity support
 */
const getCartFromLocalStorage = () => {
  const storedCartString = localStorage.getItem("cart");
  return storedCartString ? JSON.parse(storedCartString) : [];
};

const saveCartToLocalStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const addItemToCartLocalStorage = (id) => {
  const cart = getCartFromLocalStorage();
  const existingItem = cart.find((item) => item.id === id);

  if (existingItem) {
    existingItem.quantity = (existingItem.quantity || 1) + 1;
  } else {
    cart.push({ id, quantity: 1 });
  }

  saveCartToLocalStorage(cart);
};

const removeFromLocalStorage = (id) => {
  const storedCart = getCartFromLocalStorage();
  const remainingCart = storedCart.filter((item) => item.id !== id);
  saveCartToLocalStorage(remainingCart);
};

const clearLocalStorage = () => {
  localStorage.removeItem("cart");
};

export {
  getCartFromLocalStorage as getStoreCart,
  addItemToCartLocalStorage as addToStoredCart,
  removeFromLocalStorage as removeFromCart,
  clearLocalStorage as clearCart,
};
