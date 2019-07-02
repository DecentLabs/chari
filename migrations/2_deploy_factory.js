var FundraiserFactory = artifacts.require("./FundraiserFactory.sol");

module.exports = function(deployer) {
  deployer.deploy(FundraiserFactory);
};
