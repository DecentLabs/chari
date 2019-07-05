import React from 'react';
import { connect } from 'react-redux';
import getWeb3 from './../utils/getWeb3';

import Input from './../components/input.js';
import Button from './../components/button.js';
import Fundraiser from '../contracts/Fundraiser.json'
import Grant from '../contracts/Grant.json'


class AddFund extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            donor: null,
            fundraiser: null,
            sponsor: null,
            grant: null
        };
        // this.sponsorSend = this.sponsorSend.bind(this)
    }

    componentDidMount () {
        this.getGrantContract()
    }

    async getGrantContract() {
        const web3 = await getWeb3();
        const fundraiserAddress = this.props.fundraiser;
        const fundraiserContract = new web3.eth.Contract(Fundraiser.abi, fundraiserAddress)

        this.props.dispatch({type: 'WEB3_SETUP_SUCCESS'});

        const grantAddress = await fundraiserContract.methods.grant().call()
        this.setState({grant: grantAddress})
    }

    render () {
        return (
            this.props.isConnected && (
                <div>
                    <h1 className="subtitle">Sponsors,</h1>
                    <p className="big">you can send grant to this address:
                        <br/>
                        <br/>
                        <span className="strong">{this.state.grant}</span>
                    </p>
                </div>
            )
        );
    }
}

const mapStateToProps = state => ({
    isConnected: state.web3Connect.isConnected,
    account: state.web3Connect.accounts && state.web3Connect.accounts[0],
    fundraiser: state.web3Connect.fundraiser,
    deployedContract: state.web3Connect.deployedContract
});

export default connect(mapStateToProps)(AddFund);
