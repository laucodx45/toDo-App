const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const database = require('./db/database');
// test username = cody
// test pw = password

///////////////////////////////////////////
// middleware/////////////////////////////
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded ({ extended: false }));

// app.get('/', (req, res) => {
//   // once user logged in, we want to establish a cookie
//   // if no cookie then we have to redirect user to /login
// });
const PATH = path.resolve(__dirname, './public/login.html');
app.get('/login', (req, res) => {
  res.sendFile(PATH);
});

app.post('/login', (req, res) => {
  const inputUsername = req.body.username;
  const inputPassword = req.body.password;
  database
    .getUsername(inputUsername).then((obj) => {
      if (obj.username === inputUsername) {
        bcrypt.compare(inputPassword, obj.password, function(err, result) {
          if (result) {
            // res.send('user is in our database!');
            res.redirect('/');
          }
        });
      }
  })
  // a function imported, to look up username and the hashed password from database
  
});


app.listen(8080, () => {
  console.log(`Server is running on 8080`);
});
