import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'

import buttonStyles from '../styles/button.module.css'
import congratsStyles from '../styles/Congrats.module.css'
import Fundraiser from 'shared/abis/Fundraiser.json'
import Button from '../components/button.js'

import tick from '../assets/tick.svg'
import getWeb3 from '../utils/getWeb3';


class CampaignDetails extends React.Component {
    constructor (props) {
        super(props)
        this.fundraiserAddress = props.match.params.address;
        this.state = {
            hasExpired: false
        }
    }

    componentDidMount () {
        this.getExpiration();
    }

    async getExpiration() {
        const web3 = await getWeb3();

        const fundraiserContract = new web3.eth.Contract(Fundraiser, this.fundraiserAddress)
        const hasExpired = await fundraiserContract.methods.hasExpired().call()
        this.setState({hasExpired})
    }

    render() {
        console.log(this.props.isDeployed)

        return (
            <div>
                <h1 className="subtitle">Manage your campaign</h1>

            {this.props.isDeployed && (
                <div>
                    <div className={congratsStyles.imgWrapper}><img src={tick}/></div>
                    <h2 className="subtitle">Congrats!</h2>
                    <p className="big">Your campaign has been successfully created on blockchain.</p>
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

            {!this.state.hasExpired && (
                <div>
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
                        <Button>Disburse fund</Button>
                        <Button>Refund grant</Button>
                    </div>
                </div>
            )}
            </div>

        );
    }
}

const mapStateToProps = state => ({
    web3: state.web3Connect.web3,
    isDeployed: state.web3Connect.isDeployed
})

export default connect(mapStateToProps)(CampaignDetails);
