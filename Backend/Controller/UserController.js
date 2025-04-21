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

//   const { firstname, lastname, email, password } = req.body;

//   try {
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'Email already exists' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = new User({
//       firstname,
//       lastname,
//       email,
//       password: hashedPassword
//     });

//     await newUser.save();

//     res.status(201).json({ message: 'User created successfully' });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }






exports.login = async (req, res) => {
    const { email, password } = req.body;
  
    const user = await usermodel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Incorrect email" }); 
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
  
