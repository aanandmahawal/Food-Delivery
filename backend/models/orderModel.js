import mongoose from "mongoose"

const orderSchema=new mongoose.Schema({
    userId:{type:String,required:true},
    items:{type:Array,required:true},
    amount:{type:Number,required:true},
    address:{type:Object,required:true},
    status:{type:String, default:"Food Processing"},
    date:{type:Date,default:Date.now()},
    payment:{type:Boolean,default:false}

})

const orderModel=mongoose.models.order || mongoose.model("order",orderSchema);
export default orderModel;




// 🔹 Q1. What does this schema represent in the application?
// Answer:
// It defines the structure of a food order in the database.
// It includes user, items, address, amount, and payment status.

// 🔹 Q2. Why is default: Date.now() used for the date field?
// Answer:
// It automatically stores the timestamp when an order is created.
// This helps in order tracking and reporting features.

// 🔹 Q3. How is the delivery status tracked in this schema?
// Answer:
// The status field holds values like "Food Processing", "Delivered", etc.
// It can be updated by the admin during the order lifecycle.

// 🔹 Q4. Why is mongoose.models.order || used in model creation?
// Answer:
// To prevent duplicate model declaration errors in dev or serverless environments.
// It reuses an existing model if one already exists.

// 🔹 Q5. How would you improve this schema for scalability?
// Answer:
// Use sub-schemas for items and address instead of raw arrays/objects.
// This adds structure, validation, and indexing benefits.

