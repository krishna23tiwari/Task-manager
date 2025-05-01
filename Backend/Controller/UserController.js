const usermodel = require('../Model/UserModel')
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const secret = "asasfasfijqwijjqwmnasfa"
const moment = require("moment");
const { sendOtpEmail } = require("../Utils/EmailService");
const senderemail = "jangiddummy6375@gmail.com";
const mailkey = "hneo ulux pgln lgts";




exports.signup = async (req, res) => {
    try {
      const { firstname, lastname, email, password } = req.body;
      const role = req.body.role || "user"; 
  
    
      if (!firstname || !lastname || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      const existingUser = await usermodel.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          message: "Email already exists. Please use a different one.",
        });
      }
  
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
  
      let otp = "";
      for (let i = 0; i < 6; i++) {
        otp += Math.floor(Math.random() * 10);
      }
  
      const currTimer = moment();
      const otpTimer = currTimer.clone().add(10, "minutes"); 
  
      console.log('Email sending to:', email);
  
      const emailSent = await sendOtpEmail(
        email,
        otp,
        firstname,
        senderemail,
        mailkey
      );
  
      if (!emailSent) {
        return res.status(500).json({ message: "Failed to send OTP email" });
      }
  
      const newUser = new usermodel({
        firstname,
        lastname,
        email,
        password: hash,
        role,
        otp, 
        otpTimer,
      });
  
      const savedUser = await newUser.save();
  
      res.status(201).json({
        message: "User created successfully. Please check your email for OTP.",
        userId: savedUser._id,
      });
    } catch (error) {
      console.error("Signup error:", error);
      res.status(500).json({ message: "An error occurred during registration" });
    }
  };


  exports.verifyOtp = async (req, res) => {
    try {
      const { email, otp } = req.body;
  
      const user = await usermodel.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "User not found." });
      }
  
      if (user.otp !== otp) {
        return res.status(400).json({ message: "Incorrect OTP." });
      }
  
      const currTime = moment();
      if (currTime.isAfter(user.otpTimer)) {
        return res.status(400).json({ message: "OTP expired. Please signup again." });
      }
  
      user.otp = null;
      user.otpTimer = null;
      await user.save();
  
      res.status(200).json({ message: "OTP verified successfully." });
    } catch (error) {
      console.error("OTP verification error:", error);
      res.status(500).json({ message: "Server error during OTP verification." });
    }
  };
  
  


exports.softDeleteUser = async (req, res) => {
    try {
      const { id } = req.params;
  
      const updatedUser = await usermodel.findByIdAndUpdate(
        id,
        { status: 'inactive' },
        { new: true }
      );
  
      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }
  
      res.status(200).json({ message: "User deactivated successfully", updatedUser });
    } catch (error) {
      console.error("Error updating user status:", error);
      res.status(500).json({ error: "Failed to update user status" });
    }
  };
  


// exports.login = async (req, res) => {
//     const { email, password } = req.body;
  
//     const user = await usermodel.findOne({ email });
//     if (!user) {
//       return res.status(401).json({ message: "Incorrect email" }); 
//     }

//     if (user.status === 'inactive') {
//         return res.status(403).json({ message: 'Your account is inactive...' });
//       }
      
  
//     const pwd = user.password
//     console.log(`>>>pwd>>`, pwd)

//     const match = bcrypt.compareSync(password, pwd);
//     if (!match) {
//       return res.status(401).json({ message: "Incorrect password" });
//     }

//     const token = jwt.sign({ email }, secret, { expiresIn: '1h' });

//     res.status(200).json({ message: "Login successful", user, token });
//   };

exports.login = async (req, res) => {
    const { email, password } = req.body;
  
    // Find the user based on email
    const user = await usermodel.findOne({ email });
    
    // If no user found, return error
    if (!user) {
      return res.status(401).json({ message: "Incorrect email" }); 
    }
  
    // Check if the user account is inactive
    if (user.status === 'inactive') {
      return res.status(403).json({ message: 'Your account is inactive...' });
    }
  
    // Compare the password
    const match = bcrypt.compareSync(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Incorrect password" });
    }
  
    // Generate JWT token
    const token = jwt.sign({ email, role: user.role }, secret, { expiresIn: '1h' });
  
    // Set token in response
    const responseData = {
      message: "Login successful",
      user,
      token,
      role: user.role,
    };
  
    // Redirect based on role
    if (user.role === 'admin') {
      responseData.redirectTo = '/dash';  // Admin dashboard route
    } else {
      responseData.redirectTo = '/user-dash';  // User dashboard route
    }
  
    res.status(200).json(responseData);
  };
  


  
exports.getAllUsers = async (req, res) => {
    try {
      const users = await usermodel.find({ status: { $ne: 'inactive' } }).select("-password");
      res.status(200).json({ users });
    } catch (error) {
      console.error("Failed to fetch users:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  



