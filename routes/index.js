// routes/index.js
const express = require('express');
const router  = express.Router();

// Halaman utama (sambutan)
router.get('/', (req, res) => {
  res.render('welcome', {
    pageTitle: 'Serveo',
    welcomeText: 'Ready to Serve Novo!'
  });
});

module.exports = router;
