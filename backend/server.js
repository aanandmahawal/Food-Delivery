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



//middleware
app.use(express.json());

const allowedOrigins = [
  "https://food-delivery-admin-jrra.onrender.com",
  "https://food-delivery-frontend-5lem.onrender.com"
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));


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
