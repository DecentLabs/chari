import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'

import buttonStyles from '../styles/button.module.css'
import congratsStyles from '../styles/Congrats.module.css'
import Fundraiser from '../contracts/Fundraiser.json'

import tick from '../assets/tick.svg'
import { setupWeb3 } from './../reducers/web3Connect.js';
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

        const fundraiserContract = new web3.eth.Contract(Fundraiser.abi, this.fundraiserAddress)
        const hasExpired = await fundraiserContract.methods.hasExpired().call()
        this.setState({hasExpired})
    }

    render() {
        return (
            <div>
                <div className={congratsStyles.imgWrapper}><img src={tick}/></div>
                <h1 className="subtitle">Congrats!</h1>
                <p className="big">Your campaign has been successfully created on blockchain.</p>
                <p className="big strong">{this.fundraiserAddress}</p>
                <div className={congratsStyles.buttonRow}>
                    <Link to={`/campaign/admin/${this.fundraiserAddress}`} className={buttonStyles.button}>Edit your
                        widget</Link>
                    <Link to={`/campaign/addfund/${this.fundraiserAddress}`} className={buttonStyles.button}>Grant as a
                        sponsor</Link>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    web3: state.web3Connect.web3
})

export default connect(mapStateToProps)(CampaignDetails);
