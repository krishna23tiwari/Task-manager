// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const auth = require('../Middlewear/Auth')
const admincontroller = require('../Controller/AdminController')

router.post('/adminsignup',auth, admincontroller.signup);

router.post('/adminlogin', admincontroller.login);



module.exports = router;