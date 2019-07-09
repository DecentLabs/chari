const FundraiserFactory = artifacts.require("FundraiserFactory");
const Fundraiser = artifacts.require("Fundraiser");
const Grant = artifacts.require("Grant");

const ETH = "0x0000000000000000000000000000000000000000";


async function advanceTime(time) {
    return new Promise((resolve, reject) => {
        web3.currentProvider.send({
            jsonrpc: "2.0",
            method: "evm_increaseTime",
            params: [time],
            id: new Date().getTime()
        }, (err, result) => {
            if (err) { return reject(err); }
            return resolve(result);
        });
    });
}

async function assertFunds(contract, expected) {
  for (const key of Object.keys(expected)) {
    const expValue = expected[key];
    const ret = await contract[key].call(ETH);
    const actual = web3.utils.fromWei(ret, "ether");
    assert.equal(expValue, actual, key);
  }
}

async function send(from, to, amountEth) {
  const value = web3.utils.toWei(amountEth.toString(), "ether");
  await web3.eth.sendTransaction({from, to, value});
}

async function roundBalance(address) {
  const balance = await web3.eth.getBalance(address);
  return Math.round(web3.utils.fromWei(balance, "ether"));
}

contract("FundraiserFactory", accounts => {
  it("should deploy", async () => {

	const factory = await FundraiserFactory.deployed();

    const deployer = accounts[0];
  	const sponsor = accounts[1];
  	const recipient = accounts[2];
    const donor = accounts[3];

    const now = Math.round(new Date().getTime() / 1000);
    const DURATION = 120;
    const expiration = now + DURATION;

    const result = await factory.newFundraiser(recipient, sponsor, expiration, {
        from: deployer,
        gas: 2000000
    });

    const log = result.logs[0].args;
  	const event = {
  		deployer: log[0],
  		recipient: log[1],
  		sponsor: log[2],
  		fundraiser: log[3],
  		grant: log[4]
  	};
    assert.equal(sponsor, event.sponsor);

    const fundraiser = await Fundraiser.at(event.fundraiser);
    const grant = await Grant.at(event.grant);

    await assertFunds(fundraiser, { tokenBalance: 0, raised: 0 })
    await assertFunds(grant, { tokenBalance: 0, sponsored: 0, matched: 0, refundable: 0 })

    await send(sponsor, event.grant, 30);
    await assertFunds(grant, { tokenBalance: 30, sponsored: 30, matched: 0, refundable: 30 })

    await send(accounts[3], event.fundraiser, 10);
    await assertFunds(fundraiser, { tokenBalance: 10, raised: 20 })
    await assertFunds(grant, { tokenBalance: 30, sponsored: 30, matched: 10, refundable: 20 })


    await send(accounts[4], event.fundraiser, 6);
    await assertFunds(fundraiser, { tokenBalance: 10 + 6, raised: 20 + 12})
    await assertFunds(grant, { tokenBalance: 30, sponsored: 30, matched: 10 + 6, refundable: 30 - 16 })

    assert.equal(false, await fundraiser.hasExpired());
    await advanceTime(DURATION + 1);
    assert.equal(true, await fundraiser.hasExpired());

    assert.equal(100 - 30, await roundBalance(sponsor));

    await grant.refund(ETH);
    await assertFunds(fundraiser, { tokenBalance: 16 + 16, raised: 32})
    await assertFunds(grant, { tokenBalance: 0, sponsored: 30, matched: 16, refundable: 0 })

    assert.equal(100 - 30 + 14, await roundBalance(sponsor));
    
  });
});
