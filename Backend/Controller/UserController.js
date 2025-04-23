const usermodel = require('../Model/UserModel')
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const secret = "asasfasfijqwijjqwmnasfa"

exports.signup = async (req, res) => {
  const {firstname, lastname, email, password, role } = req.body;
  const existingUser = await usermodel.findOne({ email });

  if (existingUser) {
    return res.status(400).json({ message: "Email already exists. Please use a different one." });
  }

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt)

  const result = {firstname, lastname, email, password: hash, role: role}

  const newUser = new usermodel(result);
  const savedUser = await newUser.save();

  res.status(201).json({ message: "User created successfully", user: savedUser });

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
    const { email, password } = req.body;
  
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
  

  
