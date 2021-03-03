const express = require('express');
const router = express.Router();
const USERS = require('../data/users');

// db
const User = require('../models/user');

router.get('/', async (req, res, next) => {
  const headerExists = req.headers.authorization;
  if (headerExists) {
    const token = req.headers.authorization.split(' ')[1]; // Authorization Bearer xxx
    if (token !== '99b310a0dd75de9b88c3d26cda6054f8395c2df5') {
      res.status(401).json('Unauthorized');
    }
  } else {
    res.status(403).json('Token not provided');
  }

  try {
    let users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.log('Get users error', error);
  }
});

module.exports = router;
