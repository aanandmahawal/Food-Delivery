import express from "express"
import {addFood, listFood,removeFood} from "../controllers/foodController.js"
import multer from "multer"

const foodRouter =express.Router();

//Image storage engine

const storage=multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const upload=multer({storage:storage})

foodRouter.post("/add",upload.single("image"),addFood)

foodRouter.get("/list",listFood)
foodRouter.post("/remove",removeFood)
export default foodRouter;




// 🔹 Q1. What is the purpose of multer in this router?
// Answer:
// multer handles image uploads by saving files to the uploads folder.
// It uses a disk storage engine to name files uniquely with timestamps.

// 🔹 Q2. How is the uploaded image accessed in the controller?
// Answer:
// The uploaded file is accessed via req.file.filename.
// This filename is then saved to the database for later use.

// 🔹 Q3. What does the route /add do?
// Answer:
// It handles POST requests to add a new food item with an image.
// It uses upload.single("image") middleware before calling addFood.

// 🔹 Q4. Why is the filename prefixed with Date.now()?
// Answer:
// It ensures uniqueness by avoiding name clashes for uploaded files.
// This helps prevent overwriting files with the same original name.

// 🔹 Q5. How can this file upload mechanism be improved?
// Answer:
// Use MIME type validation and size limits in multer for security.
// Optionally, integrate with cloud storage like Cloudinary or S3.