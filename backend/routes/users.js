const express = require('express');
const router = express.Router();
const USERS = require('../data/users');

router.get('/', (req, res, next) => {
  res.json(USERS);
});

module.exports = router;
