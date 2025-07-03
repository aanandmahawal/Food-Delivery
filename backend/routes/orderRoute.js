import express from "express"
import authMiddleware from "../middleware/auth.js"
import { listOrders, placeOrder, updateStatus, userOrders, verifyOrder } from "../controllers/orderController.js"

const orderRouter=express.Router();

orderRouter.post("/place",authMiddleware,placeOrder);

orderRouter.post("/verify",verifyOrder)
orderRouter.post("/userorders",authMiddleware,userOrders)
orderRouter.get('/list',listOrders)
orderRouter.post('/status',updateStatus)

export default orderRouter;




// 🔹 Q1. What is the role of orderRouter in this app?
// Answer:
// It defines all backend routes related to food order operations.
// Each route maps to its respective function in the orderController.

// 🔹 Q2. Why is authMiddleware used for /place and /userorders routes?
// Answer:
// These routes require user authentication to access personal order data.
// It prevents unauthorized users from placing or viewing orders.

// 🔹 Q3. Why is /verify not protected with authMiddleware?
// Answer:
// Stripe verifies the order externally after payment completion.
// This endpoint must be publicly accessible to handle Stripe redirects.

// 🔹 Q4. What does the /status route handle?
// Answer:
// It allows admin to update the delivery status of a placed order.
// It’s typically triggered from the Admin Panel.

// 🔹 Q5. Why is the method GET used for /list, unlike others?
// Answer:
// GET /list fetches all orders without needing request body data.
// Other routes use POST to handle payloads like user ID or order info.

