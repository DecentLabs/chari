import React from 'react';
import {Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import FundraiserFactory from '../contracts/FundraiserFactory.json'
import {updateAddresses, updateContract, updateDeploying} from './../reducers/web3Connect.js'

import Button from './button.js'

class DeployButton extends React.Component {
    constructor (props) {
        super(props);
        this.deploy = this.deploy.bind(this);
    }

    deploy() {
        const {web3, recipient, expiration, account} = this.props;
        const abi = FundraiserFactory.abi;
        const contractAddress = FundraiserFactory.networks['4'].address;
        const contract = new web3.eth.Contract(abi, contractAddress);

        this.props.dispatch(updateContract(contract));

        if (web3.utils.isAddress(recipient) && typeof expiration === 'number' && expiration % 1 === 0) {
            const tx = contract.methods.deploy(recipient, account, expiration).send({
                from: account,
                gas: 2000000
            });


            tx.on('transactionHash', () => {
                this.props.dispatch(updateDeploying(true));
            })
            .then((receipt) => {
                const result = receipt.events.NewFundraiser.returnValues;
                const addresses = {
                    deployer: result[0],
                    recipient: result[1],
                    sponsor: result[2],
                    fundraiser: result[3],
                    grant: result[4]
                };
                this.props.dispatch(updateAddresses(addresses));
            })
        } else {
            throw "error: invalid recipient or expiration date"
        }

    }

    render() {
        const disabled = !this.props.web3;

        return (<div>
            <Button onClick={this.deploy} disabled={disabled}>Yes, let's do it!</Button>
            {this.props.isDeploying === true && (
                <Redirect to='/new/fund' />
            )}
        </div>)
    }
}

const mapStateToProps = state => ({
    web3: state.web3Connect.web3,
    recipient: state.web3Connect.recipient,
    expiration: state.web3Connect.expDate,
    account: state.web3Connect.accounts[0],
    fundraiser: state.web3Connect.fundraiser,
    isDeploying: state.web3Connect.isDeploying
});

export default connect(mapStateToProps)(DeployButton);
