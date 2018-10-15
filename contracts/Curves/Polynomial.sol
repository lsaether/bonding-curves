pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/math/SafeMath.sol";

contract Polynomial {
    using SafeMath for uint256;

    uint256 constant public PRECISION = 10**7;
    uint256 constant public exponent = 6;

    function curveIntegral(uint256 _x)
        internal
        returns (uint256)
    {
        uint256 nexp = exponent.add(1);

        return PRECISION.div(nexp).mul(_x ** nexp).div(PRECISION);
    }

    function priceToMint(uint256 _amount, uint256 _totalSupply, uint256 _poolBalance)
        public
        returns (uint256)
    {
        return curveIntegral(_totalSupply.add(_amount)).sub(_poolBalance);
    }
}