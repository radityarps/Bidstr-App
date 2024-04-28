const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const pool = require('../database/connection')
const bodyParser = require('body-parser')
bodyParser.urlencoded({ extended: true })


const generateOTP = () => {
    const lengthOTP = 4 ;
    const number = '0123456789';
    let otp = '';
    for (let i = 0; i < lengthOTP; i++) {
        otp += number[Math.floor(Math.random() * lengthOTP)];
      }
      return otp;
}
const sendOTP = async (email, otp) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "otpreply375@gmail.com",
          pass: "bid12345678",
        },
      });
      transporter.sendMail({
        from: 'otpreply375@gmail.com',
        to: `${email}`,
        subject: 'OTP Verification',
        text: `Your OTP : ${otp} `,
      }, (err, info) => {
        if (err) {
          console.error('Error sending email:', err);
        } else {
          console.log('Email sent successfully:', info.messageId);
        }
      });
}
const verifyOTP = (otp) => {
    const providedOTP = req.body.providedOTP
    if ( otp !== providedOTP  ) {
        return res.status(400).json({message : "Wrong OTP Input"});
    } 
    pool.query(`INSERT TO users (otpStatus) VALUES (true)`);
    res.status(200).json({message: "OTP Verification Suksess"})
    
}

const register = async ( req, res) => {
    try {
      const saltRounds = 10;
        const { username, email, password, confirmPassword } = req.body ;
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Semua data harus diisi' });
          } if (password !== confirmPassword) {
              return res.status(400).json({message : "Password did not match!"});
            }
        const otp = generateOTP() ;
        await sendOTP(email, otp) ;
        const hashotp = await bcrypt.hash(otp, saltRounds)
        const hashPassword = await bcrypt.hash(password, saltRounds)
        const values = [username, email, hashPassword, hashotp];
        const query = `INSERT INTO users (username, email, password, otp) VALUES ($1, $2, $3, $4)`;
        await pool.query(query,values);
        res.status(200).json({message: "Register Sucsess"});
        res.redirect('/register/verify')
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ Error : `${error}` });
    }
}

module.exports = {
    register,
    verifyOTP
}



