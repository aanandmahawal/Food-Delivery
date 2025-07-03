import React, { useContext } from 'react'
import './Cart.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';
const Cart = () => {
  const { cartItems, food_list, removeFromCart,getTotalCartAmount,url } = useContext(StoreContext);
  const navigate=useNavigate();
  return (
    <div>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Removed</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div>
                <div className='cart-items-title cart-items-item'>
                  <img src={url+"/images/"+item.image} alt="" />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>${item.price * cartItems[item._id]}</p>
                  <p onClick={()=>removeFromCart(item._id)}className='cross'>x</p>
                </div>
                <hr />
              </div>
            )
          }
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className='cart-total-details'>
              <p>Subtotal</p>
              <p>{getTotalCartAmount()}</p>
            </div>
            <hr/>

            <div className='cart-total-details'>
              <p>Delivery Fee</p>
              <p>{getTotalCartAmount()===0?0:2}</p>
            </div>
            <hr/>

            <div className='cart-total-details'>
              <b>Total</b>
              <b>{getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b>
            </div>
            
          </div>
          <button onClick={()=>navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>
        <div className='cart-promocode'>
          <div>
            <p>if you have a promo code ,Enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder='promo code'/>
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart



// 🔹 Q1. What does the Cart component do?
// Answer:
// It displays all items added to the cart, along with pricing, quantity, and total amount.
// It also includes functionality to remove items and proceed to checkout.

// 🔹 Q2. How is cart data dynamically displayed?
// Answer:
// It maps over food_list and checks if cartItems[item._id] > 0.
// Only the selected (non-zero quantity) items are rendered.

// 🔹 Q3. How is the total cost calculated?
// Answer:
// getTotalCartAmount() returns the subtotal, and a fixed delivery fee is added if subtotal > 0.
// The final total is shown using simple conditional logic.

// 🔹 Q4. What happens on clicking the “x” icon next to an item?
// Answer:
// The removeFromCart(item._id) function is triggered from context.
// It decrements the quantity or removes the item if the count reaches zero.

// 🔹 Q5. What does the “Proceed to Checkout” button do?
// Answer:
// It navigates the user to the /order route using useNavigate() from React Router.
// This is the entry point for placing the final order.

// 🔹 Q6. How is the image of each cart item displayed?
// Answer:
// It constructs the image URL using url + /images/ + item.image.
// This dynamically links each cart item to its uploaded image.

// 🔹 Q7. How can this component be enhanced for UX?
// Answer:
// Implement promo code logic, disable checkout for empty carts, and add loaders or toasts.
// Also consider using a table layout for better alignment.


