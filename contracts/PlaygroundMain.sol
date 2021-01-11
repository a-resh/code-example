// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.7.4;

contract FactoryDraw {
    Draw[] Draws_15;
    Draw[] Draws_30;
    Draw[] Draws_60;

    uint256 currentDraw_15;
    uint256 currentDraw_30;
    uint256 currentDraw_60;

    constructor() {
      // new draw index will be 0
      currentDraw_15 = -1;
      currentDraw_30 = -1;
      currentDraw_60 = -1;
    }

    function createNewDraw (bytes32 drawId, uint _launchTime, uint _duration) public {
      if (_duration = 15) {
        if (_launchTime > 5) {
          return; // Launch time (Max): 5 days
        }
        uint _launchTimeInSec = now + _launchTime * 60 * 60 * 24;
        uint _durationInSec = _launchTimeInSec + _duration * 60 * 60 * 24;
        Draw newDraw_15 = new Draw(drawId, _launchTimeInSec, _durationInSec);
        Draws_15.push(newDraw_15);
        currentDraw_15 = currentDraw_15 + 1;
      }

      if (_duration = 30) {
        if (_launchTime > 7) {
          return; // Launch time (Max): 7 days
        }
        uint _launchTimeInSec = now + _launchTime * 60 * 60 * 24;
        uint _durationInSec = _launchTimeInSec + _duration * 60 * 60 * 24;
        Draw newDraw_30 = new Draw(drawId, _launchTimeInSec, _durationInSec);
        Draws_30.push(newDraw_30);
        currentDraw_30 = currentDraw_30 + 1;
      }

      if (_duration = 60) {
        if (_launchTime > 10) {
          return; // Launch time (Max): 10 days
        }
        uint _launchTimeInSec = now + _launchTime * 60 * 60 * 24;
        uint _durationInSec = _launchTimeInSec + _duration * 60 * 60 * 24;
        Draw newDraw_60 = new Draw(drawId, _launchTimeInSec, _durationInSec);
        Draws_60.push(newDraw_60);
        currentDraw_60 = currentDraw_60 + 1;
      }
    }

    function addNewPlayer (uint256 _stake, uint256 _btcPrediction, uint _duration ) public {
      if (_duration >=0 && _duration <= 15) {
        Draws_15[currentDraw_15].addNewPlayer(msg.sender, _stake, _btcPrediction);
      }

      if (_duration > 15 && _duration <= 30) {
        Draws_30[currentDraw_30].addNewPlayer(msg.sender, _stake, _btcPrediction);
      }

      if (_duration > 30 && _duration <= 60) {
        Draws_60[currentDraw_60].addNewPlayer(msg.sender, _stake, _btcPrediction);
      }
    }
}