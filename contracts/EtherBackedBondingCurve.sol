pragma solidity ^0.4.24;

import "./BondingCurve.sol";

contract EtherBackedBondingCurve is BondingCurve {
    function () public payable { mint(); }

    function mint() public payable {
        require(msg.value > 0, "Must send value to buy tokens.");
        _curvedMint(msg.value);
    }

    function burn(uint256 _amount) public {
        uint256 returnAmount = _curvedBurn(_amount);
        msg.sender.transfer(returnAmount);
    } 
}
