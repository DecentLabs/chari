import React from 'react';
import FundraiserFactory from '../contracts/FundraiserFactory.json'


export default class DeployButton extends React.Component {
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
        const abi = FundraiserFactory.abi;
        const contractAddress = FundraiserFactory.networks['4'].address;
        const web3 = this.props.web3;
        const contract = new web3.eth.Contract(abi, contractAddress);
        const {recipient, expiration, account} = this.props;

        if (web3.utils.isAddress(recipient) && typeof expiration === 'number' && expiration % 1 === 0) {
            const tx = contract.methods.deploy(recipient, account, expiration).send({
                from: account,
                gas: 2000000
            });

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
        const {fundraiser} = this.state;

        return (<div>
            <button onClick={this.deploy}>Deploy Contract</button>
            {<p>{fundraiser}</p>}
        </div>)
    }
}