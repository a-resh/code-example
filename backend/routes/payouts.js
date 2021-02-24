const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.json({
    payouts: {
      summaryAmount: '514687',
    },
  });
});

module.exports = router;
