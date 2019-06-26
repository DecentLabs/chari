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

### create new campaign form
 * set up the campaign after entering the basic info (recipient address, expiration time)
 * sponsor deposits the funds (this could be a separate step if we support multiple sponsors)
 * the result is the address of the deployed contract, proceeding to the...

### campaign widget designer
 * set up a campaign widget that can be embedded into various sites (landing pages at the charity or sponsor, or others promoting it)
 * create a customized widget based on the contract address and some additional branding info (e.g. theme, localized labels, etc)
 * generates an embed code that can be pasted into the landing page

### campaign widget
 * embededd into an `iframe` into various sites
 * shows basic campaign info (sponsor matching amount, donations, time until expiration)
 * aft

### additional functions after expiration
 * button to disburse funds to the recipient
 * button to refund the sponsor (if budget is unused)


