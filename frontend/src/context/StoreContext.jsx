// src/context/StoreContext.js

import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);

  // 🔗 Use your deployed backend URL here
  const url = `https://food-delivery-backend-3q5b.onrender.com`;

  const addToCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));

    if (token) {
      try {
        await axios.post(`${url}/api/cart/add`, { itemId }, { headers: { token } });
      } catch (err) {
        console.error("Error adding to cart:", err);
      }
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => {
      const newCart = { ...prev };
      if (newCart[itemId] > 1) {
        newCart[itemId] -= 1;
      } else {
        delete newCart[itemId]; // remove item if count is 0
      }
      return newCart;
    });

    if (token) {
      try {
        await axios.post(`${url}/api/cart/remove`, { itemId }, { headers: { token } });
      } catch (err) {
        console.error("Error removing from cart:", err);
      }
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      if (cartItems[itemId] > 0) {
        const item = food_list.find((food) => food._id === itemId);
        if (item?.price) {
          totalAmount += item.price * cartItems[itemId];
        }
      }
    }
    return totalAmount;
  };

  const fetchFoodList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      setFoodList(response.data.data || []);
    } catch (error) {
      console.error("Failed to fetch food list:", error);
    }
  };

  const loadCartData = async (storedToken) => {
    try {
      const response = await axios.post(`${url}/api/cart/get`, {}, { headers: { token: storedToken } });
      setCartItems(response.data.cartData || {});
    } catch (error) {
      console.error("Failed to load cart data:", error);
    }
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();

      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        await loadCartData(storedToken);
      }
    }
    loadData();
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;






// 🔹 Q1. What is the purpose of StoreContext in this app?
// Answer:
// It provides a centralized global state for food items, cart, token, and actions like addToCart.
// This avoids prop drilling and simplifies state access across components.

// 🔹 Q2. How does cart persistence work in this context?
// Answer:
// Cart data is synced with the backend using the token via Axios.
// loadCartData() retrieves persisted cart from the server on refresh/login.

// 🔹 Q3. How is the total cart amount calculated?
// Answer:
// getTotalCartAmount() multiplies item prices with their quantities from cartItems.
// It loops over the cart and uses food_list.find() to get item prices.

// 🔹 Q4. What happens in useEffect() during component mount?
// Answer:
// It calls fetchFoodList() and checks for an existing token in localStorage.
// If found, it sets the token and loads the cart data.

// 🔹 Q5. How is addToCart() handled for both local and server-side?
// Answer:
// First, it updates local cart state; then, if token exists, it makes a POST request to backend.
// This ensures responsiveness and backend persistence.

// 🔹 Q6. Why is the context value object important here?
// Answer:
// It shares essential state and functions (cartItems, addToCart, token, etc.) with all child components.
// This enables consistent access and updates from any part of the app.

// 🔹 Q7. What happens if token is not available during cart actions?
// Answer:
// Only the local cart state is updated, and no API call is made.
// This allows cart interaction even before login, though it won’t persist.

// 🔹 Q8. How could this context be optimized further?
// Answer:
// Use useReducer for cart state management and debounce API calls.
// Add error handling for network issues to improve resilience.



