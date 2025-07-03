import express from 'express'
import { addToCart,removeFromCart,getCart } from '../controllers/cartControllers.js'
import authMiddleware from '../middleware/auth.js';

const cartRouter=express.Router();

cartRouter.post("/add",authMiddleware,addToCart)
cartRouter.post("/remove",authMiddleware,removeFromCart);
cartRouter.post("/get",authMiddleware,getCart);


export default cartRouter;



// 🔹 Q1. What is the role of cartRouter in this app?
// Answer:
// It defines Express routes related to user cart operations like add, remove, and get.
// Each route maps to a controller and is protected with authentication middleware.

// 🔹 Q2. Why is authMiddleware used in all cart routes?
// Answer:
// To ensure only authenticated users can access and modify their cart.
// This prevents unauthorized access to another user's data.

// 🔹 Q3. Why are all routes using the POST method, including /get?
// Answer:
// POST allows passing secure user data (e.g., userId) in the request body.
// It's also useful when payloads are complex or large.

// 🔹 Q4. How can this routing structure scale for future cart features?
// Answer:
// You can add routes like /clear or /apply-coupon while keeping logic modular.
// Using controllers keeps the routing layer clean and maintainable.

