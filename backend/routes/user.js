const express = require('express');
const router = express.Router();

const users = [
  {
    id: '0xcEF026d6d6ebeDcBF934545cCae855013c757Ced',
    balance: '100',
    frozenTokens: '50',
    inGame: '30',
  },
  {
    id: '0xA0e57194EE7694883b20Ecb0C5aD9A52151D88ac',
    balance: '200',
    frozenTokens: '60',
    inGame: '20',
  },
  {
    id: '0x966e0365e04873D230DA25A9bE4E80AF087eEAf8',
    balance: '300',
    frozenTokens: '70',
    inGame: '20',
  },
  {
    id: '0x83854c3288f62E8B61e0CBa6c20E143a5eAe8212',
    balance: '400',
    frozenTokens: '80',
    inGame: '60',
  },
  {
    id: '0x0D84B727CB638b245b57aB409aFf9E142484D5BC',
    balance: '500',
    frozenTokens: '90',
    inGame: '50',
  },
];

router.get('/:id', (req, res, next) => {
  let code = 200;
  let user = users.filter((item) => item.id === req.params.id);
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
  let user = users.filter((item) => item.id === req.body.id);
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
