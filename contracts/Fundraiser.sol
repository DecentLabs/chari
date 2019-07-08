pragma solidity ^0.5.1;

import "openzeppelin-solidity/contracts/token/ERC20/IERC20.sol";

contract Fundable {
    
    function() external payable {
        require(msg.data.length == 0); // only allow plain transfers
    }
    
    function tokenBalance(address token) public view returns (uint) {
        if (token == address(0x0)) {
            return address(this).balance;
        } else {
            return IERC20(token).balanceOf(address(this));
        }
    }
   
    function send(address payable to, address token, uint amount) internal {
        if (token == address(0x0)) {
            to.transfer(amount);
        } else {
            IERC20(token).transfer(to, amount);
        }
    }
}

contract Fundraiser is Fundable {
    address payable public recipient;
    uint public expiration;
    Grant public grant;
    mapping (address => uint) disbursed;

    constructor(address payable _recipient, address payable _sponsor, uint _expiration) public {
        require(_expiration > now);
        require(_expiration < now + 365 days);
        recipient = _recipient;
        expiration = _expiration;
        grant = new Grant(this, _sponsor);
    }

    function hasExpired() public view returns (bool) {
        return now >= expiration;
    }
    
    function raised(address token) external view returns (uint) {
        uint balance = tokenBalance(token);
        uint paid = disbursed[token];
        if (paid != 0) {
            return balance + paid;
        }
        return balance + grant.matched(token);
    }

    function disburse(address token) external {
        grant.tally(token);
        uint amount = tokenBalance(token);
        disbursed[token] += amount;
        send(recipient, token, amount);
    }

}

contract Grant is Fundable {
    struct Tally {
        uint sponsored;
        uint matched;
    }

    Fundraiser public fundraiser;
    address payable public sponsor; 
    mapping (address => Tally) tallied;
    
    constructor(Fundraiser _fundraiser, address payable _sponsor) public {
        fundraiser = _fundraiser;
        sponsor = _sponsor;
    }
    
    function refund(address token) external {
        tally(token);
        send(sponsor, token, tokenBalance(token));
    }

    function refundable(address token) external view returns (uint) {
        uint balance = tokenBalance(token);
        Tally storage t = tallied[token];
        return isTallied(t) ? balance : balance - matchable(token);
    }
    
    function sponsored(address token) external view returns (uint) {
        Tally storage t = tallied[token];
        return isTallied(t) ? t.sponsored : tokenBalance(token);
    }

    function matched(address token) external view returns (uint) {
        Tally storage t = tallied[token];
        return isTallied(t) ? t.matched : matchable(token);
    }
    
    function tally(address token) public {
        require(fundraiser.hasExpired());
        Tally storage t = tallied[token];
        if (!isTallied(t)) {
            t.sponsored = tokenBalance(token);
            t.matched = matchable(token);
            send(address(fundraiser), token, t.matched);
        }
    }
    
    // only valid before tally
    function matchable(address token) private view returns (uint) {
        uint donations = fundraiser.tokenBalance(token);
        uint granted = tokenBalance(token);
        return donations > granted ? granted : donations;
    }

    function isTallied(Tally storage t) private view returns (bool) {
        return t.sponsored != 0;
    }

}
