const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const pool = require('./database/connection');
const router = require('./routes/auth');
const app = express();
const port = 5000;


pool.connect(err => {
    if (err) {
      console.error('Error connecting to PostgreSQL:', err);
      return;
    }
    console.log('Connected to PostgreSQL database');
  });

  app.use(express.json())
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors({
    origin: ['http://localhost:5000'],
    credentials : true
  }));
  
  app.get('/data', async (req, res) => {
      await pool.query("SELECT * FROM users").then((result) => {
        return res.status(200).json(result)
      }).catch((error) => {
        return res.status(500).json({error: error.message})
      });
  })

  app.post('/register', router);
  // app.use('/register/otp', router);

// app.get('/register', (req, res) => {
//     res.render("./register");
// });

// app.post('/register', (req, res) => {
//   const username = req.body;
//   // res.redirect('/register/otp')
// });

// app.get('/register/otp', router)

app.listen(port, () => console.log(`http://localhost:${port}`));

