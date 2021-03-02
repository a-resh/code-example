const express = require('express');
const router = express.Router();
const USERS = require('../data/users');

// db
const User = require('../models/user');

router.get('/', async (req, res, next) => {
  try {
    let users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.log('Get users error', error);
  }
});

module.exports = router;
