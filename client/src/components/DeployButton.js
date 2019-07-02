import React from 'react';
import DonationMatchingJSON from '../contracts/DonationMatching.json'
import { connect } from 'react-redux'

import styles from './../styles/button.module.css'
import Button from './button.js'

class DeployButton extends React.Component {
    constructor (props) {
        super(props);
        this.state = {contract: null};
        this.deploy = this.deploy.bind(this);
    }

    deploy(e) {
        // todo move to store
        e.preventDefault()
        const abi = DonationMatchingJSON.abi;
        const byteCode = DonationMatchingJSON.bytecode;
        const {web3, recipient, expiration} = this.props.web3Connect

        const contract = new web3.eth.Contract(abi);
        const tx = contract.deploy({data: byteCode, arguments: [recipient, expiration]}).send({
            from: this.props.account,
            gas: 2000000
        });
        tx.then((newContractInstance) => {
            this.setState({
                contract: newContractInstance
            })
        })
    }

    render() {
        const {contract} = this.state
        const disabled = !this.props.web3Connect.web3

        return (<div>
            <Button onClick={this.deploy} disabled={disabled}>Yes, let's do it!</Button>
            {contract && (<p>
                {contract.options.address}
            </p>)}
        </div>)
    }
}

const mapStateToProps = state => ({
    web3Connect: state.web3Connect
});

export default connect(mapStateToProps)(DeployButton);
