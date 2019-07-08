import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'

import buttonStyles from '../styles/button.module.css'
import congratsStyles from '../styles/Congrats.module.css'
import Fundraiser from 'shared/abis/Fundraiser.json'
import Grant from 'shared/abis/Grant.json'
import Button from '../components/button.js'

import tick from '../assets/tick.svg'
import getWeb3 from '../utils/getWeb3';

import {NETWORKS} from '../shared/constants.js'


class CampaignDetails extends React.Component {
    constructor (props) {
        super(props)
        this.fundraiserAddress = props.match.params.address;
        this.state = {
            hasExpired: false,
            web3: null,
            fundraiserContract: null,
            ethAddress: "0x0000000000000000000000000000000000000000",
            grantContract: null
        }
        this.disburse = this.disburse.bind(this)
        this.refund = this.refund.bind(this)
    }

    componentDidMount () {
        this.getExpiration();
    }

    async getExpiration() {
        const web3 = await getWeb3();
        const fundraiserContract = new web3.eth.Contract(Fundraiser, this.fundraiserAddress)
        const hasExpired = await fundraiserContract.methods.hasExpired().call()
        const networkId = await web3.eth.net.getId();

        await fundraiserContract.methods.grant().call().then(grantAddress => {
            const grantContract = new web3.eth.Contract(Grant, grantAddress)
            this.setState({grantContract})
        });

        this.setState({hasExpired, web3, fundraiserContract, networkId})
    }

    async disburse() {
        const tokenAddress = this.getTokenAddress()
        const raised = await this.state.fundraiserContract.methods.raised(tokenAddress).call()

        if (!raised.isZero()) {
            this.state.fundraiserContract.methods.disburse(tokenAddress).call()

        }
    }

    async refund() {
        const tokenAddress = this.getTokenAddress()
        const refundable = await this.state.grantContract.methods.refundable(tokenAddress).call();

        if (!refundable.isZero()) {
            this.state.fundraiserContract.methods.refund(tokenAddress).call()
        }
    }

    async getTokenAddress() {
        const tokens = NETWORKS.get(this.state.networkId).tokens;
        let tokenAddress = '';

        for (let i = 0; i < tokens.length; i++) {
            const value = await this.state.grantContract.methods.sponsored(tokens[i].tokenAddress).call();
            if (!value.isZero()) {
                tokenAddress = value;
            }
        }

        return tokenAddress
    }

    render() {
        return (
            <div>
                <h1 className="subtitle">Manage your campaign</h1>

            {this.props.justDeployed && (
                <div>
                    <div className={congratsStyles.imgWrapper}><img src={tick}/></div>
                    <h2 className="subtitle">Congrats!</h2>
                    <p className="big">Your campaign has been successfully created on blockchain.</p>
                </div>
            )}

            {!this.state.hasExpired && (
                <div>
                    <p>Your contract address is:</p>
                    <p className="big strong">{this.fundraiserAddress}</p>
                    <div className={congratsStyles.buttonRow}>
                        <Link to={`/campaign/${this.fundraiserAddress}/admin`} className={buttonStyles.button}>Edit your
                            widget</Link>
                        <Link to={`/campaign/${this.fundraiserAddress}/addfund`} className={buttonStyles.button}>Grant as a
                            sponsor</Link>
                    </div>
                </div>
            )}

            {this.state.hasExpired && (
                <div>
                    <p className="big strong">{this.fundraiserAddress}</p>
                    <div className={congratsStyles.buttonRow}>
                        <Button onClick={this.disburse}>Disburse fund</Button>
                        <Button onClick={this.refund}>Refund grant</Button>
                    </div>
                </div>
            )}
            </div>

        );
    }
}

const mapStateToProps = state => ({
    web3: state.web3Connect.web3,
    justDeployed: state.web3Connect.justDeployed
})

export default connect(mapStateToProps)(CampaignDetails);
