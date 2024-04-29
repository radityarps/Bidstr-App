const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const pool = require('./database/connection');
const auth = require('./routes/auth');
const app = express();
const port = 5000;


  app.use(express.json())
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors({
    origin: ['http://localhost:5000'],
    credentials : true
  }));
  
  app.get('/data', async (req, res) => {
    const db = await pool.connect();
    try {
      const result =  await db.query('SELECT * FROM users')
      return res.status(200).json(result)
    } catch(error) {
        return res.status(500).json({error: error.message})
    } finally {
      db.release();
    }
  })

  app.post('/sign-up', auth);
  app.post('/sign-up/verify', auth)
  app.post('/sign-in', auth);
  
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

