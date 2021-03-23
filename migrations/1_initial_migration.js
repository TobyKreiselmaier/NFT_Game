const Migrations = artifacts.require("Migrations");

module.exports = function (deployer, network, accounts) {
  console.log('Contract owner: ' + accounts[0]);
  deployer.deploy(Migrations);
};
