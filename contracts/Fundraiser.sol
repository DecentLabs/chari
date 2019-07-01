pragma solidity 0.5.1;

import "openzeppelin-solidity/blob/master/contracts/token/ERC20/IERC20.sol";

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
   
   function send(address payable destionation, address token, uint amount) internal {
       if (token == address(0x0)) {
           destionation.transfer(amount);
       } else {
           IERC20(token).transfer(destionation, amount);
       }
   }
}

contract DonationMatching is Fundable {
    address payable public recipient;
    uint public expiration;
    Grant public grant;

    constructor(address payable _recipient, uint _expiration) public {
        require(_expiration > now);
        require(_expiration < now + 365 days);
        recipient = _recipient;
        expiration = _expiration;
        grant = new Grant(this, msg.sender);
    }

    function hasExpired() public view returns (bool) {
        return now >= expiration;
    }

    function disburse(address token) public {
        require(hasExpired());
        grant.tally(token);
        send(recipient, token, tokenBalance(token));
    }
}

contract Grant is Fundable {
    DonationMatching public donation_matching;
    address payable public sponsor; 
    mapping (address => bool) public tallied;
    
    constructor(DonationMatching _donation_matching, address payable _sponsor) public {
        donation_matching = _donation_matching;
        sponsor = _sponsor;
    }
    
    function refund(address token) public {
        require(donation_matching.hasExpired());
        tally(token);
        send(sponsor, token, tokenBalance(token));
    }

    function tally(address token) public {
        require(donation_matching.hasExpired());
        if (!tallied[token]) {
            uint raised = donation_matching.tokenBalance(token);
            uint grant = tokenBalance(token);
            tallied[token] = true;
            send(address(donation_matching), token, raised > grant ? grant : raised);
        }
    }
}
