pragma solidity 0.7.4;

contract TotemDistribution {

    TotemToken totemToken;
    address public CommunityDevelopment;
    address public StakingRewards;
    address public LiquidityPool;
    address public PublicSale;
    address public Advisors;
    address public SeedInvestment;
    address public PrivateSale;
    address public TeamAllocation;

    address payable owner;

    constructor() { owner = msg.sender; }

        modifier onlyOwner {
        require(
            msg.sender == owner,
            "Only owner can call this function."
        );
        _;
    }

    function setTokenAddress(address _address) _onlyOwner {
        totemToken = TotemToken(_address);
    }

    function setAddressCommunityDevelopment(address _address) public _onlyOwner {
        CommunityDevelopment = _address;
    }

    function setAddressLiquidityPool(address _address) public _onlyOwner {
        LiquidityPool = _address;
    }

    function setAddressPublicSale(address _address) public _onlyOwner {
        PublicSale = _address;
    }

    function setAddressAdvisors(address _address) public _onlyOwner {
        Advisors = _address;
    }

    function setAddressSeedInvestment(address _address) public _onlyOwner {
        SeedInvestment = _address;
    }

    function setAddressPrivateSale(address _address) public _onlyOwner {
        PrivateSale = _address;
    }

    function setAddressTeamAllocation(address _address) public _onlyOwner (bool) {
        TeamAllocation = _address;
    }

    function distibuteTokens () public _onlyOwner {
      totemToken.transfer(CommunityDevelopment, totemToken.CommunityDevelopment);
      totemToken.transfer(LiquidityPool, totemToken.LiquidityPool);
      totemToken.transfer(PublicSale, totemToken.PublicSale);
      totemToken.transfer(Advisors, totemToken.Advisors);
      totemToken.transfer(SeedInvestment, totemToken.SeedInvestment);
      totemToken.transfer(PrivateSale, totemToken.PrivateSale);
      totemToken.transfer(TeamAllocation, totemToken.TeamAllocation);
      return true;
    }

    function getVal() constant public {
        return totemToken.val();
    }
}
