
// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.7.4;

contract Draw {
    bytes32 public drawID;
    uint8 playersCount;
    uint public drawStartTime;
    uint public drawEndTime;
    uint256 public finalyBTCPrice;
    struct Players {
      address[] _players;
    }
    TotemToken totemToken;

    // Set to true at the end, disallows any change.
    // By default initialized to `false`.
    bool ended;

    event DrawEnded(uint256 _finalyBTCPrice, uint8 _playersCount);

    constructor (bytes32 _drawId, uint _drawStartTime, uint _drawEndTime) {
        drawID = _drawId;
        playersCount = 0;
        drawStartTime = _drawStartTime;
        drawEndTime = _drawEndTime;
    }

    function pushAddress(Players storage self, address _player) internal {
      if (!exists(self, _player)) {
        self._players.push(_player);
      }
    }

    function getAddressAtIndex(Players storage self, uint256 index) internal view returns (address) {
        require(index < size(self), "the index is out of bounds");
        return self._players[index];
    }

    function addNewPlayer (address _player, uint256 _stake, uint256 _btcPrediction ) public payable {
        require(
            now <= drawEndTime,
            "Draw already ended."
        );
        Players.push(_player);
        playersCount = playersCount + 1;
    }


    function endDraw(uint256 _finalyBTCPrice) public {
        // 1. Conditions
        require(now >= drawEndTime, "Draw not yet ended.");
        require(!ended, "endDraw has already been called.");

        // 2. Effects
        ended = true;
        finalyBTCPrice = _finalyBTCPrice;
        emit DrawEnded(finalyBTCPrice, playersCount);
    }

    function getPrize() public {
      if (getAddressAtIndex(msg.sender)) {
        totemToken.transfer(100, msg.sender);
      }
    }
}