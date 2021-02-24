const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');

const createNewToken = (id, publicAddress) => {
  const token = jwt.sign(
    {
      payload: {
        id,
        publicAddress,
      },
    },
    jwtConfig.secret,
    {
      algorithm: jwtConfig.algorithms[0],
      expiresIn: 86400, // expires in 24 hours
    }
  );
  return token;
};

module.exports = createNewToken;
