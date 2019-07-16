import React from 'react';
import {connect} from 'react-redux'

import Fundraiser from 'shared/abis/Fundraiser.json';
import { Link } from 'react-router-dom';
import { setupWeb3 } from '../reducers/web3Connect';
import styles from './../styles/widgetEditor.module.css'
import { makeClientUrl } from '../utils/makeUrl.js'

class AddFund extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            grantAddress: null,
            color: this.props.match.params.color,
            theme: this.props.match.params.theme,
            token: this.props.match.params.token,
            address: this.props.match.params.address,
            networkId: this.props.match.params.networkId,
            iframeLoading: true,
            showColorSelector: false,
        };
    }

    componentDidMount () {
        if (!this.props.isConnected) {
            this.props.dispatch(setupWeb3())
        } else {
            this.getGrantContract()
        }
    }

    async getGrantContract() {
        const fundraiserContract = new this.props.web3.eth.Contract(Fundraiser, this.state.address);
        const grantAddress = await fundraiserContract.methods.grant().call();

        this.setState({grantAddress});
    }

    render () {
        const {address, networkId, color, theme, token} = this.state;
        if(this.props.networkId === parseInt(networkId,10)) {
            return (
                <div>
                    <h1 className="subtitle">Manage your fundraiser</h1>
                    <h2 className="subtitle">Transfer the matching grant to this address:</h2>
                    <p className="big strong">{this.state.grantAddress}</p>
                    <Link to={makeClientUrl('details',address, networkId, color, theme, token)} className={styles.backLink}>Back to
                        fundraiser</Link>
                </div>
            );
        } else {
            return (<h1 className="subtitle">You are on a wrong network to access this campaign</h1>)
        }
    }
}


const mapStateToProps = state => ({
    web3: state.web3Connect.web3,
    isConnected: state.web3Connect.isConnected,
    networkId: state.web3Connect.networkId
});


export default connect(mapStateToProps)(AddFund)
