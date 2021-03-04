const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');

// db
const Draw = require('../models/draw');

router.get('/', (req, res, next) => {\
  const id = req.body.id;
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

  try {
    let draw = await Draw.findOne({ id });
    if (draw) {
      console.log('Draw payouts: ', draw.winners)

      responseObj = {
        players: draw.players,
        winners: draw.winners,
        finalyBTCPrice: draw.finalyBTCPrice,
      };
    } else {
      code = 404;
      responseObj = {
        error: `Draw with id ${id} not found in DB`,
      };
    }

    res.status(code).json(responseObj);
  } catch (error) {
    console.log('Get payouts error', error);
  }
});

module.exports = router;
