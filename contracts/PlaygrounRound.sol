
// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.7.4;

contract Draw {
    bytes32 public drawID;
    uint8 playersCount;
    uint public drawStartTime;
    uint public drawEndTime;
    uint256 public finalyBTCPrice;
    uint256 currentPoolSize;
    uint256 maxPoolSize;
    uint256 poolPrizeTOTM;
    uint256 poolPrizeBTC;
    TotemToken totemToken;

    struct Player {
      address addr;
      uint256 prediction;
      uint256 stake;
    }

    Player[] public players;

    struct Winner {
      address addr;
      uint256 prediction;
      uint256 prizeTotm;
      uint256 prizeBtc;
    }

    Winner[] public winners;

    uint prizes[25] = [375, 20, 11, 25, 25, 25, 25, 25, 25, 25, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10];

    // Set to true at the end, disallows any change.
    // By default initialized to `false`.
    bool ended;

    event DrawEnded(uint256 _finalyBTCPrice, uint8 _playersCount);

    constructor (bytes32 _drawId, uint _drawStartTime, uint _drawEndTime, uint256 _maxPoolSize, uint256 _totemPrize, uint256 _btcPrize) {
        drawID = _drawId;
        playersCount = 0;
        drawStartTime = _drawStartTime;
        drawEndTime = _drawEndTime;
        currentPoolSize = 0;
        maxPoolSize = _maxPoolSize;
        poolPrizeTOTM = totemPrize;
        poolPrizeBTC = _btcPrize;
    }

    function addNewPlayer (address _player, uint256 _stake, uint256 _btcPrediction ) public payable {
        require(
            now <= drawStartTime,
            "Draw not started."
        );
        require(
            maxPoolSize <= _stake + currentPoolSize,
            "Pool already full."
        );


        players.push(Player(_player, _btcPrediction, _stake));
        playersCount = playersCount + 1;
        currentPoolSize = currentPoolSize + _stake;
    }


    function endDraw(uint256 _finalyBTCPrice) public {
        // 1. Conditions
        require(now >= drawEndTime, "Draw not yet ended.");
        require(!ended, "endDraw has already been called.");

        // 2. Effects
        ended = true;
        finalyBTCPrice = _finalyBTCPrice;
        emit DrawEnded(finalyBTCPrice, playersCount);
        createWinnersList();
    }

    function createWinnersList () public {
      uint _length = players.length();
      struct TempPlayer {
        address addr;
        uint howClose;
      }
      TempPlayer[] tmpPlayers;
      for (uint i = 0; i < _length; i++) {
        if (players[i].prediction >= finalyBTCPrice) {
          tmpPlayers.push(TempPlayer(players[i].addr, players[i].prediction - finalyBTCPrice));
        } else {
          tmpPlayers.push(TempPlayer(players[i].addr, finalyBTCPrice - players[i].prediction));
        }
      }

      uint[_length] unsortPrediction;
      for (uint i = 0; i < _length; i++){
        unsortPrediction.push(tmpPlayers.howClose);
      }

      uint[_length] sortPrediction = sort(unsortPrediction);

      uint8 _winnersLength = 25;
      if (_winnersLength > _length) {
        _winnersLength = _length;
      }
      uint8 _nextWinner = 0;
      for (uint i = 0; i < _winnersLength; i++){
        if (players[i].prediction = sortPrediction[_nextWinner]) {
          uint256 _totmPay = _totemPrize / 1000 * prizes[_nextWinner];
          uint256 _btcPay = _btcPrize / 1000 * prizes[_nextWinner];
          winners.push(Winner(players[i].addr, players[i].prediction, _totmPay, _btcPay));
        }
      }
    }

    function checkWinner(address _winner) public returns (uint) {
      for (uint i = 0; i < winners.length(); i++) {
        if (winners[i].addr = _winner) {
         return i;
        }
        return -1;
      }
    }

    function getPrize() public {
      uint _winIndex = checkWinner(msg.sender);
      if ( _winIndex != -1) {
        totemToken.transfer(winners[_winIndex].prizeTotm, msg.sender);
      }
    }

    function sort(uint[] data) public constant returns(uint[]) {
      quickSort(data, int(0), int(data.length - 1));
      return data;
    }
    
    function quickSort(uint[] memory arr, int left, int right) internal{
        int i = left;
        int j = right;
        if(i==j) return;
        uint pivot = arr[uint(left + (right - left) / 2)];
        while (i <= j) {
            while (arr[uint(i)] < pivot) i++;
            while (pivot < arr[uint(j)]) j--;
            if (i <= j) {
                (arr[uint(i)], arr[uint(j)]) = (arr[uint(j)], arr[uint(i)]);
                i++;
                j--;
            }
        }
        if (left < j)
            quickSort(arr, left, j);
        if (i < right)
            quickSort(arr, i, right);
    }
}