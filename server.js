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

app.get('/main-content', (req, res) => {
  const currentUser = req.session.userId;
  const mainContent = `
  <div class="container">
    <header>
      <p class="title">To Do List</p>
      <img id="dog-pic" src="https://images.vexels.com/media/users/3/213173/isolated/preview/c6137c02cac6b596b3cc3969719a040e-colored-cute-dachshund.png" alt="dog">
    </header>
    <div class="error-message">
      <i class="fa-solid fa-circle-exclamation"></i>
        <p>You must type something in Dawg!</p>
      <i class="fa-solid fa-circle-exclamation"></i>
    </div>
    <div class="row">
      <input type="text" id="input-box" placeholder="Watcha gotta do?">
      <button>YEAH DAWG</button>
    </div>
    <ul id="list-container">
      <!-- <div class="task-row">
        <li>dummy for format</li>
        <i id="cross" class="fa-regular fa-circle-xmark"></i>
      </div> -->
    </ul>
  </div>
  `;
  const loginHTML = `
  <div id="login-container">
    <p class="loginHeader">Login</p>
    <form action="/login" method="post">
      <div class="form-group">
        <label for="username">Username</label>
        <input type="text" id="username" name="username" required>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" name="password" required>
      </div>
      <div class="form-group">
        <button class="submit-btn" type="submit">Login</button>
      </div>
    </form>
  </div>
  `;

  if (currentUser) {
    res.status(200).send(true);
  } else {
    res.send(false);
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
        if (bcrypt.compare(inputPassword, user.password)) {
          req.session.userId = user.id;
          res.redirect('/');
          // change to res.json? authenticated
          // res.json({message: 'logged in'})
        } else {
          res.json({message: "wrong password"});
        }
      }
    });
});


app.listen(8080, () => {
  console.log(`Server is running on 8080`);
});
