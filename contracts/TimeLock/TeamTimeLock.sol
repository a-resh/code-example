// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.7.4;

contract TeamTimeLock {
    address owner;
    bool private _isTeamFilled = false;
    mapping(address => uint256) public accounts;
    uint256 private _startTime;
    uint8 private _currentMonthOfBlockedTokens;
    uint256 private ONE_MONTH = 2629746; // 1 month in seconds
    uint8 private _monthsCount;
    uint256 public mainBalance;
    uint16[13] TeamPayOuts = [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1666,
        1666,
        1666,
        1666,
        1666,
        1666
    ];

    constructor() {
        owner = msg.sender;
        _startTime = block.timestamp;
        _currentMonthOfBlockedTokens = 0;
        _monthsCount = 12;
    }

    modifier onlyOwner {
        require(msg.sender == owner, "Only owner can call this function.");
        _;
    }

    function closeTeamList() public onlyOwner {
        _isTeamFilled = true;
        mainBalance = address(this).balance;
    }

    function getMainBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function addNewMember(address newMember, uint256 distributionAmount)
        public
        onlyOwner
    {
        require(!_isTeamFilled);
        accounts[newMember] = distributionAmount;
    }

    function nextMonth() public onlyOwner {
        require(_currentMonthOfBlockedTokens < _monthsCount);
        _currentMonthOfBlockedTokens += 1;
    }

    function withdraw() public returns (bool success) {
        require(
            block.timestamp >
                _startTime + _currentMonthOfBlockedTokens * ONE_MONTH
        );
        uint256 payoutValue =
            (accounts[msg.sender] / 10000) *
                TeamPayOuts[_currentMonthOfBlockedTokens];
        accounts[msg.sender] -= payoutValue;
        msg.sender.transfer(payoutValue);
        return true;
    }
}
