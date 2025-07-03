import React, { useContext, useEffect, useState } from 'react'
import './MyOrders.css'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';

const MyOrders = () => {

    const{url,token}=useContext(StoreContext);

    const [data,setData]=useState([]);

    const fetchOrders=async()=>{
        const response=await axios.post(url+"/api/order/userorders",{},{headers:{token}})
        setData(response.data.data);
        
    }

    useEffect(()=>{
        if(token){
            fetchOrders();
        }
    },[token])

  return (
    <div className='my-orders'>
      <h2>My Orders</h2>
      <div className="container">
        {data.map((order,index)=>{
            return(
                <div key={index} className="my-orders-order">
                    <img src={assets.parcel_icon} alt="" />
                    <p>{order.items.map((item,index)=>{
                        if(index===order.items.length-1){
                            return item.name+"x"+item.quantity
                        }
                        else{
                            return item.name+"x"+item.quantity+""
                        }
                    }
                    )}</p>
                    <p>&{order.amount}.00</p>
                    <p>Items:{order.items.length}</p>
                    <p><span>&#x25cf;</span><b>{order.status}</b></p>
                    <button onClick={fetchOrders}>Track Order</button>
                </div>
            )
        })}
      </div>
    </div>
  )
}

export default MyOrders



// 🔹 Q1. What is the purpose of the MyOrders component?
// Answer:
// It displays a list of all orders placed by the currently logged-in user.
// It fetches order data from the backend using the stored JWT token.

// 🔹 Q2. How is the user authenticated for fetching their orders?
// Answer:
// A POST request is made with the token included in request headers.
// This ensures only the logged-in user's orders are retrieved.

// 🔹 Q3. How are order items displayed in the UI?
// Answer:
// Each item in an order is rendered as item.name x quantity using .map().
// The formatting excludes a trailing separator for the last item.

// 🔹 Q4. What does the "Track Order" button do?
// Answer:
// Currently, it re-calls fetchOrders() to refresh the order status.
// It can be extended to show delivery status or map tracking.

// 🔹 Q5. Why is fetchOrders() called inside useEffect?
// Answer:
// It ensures the user's orders are fetched once the token is available.
// The dependency [token] ensures the effect re-runs on login.

// 🔹 Q6. How would you improve the UX of this component?
// Answer:
// Add loading indicators, error handling, and status-based color coding.
// You could also format the order amount with currency symbols and commas.
