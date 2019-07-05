import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'

import buttonStyles from '../styles/button.module.css'
import congratsStyles from '../styles/Congrats.module.css'


class Congrats extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            fundraiser: null,
            sponsor: null,
            grant: null
        };
        // this.sponsorSend = this.sponsorSend.bind(this)
    }

    componentDidMount () {
    }

    render () {
        return (
            <div>
                <h1 className="subtitle">Congrats!</h1>
                <p className="big">Your campaign has been successfully created on blockchain.</p>
                <p className="big strong">{this.props.fundraiser}</p>
                <div className={congratsStyles.buttonRow}>
                    <Link to='/campaign/admin' className={buttonStyles.button}>Edit your widget</Link>
                    <Link to='/campaign/addfund' className={buttonStyles.button}>Grant as a sponsor</Link>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    fundraiser: state.web3Connect.fundraiser,
});

export default connect(mapStateToProps)(Congrats);
