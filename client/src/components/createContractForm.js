import React from 'react'
import styles from './../styles/createContractForm.module.css'
import { connect } from 'react-redux'
import {updateExpDate, updateRecipient} from './../reducers/web3Connect.js'

import Input from './input.js'
import Button from './button.js'
import ConfirmDeploy from './confirmDeploy.js'


class CreateContractForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showConfirm: false
        };
        this.onAddressChange = this.onAddressChange.bind(this)
        this.confirmDeploy = this.confirmDeploy.bind(this)
        this.onExpDateChange = this.onExpDateChange.bind(this)
        this.hide = this.hide.bind(this)
    }

    onAddressChange(e) {
        const val = e.target.value
        this.props.dispatch(updateRecipient(val))
    }

    onExpDateChange(e) {
      const val = e.target.value
      this.props.dispatch(updateExpDate(val))
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
        const placeholderAddress = '0x76E7a0aEc3E43211395bBBB6Fa059bD6750F83c3'
        return (
          <div className={styles.createContractForm}>
            <h1>Hi! You are creating a new campaign as the Sponsor</h1>
            <form>
              <Input name="address" label="Enter charity address" placeHolder={placeholderAddress} onChange={this.onAddressChange}/>
              <Input name="expiration" label="Choose expiration date" placeHolder="Day / Month / Year" onChange={this.onExpDateChange}/>
            </form>
            <Button onClick={this.confirmDeploy} hide={this.hide}>Create</Button>
            {this.state.showConfirm && <ConfirmDeploy hide={this.hide}></ConfirmDeploy> }
          </div>
        );
    }
}

export default connect()(CreateContractForm);
