import React from 'react';
import { connect } from 'react-redux';
import congratsStyles from '../styles/Congrats.module.css';
import Grant from 'shared/abis/Grant.json';
import Button from '../components/button.js';

import { NETWORKS } from '../shared/constants.js';

class ExpiredCampaign extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            grantContract: null,
            account: null,
        };
        this.disburse = this.disburse.bind(this);
        this.refund = this.refund.bind(this);
    }

    async componentDidMount () {
        if (!this.state.grantContract) {
            await this.props.fundraiserContract.methods.grant().call().then(grantAddress => {
                const grantContract = new this.props.web3.eth.Contract(Grant, grantAddress);
                this.setState({grantContract});
            });
        }
    }

    async disburse () {
        const tokenAddress = await this.getTokenAddress();
        const raised = await this.props.fundraiserContract.methods.raised(tokenAddress).call();

        if (!raised.isZero()) {
            const tx = this.props.fundraiserContract.methods.disburse(tokenAddress).send({
                from: this.props.account,
                gas: 1000000,
            });

            console.log(tx, 'disburse');
        }
    }

    async refund () {
        const tokenAddress = await this.getTokenAddress();
        const refundable = await this.state.grantContract.methods.refundable(tokenAddress).call();

        if (!refundable.isZero()) {
            const tx = await this.state.grantContract.methods.refund(tokenAddress).send({
                from: this.props.account,
                gas: 1000000,
            });
            console.log(tx, 'refund');
        }
    }

    async getTokenAddress () {
        const tokens = NETWORKS.get(this.props.networkId).tokens;
        let tokenAddress = '';

        for (let i = 0; i < tokens.length; i++) {
            const value = await this.state.grantContract.methods.sponsored(tokens[i].tokenAddress).call();
            if (!value.isZero()) {
                tokenAddress = tokens[i].tokenAddress;
            }
        }

        return tokenAddress;
    }

    render () {
        return (
            <div>
                <p>Your contract's address is:</p>
                <p className="big strong">{this.props.fundraiserAddress}</p>
                <div className={congratsStyles.buttonRow}>
                    <Button margin={true} onClick={this.disburse}>Disburse fund</Button>
                    <Button margin={true} onClick={this.refund}>Refund grant</Button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    web3: state.web3Connect.web3,
    account: state.web3Connect.accounts[0],
    networkId: state.web3Connect.networkId,
});

export default connect(mapStateToProps)(ExpiredCampaign);
