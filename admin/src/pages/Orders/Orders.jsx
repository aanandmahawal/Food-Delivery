import React, { useState, useEffect } from 'react';
import './Orders.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + '/api/order/list');
      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error('Error');
      }
    } catch (error) {
      toast.error('Error fetching orders');
    }
  };

  const statusHandler=async(event,orderId)=>{
    const response=await axios.post(url+"/api/order/status",{
      orderId,
      status:event.target.value
    })

    if(response.data.success){
      await fetchAllOrders();
    }

  }

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className='order-list'>
        {orders.map((order, index) => (
          <div key={index} className='order-item'>
            <img src={assets.parcel_icon} alt='Parcel Icon' />
            <div>
              <p className='order-item-food'>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + ' x ' + item.quantity;
                  } else {
                    return item.name + ' x ' + item.quantity + ', ';
                  }
                })}
              </p>
              <p className='order-item-name'>{order.address.firstName+" "+order.address.lastName}</p>
              <div className="order-item-address">
                <p>{order.address.street+","}</p>
                <p>{order.address.city+","+order.address.state+","+order.address.country+","+order.address.zipcode}</p>
              </div>
              <p className='order-item-phone'>{order.address.phone}</p>

            </div>
            <p>Items:{order.items.length}</p>
            <p>${order.amount}</p>
            <select onChange={(event)=>statusHandler(event,order._id)} value={order.status}>
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;






// 🔹 Q1. What is the purpose of the Orders component?
// Answer:
// It displays all customer orders for the admin, including food details and delivery status.
// Admins can also update the order status from a dropdown.

// 🔹 Q2. What does fetchAllOrders() do and where is it used?
// Answer:
// It sends a GET request to fetch all orders and sets them in the orders state.
// It's triggered once via useEffect when the component mounts.

// 🔹 Q3. How is order status updated in this component?
// Answer:
// When the admin changes the dropdown, statusHandler() sends a POST request with the new status.
// On success, it refreshes the orders by calling fetchAllOrders().

// 🔹 Q4. Why is toast.error() used inside both try-catch and response check?
// Answer:
// It alerts users of both API failure and unsuccessful responses.
// This ensures proper error feedback regardless of the cause.

// 🔹 Q5. How is dynamic order item display handled?
// Answer:
// It maps through each item and conditionally formats them with commas.
// This ensures the item list appears clean and human-readable.

// 🔹 Q6. How is user address information structured and displayed?
// Answer:
// The address is displayed using nested fields like street, city, state, etc.
// It shows the complete delivery location in two lines for readability.

// 🔹 Q7. Why is parcel_icon displayed in each order item?
// Answer:
// It's a UI enhancement to visually represent the order concept.
// This improves UX by giving a consistent and recognizable icon.

// 🔹 Q8. Why is value={order.status} used in the select tag?
// Answer:
// It sets the current order status as the default selected value.
// This enables the dropdown to reflect the order’s actual state.

// 🔹 Q9. What would you improve or optimize in this component?
// Answer:
// Add loading states and error boundary handling for better UX.
// Use order IDs as keys instead of index to ensure stability on re-renders.