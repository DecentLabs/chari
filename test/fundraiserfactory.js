const FundraiserFactory = artifacts.require("./FundraiserFactory.sol");

contract("FundraiserFactory", accounts => {
  it("should deploy", async () => {

	const factory = await FundraiserFactory.deployed();

    const deployer = accounts[0];
  	const sponsor = accounts[1];
  	const recipient = accounts[2];

    const now = Math.round(new Date().getTime() / 1000);
    const expiration = now + 120;

    const result = await factory.deploy(recipient, sponsor, expiration, {
        from: deployer,
        gas: 2000000
    });

    const log = result.logs[0].args;
	const event = {
		deployer: log[0],
		recipient: log[1],
		sponsor: log[2]
	};

    console.log("Deployed", event);

  });
});
