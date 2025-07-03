import jwt from "jsonwebtoken"

const authMiddleware=async (req,res,next)=>{
    const{token}=req.headers;
    if(!token){
        return res.json({success:false,message:"Not Authorized login Again"})
    }

    try{
        const token_decode=jwt.verify(token,process.env.JWT_SECRET);
        req.body.userId=token_decode.id;
        next();

    }
    catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}


export default authMiddleware;




// 🔹 Q1. What is the purpose of authMiddleware?
// Answer:
// It verifies the JWT token from the request headers to authenticate users.
// If valid, it attaches the user ID to req.body for further use.

// 🔹 Q2. How is token verification handled?
// Answer:
// The token is decoded using jwt.verify() and the secret key.
// If verification fails, an error response is returned to the client.

// 🔹 Q3. Why is next() called after successful verification?
// Answer:
// It passes control to the next middleware or route handler.
// Without next(), the request would hang without completing.

// 🔹 Q4. Why should tokens be stored in headers instead of the body?
// Answer:
// Headers are designed for metadata like authentication and are more secure.
// Storing tokens in the body is less conventional and less protected.

// 🔹 Q5. How would you improve this middleware for production use?
// Answer:
// Check for token in Authorization header using Bearer scheme.
// Also, separate error types and use consistent status codes (e.g., 401 Unauthorized).

