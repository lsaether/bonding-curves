pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/math/SafeMath.sol";

import "../Interface/ICurve.sol";

contract Linear is ICurve {
    using SafeMath for uint256;

    // Set decimals equal to ether for testing purposes.
    uint256 constant decimals = 10**18;

    function calculatePurchaseReturn(
        uint256 _totalSupply,
        uint256 _poolBalance,
        uint256 _reserveRatio,
        uint256 _amount
    )   public
        pure
        returns (uint256)
    {

        uint256 newTotal = _totalSupply.add(_amount);
        return newTotal * newTotal / (2 * decimals) - _poolBalance;
    }

    function calculateSaleReturn(
        uint256 _totalSupply,
        uint256 _poolBalance,
        uint256 _reserveRatio,
        uint256 _amount
    )   public
        pure
        returns (uint256)
    {
        uint256 newTotal = _totalSupply.sub(_amount);
        return _poolBalance - newTotal * newTotal / (2 * decimals);
    }
}
