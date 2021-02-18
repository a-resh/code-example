const { json } = require('body-parser');
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

router.get('/', (req, res, next) => {
  fetch('https://nomics.com/data/candles?currency=BTC&interval=365d')
    .then((response) => response.json())
    .then((jsonData) => res.json(jsonData));
});

module.exports = router;
