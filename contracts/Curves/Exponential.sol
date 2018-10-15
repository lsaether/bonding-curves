pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/math/SafeMath.sol";

import "../Interface/ICurve.sol";

/** Exponential Issuance (ie The price of tokens decreases exponentially) */
contract Exponential is ICurve {
    using SafeMath for uint256;

    // Set decimals equal to ether for testing purposes.
    uint256 constant public decimals = 10**18;

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
        uint256 newPrice = newTotal * newTotal / decimals * newTotal / decimals;
        return newPrice / 3 - _poolBalance;
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
        uint256 newPrice = newTotal * newTotal / decimals * newTotal / decimals;
        return _poolBalance - newPrice / decimals;
    }
}
