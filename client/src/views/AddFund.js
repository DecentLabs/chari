import React from 'react';
import { connect } from 'react-redux';
import { setupWeb3 } from '../reducers/web3Connect';

import Input from './../components/input.js';
import Button from './../components/button.js';
import Fundraiser from '../contracts/Fundraiser.json'


class AddFund extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            donor: null,
            fundraiser: null,
            sponsor: null,
            grant: null
        }
        this.sponsorSend = this.sponsorSend.bind(this)
    }

    componentDidMount () {
        console.log(this.props.isConnected)
        if (!this.props.isConnected) {
            this.props.dispatch(setupWeb3());
        }
        //
        // const web3Connect = this.props.web3Connect;
        // const web3 = web3Connect.web3;
        //
        // const abi = Fundraiser.abi;
        // const contractAddress = this.props.deployedContract;
        // const contract = new web3.eth.Contract(abi, contractAddress);
        //
        // console.log(contract)
    }

    sponsorSend() {

    }

    render () {
        return (
            this.props.isConnected && (
                <div>
                    <form>
                        <p>for sponsors</p>
                        <select>
                            <option>ETH</option>
                            <option>AEUR</option>
                        </select>
                        <Input placeholder="ETH" label="send amount to grant"/>
                    </form>
                    <Button onClick={this.sponsorSend}>Send</Button>
                </div>
            )
        );
    }
}

const mapStateToProps = state => ({
    isConnected: state.web3Connect.isConnected,
    account: state.web3Connect.accounts && state.web3Connect.accounts[0],
    donor: state.web3Connect.donor,
    fundraiser: state.web3Connect.fundraiser,
    sponsor: state.web3Connect.sponsor,
    grant: state.web3Connect.grant,
    deployedContract: state.web3Connect.deployedContract
});

export default connect(mapStateToProps)(AddFund);
