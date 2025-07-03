import React, { useContext,useEffect,useState } from 'react'
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const PlaceOrder = () => {
  const {getTotalCartAmount,token,food_list,cartItems,url} =useContext(StoreContext);
  const [data,setData]=useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
  })

  const onChangehandler=(event)=>{
    const name=event.target.name;
    const value=event.target.value;

    setData(data=>({...data,[name]:value}))
  }

  const placeOrder=async(event)=>{
    event.preventDefault();
    let orderItems=[];
    food_list.map((item)=>{
      if(cartItems[item._id]>0){
        let itemInfo=item;
        itemInfo["quantity"]=cartItems[item._id];
        orderItems.push(itemInfo);
      }
    })
    let orderData={
      address:data,
      items:orderItems,
      amount:getTotalCartAmount()+2,
    }
    let response=await axios.post(url+"/api/order/place",orderData,{headers:{token}})
    if(response.data.success){
      const {session_url}=response.data;
      window.location.replace(session_url);
    }
    else{
      alert("Error");
    }
    
  }

  const navigate=useNavigate();

  useEffect(()=>{
    if(!token){
      navigate('/cart');
    }
    else if(getTotalCartAmount()===0){
      navigate('/cart')
    }
  },[token])
  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
       
          <div className="multi-fields">
            <input required name='firstName' onChange={onChangehandler} value={data.firstName} type="text" placeholder="First name"/>
            <input required name='lastName' onChange={onChangehandler} value={data.lastName} type="text" placeholder="Last name"/>
          </div>

          <input required name='email' onChange={onChangehandler} value={data.email} type="email" placeholder="Email address"/>
          <input required name='street' onChange={onChangehandler} value={data.street} type="text" placeholder="Street"/>
          <div className="multi-fields">
            <input required name='city' onChange={onChangehandler} value={data.city} type="text" placeholder="City"/>
            <input required name='state' onChange={onChangehandler} value={data.state} type="text" placeholder="State"/>

          </div>

          <div className="multi-fields">
            <input required name='zipcode' onChange={onChangehandler} value={data.zipcode} type="text" placeholder="Zip code"/>
            <input required name='country' onChange={onChangehandler} value={data.country} type="text" placeholder="Country"/>
          </div>
          <input required name='phone' onChange={onChangehandler} value={data.phone} type="text" placeholder="Phone"/>

        </div>
        <div className="place-order-right">
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
          <button type='submit'>PROCEED TO PAYMENT</button>
        </div>
        </div>
      
    </form>
  )
}

export default PlaceOrder



// 🔹 Q1. What is the role of the PlaceOrder component?
// Answer:
// It collects user delivery details and initiates a Stripe payment session for placing the order.
// It verifies cart status and user login before proceeding.

// 🔹 Q2. How is form input managed in this component?
// Answer:
// Each input is a controlled component linked to the data state.
// onChangehandler dynamically updates the corresponding field in the state object.

// 🔹 Q3. What happens after form submission?
// Answer:
// The form is submitted via placeOrder(), which constructs the full order and hits the /order/place endpoint.
// If successful, the user is redirected to a Stripe session_url.

// 🔹 Q4. How is cart data attached to the order?
// Answer:
// It loops through food_list, checks quantities from cartItems, and appends them to the order with a quantity field.
// This forms the items payload sent to the backend.

// 🔹 Q5. How does the component ensure only valid sessions proceed to order?
// Answer:
// Inside useEffect(), it checks if token exists and cart total is non-zero.
// If not, it redirects the user to the /cart page.

// 🔹 Q6. How are payment totals calculated?
// Answer:
// getTotalCartAmount() provides the subtotal, and $2 is added as a delivery fee unless subtotal is zero.
// This is shown both in UI and used in the amount sent to backend.

// 🔹 Q7. Why is window.location.replace(session_url) used?
// Answer:
// It redirects the user to the Stripe checkout page for secure payment.
// This method also prevents users from navigating back to the form page.

// 🔹 Q8. How would you improve error handling in this component?
// Answer:
// Use try-catch blocks around API calls and show toast notifications instead of alert().
// Add client-side validation for phone, zip, and email formats.
