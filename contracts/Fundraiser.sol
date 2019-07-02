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

    function disburse(address token) public {
        grant.tally(token);
        send(recipient, token, tokenBalance(token));
    }
}

contract Grant is Fundable {
    Fundraiser public fundraiser;
    address payable public sponsor; 
    mapping (address => bool) public tallied;
    
    constructor(Fundraiser _fundraiser, address payable _sponsor) public {
        fundraiser = _fundraiser;
        sponsor = _sponsor;
    }
    
    function refund(address token) public {
        tally(token);
        send(sponsor, token, tokenBalance(token));
    }

    function tally(address token) public {
        require(fundraiser.hasExpired());
        if (!tallied[token]) {
            uint raised = fundraiser.tokenBalance(token);
            uint grant = tokenBalance(token);
            tallied[token] = true;
            send(address(fundraiser), token, raised > grant ? grant : raised);
        }
    }
}