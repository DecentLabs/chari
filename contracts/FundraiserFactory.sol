pragma solidity ^0.5.1;

import "./Fundraiser.sol";

contract FundraiserFactory {

	event NewFundraiser(
		address indexed deployer,
		address indexed recipient,
		address indexed sponsor,
		Fundraiser fundraiser,
		Grant grant,
		uint expiration);
    
    function newFundraiser(address payable _recipient, address payable _sponsor, uint _expiration) public returns (Fundraiser fundraiser, Grant grant) {
        fundraiser = new Fundraiser(_recipient, _sponsor, _expiration);
        grant = fundraiser.grant();
        emit NewFundraiser(msg.sender, _recipient, _sponsor, fundraiser, grant, _expiration);
    }

}
