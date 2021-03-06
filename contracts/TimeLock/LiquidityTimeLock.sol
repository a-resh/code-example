// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.7.4;

contract LiquidityTimeLock {
    address owner;
    bool private _isLiquidityFilled = false;
    address[] accounts;
    mapping(address => uint256) public balanceOf;
    uint256 private _startTime;
    uint8 private _currentMonthOfBlockedTokens;
    uint256 private ONE_MONTH = 2629746; // 1 month in seconds
    uint8 private _monthsCount;
    uint256 public mainBalance;
    uint16[1] LiquidityPayOuts = [100];

    constructor() {
        owner = msg.sender;
        _startTime = block.timestamp;
        _currentMonthOfBlockedTokens = 0;
        _monthsCount = 0;
    }

    modifier onlyOwner {
        require(msg.sender == owner, "Only owner can call this function.");
        _;
    }

    function closeLiquidityList() public onlyOwner {
        _isLiquidityFilled = true;
        mainBalance = address(this).balance;
        fillBalances();
    }

    function addNewMember(address newMember) public onlyOwner {
        require(!_isLiquidityFilled);
        accounts.push(newMember);
    }

    function fillBalances() private {
        uint256 accountsLength = accounts.length;
        uint256 balancePerAccount = mainBalance / accountsLength;
        uint256 index = 0;
        for (index; index < accountsLength; index++) {
            balanceOf[accounts[index]] = balancePerAccount;
        }
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
        uint256 payoutValue = balanceOf[msg.sender];
        balanceOf[msg.sender] = 0;
        msg.sender.transfer(payoutValue);
        return true;
    }
}
