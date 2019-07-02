import React from 'react';
import { connect } from 'react-redux'
import FundraiserFactory from '../contracts/FundraiserFactory.json'

import styles from './../styles/button.module.css'
import Button from './button.js'

class DeployButton extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            sponsor: null,
            fundraiser: null,
            grant: null
        };
        this.deploy = this.deploy.bind(this);
    }

    deploy() {
        const {web3, recipient, expiration, account} = this.props;
        const abi = FundraiserFactory.abi;
        const contractAddress = FundraiserFactory.networks['4'].address;
        const contract = new web3.eth.Contract(abi, contractAddress);

        console.log(recipient, expiration)

        if (web3.utils.isAddress(recipient) && typeof expiration === 'number' && expiration % 1 === 0) {
            const tx = contract.methods.deploy(recipient, account, expiration).send({
                from: account,
                gas: 2000000
            });

            console.log(tx)

            tx.then((receipt) => {
                const result = receipt.events.NewFundraiser.returnValues;
                this.setState({
                    sponsor: result[2],
                    fundraiser: result[3],
                    grant: result[4]
                })
            })
        } else {
            throw "error: invalid recipient or expiration date"
        }

    }

    render() {
        const disabled = !this.props.web3
        const {fundraiser} = this.state;

        return (<div>
            <Button onClick={this.deploy} disabled={disabled}>Yes, let's do it!</Button>
            <p>{fundraiser}</p>
        </div>)
    }
}

const mapStateToProps = state => ({
    web3: state.web3Connect.web3,
    recipient: state.web3Connect.recipient,
    expiration: state.web3Connect.expDate,
    account: state.web3Connect.accounts[0]
});

export default connect(mapStateToProps)(DeployButton);
