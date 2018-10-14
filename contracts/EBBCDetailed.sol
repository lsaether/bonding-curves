pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";

import "./EtherBackedBondingCurve.sol";

contract EBBCDetailed is EtherBackedBondingCurve, ERC20Detailed {
    constructor() public
        ERC20Detailed(
            "Ether Backed Bonding Curve",
            "EBBC",
            18
        )
    {}

    function destroy() onlyOwner {
        selfdestruct(owner());
    }
}
