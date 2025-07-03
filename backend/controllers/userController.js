import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';
import validator from "validator";

// Generate JWT token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '7d', // optional: token expiration
  });
};

// LOGIN USER
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User doesn't exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const token = createToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      sameSite: "None",
      secure: true,
    });

    res.json({ success: true, message: "Login successful", token });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error during login" });
  }
};

// REGISTER USER
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    //  1. Validate email format
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter a valid email" });
    }

    //  2. Validate password strength
    if (!validator.isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1
    })) {
      return res.json({
        success: false,
        message: "Password must be strong (min 8 characters, include upper/lowercase, number, and symbol)"
      });
    }

    //  3. Check if user already exists
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }

    //  4. Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //  5. Create and save new user
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    //  6. Generate JWT token and send response
    const token = createToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "None",
      secure: true,
    });

    res.json({ success: true, message: "User registered successfully", token });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Registration failed. Try again." });
  }
};

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