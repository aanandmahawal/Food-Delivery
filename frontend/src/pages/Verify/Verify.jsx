import React, { useContext, useEffect } from 'react'
import './Verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
const Verify = () => {

    const [searchParams,setSearchParams]=useSearchParams();
    const success=searchParams.get("success");
    const orderId=searchParams.get("orderId");
    const {url}=useContext(StoreContext);
    const navigate=useNavigate();

    const verifyPayment=async() =>{
        const response=await axios.post(url+"/api/order/verify",{success,orderId})
        if(response.data.success){
            navigate("/myorders");
        }
        else{
            navigate("/")
        }
    }

    useEffect(()=>{
        verifyPayment();
    },[])
  return (
    <div className='verify'>
        <div className="spinner">

        </div>
      
    </div>
  )
}

export default Verify





// 🔹 Q1. What is the role of the Verify component?
// Answer:
// It handles payment verification after a user completes the Stripe checkout.
// It reads URL parameters and confirms the transaction on the backend.

// 🔹 Q2. How are payment results obtained in this component?
// Answer:
// Using useSearchParams(), it extracts success and orderId from the query string.
// These values are passed to the backend for validation.

// 🔹 Q3. What happens if the verification is successful?
// Answer:
// The user is redirected to /myorders to view their placed order.
// If verification fails, they’re sent back to the homepage.

// 🔹 Q4. Why is verifyPayment() called inside useEffect()?
// Answer:
// To ensure the verification API call runs automatically when the component mounts.
// This allows immediate response after payment without user interaction.

// 🔹 Q5. What is the benefit of having a separate verification component?
// Answer:
// It provides a secure transition between payment and order confirmation.
// Also, it handles Stripe redirection cleanly with minimal UX friction.

// 🔹 Q6. How can this component be improved for better UX?
// Answer:
// Add a loading spinner or success/failure message while verifying.
// Implement error handling for network failures and invalid params.

