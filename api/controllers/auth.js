const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const pool = require("../database/connection");
require("dotenv").config();
// const bodyParser = require('body-parser')
// bodyParser.urlencoded({ extended: true })

// Login Controller
const login = async (req, res) => {
  const db = await pool.connect();
  const { email, password } = req.body;
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+)(\.[^<>()\[\]\\.,;:\s@"]+)*)@(([^<>()\[\]\\.,;:\s@"]+)(\.[^<>()\[\]\\.,;:\s@"]+)*)$/i;
  try {
    const data = await db.query(`SELECT * FROM users WHERE email = $1`, [
      email,
    ]);
    const user = data.rows[0];
    if (!user) {
      res.status(401).json({ message: "Invalid email or password" });
    }
    if (!re.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    const passMatch = await bcrypt.compare(password, user.password);
    if (!passMatch) {
      res.status(401).json({ message: "Wrong password" });
    }
    const userData = { id: user.user_id };

    if (user.user_role == "foreman") {
      res.status(200).json({
        message: "Login Successfully",
        userData,
        redirecTo: "/worker",
      });
    }
    res.status(200).json({
      message: "Login Successfully",
      userData,
      redirecTo: "/user",
    });
  } catch (error) {
    res.status(500).json({ message: error });
  } finally {
    db.release();
  }
};

// Register Controllers
const generateOTP = () => {
  const lengthOTP = 4;
  const number = "0123456789";
  let otp = "";
  for (let i = 0; i < lengthOTP; i++) {
    otp += number[Math.floor(Math.random() * lengthOTP)];
  }
  return otp;
};
const sendOTP = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
  });
  let info = await transporter.sendMail(
    {
      from: transporter.auth.user,
      to: `${email}`,
      subject: "OTP Verification",
      text: `Your OTP : ${otp} `,
    },
    (err, info) => {
      if (err) {
        console.error("Error sending email:", err);
      } else {
        console.log("Email sent successfully:", info.messageId);
      }
    }
  );
  return info;
};
const verifyOTP = async (req, res, email) => {
  const db = await pool.connect();
  try {
    const providedOTP = req.body.providedOTP;

    const data = await db.query(`SELECT * FROM users WHERE user_id = $1`, [
      email,
    ]);
    const user = data.rows[0];
    if (!user) {
      res.status(401).json({ message: "Invalid email or password" });
    }
    const otpMatch = await bcrypt.compare(providedOTP, user.otp);
    if (!otpMatch) {
      res.status(401).json({ message: "Wrong password" });
    }
    await db.query(`INSERT TO users (otpStatus) VALUES (true)`);
    res.status(200).json({ message: "OTP Verification Suksess" });
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  } finally {
    db.release();
  }
};

const register = async (req, res) => {
  const db = await pool.connect();
  try {
    const saltRounds = 10;
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+)(\.[^<>()\[\]\\.,;:\s@"]+)*)@(([^<>()\[\]\\.,;:\s@"]+)(\.[^<>()\[\]\\.,;:\s@"]+)*)$/i;
    const { username, email, password, confirmPassword } = req.body;
    const isUserExisted = await db.query(
      `SELECT * FROM users WHERE username = $1`,
      [username]
    );
    const isEmailExisted = await db.query(
      `SELECT * FROM users WHERE email = $1`,
      [email]
    );
    const dataExistedUser = isUserExisted.rows[0];
    const dataExistedEmail = isEmailExisted.rows[0];
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All data must be field" });
    }
    // Username Validation
    if (!username.length > 5 && !username <= 20) {
      return res
        .status(400)
        .json({ message: "Username must be between 6 and 20 characters" });
    }
    if (dataExistedUser) {
      return res.status(400).json({ message: "username already use" });
    }
    //  email validation
    if (!re.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    if (dataExistedEmail) {
      return res.status(400).json({ message: "Email already use" });
    }
    // password validation
    if (!password >= 8) {
      return res
        .status(400)
        .json({ message: "Password minimal have 8 characters" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Password did not match!" });
    }
    const otp = generateOTP();
    await sendOTP(email);
    const hashotp = await bcrypt.hash(otp, saltRounds);
    const hashPassword = await bcrypt.hash(password, saltRounds);
    const userRole = "user";
    const values = [username, email, hashPassword, hashotp, userRole];
    const query = `INSERT INTO users (username, email, password, otp, user_role) VALUES ($1, $2, $3, $4, $5)`;
    await pool.query(query, values);
    res
      .status(200)
      .json({
        message: `Register Sucsess ${otp}`,
        redirecTo: "/sign-up/verify",
      });
    // res.redirect('/register/verify')
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ Error: `${error}` });
  } finally {
    db.release();
  }
};

// Forgot Password

module.exports = {
  register,
  verifyOTP,
  login,
};
