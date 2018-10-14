const Migrations = artifacts.require("Migrations");
const BondingCurve = artifacts.require("BondingCurve");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(BondingCurve);
} as Truffle.Migration;

export {};
