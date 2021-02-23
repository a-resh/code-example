const express = require('express');
const router = express.Router();
const USERS = require('../data/users');
const sigUtil = require('eth-sig-util');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');

router.get('/', (req, res, next) => {
  let code = 200;
  let responseObj = {};
  let user = USERS.filter((item) => item.id === req.query.publicAddress);

  if (user.length === 0) {
    responseObj = {
      Error: 'User not found',
    };
    code = 404;
  } else {
    let respNonce = user[0].nonce;
    if (respNonce === '' || respNonce === undefined) {
      respNonce = user[0].id + Date.now();
      // set user nonce
    }
    responseObj = {
      nonce: respNonce,
    };
  }
  res.status(code).json(responseObj);
});

router.post('/', (req, res, next) => {
  const { signature, publicAddress } = req.body;
  if (!signature || !publicAddress)
    return res
      .status(400)
      .send({ error: 'Request should have signature and publicAddress' });

  let user = USERS.filter((item) => item.id === publicAddress);

  if (user.length === 0) {
    res.status(401).send({
      error: `User with publicAddress ${publicAddress} is not found in database`,
    });
  } else {
    const msgBufferHex = Buffer.from(signature, 'utf8').toString('hex');
    const address = sigUtil.recoverPersonalSignature({
      data: msgBufferHex,
      sig: signature,
    });
    if (address.toLowerCase() === publicAddress.toLowerCase()) {
      const token = jwt.sign(
        {
          payload: {
            id: user[0].id,
            publicAddress,
          },
        },
        jwtConfig.secret,
        {
          algorithm: jwtConfig.algorithms[0],
          expiresIn: 86400, // expires in 24 hours
        }
      );
      res.status(200).send({ auth: true, token: token });
    } else {
      res.status(401).send({
        error: 'Signature verification failed',
      });
    }
  }
});

module.exports = router;
