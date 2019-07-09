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
            refundTokens: [],
            disburseTokens: []
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
            this.getRefundTokens()
            this.getDisburseTokens()
        } else {
            this.getRefundTokens()
            this.getDisburseTokens()
        }
    }

    async getDisburseTokens () {
        const tokens = NETWORKS.get(this.props.networkId).tokens;
        let disburseTokens = [];

        for (let i = 0; i < tokens.length; i++) {
            const raised = await this.props.fundraiserContract.methods.raised(tokens[i].tokenAddress).call();

            if (!raised.isZero()) {
                disburseTokens.push(tokens[i])
            }
        }

        this.setState({disburseTokens})
    }

    async refund (tokenAddress) {
        const tx = await this.state.grantContract.methods.refund(tokenAddress).send({
            from: this.props.account,
            gas: 1000000,
        });
    }

    async disburse(tokenAddress) {
        const tx = await this.props.fundraiserContract.methods.disburse(tokenAddress).send({
            from: this.props.account,
            gas: 1000000,
        });
    }

    async getRefundTokens () {
        const tokens = NETWORKS.get(this.props.networkId).tokens;
        let refundTokens = []

        for (let i = 0; i < tokens.length; i++) {
            const refundable = await this.state.grantContract.methods.refundable(tokens[i].tokenAddress).call();

            if (!refundable.isZero()) {
                refundTokens.push(tokens[i])
            }
        }

        this.setState({refundTokens})
    }

    render () {
        return (
            <div>
                <p>Your contract's address is:</p>
                <p className="big strong">{this.props.fundraiserAddress}</p>

                {this.state.disburseTokens.map(i => (
                    <div>
                    <Button margin={true} onClick={() => this.disburse(i.tokenAddress)}>Disburse raised fund in {i.token}</Button>
                    </div>
                ))}
                {this.state.refundTokens.map(i => (
                    <Button margin={true} onClick={() => this.refund(i.tokenAddress)}>Refund grant in {i.token}</Button>
                ))}
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
