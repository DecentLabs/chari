var DonationMatching = artifacts.require("./DonationMatching.sol");

module.exports = function(deployer) {
  deployer.deploy(DonationMatching);
};
