import userModel from "../models/userModel.js"

// add items to user cart
const addToCart=async(req,res)=>{
    try{
        let userData=await  userModel.findOne({_id:req.body.userId})
        let cartData=await userData.cartData;
        if(!cartData[req.body.itemId])
        {
            cartData[req.body.itemId]=1;
        }
        else{
            cartData[req.body.itemId]+=1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:"Added to cart"})
    } catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}


//remove items fro user cart
const removeFromCart=async(req,res)=>{
    try{
        let userData=await userModel.findById(req.body.userId);
        let cartData=await userData.cartData;
        if(cartData[req.body.itemId]>0){
            cartData[req.body.itemId]-=1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:"Removed from cart"})
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:"There is an error"})
    }
}

//fetch user cart data
const getCart=async(req,res)=>{
    try{
        let userData=await userModel.findById(req.body.userId);
        let cartData=await userData.cartData;
        res.json({success:true,cartData})
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

export {addToCart,removeFromCart,getCart}





// 🔹 Q1. What is the purpose of addToCart function?
// Answer:
// It adds a food item to the user's cart by incrementing the quantity or initializing it.
// Then it updates the user's cartData in the MongoDB collection.

// 🔹 Q2. How does removeFromCart work?
// Answer:
// It decreases the quantity of a specific item from the user's cart.
// If the quantity is more than zero, it decrements it and updates the DB.

// 🔹 Q3. What type of data structure is used for cartData?
// Answer:
// It is an object where keys are item IDs and values are quantities.
// This allows O(1) access and updates for cart operations.

// 🔹 Q4. How is user data retrieved in each function?
// Answer:
// userModel.findById() or findOne() is used to fetch user data by ID.
// This ensures operations are specific to the current user.

// 🔹 Q5. Why is findByIdAndUpdate() used after modifying the cart?
// Answer:
// It saves the updated cart back into the user's document in the database.
// This ensures changes persist across sessions.

// 🔹 Q6. How would you handle invalid item IDs in addToCart?
// Answer:
// Add a check to validate item ID against the product catalog before updating.
// Respond with an error if the item doesn't exist in the food database.