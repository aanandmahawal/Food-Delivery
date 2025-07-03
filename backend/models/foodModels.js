import mongoose from "mongoose";

const foodSchema=new mongoose.Schema({
    name:{type:String,required:true},
    description:{type:String,required:true},
    price:{type:Number,required:true},
    image:{type:String,required:true},
    category:{type:String,required:true}
})

const foodModel=mongoose.models.food || mongoose.model("food",foodSchema)
export default foodModel;




// 🔹 Q1. What does this Mongoose schema define?
// Answer:
// It defines the structure of a food document in MongoDB.
// Fields like name, price, and category are required.

// 🔹 Q2. Why is mongoose.models.food || used in model creation?
// Answer:
// It prevents model redefinition errors in serverless or hot-reload environments.
// If the model already exists, it reuses it instead of creating a new one.

// 🔹 Q3. How is the image stored in the schema?
// Answer:
// Only the image filename is stored as a string in the image field.
// The actual image is saved on the server's file system.

// 🔹 Q4. How would you add timestamp tracking to this schema?
// Answer:
// Add { timestamps: true } as the second argument in new Schema().
// It automatically includes createdAt and updatedAt fields.

