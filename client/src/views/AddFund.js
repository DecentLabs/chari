import React from 'react';
import {connect} from 'react-redux'

import Fundraiser from 'shared/abis/Fundraiser.json';
import { Link } from 'react-router-dom';
import { setupWeb3 } from '../reducers/web3Connect';
import styles from './../styles/widgetEditor.module.css'

class AddFund extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            grantAddress: null,
        };
        this.fundraiserAddress = this.props.match.params.address
    }

    componentDidMount () {
        if (!this.props.isConnected) {
            this.props.dispatch(setupWeb3())
        } else {
            this.getGrantContract()
        }
    }

    async getGrantContract() {
        const fundraiserContract = new this.props.web3.eth.Contract(Fundraiser, this.fundraiserAddress);
        const grantAddress = await fundraiserContract.methods.grant().call();

        this.setState({grantAddress});
    }

    render () {
        return (
            <div>
                <h1 className="subtitle">Manage your fundraiser</h1>
                <h2 className="subtitle">Transfer the matching grant to this address:</h2>
                <p className="big strong">{this.state.grantAddress}</p>
                <Link to={`/campaign/${this.fundraiserAddress}/${this.props.networkId}/details/`} className={styles.backLink}>Back to fundraiser</Link>
            </div>
        );
    }
}


const mapStateToProps = state => ({
    web3: state.web3Connect.web3,
    isConnected: state.web3Connect.isConnected,
    networkId: state.web3Connect.networkId
});


export default connect(mapStateToProps)(AddFund)
