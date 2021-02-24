const express = require('express');
const router = express.Router();
const USERS = require('../data/users');
const sigUtil = require('eth-sig-util');
const createNewToken = require('../utils/jwt');
const uniqid = require('uniqid');

// db
const User = require('../models/user');

router.get('/', async (req, res, next) => {
  const publicAddress = req.query.publicAddress;
  let code = 200;
  let responseObj = {};

  try {
    let user = await User.findOne({ publicAddress: publicAddress });
    if (user) {
      responseObj = {
        nonce: user.nonce,
      };
    } else {
      const id = uniqid();
      const accessToken = createNewToken(id, publicAddress);
      const nonce = Date.now();

      const newUser = new User({
        id,
        publicAddress,
        nonce,
        accessToken,
      });

      await newUser.save();

      responseObj = {
        nonce: newUser.nonce,
      };
    }

    res.status(code).json(responseObj);
  } catch (error) {
    console.log('Auth GET error', error);
  }
});

router.post('/', async (req, res, next) => {
  const { signature, publicAddress } = req.body;
  if (!signature || !publicAddress)
    return res
      .status(400)
      .send({ error: 'Request should have signature and publicAddress' });

  try {
    let user = await User.findOne({ publicAddress });
    if (user) {
      const msgBufferHex = Buffer.from(signature, 'utf8').toString('hex');
      const address = sigUtil.recoverPersonalSignature({
        data: msgBufferHex,
        sig: signature,
      });
      if (address.toLowerCase() === publicAddress.toLowerCase()) {
        const token = createNewToken(user.publicAddress, publicAddress);

        res.status(200).send({ auth: true, token: token });
      } else {
        res.status(401).send({
          error: 'Signature verification failed',
        });
      }
    } else {
      res.status(401).send({
        error: `User with publicAddress ${publicAddress} is not found in database`,
      });
    }
  } catch (error) {
    console.log('Auth POST error: ', JSON.stringify(error));
  }
});

module.exports = router;
