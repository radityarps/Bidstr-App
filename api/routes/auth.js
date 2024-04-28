const authController = require('../controllers/register');
const express = require('express')
const router = express.Router();


// router.get('/login', (req, res) => {
//     authController.login
// });

// router.get('/register', (req, res) => {
//     res.render('register.jsx')
// })
router.post('/register', authController.register);
// router.get('/register/otp', (req, res) =>  {
//     res.render('otp.jsx')
// });

// router.post('/register/otp', (req, res) => {
//     authController.verifyOTP
// })

module.exports = router;