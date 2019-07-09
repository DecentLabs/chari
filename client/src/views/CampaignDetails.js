import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import buttonStyles from '../styles/button.module.css';
import congratsStyles from '../styles/Congrats.module.css';
import Fundraiser from 'shared/abis/Fundraiser.json';
import ExpiredCampaign from './ExpiredCampaign.js';
import CurrentCampaign from './CurrentCampaign.js';

import tick from '../assets/tick.svg';
import { setupWeb3 } from '../reducers/web3Connect';

class CampaignDetails extends React.Component {
    constructor (props) {
        super(props)
        this.fundraiserAddress = props.match.params.address;
        this.state = {
            hasExpired: false,
            fundraiserContract: null,
        }
    }

    componentDidMount () {
        if (!this.props.isConnected) {
            this.props.dispatch(setupWeb3())
        } else {
            this.getExpiration();
        }
    }

    async getExpiration() {
        const fundraiserContract = new this.props.web3.eth.Contract(Fundraiser, this.fundraiserAddress)
        const hasExpired = await fundraiserContract.methods.hasExpired().call()

        this.setState({
            hasExpired,
            fundraiserContract,
        })
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
                <CurrentCampaign fundraiserAddress={this.fundraiserAddress}/>
            )}

            {this.state.hasExpired && (
                <ExpiredCampaign fundraiserAddress={this.fundraiserAddress} fundraiserContract={this.state.fundraiserContract} />
            )}
            </div>

        );
    }
}

const mapStateToProps = state => ({
    web3: state.web3Connect.web3,
    isConnected: state.web3Connect.isConnected,
    justDeployed: state.web3Connect.justDeployed,

})

export default connect(mapStateToProps)(CampaignDetails);
