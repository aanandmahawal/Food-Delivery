import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from 'bcryptjs';
import validator from "validator"
// import { response } from "express";

//login user
const loginUser=async (req,res)=>{
   const {email,password}=req.body;
   try{
    const user=await userModel.findOne({email});
    if(!user){
        return res.json({success:false,message:"User Doesn't exist"})
    }
    const isMatch=await bcrypt.compare(password,user.password)

    if(!isMatch){
        return res.json({success:false,message:"Invalid credentials"})
    }
    const token=createToken(user._id);
    res.json({success:true,token})

   }
   catch(error){
    console.log(error)
    res.json({success:false,message:"Error"})
   }
}

const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET);
}
//register user
const registerUser=async (req,res)=>{
    const {name,password,email}=req.body;
    try{

        //checking if user already exist
        const exists=await userModel.findOne({email});
        if(exists){
          return  res.json({success:false, message:"User already exist"});
        }
        //validate email formate and stron password
        if(!validator.isEmail(email)){
            return res.json({success:false, message:"Please enter a valid email"})
        }

        if(password.length<8){
            return res.json({success:false, message:"Please enter a strong password"})
        }
        //hashing user password

        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt)

        //creat new user on database
        const newUser=new userModel({
            name:name,
            email:email,
            password:hashedPassword
        })

        //save this new user in database

        const user=await newUser.save()
        const token=createToken(user._id)
        res.cookie("token",token,{
           httpOnly:true,
          maxAge:7*24*60*60*1000,
          sameSite:"None",
          secure:true
    })


    }

    catch(error){
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}

export {loginUser,registerUser}




// 🔹 Q1. What does the loginUser function do?
// Answer:
// It verifies a user's email and password, then returns a JWT token on success.
// Password comparison is done securely using bcrypt.compare().

// 🔹 Q2. How is the JWT token created and used?
// Answer:
// The createToken function signs a token using the user ID and a secret key.
// This token is used for authentication in protected routes.

// 🔹 Q3. Why is bcrypt used in this code?
// Answer:
// It securely hashes passwords during registration and verifies them during login.
// This protects sensitive user credentials from being stored in plain text.

// 🔹 Q4. How is email and password validation handled during registration?
// Answer:
// validator.isEmail() checks for valid email format, and password length is manually checked.
// It prevents weak or invalid data from being saved.

// 🔹 Q5. Why is res.cookie() used in registerUser?
// Answer:
// It stores the JWT in an HTTP-only cookie for enhanced security.
// Options like secure and sameSite help prevent CSRF attacks.

// 🔹 Q6. What would happen if JWT_SECRET is missing in .env?
// Answer:
// Token signing would fail and likely throw an error.
// Always ensure secrets are defined securely via environment variables.

// 🔹 Q7. How does the app ensure a user cannot register with an existing email?
// Answer:
// Before registration, it checks if the email already exists in the database.
// If found, it returns a failure response and blocks registration.

// 🔹 Q8. How would you protect sensitive routes using the token?
// Answer:
// Create an auth middleware that verifies the JWT on incoming requests.
// Attach the verified user to req.user for downstream access control.