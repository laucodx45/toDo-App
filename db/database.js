const { Client } = require('pg');
const path = require('path');
const PATH = path.resolve(__dirname, '../.env');
require('dotenv').config(path, PATH);

const client = new Client(process.env.URL);
client.connect();

const getUsername = (username) => {
  const queryString = `SELECT username, password, id FROM users WHERE username = $1`;
  const values = [username];
  return client.query(queryString, values)
    .then((result) => {
      if (result.rows.length === 0) {
        return null;
      } else {
        return result.rows[0];
      }
      
    })
    .catch((err) => {
      console.log(err);
    });
};


// getUsername('cody').then((result) => {
//   console.log(result);
// });
module.exports = {
  getUsername
};