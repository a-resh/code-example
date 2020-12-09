pragma solidity 0.5.16;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/token/ERC20/TokenTimelock.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20Burnable.sol";

contract TotemToken is ERC20, TokenTimelock, ERC20Burnable {

  constructor(string _name, string _symbol)
    ERC20(_name, _symbol)
    public
  {

  }
}