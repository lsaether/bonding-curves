pragma solidity ^0.4.24;

import "./CurveBondedToken.sol";

/**
 * @title Simple Curve Bonded Token
 * @dev A token minted / burned according to an underlying bonding curve.
 *      Uses Ether as the reserve currency.
 */
contract SimpleCBT is CurveBondedToken {
    function () public payable { mint(); }

    function mint() public payable {
        require(msg.value > 0, "Must send ether to buy tokens.");
        _curvedMint(msg.value);
    }

    function burn(uint256 _amount) public {
        uint256 returnAmount = _curvedBurn(_amount);
        msg.sender.transfer(returnAmount);
    } 
}
