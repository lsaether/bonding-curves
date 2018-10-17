pragma solidity ^0.4.24;

// https://github.com/OpenZeppelin/

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "openzeppelin-solidity/contracts/math/SafeMath.sol";

import "./Interface/IBondingCurve.sol";
import "./BancorFormula.sol";

contract CurveBondedToken is IBondingCurve, BancorFormula, Ownable, ERC20 {
    using SafeMath for uint256;

    uint256 public maxGasPrice = 1 * 10**18 wei;

    uint256 public poolBalance;
    uint256 public reserveRatio = 500000;

    function calculateCurvedMintReturn(uint256 _amount)
        public view returns (uint256 mintAmount)
    {
        return calculatePurchaseReturn(totalSupply(), poolBalance, uint32(reserveRatio), _amount);
    }

    function calculateCurvedBurnReturn(uint256 _amount)
        public view returns (uint256 burnAmount)
    {
        return calculateSaleReturn(totalSupply(), poolBalance, uint32(reserveRatio), _amount);
    }

    modifier validGasPrice() {
        require(
            tx.gasprice <= maxGasPrice, 
            "Must send equal to or lower than maximum gas price to mitigate front running attacks."
        );
        _;
    }

    modifier validMint(uint256 _amount) {
        require(_amount > 0, "Amount must be non-zero!");
        _;
    }

    modifier validBurn(uint256 _amount) {
        require(_amount > 0, "Amount must be non-zero!");
        require(balanceOf(msg.sender) >= _amount, "Sender does not have enough tokens to burn.");
        _;
    }

    function _curvedMint(uint256 _deposit) 
        validGasPrice
        validMint(_deposit)
        internal returns (uint256)
    {
        uint256 amount = calculateCurvedMintReturn(_deposit);
        _mint(msg.sender, amount);
        poolBalance = poolBalance.add(_deposit);
        emit CurvedMint(msg.sender, amount, _deposit);
        return amount;
    }

    function _curvedBurn(uint256 _amount)
        validGasPrice
        validBurn(_amount)
        internal returns (uint256)
    {
        uint256 reimbursement = calculateCurvedBurnReturn(_amount);
        poolBalance = poolBalance.sub(reimbursement);
        _burn(msg.sender, _amount);
        emit CurvedBurn(msg.sender, _amount, reimbursement);
        return reimbursement;
    }
}
