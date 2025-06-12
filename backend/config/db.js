//mongodb+srv://muskangupta:muskangupta932@cluster0.0ulvagv.mongodb.net/?
import mongoose from "mongoose";

export const connectDB=async()=>{
  await mongoose.connect('mongodb+srv://muskangupta:muskangupta932@cluster0.0ulvagv.mongodb.net/food-del').then(()=>console.log("database connected"));

}