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
    address public StrategicRoundAddr;

    uint256 public CommunityDevelopmentAmount;
    uint256 public StakingRewardsAmount;
    uint256 public LiquidityPoolAmount;
    uint256 public PublicSaleAmount;
    uint256 public AdvisorsAmount;
    uint256 public SeedInvestmentAmount;
    uint256 public PrivateSaleAmount;
    uint256 public TeamAllocationAmount;
    uint256 public StrategicRoundAmount;

    uint8 COMMUNITY_DEVELOPMENT = 100; // 10% for Community development
    uint8 STAKING_REWARDS = 165; // 16,5% for Staking Revawards
    uint8 LIQUIDITY_POOL = 25; // 2,5% for Liquidity pool
    uint8 PUBLIC_SALE = 250; // 25% for Public Sale
    uint8 ADVISORS = 50; // 5% for Advisors
    uint8 SEED_INVESTMENT = 110; // 11% for Seed investment
    uint8 PRIVATE_SALE = 150; // 15% for Private Sale
    uint8 TEAM_ALLOCATION = 150; // 15% for Team allocation
    uint8 STRATEGIC_ROUND = 150; // 15% for Strategic Round

    bool private _isDispributionComplete = false;

    uint8 private _decimals;

    address owner;

    constructor(uint256 _initialSupply) {
        _decimals = 18;
        // Mint 10 000 000 tokens to msg.sender
        // 1 token = 1 * (10 ** decimals)
        totalSupply = _initialSupply * 10**_decimals;

        //Token allocation
        CommunityDevelopmentAmount =
            (_initialSupply / 1000) *
            COMMUNITY_DEVELOPMENT;
        StakingRewardsAmount = (_initialSupply / 1000) * STAKING_REWARDS;
        LiquidityPoolAmount = (_initialSupply / 1000) * LIQUIDITY_POOL;
        PublicSaleAmount = (_initialSupply / 1000) * PUBLIC_SALE;
        AdvisorsAmount = (_initialSupply / 1000) * ADVISORS;
        SeedInvestmentAmount = (_initialSupply / 1000) * SEED_INVESTMENT;
        PrivateSaleAmount = (_initialSupply / 1000) * PRIVATE_SALE;
        TeamAllocationAmount = (_initialSupply / 1000) * TEAM_ALLOCATION;
        StrategicRoundAmount = (_initialSupply / 1000) * STRATEGIC_ROUND;

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

    function setDistributionTeamsAddresses(
        address _CommunityDevelopmentAddr,
        address _StakingRewardsAddr,
        address _LiquidityPoolAddr,
        address _PublicSaleAddr,
        address _AdvisorsAddr,
        address _SeedInvestmentAddr,
        address _PrivateSaleAddr,
        address _TeamAllocationAddr,
        address _StrategicRoundAddr
    ) public onlyOwner {
        require(!_isDispributionComplete);

        // set parnters addresses
        CommunityDevelopmentAddr = _CommunityDevelopmentAddr;
        StakingRewardsAddr = _StakingRewardsAddr;
        LiquidityPoolAddr = _LiquidityPoolAddr;
        PublicSaleAddr = _PublicSaleAddr;
        AdvisorsAddr = _AdvisorsAddr;
        SeedInvestmentAddr = _SeedInvestmentAddr;
        PrivateSaleAddr = _PrivateSaleAddr;
        TeamAllocationAddr = _TeamAllocationAddr;
        StrategicRoundAddr = _StrategicRoundAddr;
    }

    function addTokensToDistrTeams() public onlyOwner {
        require((!_isDispributionComplete));

        transfer(CommunityDevelopmentAddr, CommunityDevelopmentAmount);
        transfer(StakingRewardsAddr, StakingRewardsAmount);
        transfer(LiquidityPoolAddr, LiquidityPoolAmount);
        transfer(PublicSaleAddr, PublicSaleAmount);
        transfer(AdvisorsAddr, AdvisorsAmount);
        transfer(SeedInvestmentAddr, SeedInvestmentAmount);
        transfer(PrivateSaleAddr, PrivateSaleAmount);
        transfer(TeamAllocationAddr, TeamAllocationAmount);
        transfer(StrategicRoundAddr, StrategicRoundAmount);

        _isDispributionComplete = true;
    }
}
