const authController = require('../controllers/auth');
const express = require('express')
const router = express.Router();


// router.get('/login', (req, res) => {
//     authController.login
// });

// router.get('/register', (req, res) => {
//     res.render('register.jsx')
// })
router.post('/sign-up', authController.register);
router.post('/sign-in', authController.login);
router.post('/sign-up/verify', authController.verifyOTP);
// router.get('/register/otp', (req, res) =>  {
//     res.render('otp.jsx')
// });

// router.post('/register/otp', (req, res) => {
//     authController.verifyOTP
// })

module.exports = router;