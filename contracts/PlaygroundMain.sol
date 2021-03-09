// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.7.4;

contract FactoryDraw {
    TotemToken totemToken;
    Draw[] Draws_15;
    Draw[] Draws_30;
    Draw[] Draws_60;

    int256 currentDraw_15;
    int256 currentDraw_30;
    int256 currentDraw_60;

    uint256 constant maxPoolSize_15 = 125000;
    uint256 constant maxPoolSize_30 = 110000;
    uint256 constant maxPoolSize_60 = 90000;

    uint256 constant totemPrize_15 = 4500;
    uint256 constant totemPrize_30 = 4000;
    uint256 constant totemPrize_60 = 5000;

    uint256 constant btcPrize_15 = 100; //0.100 btc
    uint256 constant btcPrize_30 = 163; //0.163 btc
    uint256 constant btcPrize_60 = 182; //0.182 btc

    address owner;

    address public recallPoolAddr;
    uint8 recallAmount = 3; // recall amounnt = 3% by default

    constructor() {
        // new draw index will be 0
        currentDraw_15 = -1;
        currentDraw_30 = -1;
        currentDraw_60 = -1;

        owner = msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == owner, "Only owner can call this function.");
        _;
    }

    function setRecalPoolAddr(address _recallPoolAddr) public onlyOwner {
        recallPoolAddr = _recallPoolAddr;
    }

    function setNewRecalAmount(uint8 _newRecallAmount) public onlyOwner {
        recallAmount = _newRecallAmount;
    }

    function createNewDraw(
        bytes32 drawId,
        uint256 _launchTime,
        uint256 _duration
    ) public {
        if (_duration == 15) {
            if (_launchTime > 5) {
                return; // Launch time (Max): 5 days
            }
            uint256 _launchTimeInSec =
                block.timestamp + _launchTime * 60 * 60 * 24;
            uint256 _durationInSec =
                _launchTimeInSec + _duration * 60 * 60 * 24;
            Draw newDraw_15 =
                new Draw(
                    drawId,
                    _launchTimeInSec,
                    _durationInSec,
                    maxPoolSize_15,
                    totemPrize_15,
                    btcPrize_15
                );
            Draws_15.push(newDraw_15);
            currentDraw_15 = currentDraw_15 + 1;
        }

        if (_duration == 30) {
            if (_launchTime > 7) {
                return; // Launch time (Max): 7 days
            }
            uint256 _launchTimeInSec =
                block.timestamp + _launchTime * 60 * 60 * 24;
            uint256 _durationInSec =
                _launchTimeInSec + _duration * 60 * 60 * 24;
            Draw newDraw_30 =
                new Draw(
                    drawId,
                    _launchTimeInSec,
                    _durationInSec,
                    maxPoolSize_30,
                    totemPrize_30,
                    btcPrize_30
                );
            Draws_30.push(newDraw_30);
            currentDraw_30 = currentDraw_30 + 1;
        }

        if (_duration == 60) {
            if (_launchTime > 10) {
                return; // Launch time (Max): 10 days
            }
            uint256 _launchTimeInSec =
                block.timestamp + _launchTime * 60 * 60 * 24;
            uint256 _durationInSec =
                _launchTimeInSec + _duration * 60 * 60 * 24;
            Draw newDraw_60 =
                new Draw(
                    drawId,
                    _launchTimeInSec,
                    _durationInSec,
                    maxPoolSize_60,
                    totemPrize_60,
                    btcPrize_60
                );
            Draws_60.push(newDraw_60);
            currentDraw_60 = currentDraw_60 + 1;
        }
    }

    function addNewPlayer(
        uint256 _stake,
        uint256 _btcPrediction,
        uint256 _duration
    ) public {
        // recall amount calculation
        uint256 recallValue = _stake - (_stake / 100) * recallAmount;
        uint256 correctedStake = _stake - recallValue;
        totemToken.transfer(recallPoolAddr, recallValue);

        if (_duration >= 0 && _duration <= 15 && currentDraw_15 >= 0) {
            Draws_15[uint256(currentDraw_15)].addNewPlayer(
                msg.sender,
                correctedStake,
                _btcPrediction
            );
        }

        if (_duration > 15 && _duration <= 30 && currentDraw_30 >= 0) {
            Draws_30[uint256(currentDraw_30)].addNewPlayer(
                msg.sender,
                correctedStake,
                _btcPrediction
            );
        }

        if (_duration > 30 && _duration <= 60 && currentDraw_15 >= 0) {
            Draws_60[uint256(currentDraw_60)].addNewPlayer(
                msg.sender,
                correctedStake,
                _btcPrediction
            );
        }
    }
}
