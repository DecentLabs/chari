pragma solidity 0.5.1;

contract DonationMatching {
    
    address payable public sponsor;
    address payable public recipient;
    uint public expiration;
    uint public sponsoredAmount;
    uint public disbursedAmount;
    uint public refundedAmount;
    
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
        require(!isExpired());
        // note: we intentionally accept donations exceeding sponsoredAmount
    }
    
    function isExpired() public view returns (bool) {
        return now >= expiration;
    }
    
    function disburseDonation() public {
        require(isExpired());
        require(disbursedAmount == 0);
        uint total = address(this).balance + refundedAmount;
        uint donations = total - sponsoredAmount;
        disbursedAmount = min(sponsoredAmount + donations, donations * 2);
        recipient.transfer(disbursedAmount);
    }
    
    function refundSponsor() public {
        require(isExpired());
        require(refundedAmount == 0);
        uint total = address(this).balance + disbursedAmount;
        uint donations = total - sponsoredAmount;
        refundedAmount = donations >= sponsoredAmount ? 0 : sponsoredAmount - donations;
        sponsor.transfer(refundedAmount);
    }
    
    function min(uint a, uint b) private pure returns (uint) {
        return a < b ? a : b;
    }

}
