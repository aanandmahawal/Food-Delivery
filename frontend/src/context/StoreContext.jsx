import { createContext,useEffect,useState } from "react";
// import { food_list } from "../assets/assets";
import axios from "axios"
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const url="http://localhost:4000";
    const [token,setToken]=useState("");
    const [food_list,setFoodList]=useState([])

    const addToCart =async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
        } else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }

        if(token){
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}});
        }
    };

    const removeFromCart = async(itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        if(token){
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
        }
    };

   const getTotalCartAmount=()=>{
    let totalAmount=0;
    for(const item in cartItems)
    {
        if(cartItems[item]>0){
            let itemInfo=food_list.find((product)=>product._id===item);
        totalAmount+=itemInfo.price*cartItems[item];
        }
       
    }
    return totalAmount;
   }

   const fetchFoodList=async ()=>{
    const response=await axios.get(url+"/api/food/list");
    setFoodList(response.data.data)
   }

   const loadCartData=async (token)=>{
    const response=await axios.post(url+"/api/cart/get",{},{headers:{token}});
    setCartItems(response.data.cartData);
   }

   useEffect(()=>{
    

    async function loadData(){
        await fetchFoodList();
        if(localStorage.getItem("token")){
            setToken(localStorage.getItem("token"));
            await loadCartData(localStorage.getItem("token"));
        }
    }
    loadData();
   },[])
   

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
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