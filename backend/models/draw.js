const mongoose = require('mongoose');

const drawSchema = new mongoose.Schema({
  id: String,
  players: [
    {
      publicAddress: String,
      stake: Number,
      prediction: Number,
    },
  ],
  winners: [
    {
      publicAddress: String,
      payoutTotem: Number,
      payoutBtc: Number,
    },
  ],
  poolSize: Number,
  poolType: String,
  drawStartTime: String,
  drawEndTime: String,
  finalyBTCPrice: Number,
});

module.exports = mongoose.model('Draw', drawSchema);
