const express = require('express');
const router = express.Router();

const SignUpcontroller = require('../Controller/UserController')

const verifyUserToken = require('../MiddleWare/Auth')

router.post('/signup', SignUpcontroller.Signup)

router.post("/login", SignUpcontroller.Login)

router.get('/list', verifyUserToken, SignUpcontroller.userlist)

router.post('/passreset', verifyUserToken, SignUpcontroller.pssreset)



module.exports = router;