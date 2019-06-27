const DonationMatching = artifacts.require("DonationMatching");

module.exports = function(deployer) {
  deployer.deploy(DonationMatching);
};
