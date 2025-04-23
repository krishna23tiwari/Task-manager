const express = require('express')
const router = express.Router()
const auth = require('../Middlewear/Auth')
const user = require('../Controller/UserController')

router.post('/signup', user.signup)

router.post('/login', user.login)

router.patch('/soft-delete/:id', auth, user.softDeleteUser);

router.get('/all', user.getAllUsers);


module.exports = router