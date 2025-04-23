const adminmodel = require('../Model/AdminModel')
const bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');
const secret = "asasfasfijqwijjqwmnasfa"

exports.signup = async(req, res) => {
    const { email, password } = req.body;

  try {
    const existingAdmin = await adminmodel.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists with this email.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new adminmodel({ email, password: hashedPassword });
    await newAdmin.save();

    res.status(201).json({ message: 'Admin registered successfully', admin: newAdmin });
  } catch (error) {
    res.status(500).json({ message: 'Admin signup failed', error });
  }
};


exports.login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const admin = await adminmodel.findOne({ email });
      if (!admin) {
        return res.status(404).json({ message: 'Admin not found' });
      }
  
      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid password' });
      }
  
      const token = jwt.sign(
        { id: admin._id, role: 'admin' },
        secret,
        { expiresIn: '1d' }
      );
  
      res.status(200).json({
        token,
        message: 'Admin logged in successfully',
        admin: {
          _id: admin._id,
          email: admin.email,
          role: 'admin'
        }
      });
    } catch (error) {
      res.status(500).json({ message: 'Login failed', error: error.message });
    }
  };





  

