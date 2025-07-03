//mongodb+srv://muskangupta:muskangupta932@cluster0.0ulvagv.mongodb.net/?
import mongoose from "mongoose";

export const connectDB=async()=>{
  await mongoose.connect('mongodb+srv://muskangupta:muskangupta932@cluster0.0ulvagv.mongodb.net/food-del').then(()=>console.log("database connected"));

}



// 🔹 Q1. What does the connectDB function do?
// Answer:
// It connects the Node.js backend to the MongoDB Atlas cloud database.
// On success, it logs a confirmation message to the console.

// 🔹 Q2. Why is mongoose.connect() used here?
// Answer:
// Mongoose provides a schema-based abstraction to interact with MongoDB.
// It simplifies querying, validation, and model creation.

// 🔹 Q3. How can this connection be secured in production?
// Answer:
// Move the connection string to an .env file and access it via process.env.
// This hides credentials and follows best security practices.