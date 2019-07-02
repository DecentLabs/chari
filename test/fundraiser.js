const Fundraiser = artifacts.require("./Fundraiser.sol");

contract("Fundraiser", accounts => {
  it("should deploy", async () => {

    const deployer = accounts[0];
  	const sponsor = accounts[1];
  	const recipient = accounts[2];

    const contract = new web3.eth.Contract(Fundraiser.abi);

    const now = Math.round(new Date().getTime() / 1000);
    const expiration = now + 120;

    const tx = contract.deploy({
    	data: Fundraiser.bytecode,
    	arguments: [recipient, sponsor, expiration]
    }).send({
        from: deployer,
        gas: 2000000
    });

    await tx;

    console.log("Deployed");

  });
});
