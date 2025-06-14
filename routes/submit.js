// routes/submit.js
const express = require('express');
const axios   = require('axios');
const router  = express.Router();
const { GAS_ENDPOINT } = require('../config/config');

router.post('/', async (req, res) => {
  if (!GAS_ENDPOINT) {
    return res.status(500).json({ success: false, error: 'GAS_ENDPOINT belum disetel' });
  }

  // req.body di sini pasti string mentah "k1=v1&k2=v2..."
  const rawBody = req.body;
//   console.log('→ RAW BODY:', rawBody);

  try {
    const response = await axios.post(GAS_ENDPOINT, rawBody, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
    return res.json({ success: true, data: response.data });
  } catch (err) {
    console.error('Relay error:', err.response?.data || err.message);
    return res.status(502).json({ success: false, error: 'Gagal kirim ke GAS' });
  }
});

module.exports = router;
