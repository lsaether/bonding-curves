// pragma solidity ^0.4.24;

// contract ForkableToken {
//     struct Balance {
//         uint128 fromBlock;
//         uint128 value;
//     }

//     CloneToken public parentToken;

//     uint public parentSnapShotBlock;

//     uint public creationBlock;

//     mapping (address => Balance[]) balances;

//     mapping (address => mapping (address => uint128)) allowed;

//     Balance[] totalSupplyHistory;

//     bool public transfersEnabled;
// } 