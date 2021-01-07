pragma solidity 0.7.4;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/token/ERC20/TokenTimelock.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20Burnable.sol";

contract TotemToken {
    string  public name = "Totem Token";
    string  public symbol = "TOTM";
    string  public standard = "Totem Token v1.0";
    uint256 public totalSupply;

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
    uint8 LIQUIDITY_POOL = 25; // 2,5% for Liquidity pool​
    uint8 PUBLIC_SALE = 250; // 25% for Public Sale
    uint8 ADVISORS = 50; // 5% for Advisors
    uint8 SEED_INVESTMENT = 110; // 11% for Seed investment
    uint8 PRIVATE_SALE = 150; // 15% for Private Sale
    uint8 TEAM_ALLOCATION = 150; // 15% for Team allocation

    address payable owner;

    constructor(uint256 _initialSupply) {
        balanceOf[msg.sender] = _initialSupply;
        totalSupply = _initialSupply;

        //Token allocation
        CommunityDevelopment = ( _initialSupply / 1000 ) * COMMUNITY_DEVELOPMENT;
        StakingRewards = ( _initialSupply / 1000 ) * STAKING_REWARDS;
        LiquidityPool = ( _initialSupply / 1000 ) * LIQUIDITY_POOL;
        PublicSale = ( _initialSupply / 1000 ) * PUBLIC_SALE;
        Advisors = ( _initialSupply / 1000 ) * ADVISORS;
        SeedInvestment = ( _initialSupply / 1000 ) * SEED_INVESTMENT;
        PrivateSale = ( _initialSupply / 1000 ) * PRIVATE_SALE;
        TeamAllocation = ( _initialSupply / 1000 ) * TEAM_ALLOCATION;
        owner = msg.sender;
    }

    modifier onlyOwner {
        require(
            msg.sender == owner,
            "Only owner can call this function."
        );
        _;
    }
    
    event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 _value
    );

    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(balanceOf[msg.sender] >= _value);

        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;

        Transfer(msg.sender, _to, _value);

        return true;
    }

    function approve(address _spender, uint256 _value) public returns (bool success) {
        allowance[msg.sender][_spender] = _value;

        Approval(msg.sender, _spender, _value);

        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) public _onlyOwner returns (bool success) {
        require(_value <= balanceOf[_from]);
        require(_value <= allowance[_from][msg.sender]);

        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;

        allowance[_from][msg.sender] -= _value;

        Transfer(_from, _to, _value);

        return true;
    }
}