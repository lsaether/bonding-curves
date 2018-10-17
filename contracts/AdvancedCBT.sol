pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";

import "./CurveBondedToken.sol";

contract AdvancedCBT is CurveBondedToken {
    function () public { revert(); }

    ERC20 public reserveToken;

    function mint(uint256 _amount) public {
        require(reserveToken.transferFrom(msg.sender, address(this), _amount));
        _curvedMint(_amount);
    }

    function burn(uint256 _amount) public {
        uint256 reimbursement = _curvedBurn(_amount);
        reserveToken.transfer(msg.sender, reimbursement);
    }
}
