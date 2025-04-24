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
    const { firstname, lastname, email, password, role } = req.body;

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

    console.log('email send to :', email);
console.log('sender email:', senderemail);

    // Send OTP via email
    const emailSent = await sendOtpEmail(
      email,
      otp,
      `${firstname} ${lastname}`,
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
  


exports.login = async (req, res) => {
    const { email, password, otp } = req.body;
  
    const user = await usermodel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Incorrect email" }); 
    }

    if (user.status === 'inactive') {
        return res.status(403).json({ message: 'Your account is inactive...' });
      }
      
  
    const pwd = user.password
    console.log(`>>>pwd>>`, pwd)

    const match = bcrypt.compareSync(password, pwd);
    if (!match) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const token = jwt.sign({ email }, secret, { expiresIn: '1h' });

    res.status(200).json({ message: "Login successful", user, token });
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
  



//   exports.login = async (req, res) => {
//     try {
//       const { email, password, otp } = req.body;
//       const user = await usermodel.findOne({ email });
  
//       if (!user) {
//         return res.status(401).json({ message: "Incorrect email" });
//       }
//       if (user.status === 'inactive') {
//         return res.status(403).json({ message: "Your account is inactive" });
//       }
  
//       // 1) Check password
//       if (!bcrypt.compareSync(password, user.password)) {
//         return res.status(401).json({ message: "Incorrect password" });
//       }
  
//       // 2) If user not yet verified, require OTP
//       if (!user.isVerified) {
//         // a) no OTP submitted?
//         if (!otp) {
//           return res.status(401).json({ message: "OTP required for first-time login" });
//         }
//         // b) wrong OTP?
//         if (otp !== user.otp) {
//           return res.status(401).json({ message: "Invalid OTP" });
//         }
//         // c) expired OTP?
//         if (moment().isAfter(user.otpTimer)) {
//           return res.status(401).json({ message: "OTP expired" });
//         }
  
//         // d) mark verified & clear OTP fields
//         user.isVerified = true;
//         user.otp = undefined;
//         user.otpTimer = undefined;
//         await user.save();
//       }
  
//       // 3) generate JWT
//       const token = jwt.sign(
//         { id: user._id, email: user.email, role: user.role },
//         secret,
//         { expiresIn: '1h' }
//       );
  
//       return res.status(200).json({
//         message: "Login successful",
//         user: {
//           id: user._id,
//           firstname: user.firstname,
//           lastname: user.lastname,
//           email: user.email,
//           role: user.role,
//         },
//         token,
//       });
  
//     } catch (error) {
//       console.error("Login error:", error);
//       return res.status(500).json({ message: "An error occurred during login" });
//     }
//   };


