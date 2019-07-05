import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'

import buttonStyles from '../styles/button.module.css'
import congratsStyles from '../styles/Congrats.module.css'

import tick from '../assets/tick.svg'

const Congrats = (props) => {
    const fundraiserAddress = props.fundraiser || props.match.params.address;

    return (
        <div>
            <div className={congratsStyles.imgWrapper}><img src={tick}/></div>
            <h1 className="subtitle">Congrats!</h1>
            <p className="big">Your campaign has been successfully created on blockchain.</p>
            <p className="big strong">{fundraiserAddress}</p>
            <div className={congratsStyles.buttonRow}>
                <Link to={`/campaign/admin/${fundraiserAddress}`}  className={buttonStyles.button}>Edit your widget</Link>
                <Link to={`/campaign/addfund/${fundraiserAddress}`} className={buttonStyles.button}>Grant as a sponsor</Link>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    fundraiser: state.web3Connect.fundraiser,
});

export default connect(mapStateToProps)(Congrats);
