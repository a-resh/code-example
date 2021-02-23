const express = require('express');
const router = express.Router();
const DRAWS = require('../data/draws');

router.get('/', (req, res, next) => {
  res.json(DRAWS);
});

module.exports = router;
