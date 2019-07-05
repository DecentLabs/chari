# 💸 Charity Donation Matching on Ethereum

UI components and an Ethereum smart contract to support donation matching. A charity could easily embed this as a widget into their sites.

## Basic flow
An initial sponsor deposits funds for the matching budget, specifies the recipient (the charity) and an expiration time for the campaign. Donors can contribute until expiration. If the matching budget is reached, funds are transferred to the recipient. If the budget is not fully matched until expiration, remaining budget is released to initial sponsor, the rest is transferred to recipient.

## Further ideas
* Find charities/sponsors/donors and complete a campaign during the Hackathon
* Social media sharing features.
* Support both ETH and ERC20 donations.
* Support matching ratios other than 1:1. 
* Support multiple sponsors contributing to the budget (increasing the matching ratio).
* Track referrals, so sponsors and donors can see the impact of their shares / promotional campaigns.
* Issue unique NFT rewards for donors.


## Basic UI elements 

### create new campaign

#### Step 1
 * set up the campaign by entering basic information: recipient (charity) address, expiration time
 * sign the transaction with your wallet
 * wait for transaction confirmation
 * the transaction created a grant and a donation contract; 

### Step 2
 * transfer the sponsored amount (ETH or a supported list of ERC20) to the grant contract created by Step1;
 * remind the sponsor, where the sponsored amount may be refunded;

### Step 3
 * The campaign is ready to launch. We go to the administration page, that the user should bookmark.
 * Donations are expected to be sent to the donation contract;

### campaign adminstrator page: new campaign
 * for a new campaign, show the widget designer (and the actual widget)
 * set up a campaign widget that can be embedded into various sites (landing pages at the charity or sponsor, or others promoting it)
 * create a customized widget based on the contract address and some additional branding info (e.g. theme, localized labels, etc)
 * generates an embed code that can be pasted into the landing page

### campaign administrator page: completed
 * after expiration date, show this variant
 * button to disburse funds to the recipient
 * button to refund the sponsor (if budget is unused)

### campaign widget
 * embededd into an `iframe` into various sites
 * shows basic campaign info (sponsor matching amount, donations, time until expiration)
 * has a "contribute to campaign" button that leads into the payment scenario, which could be:
   * if we detect a web3 wallet, unlock and create transaction
   * if not in a web3 browser, use portis.io
   * or just show a transfer address / QR code
 * we could show a "powered by Chari" tag


# Development

[![Build Status](https://travis-ci.org/DecentLabs/DonationMatching.svg?branch=master)](https://travis-ci.org/DecentLabs/DonationMatching)

## install everything
```
npm run update
```

## Contracts

```
npm run test
```

If you change anything here or in the "shared" package, you should run ```npm run update```!


## Frontend client

```
npm run update
cd widget
yarn dev
```
in another terminal:
```
cd client
yarn start
```

## Widget
```
npm run update
cd widget
yarn dev
```
