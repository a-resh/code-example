// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.7.4;

contract TotemToken {
    string public name = "Totem Token";
    string public symbol = "TOTM";
    string public standard = "Totem Token v1.0";
    uint256 public totalSupply;

    address public CommunityDevelopmentAddr;
    address public StakingRewardsAddr;
    address public LiquidityPoolAddr;
    address public PublicSaleAddr;
    address public AdvisorsAddr;
    address public SeedInvestmentAddr;
    address public PrivateSaleAddr;
    address public TeamAllocationAddr;

    uint256 public CommunityDevelopment;
    uint256 public StakingRewards;
    uint256 public LiquidityPool;
    uint256 public PublicSale;
    uint256 public Advisors;
    uint256 public SeedInvestment;
    uint256 public PrivateSale;
    uint256 public TeamAllocation;

    uint8 COMMUNITY_DEVELOPMENT = 100; // 10% for Community development
    uint8 STAKING_REWARDS = 165; // 16,5% for Staking Revawards
    uint8 LIQUIDITY_POOL = 25; // 2,5% for Liquidity pool
    uint8 PUBLIC_SALE = 250; // 25% for Public Sale
    uint8 ADVISORS = 50; // 5% for Advisors
    uint8 SEED_INVESTMENT = 110; // 11% for Seed investment
    uint8 PRIVATE_SALE = 150; // 15% for Private Sale
    uint8 TEAM_ALLOCATION = 150; // 15% for Team allocation

    uint256 private _startTokenDate = block.timestamp; // time when token deployed
    uint8 _currentMonthOfBlockedTokens = 0;
    uint256 private ONE_MONTH = 2629746; // 1 month in seconds
    uint8 private BLOCKING_PERIOD = 12; // blocking period in months

    uint8 PrivateSaleBlockValue = 85; // 85% of locked tokens
    uint8 SeedInvestmentBlockValue = 85; // 85% of locked tokens
    uint8 TeamAllocationBlockValue = 85; // 85% of locked tokens
    uint8 AdvisorsBlockValue = 85; // 85% of locked tokens

    uint256 PrivateSaleBlockBalance;

    uint256[13] PrivateSalePayOuts = [
        0,
        0,
        0,
        0,
        1500,
        1000,
        2000,
        1000,
        1000,
        1000,
        1000,
        0,
        0
    ];
    uint256[13] SeedTeamAdvisorsPayOuts = [
        0,
        0,
        0,
        0,
        1500,
        875,
        1500,
        771,
        771,
        771,
        771,
        771,
        771
    ];

    uint8 private _decimals;

    address owner;

    constructor(
        uint256 _initialSupply,
        address _CommunityDevelopmentAddr,
        address _StakingRewardsAddr,
        address _LiquidityPoolAddr,
        address _PublicSaleAddr,
        address _AdvisorsAddr,
        address _SeedInvestmentAddr,
        address _PrivateSaleAddr,
        address _TeamAllocationAddr
    ) {
        _decimals = 18;
        // Mint 10 000 000 tokens to msg.sender
        // 1 token = 1 * (10 ** decimals)
        totalSupply = _initialSupply * 10**_decimals;

        //Token allocation
        CommunityDevelopment = (_initialSupply / 1000) * COMMUNITY_DEVELOPMENT;
        StakingRewards = (_initialSupply / 1000) * STAKING_REWARDS;
        LiquidityPool = (_initialSupply / 1000) * LIQUIDITY_POOL;
        PublicSale = (_initialSupply / 1000) * PUBLIC_SALE;
        Advisors = (_initialSupply / 1000) * ADVISORS;
        SeedInvestment = (_initialSupply / 1000) * SEED_INVESTMENT;
        PrivateSale = (_initialSupply / 1000) * PRIVATE_SALE;
        TeamAllocation = (_initialSupply / 1000) * TEAM_ALLOCATION;

        // set parnters addresses
        CommunityDevelopmentAddr = _CommunityDevelopmentAddr;
        StakingRewardsAddr = _StakingRewardsAddr;
        LiquidityPoolAddr = _LiquidityPoolAddr;
        PublicSaleAddr = _PublicSaleAddr;
        AdvisorsAddr = _AdvisorsAddr;
        SeedInvestmentAddr = _SeedInvestmentAddr;
        PrivateSaleAddr = _PrivateSaleAddr;
        TeamAllocationAddr = _TeamAllocationAddr;

        // set partners balances
        balanceOf[CommunityDevelopmentAddr] = CommunityDevelopment;
        balanceOf[StakingRewardsAddr] = StakingRewards;
        balanceOf[LiquidityPoolAddr] = LiquidityPool;
        balanceOf[PublicSaleAddr] = PublicSale;
        balanceOf[AdvisorsAddr] = Advisors;
        balanceOf[SeedInvestmentAddr] = SeedInvestment;
        balanceOf[PrivateSaleAddr] = PrivateSale;
        balanceOf[TeamAllocationAddr] = TeamAllocation;

        // correction for accounts with bblocked tokens
        balanceOf[PrivateSaleAddr] -=
            (balanceOf[PrivateSaleAddr] * PrivateSaleBlockValue) /
            100;
        balanceOf[SeedInvestmentAddr] -=
            (balanceOf[SeedInvestmentAddr] * SeedInvestmentBlockValue) /
            100;
        balanceOf[TeamAllocationAddr] -=
            (balanceOf[TeamAllocationAddr] * TeamAllocationBlockValue) /
            100;
        balanceOf[AdvisorsAddr] -=
            (balanceOf[AdvisorsAddr] * AdvisorsBlockValue) /
            100;

        totalSupply =
            totalSupply -
            CommunityDevelopment -
            StakingRewards -
            LiquidityPool -
            PublicSale;
        totalSupply =
            totalSupply -
            balanceOf[PrivateSaleAddr] -
            balanceOf[SeedInvestmentAddr] -
            balanceOf[TeamAllocationAddr] -
            balanceOf[AdvisorsAddr];

        balanceOf[msg.sender] = totalSupply;

        owner = msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == owner, "Only owner can call this function.");
        _;
    }

    event Transfer(address indexed _from, address indexed _to, uint256 _value);

    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );

    mapping(address => uint256) public balanceOf;
    mapping(address => uint256) public balanceOfLockedTokens;
    mapping(address => mapping(address => uint256)) public allowance;

    function transfer(address _to, uint256 _value)
        public
        returns (bool success)
    {
        require(balanceOf[msg.sender] >= _value);

        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;

        emit Transfer(msg.sender, _to, _value);

        return true;
    }

    function approve(address _spender, uint256 _value)
        public
        returns (bool success)
    {
        allowance[msg.sender][_spender] = _value;

        Approval(msg.sender, _spender, _value);

        return true;
    }

    function transferFrom(
        address _from,
        address _to,
        uint256 _value
    ) public returns (bool success) {
        require(_value <= balanceOf[_from]);
        require(_value <= allowance[_from][msg.sender]);

        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;

        allowance[_from][msg.sender] -= _value;

        Transfer(_from, _to, _value);

        return true;
    }

    function addNextBlockedTokens() public returns (bool success) {
        uint256 monthsElapsed = (block.timestamp - _startTokenDate) / ONE_MONTH;

        if (monthsElapsed > _currentMonthOfBlockedTokens) {
            _currentMonthOfBlockedTokens += 1;
            balanceOf[PrivateSaleAddr] +=
                (PrivateSale / 10000) *
                PrivateSalePayOuts[_currentMonthOfBlockedTokens];
            balanceOf[SeedInvestmentAddr] +=
                (SeedInvestment / 10000) *
                SeedTeamAdvisorsPayOuts[_currentMonthOfBlockedTokens];
            balanceOf[TeamAllocationAddr] +=
                (TeamAllocation / 10000) *
                SeedTeamAdvisorsPayOuts[_currentMonthOfBlockedTokens];
            balanceOf[AdvisorsAddr] +=
                (Advisors / 10000) *
                SeedTeamAdvisorsPayOuts[_currentMonthOfBlockedTokens];
        }
    }
}
