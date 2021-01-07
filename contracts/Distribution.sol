// SPDX-License-Identifier: UNLICENSED
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

    function setTokenAddress(address _address) onlyOwner public {
        totemToken = TotemToken(_address);
    }

    function setAddressCommunityDevelopment(address _address) public onlyOwner {
        CommunityDevelopment = _address;
    }
    
    function setAddressStakingRewards(address _address) public onlyOwner {
        StakingRewards = _address;
    }

    function setAddressLiquidityPool(address _address) public onlyOwner {
        LiquidityPool = _address;
    }

    function setAddressPublicSale(address _address) public onlyOwner {
        PublicSale = _address;
    }

    function setAddressAdvisors(address _address) public onlyOwner {
        Advisors = _address;
    }

    function setAddressSeedInvestment(address _address) public onlyOwner {
        SeedInvestment = _address;
    }

    function setAddressPrivateSale(address _address) public onlyOwner {
        PrivateSale = _address;
    }

    function setAddressTeamAllocation(address _address) public onlyOwner {
        TeamAllocation = _address;
    }

    function distibuteTokens () public onlyOwner returns (bool) {
      totemToken.transfer(CommunityDevelopment, totemToken.getCommunityDevelopment());
      totemToken.transfer(StakingRewards, totemToken.getStakingRewards());
      totemToken.transfer(LiquidityPool, totemToken.getLiquidityPool());
      totemToken.transfer(PublicSale, totemToken.getPublicSale());
      totemToken.transfer(Advisors, totemToken.getAdvisors());
      totemToken.transfer(SeedInvestment, totemToken.getSeedInvestment());
      totemToken.transfer(PrivateSale, totemToken.getPrivateSale());
      totemToken.transfer(TeamAllocation, totemToken.getTeamAllocation());
      return true;
    }
}
