import orderModel from "../models/orderModel.js"

import userModel from "../models/userModel.js"
import Stripe from "stripe"

const stripe =new Stripe(process.env.STRIPE_SECRET_KEY)

//placing user order for frontend

const placeOrder=async(req,res)=>{

    const frontend_url="https://food-delivery-frontend-5lem.onrender.com/"
    try{
        const newOrder=new orderModel({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address
        })

        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});


        const line_items=req.body.items.map((item)=>({
            price_data:{
                currency:"inr",
                product_data:{
                    name:item.name
                },
                unit_amount:item.price*100*80
            },
            quantity:item.quantity
        }))

        line_items.push({
            price_data:{
                currency:"inr",
                product_data:{
                    name:"Delivery Charges"
                },
                unit_amount:2*100*80
            },
            quantity:1
        })

        const session=await stripe.checkout.sessions.create({
            line_items:line_items,
            mode:'payment',
            success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        })

        res.json({success:true,session_url:session.url})

    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}

const verifyOrder=async(req,res)=>{
    const {orderId,success}=req.body;
    try{
        if(success=="true"){
            await orderModel.findByIdAndUpdate(orderId,{payment:true});
            res.json({success:true,message:"Paid"});
        }
        else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({success:false,message:"Not Paid"})
        }
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}

//user orders for frontend

const userOrders=async (req,res)=>{
    try{
        const orders=await orderModel.find({userId:req.body.userId})
        res.json({success:true,data:orders})
    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

//Listing orders for admin panel
const listOrders=async (req,res)=>{
    try{
        const orders=await orderModel.find({});
        res.json({success:true,data:orders})
    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}
//api for updating order status
const updateStatus=async(req,res)=>{
    try{
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
        res.json({success:true,message:"Updated"})

    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}
export {placeOrder,verifyOrder,userOrders,listOrders,updateStatus}






// 🔹 Q1. What is the purpose of placeOrder function?
// Answer:
// It creates a new order, clears the user's cart, and initiates a Stripe payment session.
// It returns a Stripe session.url for redirecting to the payment page.

// 🔹 Q2. Why is unit_amount multiplied by 100 and 80 in Stripe line items?
// Answer:
// Stripe expects amounts in the smallest currency unit (paise).
// The multiplication by 80 likely converts the price to INR equivalent.

// 🔹 Q3. How is delivery charge handled in placeOrder?
// Answer:
// A fixed delivery item is pushed into the Stripe line_items array.
// This ensures it's billed alongside food items in the checkout session.

// 🔹 Q4. What does the verifyOrder function do?
// Answer:
// It marks the order as paid if success is true, otherwise deletes it.
// This ensures only successful payments are stored in the database.

// 🔹 Q5. Why is frontend_url used in the success_url and cancel_url?
// Answer:
// Stripe redirects to the frontend after payment completion or failure.
// These URLs carry the order ID and payment result for further processing.

// 🔹 Q6. What is the role of userOrders function?
// Answer:
// It fetches and returns all orders placed by a specific user.
// This helps users view their past orders on the frontend.

// 🔹 Q7. How does listOrders support the Admin Panel?
// Answer:
// It retrieves all orders regardless of user, for admin overview.
// Admins can track and manage orders from a centralized panel.

// 🔹 Q8. How is order status updated in updateStatus?
// Answer:
// It finds the order by ID and updates its status field.
// The new status is received from the frontend dropdown.

// 🔹 Q9. Why is cartData cleared after placing the order?
// Answer:
// To ensure the user’s cart is emptied once an order is placed.
// It prevents accidental resubmissions or duplicate orders.

// 🔹 Q10. How would you secure the placeOrder API in production?
// Answer:
// Add JWT authentication middleware and validate the user's identity.
// Also, sanitize all inputs to prevent injection or logic tampering.

