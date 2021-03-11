// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.7.4;

contract Draw {
    bytes32 public drawID;
    uint8 playersCount;
    uint256 public drawStartTime;
    uint256 public drawEndTime;
    uint256 public finalyBTCPrice;
    uint256 currentPoolSize;
    uint256 maxPoolSize;
    uint256 poolPrizeTOTM;
    uint256 poolPrizeBTC;
    TotemToken totemToken;
    uint256 predictionMediana = 0;
    mapping(uint256 => unit256) public collaborativeBonus;

    address owner;

    struct Player {
        address addr;
        uint256 prediction;
        uint256 stake;
        uint256 stakeTime;
    }

    Player[] public players;

    struct Winner {
        address addr;
        uint256 prediction;
        uint256 prizeTotm;
        uint256 prizeBtc;
    }

    struct TempPlayer {
        address addr;
        uint256 howClose;
    }

    Winner[] public winners;

    uint256[25] prizes = [
        375,
        20,
        11,
        25,
        25,
        25,
        25,
        25,
        25,
        25,
        10,
        10,
        10,
        10,
        10,
        10,
        10,
        10,
        10,
        10,
        10,
        10,
        10,
        10,
        10
    ];

    mapping(uint256 => uint256) public enhancedRewards;
    uint256 ONE_HOUR = 3600;

    // Set to true at the end, disallows any change.
    // By default initialized to `false`.
    bool ended;

    event DrawEnded(uint256 _finalyBTCPrice, uint8 _playersCount);

    constructor(
        bytes32 _drawId,
        uint256 _drawStartTime,
        uint256 _drawEndTime,
        uint256 _maxPoolSize,
        uint256 _totemPrize,
        uint256 _btcPrize
    ) {
        drawID = _drawId;
        playersCount = 0;
        drawStartTime = _drawStartTime;
        drawEndTime = _drawEndTime;
        currentPoolSize = 0;
        maxPoolSize = _maxPoolSize;
        poolPrizeTOTM = _totemPrize;
        poolPrizeBTC = _btcPrize;

        // enchancedRewards mapping
        enhancedRewards[1] = 0;
        enhancedRewards[2] = 1;
        enhancedRewards[3] = 2;
        enhancedRewards[4] = 3;
        enhancedRewards[5] = 4;
        enhancedRewards[6] = 5;

        // collaborative bonus mapping
        collaborativeBonus[125000] = 20;
        collaborativeBonus[110000] = 25;
        collaborativeBonus[90000] = 35;

        owner = msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == owner, "Only owner can call this function.");
        _;
    }

    function addNewPlayer(
        address _player,
        uint256 _stake,
        uint256 _btcPrediction
    ) public payable {
        require(block.timestamp <= drawStartTime, "Draw not started.");
        require(maxPoolSize <= _stake + currentPoolSize, "Pool already full.");

        players.push(Player(_player, _btcPrediction, _stake, block.timestamp));
        playersCount = playersCount + 1;
        currentPoolSize = currentPoolSize + _stake;
    }

    function setCollaborativeValues(uint256 poolSize, uint256 bonusValue)
        public
        onlyOwner
    {
        collaborativeBonus[poolSize] = bonusValue;
    }

    function calculateCollaborativeIndex() private {
        uint256 predictionSum = 0;
        for (uint256 i = 0; i < playersCount; i++) {
            predictionSum += players[i].prediction;
        }
        predictionMediana = predictionSum / playersCount;
    }

    function endDraw(uint256 _finalyBTCPrice) public {
        // 1. Conditions
        require(block.timestamp >= drawEndTime, "Draw not yet ended.");
        require(!ended, "endDraw has already been called.");

        // 2. Effects
        ended = true;
        finalyBTCPrice = _finalyBTCPrice;
        emit DrawEnded(finalyBTCPrice, playersCount);
        createWinnersList();
        calculateCollaborativeIndex();
    }

    function createWinnersList() private {
        uint256 _length = players.length;

        TempPlayer[] memory tmpPlayers = new TempPlayer[](_length);
        for (uint256 i = 0; i < _length; i++) {
            if (players[i].prediction >= finalyBTCPrice) {
                tmpPlayers[i].addr = players[i].addr;
                tmpPlayers[i].howClose = players[i].prediction - finalyBTCPrice;
            } else {
                tmpPlayers[i].addr = players[i].addr;
                tmpPlayers[i].howClose = finalyBTCPrice - players[i].prediction;
            }
        }

        uint256[] memory unsortPrediction;
        for (uint256 i = 0; i < _length; i++) {
            unsortPrediction[i] = tmpPlayers[i].howClose;
        }

        uint256[] memory sortPrediction = sort(unsortPrediction);

        uint8 _winnersLength = 25;
        if (_winnersLength > _length) {
            _winnersLength = uint8(_length);
        }
        uint8 _nextWinner = 0;
        while (_nextWinner <= _winnersLength - 1) {
            for (uint8 i = 0; i < _winnersLength; i++) {
                uint256 collaborativeValue = 100;
                if (players[i].prediction == sortPrediction[_nextWinner]) {
                    uint256 _totmPay =
                        (poolPrizeTOTM / 1000) * prizes[_nextWinner];
                    _totmPay += ((_totmPay / 100) *
                        enhancedRewards[
                            (players[winners[_nextWinner].addr].stakeTime -
                                drawStartTime) / ONE_HOUR
                        ]);
                    // collaborative logic
                    if (predictionMediana > players[i].prediction) {
                        collaborativeValue =
                            predictionMediana -
                            players[i].prediction;
                    } else {
                        collaborativeValue =
                            players[i].prediction -
                            predictionMediana;
                    }
                    if (predictionMediana < 25) {
                        _totmPay +=
                            (_totmPay / 100) *
                            collaborativeBonus[maxPoolSize];
                    }

                    uint256 _btcPay =
                        (poolPrizeBTC / 1000) * prizes[_nextWinner];
                    winners.push(
                        Winner(
                            players[i].addr,
                            players[i].prediction,
                            _totmPay,
                            _btcPay
                        )
                    );
                    _nextWinner += 1;
                }
            }
        }
    }

    function checkWinner(address _winner) public returns (int256) {
        for (uint256 i = 0; i < winners.length; i++) {
            if (winners[i].addr == _winner) {
                return int256(i);
            }
            return -1;
        }
    }

    function getPrize() public {
        int256 _winIndex = checkWinner(msg.sender);
        if (_winIndex != -1) {
            totemToken.transfer(
                msg.sender,
                winners[uint256(_winIndex)].prizeTotm
            );
        }
    }

    function sort(uint256[] memory data) public returns (uint256[] memory) {
        quickSort(data, int256(0), int256(data.length - 1));
        return data;
    }

    function quickSort(
        uint256[] memory arr,
        int256 left,
        int256 right
    ) internal {
        int256 i = left;
        int256 j = right;
        if (i == j) return;
        uint256 pivot = arr[uint256(left + (right - left) / 2)];
        while (i <= j) {
            while (arr[uint256(i)] < pivot) i++;
            while (pivot < arr[uint256(j)]) j--;
            if (i <= j) {
                (arr[uint256(i)], arr[uint256(j)]) = (
                    arr[uint256(j)],
                    arr[uint256(i)]
                );
                i++;
                j--;
            }
        }
        if (left < j) quickSort(arr, left, j);
        if (i < right) quickSort(arr, i, right);
    }
}
