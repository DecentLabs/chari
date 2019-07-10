import React from 'react';
import styles from './../styles/createContractForm.module.css';
import { connect } from 'react-redux';
import { updateExpDate, updateRecipient, updateSponsor, setupWeb3 } from './../reducers/web3Connect.js';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';

import Input from './../components/input.js';
import Button from './../components/button.js';
import MeCheckbox from '../components/meCheckbox.js';
import DeployButton from './../components/DeployButton.js'

class CreateContractForm extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            date: '',
            sponsor: '',
            recipient: '',
            dateError: false,
            sponsorError: false,
            recipientError: false,
        };
        this.onCharityAddressChange = this.onCharityAddressChange.bind(this);
        this.onSponsorAddressChange = this.onSponsorAddressChange.bind(this);
        this.onExpDateChange = this.onExpDateChange.bind(this);
        this.onSponsorMe = this.onSponsorMe.bind(this);
        this.onCharityMe = this.onCharityMe.bind(this);
    }

    componentDidMount () {
        this.props.dispatch({type: 'RESET_STORE'})

        if (!this.props.isConnected) {
            this.props.dispatch(setupWeb3());
        }
    }

    onCharityAddressChange (e) {
        const val = e.target ? e.target.value : e;
        this.props.dispatch(updateRecipient(val));
        this.setState({recipient: val});
        this.validateCharityAddress(val);
    }

    onSponsorAddressChange (e) {
        const val = e.target ? e.target.value : e;
        this.props.dispatch(updateSponsor(val));
        this.setState({sponsor: val});
        this.validateSponsorAddress(val);
    }

    onSponsorMe (e) {
        const value = e.target.checked ? this.props.account : '';
        this.props.dispatch(updateSponsor(value));
        this.onSponsorAddressChange(value);
    }

    onCharityMe (e) {
        const value = e.target.checked ? this.props.account : '';
        this.props.dispatch(updateRecipient(value));
        this.onCharityAddressChange(value);
    }

    onExpDateChange (date) {
        if (!date) {
            this.setState({dateError: true});
            return;
        }
        const timestamp = Math.floor(date.getTime() / 1000);
        this.setState({date});
        this.props.dispatch(updateExpDate(timestamp));
        this.validateDate(date);
    }

    validateDate (date) {
        const currentDate = Date.now();
        const selectedDate = date.getTime();

        if (selectedDate < currentDate) {
            this.setState({dateError: true});
        } else {
            this.setState({dateError: false});
        }
    }

    validateSponsorAddress (address) {
        if (!this.props.web3.utils.isAddress(address)) {
            this.setState({sponsorError: true});
        } else {
            this.setState({sponsorError: false});
        }
    }

    validateCharityAddress (address) {
        if (!this.props.web3.utils.isAddress(address)) {
            this.setState({recipientError: true});
        } else {
            this.setState({recipientError: false});
        }
    }

    render () {
        const isValid = this.state.recipient === '' ||
            this.state.sponsor === '' ||
            this.state.date === '' ||
            this.state.dateError ||
            this.state.sponsorError ||
            this.state.recipientError;

        return (
            this.props.isConnected && (
                <div className={styles.createContractForm}>
                    <h1 className="subtitle">Hi! You are creating a new fundraiser</h1>
                    <form>
                        <div className={styles.field}>
                            <Input name="charityAddress" label="Enter charity recipient address" placeHolder="0x..."
                                   value={this.state.recipient} onChange={this.onCharityAddressChange}
                                   error={this.state.recipientError} errorLabel="Please specify a valid address"
                            />
                            <MeCheckbox id="charityMe" onChange={this.onCharityMe}/>
                        </div>
                        <div className={styles.field}>
                            <Input name="sponsorAddress" label="Enter sponsor refund address" placeHolder="0x..."
                                   value={this.state.sponsor} onChange={this.onSponsorAddressChange}
                                   error={this.state.sponsorError} errorLabel="Please specify a valid address"
                            />
                            <MeCheckbox id="sponsorMe" onChange={this.onSponsorMe}/>
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
                                                        placeHolder="Day/Month/Year"
                                                        error={this.state.dateError}
                                                        errorLabel="Please select a time in the future"
                                    />}

                        />
                    </form>
                    <DeployButton disabled={isValid}></DeployButton>
                </div>
            )
        );
    }
}

const mapStateToProps = state => ({
    web3: state.web3Connect.web3,
    isConnected: state.web3Connect.isConnected,
    account: state.web3Connect.accounts && state.web3Connect.accounts[0],
});

export default connect(mapStateToProps)(CreateContractForm);
