import express from"express"
import cors from "cors"
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

//app config
const app=express()
const port=process.env.PORT || 4000;

const allowedOrigins = [
  "http://localhost:5174",
  "http://localhost:5173"
];


//middleware
app.use(express.json());

const allowedOrigins = [
  "https://food-delivery-admin-jrra.onrender.com",
  "https://food-delivery-frontend-5lem.onrender.com"
];

app.use(cors({
  origin: allowedOrigins,
    credentials : true
}))

//db connection
connectDB();

//api endpoints

app.use("/api/food",foodRouter);
app.use("/images",express.static('uploads'))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)

app.get("/",(req,res)=>{
    res.send("API Working")
})
app.listen(port,()=>{
    console.log(`server started on http://localhost:${port}`)
})






// 🔹 Q1. What is the purpose of this file?
// Answer:
// It initializes the Express server, connects to MongoDB, sets up middleware, and mounts API routes.
// This file serves as the entry point of the backend application.

// 🔹 Q2. How is CORS configured and why is it important?
// Answer:
// CORS is configured to allow requests from your frontend domain with credentials.
// It prevents cross-origin errors when the frontend communicates with the backend.

// 🔹 Q3. What does app.use("/images", express.static('uploads')) do?
// Answer:
// It serves uploaded image files as static content under the /images path.
// This allows frontend access to food images stored on the server.

// 🔹 Q4. How are routes organized in this file?
// Answer:
// All routes are modularized into separate routers (food, user, cart, order).
// Each is mounted under a common API path like /api/food.

// 🔹 Q5. What happens when you visit the base URL (/)?
// Answer:
// The server responds with "API Working" as a simple health check.
// This confirms that the backend server is running.

// 🔹 Q6. How is the server port set and made flexible?
// Answer:
// It reads the port from process.env.PORT, or defaults to 4000.
// This allows flexibility across local and production environments.