# Chari: Donation Matching on Ethereum

Chari provides an Ethereum smart contract and UI components to support donation matching campaigns.

For an overview and the live application see https://chari.io/

## Overview
A new fundraiser can be created by specifying the recipient (the charity), the sponsor's refund address and an expiration time for the campaign. The sponsor deposits funds for the matching budget with a simple transfer.

A customizable fundraiser widget can easily be embedded into landing pages promoting the campaign.

Donors can contribute until expiration (also with a simple transfer, no dApp browser is required). If the budget is not fully matched when the campaign ends, the remaining budget is released to the initial sponsor. The rest is transferred to the recipient.

* Smart contract is deployed on the Ethereum mainnet as well as the Ropsten and Rinkeby testnets.
* Supports fundraisers with ETH and any ERC20 token.
* Integrates the portis.io wallet for a straightforward UX. MetaMask and other dApp browsers are supported too.

## Some ideas for further development
* Support matching ratios other than 1:1. 
* Support multiple sponsors contributing to the budget (increasing the matching ratio).
* Track referrals, so sponsors and donors can see the impact of their shares / promotional campaigns.
* Issue unique NFT rewards for donors.
* Social media sharing features.


# Contributors

* @brigittaforrai – frontend, design
* @dfogaras – smart contract development
* @juli_e – frontend
* @krystianzun – design
* @phraktle – a bit of everything
* @rszaloki – frontend
* @treerz – testing, review


# Development

[![Build Status](https://travis-ci.org/DecentLabs/chari.svg?branch=master)](https://travis-ci.org/DecentLabs/chari)

Note: run these commands in the repository root, unless stated otherwise. 

## install everything
```
yarn install
```


## build everything
```
yarn build
```

## clean generated files
```
yarn clean
```

## clean node modules folders
```
yarn clean:modules
```

## Contracts

```
yarn build:contracts
```

## Frontend

You should run `yarn build:contracts` to generate the contract abis!

### client
```
yarn run:client
```
in another terminal:
```
yarn run:client
```

### Widget
```
yarn run:widget
```

---
The repository is using the workspace feature of yarn. 
You can find more information here:

https://yarnpkg.com/lang/en/docs/workspaces/

https://yarnpkg.com/en/docs/cli/workspace

https://yarnpkg.com/en/docs/cli/workspaces
