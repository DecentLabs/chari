pragma solidity ^0.5.1;

import "./IERC20.sol";

contract DonationMatching {

    struct Grant {
        uint amount;
        uint refundDue;
        bool tallied;
    }
    
    address payable public sponsor;
    address payable public recipient;
    uint public expiration;

    address[] public tokens;

    mapping (address => Grant) public grantsByToken;

    constructor(address payable _recipient, uint _expiration) public {
        require(_expiration > now);
        require(_expiration < now + 365 days);
        sponsor = msg.sender;
        recipient = _recipient;
        expiration = _expiration;
    }
    
    // accept ETH transfers as donations
    function() external payable {
        require(msg.data.length == 0); // only allow plain transfers
    }

    function sponsorEther() external payable {
        storeGrant(address(0x0), msg.value);
    }

    function sponsorTokens(address token, uint amount) external {
        require(token != address(0x0));
        storeGrant(token, amount);
        IERC20(token).transferFrom(msg.sender, address(this), amount);
    }

    function storeGrant(address token, uint amount) private {
        require(amount > 0);
        require(sponsor == msg.sender);
        require(!hasExpired());
        Grant storage grant = grantsByToken[token];
        if (grant.amount == 0) {
            tokens.push(token);
        }
        grant.amount += amount;
    }

    function tally(address token) private returns (Grant storage) {
        require(hasExpired());
        Grant storage grant = grantsByToken[token];
        if (!grant.tallied) {
            uint total;
            if (token == address(0x0)) {
                total = address(this).balance;   
            } else {
                total = IERC20(token).balanceOf(address(this));
            }
            uint contrib = total - grant.amount;
            uint donation = min(contrib * 2, total);
            grant.refundDue = total - donation;   
            grant.tallied = true;
        }
        return grant;
    }

    function disburseDonation(address token) external {
        uint refundDue = tally(token).refundDue;
        if (token == address(0x0)) {
            recipient.transfer(address(this).balance - refundDue);
        } else {
            uint total = IERC20(token).balanceOf(address(this));
            IERC20(token).transfer(recipient, total - refundDue);
        }
    }

    function refundSponsor(address token) external {
        Grant storage grant = tally(token);
        uint refundDue = grant.refundDue;
        grant.refundDue = 0;
        if (token == address(0x0)) {
            sponsor.transfer(refundDue);   
        } else {
            IERC20(token).transfer(sponsor, refundDue);
        }
    }
    
    function hasExpired() public view returns (bool) {
        return now >= expiration;
    }
    
    function min(uint a, uint b) private pure returns (uint) {
        return a < b ? a : b;
    }
}
