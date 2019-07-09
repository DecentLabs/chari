const FundraiserFactory = artifacts.require("FundraiserFactory");
const Fundraiser = artifacts.require("Fundraiser");
const Grant = artifacts.require("Grant");

const ETH = "0x0000000000000000000000000000000000000000";
const DURATION = 120;


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

async function newFundraiser(accounts) {
  const factory = await FundraiserFactory.deployed();
  const deployer = accounts[0];
  const sponsor = accounts[1];
  const recipient = accounts[2];
  const donor = accounts[3];

  const now = Math.round(new Date().getTime() / 1000);
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
  return event;
}

contract("Fundraiser", accounts => {
  it("grant first disburse later", async () => {
    const event = await newFundraiser(accounts);
    const fundraiser = await Fundraiser.at(event.fundraiser);
    const grant = await Grant.at(event.grant);
    const sponsor = event.sponsor;
    const recipient = event.recipient;

    var expFundraiser = { tokenBalance: 0, raised: 0 };
    var expGrant = { tokenBalance: 0, sponsored: 0, matched: 0, refundable: 0 };
    var expSponsor = 100;
    var expRecipient = 100;
    await assertFunds(fundraiser, expFundraiser);
    await assertFunds(grant, expGrant);

    await send(sponsor, event.grant, 30);
    expSponsor -= 30;
    expGrant['tokenBalance'] += 30;
    expGrant['sponsored'] += 30;
    expGrant['refundable'] += 30;
    await assertFunds(fundraiser, expFundraiser);
    await assertFunds(grant, expGrant);

    await send(accounts[3], event.fundraiser, 10);
    expFundraiser['tokenBalance'] += 10;
    expFundraiser['raised'] += 2 * 10;
    expGrant['refundable'] -= 10;
    expGrant['matched'] += 10;
    await assertFunds(fundraiser, expFundraiser);
    await assertFunds(grant, expGrant);

    await send(accounts[4], event.fundraiser, 6);
    expFundraiser['tokenBalance'] += 6;
    expFundraiser['raised'] += 2 * 6;
    expGrant['refundable'] -= 6;
    expGrant['matched'] += 6;
    await assertFunds(fundraiser, expFundraiser);
    await assertFunds(grant, expGrant);

    assert.equal(false, await fundraiser.hasExpired());
    await advanceTime(DURATION + 1);
    assert.equal(true, await fundraiser.hasExpired());


    assert.equal(expSponsor, await roundBalance(sponsor));
    await grant.refund(ETH);
    const refund = expGrant['refundable'];
    expFundraiser['tokenBalance'] += expGrant['matched'];
    expGrant['refundable'] = 0;
    expGrant['tokenBalance'] = 0
    expSponsor += refund;
    assert.equal(expSponsor, await roundBalance(sponsor));
    await assertFunds(fundraiser, expFundraiser);
    await assertFunds(grant, expGrant);

    assert.equal(expRecipient, await roundBalance(recipient));
    await fundraiser.disburse(ETH);
    expRecipient += expFundraiser['tokenBalance']
    expFundraiser['tokenBalance'] = 0;
    await assertFunds(fundraiser, expFundraiser)
    await assertFunds(grant, expGrant)
    assert.equal(expRecipient, await roundBalance(recipient));

    await fundraiser.disburse(ETH);
    await grant.refund(ETH);
    await assertFunds(fundraiser, expFundraiser)
    await assertFunds(grant, expGrant)
    assert.equal(expRecipient, await roundBalance(recipient));
    assert.equal(expSponsor, await roundBalance(sponsor));
  });
});
