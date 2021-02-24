const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: String,
  publicAddress: String,
  balance: { type: Number, default: 0 },
  frozenTokens: { type: Number, default: 0 },
  inGame: { type: Number, default: 0 },
  btcAddress: String,
  nonce: String,
  accessToken: String,
  creationDate: { type: String, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);
