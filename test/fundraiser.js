const Fundraiser = artifacts.require("./Fundraiser.sol");

contract("Fundraiser", accounts => {
  it("should deploy", async () => {

  	const sponsor = accounts[0];
  	const recipient = accounts[1];

    const contract = new web3.eth.Contract(Fundraiser.abi);

    const now = Math.round(new Date().getTime() / 1000);
    const expiration = now + 120;

    const tx = contract.deploy({
    	data: Fundraiser.bytecode,
    	arguments: [recipient, expiration]
    }).send({
        from: sponsor,
        gas: 2000000
    });

    await tx;

    console.log("Deployed");

  });
});
