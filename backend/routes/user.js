const express = require('express');
const router = express.Router();
const USERS = require('../data/users');
const createNewToken = require('../utils/jwt');
const jwtConfig = require('../config/jwt');
const uniqid = require('uniqid');

// db
const User = require('../models/user');

router.get('/:id', async (req, res, next) => {
  const publicAddress = req.params.id;
  try {
    let user = await User.findOne({ publicAddress });

    if (user) {
      res.status(200).json(user);
    } else {
      const errorMsg = {
        Error: 'User not found',
      };
      res.status(404).json(errorMsg);
    }
  } catch (error) {
    console.log('User get error: ', JSON.stringify(error));
  }
});

router.post('/register', async (req, res, next) => {
  const id = uniqid();
  const publicAddress = req.body.publicAddress;
  const btcAddress = req.body.btcAddress;
  const accessToken = createNewToken(id, publicAddress);
  const nonce = Date.now();
  const errorMsg = {};

  if (!publicAddress) {
    errorMsg = {
      Error: 'Empty publicAddress',
    };
    res.status(400).json(errorMsg);
  }

  const newUser = new User({
    id,
    publicAddress,
    btcAddress,
    nonce,
    accessToken,
  });

  await newUser.save();

  return res.json(newUser);
});

router.post('/setBTCaddress', async (req, res, next) => {
  const headerExists = req.headers.authorization;
  if (headerExists) {
    const token = req.headers.authorization.split(' ')[1]; // Authorization Bearer xxx
    jwt.verify(token, jwtConfig.secret, function (error, decoded) {
      if (error) {
        console.log(error);
        res.status(401).json('Unauthorized');
      } else {
        console.log('Auth ok: ', decoded.publicAddress);
      }
    });
  } else {
    res.status(403).json('Token not provided');
  }

  if (headerExists) {
  }
  const { publicAddress, btcAddress } = req.body;
  let code = 200;
  let responseObj = {};

  if (!btcAddress) {
    responseObj = {
      error: `BTC addres couldn't be empty!`,
    };
    res.status(400).json(responseObj);
  }

  try {
    let user = await User.findOne({ publicAddress });
    if (user) {
      user.btcAddress = btcAddress;
      await user.save();

      responseObj = {
        publicAddress: user.publicAddress,
        btcAddress: user.btcAddress,
        message: 'BTC address updated',
      };
    } else {
      code = 404;
      responseObj = {
        publicAddress,
        btcAddress,
        error: `User with publicAddress ${publicAddress} not found in DB`,
      };
    }

    res.status(code).json(responseObj);
  } catch (error) {
    console.log('Update BTC address error', error);
  }
});

router.post('/payStakingBonus', (req, res, next) => {
  console.log('req:', req.body);
  let code = 200;
  let user = USERS.filter((item) => item.id === req.body.id);
  let responseObj = {};
  if (user.length === 0) {
    responseObj = {
      error: 'User not found',
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
