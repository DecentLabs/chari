import React from 'react';
import getWeb3 from './../utils/getWeb3';

import Fundraiser from '../contracts/Fundraiser.json'


class AddFund extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            grant: null,
        };
    }

    componentDidMount () {
        this.getGrantContract()
    }

    async getGrantContract() {
        const web3 = await getWeb3();
        const fundraiserAddress = this.props.match.params.address;
        const fundraiserContract = new web3.eth.Contract(Fundraiser.abi, fundraiserAddress);
        const grantAddress = await fundraiserContract.methods.grant().call();

        this.setState({grant: grantAddress});
    }

    render () {
        return (
            <div>
                <h1 className="subtitle">Dear Sponsor</h1>
                <p className="big">you can send grant to this address:</p>
                <p className="big strong">{this.state.grant}</p>
            </div>
        );
    }
}

export default AddFund