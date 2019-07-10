import React from 'react';
import { connect } from 'react-redux';
import LoaderComp from './../components/loaderComp.js';
import Grant from 'shared/abis/Grant.json';
import Button from '../components/button.js';
import campaignStyles from '../styles/Campaign.module.css';
import { NETWORKS } from 'shared/constants.js';

class ExpiredCampaign extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            grantContract: null,
            account: null,
            refundTokens: [],
            disburseTokens: [],
            transactionPending: false
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
            this.getRefundTokens();
            this.getDisburseTokens();
        } else {
            this.getRefundTokens();
            this.getDisburseTokens();
        }
    }

    async getDisburseTokens () {
        const tokens = NETWORKS.get(this.props.networkId).tokens;
        let disburseTokens = [];

        for (let i = 0; i < tokens.length; i++) {
            const balance = await this.props.fundraiserContract.methods.tokenBalance(tokens[i].tokenAddress).call();

            if (!balance.isZero()) {
                disburseTokens.push(tokens[i]);
            }
        }

        this.setState({disburseTokens});
    }

    async disburse (tokenAddress) {
        this.setState({transactionPending: true})

        await this.props.fundraiserContract.methods.disburse(tokenAddress).send({
            from: this.props.account,
            gas: 1000000,
        }).on('error', () => {
            this.setState({transactionPending: false})
        }).then(() => {
            this.getDisburseTokens()
            this.setState({transactionPending: false})
        })
    }

    async getRefundTokens () {
        const tokens = NETWORKS.get(this.props.networkId).tokens;
        let refundTokens = [];

        for (let i = 0; i < tokens.length; i++) {
            const refundable = await this.state.grantContract.methods.refundable(tokens[i].tokenAddress).call();

            if (!refundable.isZero()) {
                refundTokens.push(tokens[i]);
            }
        }

        this.setState({refundTokens});
    }

    async refund (tokenAddress) {
        this.setState({transactionPending: true})

        this.state.grantContract.methods.refund(tokenAddress).send({
            from: this.props.account,
            gas: 1000000,
        }).on('error', () => {
            this.setState({transactionPending: false})
        }).then(() => {
            this.getRefundTokens()
            this.setState({transactionPending: false})
        })
    }

    render () {
        return (
            <div>
                <h2 className="subtitle">Your campaign has ended.</h2>
                {this.state.transactionPending && (
                    <LoaderComp/>
                )}
                {!this.state.transactionPending && (
                    <div className={campaignStyles.centerRow}>
                        {this.state.disburseTokens.length > 0 && (
                            <div className={campaignStyles.halfColumn}>
                                <p>If you woud like to disburse funds  to the charity, click here</p>
                                {this.state.disburseTokens.map(i => (
                                    <div className={campaignStyles.button}>
                                        <Button margin={true} onClick={() => this.disburse(i.tokenAddress)}>Disburse funds
                                            in {i.token}</Button>
                                    </div>
                                ))}
                            </div>
                        )}
                        {this.state.refundTokens.length > 0 && (
                            <div className={campaignStyles.halfColumn}>
                                <p>If the budget has not been used,  you can refund funds to the sponsor</p>
                                {this.state.refundTokens.map(i => (
                                    <div className={campaignStyles.button}>
                                    <Button margin={true} onClick={() => this.refund(i.tokenAddress)}>Refund the sponsor in {i.token}</Button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
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
