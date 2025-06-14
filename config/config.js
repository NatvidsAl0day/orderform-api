// config/config.js
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({
  path: path.join(__dirname, '.env')  // <-- pakai .env di folder config
});

module.exports = {
  GAS_ENDPOINT: process.env.GAS_ENDPOINT,
  PORT:        process.env.PORT || 3000
};
