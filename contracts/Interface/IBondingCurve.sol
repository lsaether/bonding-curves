pragma solidity ^0.4.24;

/**
 * @title Bonding Curve Interface
 * @dev A bonding curve is a method for continous token minting / burning.
 */
interface IBondingCurve {

    event CurvedMint(address indexed sender, uint256 amount, uint256 deposit);
    event CurvedBurn(address indexed sender, uint256 amount, uint256 reimbursement);

    function calculateCurvedMintReturn(uint256 amount)
        external
        view
        returns (uint256);

    function calculateCurvedBurnReturn(uint256 amount)
        external
        view
        returns (uint256);
}
