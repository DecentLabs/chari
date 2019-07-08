import React from 'react';
import getWeb3 from './../utils/getWeb3';

import Fundraiser from 'shared/abis/Fundraiser.json'
import { Link } from 'react-router-dom';


class AddFund extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            grant: null,
        };
        this.fundraiserAddress = this.props.match.params.address
    }

    componentDidMount () {
        this.getGrantContract()
    }

    async getGrantContract() {
        const web3 = await getWeb3();
        const fundraiserContract = new web3.eth.Contract(Fundraiser, this.fundraiserAddress);
        const grantAddress = await fundraiserContract.methods.grant().call();

        this.setState({grant: grantAddress});
    }

    render () {
        return (
            <div>
                <h1 className="subtitle">Dear Sponsor</h1>
                <p className="big">you can send grant to this address:</p>
                <p className="big strong">{this.state.grant}</p>
                <Link to={`/campaign/${this.fundraiserAddress}/details/`}>Go back to campaign page</Link>
            </div>
        );
    }
}

export default AddFund
