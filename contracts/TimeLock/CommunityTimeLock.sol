// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.7.4;

contract CommunityTimeLock {
    address owner;
    bool private _isCommunityFilled = false;
    mapping(address => uint256) public accounts;
    uint256 private _startTime;
    uint8 private _currentMonthOfBlockedTokens;
    uint256 private ONE_MONTH = 2629746; // 1 month in seconds
    uint8 private _monthsCount;
    uint256 public mainBalance;
    uint16[37] CommunityPayOuts = [
        0,
        278,
        278,
        278,
        278,
        278,
        278,
        278,
        278,
        278,
        278,
        278,
        278,
        278,
        278,
        278,
        278,
        278,
        278,
        278,
        278,
        278,
        278,
        278,
        278,
        278,
        278,
        278,
        278,
        278,
        278,
        278,
        278,
        278,
        278,
        278,
        278
    ];

    constructor() {
        owner = msg.sender;
        _startTime = block.timestamp;
        _currentMonthOfBlockedTokens = 0;
        _monthsCount = 36;
    }

    modifier onlyOwner {
        require(msg.sender == owner, "Only owner can call this function.");
        _;
    }

    function closeCommunityList() public onlyOwner {
        _isCommunityFilled = true;
        mainBalance = address(this).balance;
    }

    function getMainBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function addNewMember(address newMember, uint256 distributionAmount)
        public
        onlyOwner
    {
        require(!_isCommunityFilled);
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
                CommunityPayOuts[_currentMonthOfBlockedTokens];
        accounts[msg.sender] -= payoutValue;
        msg.sender.transfer(payoutValue);
        return true;
    }
}
