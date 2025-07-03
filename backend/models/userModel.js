import mongoose from "mongoose"

const userSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true, unique:true},
    password:{type:String,required:true},
    cartData:{type:Object,default:{}}
},{minimize:false})

const userModel=mongoose.models.user || mongoose.model("user",userSchema);
export default userModel;



// 🔹 Q1. What does this schema define?
// Answer:
// It defines the structure for a user in the MongoDB database.
// Fields include name, email, password, and cart data.

// 🔹 Q2. Why is unique: true used for the email field?
// Answer:
// It ensures no two users can register with the same email.
// MongoDB enforces uniqueness through indexing.

// 🔹 Q3. What is the purpose of cartData as an object?
// Answer:
// It stores key-value pairs of item IDs and their quantities.
// This structure simplifies cart operations like add/remove.

// 🔹 Q4. Why is {minimize: false} used in the schema?
// Answer:
// It prevents Mongoose from removing empty objects like cartData.
// This ensures the cart field always exists in user documents.

// 🔹 Q5. How can password security be ensured in this schema?
// Answer:
// Passwords should be hashed before saving using bcrypt.
// This protects against plain-text storage vulnerabilities.