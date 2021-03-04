const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

router.get('/', async (req, res, next) => {
  let success = false;
  await fetch('https://api.coindesk.com/v1/bpi/currentprice/BTC.json')
    .then((response) => response.json())
    .then((jsonData) => {
      success = true;
      res.json({
        lastPriceBTC: {
          price: jsonData.bpi.USD.rate_float,
        },
      });
    })
    .catch((error) => {
      console.log('get BTC price error (coindesk): ', error);
    });

  if (!success) {
    await fetch('https://blockchain.info/ticker')
      .then((response) => response.json())
      .then((jsonData) => {
        success = true;
        res.json({
          lastPriceBTC: {
            price: jsonData.USD.last,
          },
        });
      })
      .catch((error) => {
        console.log('get BTC price error (blockchain.info): ', error);
      });
  }

  if (!success) {
    await fetch('https://api.coinbase.com/v2/prices/BTC-USD/buy')
      .then((response) => response.json())
      .then((jsonData) => {
        success = true;
        res.json({
          lastPriceBTC: {
            price: jsonData.data.amount,
          },
        });
      })
      .catch((error) => {
        console.log('get BTC price error (coinbase): ', error);
      });
  }

  next();
});

module.exports = router;
