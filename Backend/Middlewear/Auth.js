const jwt = require('jsonwebtoken')
const secret = "asasfasfijqwijjqwmnasfa"
const usermodel = require('../Model/UserModel')

module.exports = async (req, res, next) => {
    const barretertoke = req.headers.authorization

    const token = barretertoke.split(" ")[1]
    console.log(`>>>token>>`, token)

    if(!token){
        res.status(401).json({message: "no token found"})
    }

    const decode = jwt.verify(token, secret)
    console.log(`>>>decode>>`, decode)

    const user = await usermodel.findOne({email: decode.email})
    console.log(user)

    req.user = user;

    next();
}

// const jwt = require('jsonwebtoken');
// const secret = "asafghkklbbscjj";
// const usermodel = require('../Model/UserModel');

// module.exports = async (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;

//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({ message: "No token provided" });
//     }

//     const token = authHeader.split(" ")[1];
//     const decoded = jwt.verify(token, secret);

//     const user = await usermodel.findOne({ email: decoded.email });

//     if (!user) {
//       return res.status(401).json({ message: "User not found" });
//     }

//     req.user = user;
//     next();
//   } catch (error) {
//     console.error("JWT Auth Error:", error);
//     return res.status(403).json({ message: "Invalid or expired token" });
//   }
// };
