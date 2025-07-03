import foodModel from "../models/foodModels.js";
import fs from 'fs';




// add food item

const addFood=async (req,res)=>{
    let image_filename=`${req.file.filename}`;

    const food=new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename
    })

    try{
        //using this method food item will save in database
        await food.save();
        res.json({success:true,message:"Food Added"})

    }
    catch(error){
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

//all food list
const listFood=async(req,res)=>{
    try{
        const foods=await foodModel.find({});
        res.json({success:true,data:foods})
    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

//remove food items
const removeFood=async(req,res)=>{
    try{
        const food=await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`,()=>{})
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Food Removed"})
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}



export {addFood,listFood,removeFood}



// 🔹 Q1. What does the addFood function do?
// Answer:
// It creates a new food document using form data and uploaded image filename.
// The item is then saved into MongoDB using the Mongoose model.

// 🔹 Q2. How is the uploaded image file handled in addFood?
// Answer:
// It accesses the uploaded image via req.file.filename and stores the filename in the DB.
// The actual image is saved in the uploads/ folder by Multer.

// 🔹 Q3. What does listFood return?
// Answer:
// It retrieves all food documents from the database using find({}).
// The data is returned in a JSON response with a success flag.

// 🔹 Q4. How does removeFood handle both DB and file system?
// Answer:
// It deletes the image file using fs.unlink() and then removes the DB record.
// This prevents orphaned image files after a food item is deleted.

// 🔹 Q5. What could happen if fs.unlink() fails silently?
// Answer:
// The image file may not be deleted, leading to unused files in storage.
// Proper error handling or logging inside fs.unlink() is recommended.

// 🔹 Q6. How would you enhance security for these routes?
// Answer:
// Use authentication middleware to restrict access to admins only.
// Also, validate and sanitize all input data to prevent injection attacks.

