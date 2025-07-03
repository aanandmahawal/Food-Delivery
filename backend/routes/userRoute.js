import express from "express"
import {loginUser,registerUser} from "../controllers/userController.js"


const userRouter=express.Router()

userRouter.post("/register",registerUser)
userRouter.post("/login",loginUser);


export default userRouter;




// 🔹 Q1. What does the userRouter handle in this application?
// Answer:
// It manages authentication routes like user registration and login.
// Each route maps to its respective function in userController.

// 🔹 Q2. Why are both routes using the POST method?
// Answer:
// POST is used because both routes handle sensitive data sent in the request body.
// It ensures secure and structured transmission of user credentials.

// 🔹 Q3. How would you secure these routes in production?
// Answer:
// Use input validation, rate-limiting, and HTTPS.
// Also, sanitize inputs to prevent injection and store passwords securely using bcrypt.

