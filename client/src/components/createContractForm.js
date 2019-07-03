import React from 'react'
import styles from './../styles/createContractForm.module.css'
import { connect } from 'react-redux'
import {updateExpDate, updateRecipient, setupWeb3} from './../reducers/web3Connect.js'

import Input from './input.js'
import Button from './button.js'
import DatePicker from 'react-datepicker';
import ConfirmDeploy from './confirmDeploy.js'
import "react-datepicker/dist/react-datepicker.css";


class CreateContractForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showConfirm: false,
            date: new Date()
        };
        this.onAddressChange = this.onAddressChange.bind(this)
        this.confirmDeploy = this.confirmDeploy.bind(this)
        this.onExpDateChange = this.onExpDateChange.bind(this)
        this.hide = this.hide.bind(this)
    }

    componentDidMount () {
      if (!this.props.isConnected) {
        this.props.dispatch(setupWeb3())
      }
    }

    onAddressChange(e) {
        const val = e.target.value;
        this.props.dispatch(updateRecipient(val))
    }

    onExpDateChange(date) {
      const timestamp = Math.floor(date.getTime() / 1000)
      this.setState({date})
      this.props.dispatch(updateExpDate(timestamp))
    }

    confirmDeploy () {
      this.setState({
        showConfirm: true
      })
    }

    hide () {
      this.setState({
        showConfirm: false
      })
    }

    render() {
        return (
          this.props.isConnected && (
            <div className={styles.createContractForm}>
              <h1>Hi! You are creating a new campaign as the Sponsor</h1>
              <form>
                <Input name="address" label="Enter charity address" placeHolder="0x..." onChange={this.onAddressChange}/>
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
              {this.state.showConfirm && <ConfirmDeploy hide={this.hide}></ConfirmDeploy> }
            </div>
          )
        );
    }
}

const mapStateToProps = (state) => {
  return {
    isConnected: state.web3Connect.isConnected
  }
}

export default connect(mapStateToProps)(CreateContractForm);
