pragma solidity 0.5.1;

contract DonationMatching {
    
    address payable public sponsor;
    address payable public recipient;
    uint public expiration;
    uint public sponsoredAmount;
    uint public refundDueAmount;
    bool public paymentStarted;

    constructor(address payable _recipient, uint _expiration) public payable {
        require(msg.value > 0);
        require(_expiration > now);
        require(_expiration < now + 365 days);
        sponsor = msg.sender;
        sponsoredAmount = msg.value;
        recipient = _recipient;
        expiration = _expiration;
    }
    
    // accept ETH transfers as donations
    function() external payable {
        require(msg.data.length == 0); // only allow plain transfers
    }
    
    function isExpired() public view returns (bool) {
        return now >= expiration;
    }
    
    function disburseDonation() public {
        require(isExpired());
        tally();
        recipient.transfer(address(this).balance - refundDueAmount);
    }
    
    function refundSponsor() public {
        require(isExpired());
        tally();
        refundDueAmount = 0;
        sponsor.transfer(refundDueAmount);
    }
    
    function tally() private {
        if (!paymentStarted) {
            uint total = address(this).balance;
            uint donations = total - sponsoredAmount;
            uint disbursement = min(donations * 2, total);
            refundDueAmount = total - disbursement;   
            paymentStarted = true;
        }
    }
    
    function min(uint a, uint b) private pure returns (uint) {
        return a < b ? a : b;
    }

}
