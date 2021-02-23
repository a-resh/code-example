const express = require('express');
const router = express.Router();
const USERS = require('../data/users');

router.get('/:id', (req, res, next) => {
  let code = 200;
  let user = USERS.filter((item) => item.id === req.params.id);
  if (user.length === 0) {
    user = {
      Error: 'User not found',
    };
    code = 404;
  }
  res.status(code).json(user);
});

router.post('/payStakingBonus', (req, res, next) => {
  console.log('req:', req.body);
  let code = 200;
  let user = USERS.filter((item) => item.id === req.body.id);
  let responseObj = {};
  if (user.length === 0) {
    responseObj = {
      Error: 'User not found',
    };
    code = 404;
  } else {
    responseObj = {
      paymentStatus: 'DONE',
      stakedAmont: Number(user[0].inGame),
      amount: user[0].inGame * 0.1,
    };
  }
  res.status(code).json(responseObj);
});

module.exports = router;
