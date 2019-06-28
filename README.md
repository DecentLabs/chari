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

### Step 2
 * enter amount
 * select a currency you want to sponsor in (ETH and a predefined list of ERC20 tokens)
 * inform the user if the currency needs authorizaton (most ERC20 tokens will). user signs tx, waits for confirmation.
 * after authorization, call the sponsorship transaction (transfering the funds). user signs tx, waits for confirmation.

### Step 3
 * The campaign is ready to launch. We go to the administration page, that the user should bookmark.

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

## Contracts

```
npm install truffle -g
npm install
truffle test
```

## Frontend

```
truffle compile
cd client
yarn install
yarn start
```
