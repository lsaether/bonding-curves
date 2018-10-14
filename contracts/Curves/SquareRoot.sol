pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/math/SafeMath.sol";

import "../Interface/ICurve.sol";

contract SquareRoot is ICurve {
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
        uint256 newPrice = (newTotal * newTotal / decimals) * (newTotal / decimals);
        return sqrt(newPrice) * 2 / 3 - _poolBalance;
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
        uint256 newPrice = (newTotal * newTotal / decimals) * (newTotal / decimals);
        return _poolBalance - sqrt(newPrice) * 2 / 3;
    }

    function sqrt(uint256 x) public pure returns (uint256 y) {
        uint256 z = (x + 1) / 2;
        y = x;
        while (z < y) {
        y = z;
        z = (x / z + z) / 2;
        }
    }
}
