const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const bcrypt = require('bcrypt');
const database = require('./db/database');
require('dotenv').config();
const cookieSession = require('cookie-session');

const saltRounds = process.env.SALTROUNDS;

///////////////////////////////////////////
// middleware/////////////////////////////
app.use(cookieSession({
  name: 'session',
  keys: [process.env.KEY1, process.env.KEY2],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded ({ extended: false }));

const PATH = path.resolve(__dirname, './public/login.html');
app.get('/login', (req, res) => {
  res.sendFile(PATH);
});

app.get('/', (req, res) => {
  const currentUser = req.session.userId;
  if (!currentUser) {
    res.redirect('/login');
  }
});

app.post('/login', (req, res) => {
  const inputUsername = req.body.username;
  const inputPassword = req.body.password;
  database
    .getUsername(inputUsername).then((user) => {
      if (!user) {
        res.json({message: "sorry, we cannot find this user in our database"});
        return;
      }

      if (user.username === inputUsername) {
        bcrypt.compare(inputPassword, user.password, function(err, result) {
          if (result) {
            req.session.userId = user.id;
            res.redirect('/');
          } else {
            res.json({message: "wrong password"});
          }
        });
      }
    });
  
});


app.listen(8080, () => {
  console.log(`Server is running on 8080`);
});
