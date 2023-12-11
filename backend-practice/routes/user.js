//create an instance of express
const express = require('express')

const { signupUser, loginUser } = require('../controllers/userController')

//create an instance of the Router
const router = express.Router()

//login route
router.post('/login', loginUser)

//signup route
router.post('/signup', signupUser)

//export statement
module.exports = router