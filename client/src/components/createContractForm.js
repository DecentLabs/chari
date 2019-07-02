import React from 'react';
import styles from './../styles/createContractForm.module.css';

import Input from './input.js';
import DeployButton from './DeployButton';
import { connect } from 'react-redux';

const DURATION = 7 * 24 * 60 * 60;


class CreateContractForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // recipient: '0x76E7a0aEc3E43211395bBBB6Fa059bD6750F83c3',
            recipient: null,
            expDate: Math.floor(Date.now() / 1000) + DURATION,
        };
        this.onAddressChange = this.onAddressChange.bind(this)
    }

    onAddressChange(e) {
        this.setState({recipient: e.target.value});
        console.log(this.state.recipient)
    }

    render() {
        const {web3Connect} = this.props;

        return (
            web3Connect.web3 && (<form className={styles.createContractForm}>
                <Input name="to" label="Enter charity address" placeHolder="address" onChange={this.onAddressChange}/>
                <Input name="expiration" label="Choose expiration date" placeHolder="Day / Month / Year"/>
                <DeployButton
                    disabled={!web3Connect.web3}
                    web3={web3Connect.web3}
                    account={web3Connect.accounts[0]}
                    recipient={this.state.recipient}
                    expiration={this.state.expDate}
                />
            </form>)
        );
    }
}


const mapStateToProps = state => ({
    web3Connect: state.web3Connect
});


export default connect(mapStateToProps)(CreateContractForm);
