const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.json({
    lastPriceBTC: {
      price: '46596.19',
    },
  });
});

module.exports = router;
