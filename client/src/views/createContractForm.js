import React from 'react';
import styles from './../styles/createContractForm.module.css';
import { connect } from 'react-redux';
import { updateExpDate, updateRecipient, updateSponsor, setupWeb3 } from './../reducers/web3Connect.js';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';

import Input from './../components/input.js';
import Button from './../components/button.js';
import MeCheckbox from '../components/meCheckbox.js'
import ConfirmDeploy from './../components/confirmDeploy.js';

class CreateContractForm extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            showConfirm: false,
            date: new Date(),
            sponsor: '',
            recipient: '',
        };
        this.onCharityAddressChange = this.onCharityAddressChange.bind(this);
        this.onSponsorAddressChange = this.onSponsorAddressChange.bind(this);
        this.confirmDeploy = this.confirmDeploy.bind(this);
        this.onExpDateChange = this.onExpDateChange.bind(this);
        this.onSponsorMe = this.onSponsorMe.bind(this);
        this.onCharityMe = this.onCharityMe.bind(this);
        this.hide = this.hide.bind(this);
    }

    componentDidMount () {
        if (!this.props.isConnected) {
            this.props.dispatch(setupWeb3());
        }
    }

    onCharityAddressChange (e) {
        const val = e.target.value;
        this.props.dispatch(updateRecipient(val));
        this.setState({recipient: val})
    }

    onSponsorAddressChange (e) {
        const val = e.target.value;
        this.props.dispatch(updateSponsor(val));
        this.setState({sponsor: val})
    }

    onSponsorMe (e) {
        const value = e.target.checked ? this.props.account : '';
        this.setState({sponsor: value});
        this.props.dispatch(updateSponsor(value));
    }

    onCharityMe (e) {
        const value = e.target.checked ? this.props.account : '';
        this.setState({recipient: value});
        this.props.dispatch(updateRecipient(value));
    }

    onExpDateChange (date) {
        const timestamp = Math.floor(date.getTime() / 1000);
        this.setState({date});
        this.props.dispatch(updateExpDate(timestamp));
    }

    confirmDeploy () {
        this.setState({
            showConfirm: true,
        });
    }

    hide () {
        this.setState({
            showConfirm: false,
        });
    }

    render () {
        return (
            this.props.isConnected && (
                <div className={styles.createContractForm}>
                    <h1>Hi! You are creating a new campaign</h1>
                    <form>
                        <div className={styles.field}>
                            <Input name="sponsorAddress" label="Enter sponsor address" placeHolder="0x..."
                                   value={this.state.sponsor} onChange={this.onSponsorAddressChange}/>
                            <MeCheckbox id="sponsorMe" onChange={this.onSponsorMe}/>
                        </div>
                        <div className={styles.field}>
                            <Input name="charityAddress" label="Enter charity address" placeHolder="0x..."
                                   value={this.state.recipient} onChange={this.onCharityAddressChange}/>
                            <MeCheckbox id="charityMe" onChange={this.onCharityMe}/>
                        </div>
                        <DatePicker onChange={this.onExpDateChange}
                                    selected={this.state.date}
                                    showTimeSelect
                                    timeFormat="HH:mm"
                                    timeIntervals={60}
                                    timeCaption="time"
                                    dateFormat="dd/MM/yyyy hh:mm aa"
                                    customInput={<Input name="expiration"
                                                        label="Choose expiration date"
                                                        value={this.state.date}
                                    />}

                        />
                    </form>
                    <Button onClick={this.confirmDeploy} hide={this.hide}>Create</Button>
                    {this.state.showConfirm && <ConfirmDeploy hide={this.hide}></ConfirmDeploy>}
                </div>
            )
        );
    }
}

const mapStateToProps = state => ({
    isConnected: state.web3Connect.isConnected,
    account: state.web3Connect.accounts && state.web3Connect.accounts[0],
});

export default connect(mapStateToProps)(CreateContractForm);
