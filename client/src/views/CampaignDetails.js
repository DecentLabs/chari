import React from 'react';
import { connect } from 'react-redux';

import campaignStyles from '../styles/Campaign.module.css';
import Fundraiser from 'shared/abis/Fundraiser.json';

import ExpiredCampaign from './ExpiredCampaign.js';
import CurrentCampaign from './CurrentCampaign.js';

import tick from '../assets/tick.svg';
import { setupWeb3 } from '../reducers/web3Connect';
import LoaderComp from '../components/loaderComp';
import Button from '../components/button.js'

class CampaignDetails extends React.Component {
    constructor (props) {
        super(props);
        this.fundraiserAddress = props.match.params.address;
        this.networkId = this.props.match.params.networkId;
        this.token = this.props.match.params.token;
        this.state = {
            color: this.props.match.params.color,
            theme: this.props.match.params.theme,
            token: this.props.match.params.token,
            address: this.props.match.params.address,
            networkId: this.props.match.params.networkId,
            isLoading: true,
            hasExpired: false,
            fundraiserContract: null
        };
        this.hideCongrats = this.hideCongrats.bind(this);
    }

    componentDidMount () {
        if (!this.props.isConnected) {
            this.props.dispatch(setupWeb3());
        } else {
            this.getExpiration();
        }
    }

    hideCongrats() {
        this.props.dispatch({type: 'DEPLOY_FINISH'})
    }

    async getExpiration () {
        const fundraiserContract = new this.props.web3.eth.Contract(Fundraiser, this.fundraiserAddress);
        const hasExpired = await fundraiserContract.methods.hasExpired().call();

        this.setState({
            hasExpired,
            fundraiserContract,
            isLoading: false
        });
    }

    render () {
        const {address, networkId, color, theme, token} = this.state;
        const title = this.props.justDeployed ? 'Congrats!' : 'Manage your fundraiser';
        return (
            <div>
                <h1 className="subtitle">{title}</h1>

                {this.state.isLoading && (<LoaderComp subtitle="none"/>)}

                {!this.state.isLoading && (
                  <div>
                    {this.props.justDeployed && (
                        <div className={[campaignStyles.centerColumn, campaignStyles.padding].join(' ')}>
                            <img src={tick} alt="success"/>
                            <p className="big">Your campaign has been successfully created on blockchain.</p>
                            <p className={campaignStyles.disclaimer}>Bookmark this page to manage your fundraiser later on.</p>
                            <div className={campaignStyles.centerRow}>
                                <Button onClick={this.hideCongrats}>Manage your fundraiser</Button>
                            </div>
                        </div>
                    )}

                    <div>
                      {!this.props.justDeployed && !this.state.hasExpired && (
                          <CurrentCampaign address={address} networkId={networkId} color={color} theme={theme} token={token}/>
                      )}

                      {!this.props.justDeployed && this.state.hasExpired && (
                          <ExpiredCampaign fundraiserAddress={this.fundraiserAddress}
                                           fundraiserContract={this.state.fundraiserContract}/>
                      )}
                    </div>
                  </div>
                )}
            </div>

        );
    }
}

const mapStateToProps = state => ({
    web3: state.web3Connect.web3,
    isConnected: state.web3Connect.isConnected,
    justDeployed: state.web3Connect.justDeployed,
});

export default connect(mapStateToProps)(CampaignDetails);
