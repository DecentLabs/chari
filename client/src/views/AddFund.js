import React from 'react'
import { connect } from 'react-redux'

import Fundraiser from 'shared/abis/Fundraiser.json'
import IERC20 from 'shared/abis/IERC20.json'
import { Link } from 'react-router-dom'
import { setupWeb3 } from '../reducers/web3Connect'
import styles from './../styles/widgetEditor.module.css'
import { makeClientUrl } from '../utils/makeUrl.js'
import Button from '../components/button.js'
import Input from '../components/input.js'
import { NETWORKS } from 'shared/constants.js'

class AddFund extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      grantAddress: null,
      color: this.props.match.params.color,
      theme: this.props.match.params.theme,
      token: this.props.match.params.token,
      address: this.props.match.params.address,
      networkId: this.props.match.params.networkId,
      thankyou: false,
      amount: '',
      amountError: false
    }

    const network = NETWORKS.get(parseInt(this.state.networkId))
    if(network) {
      this.token = network.tokens.find(token => token.token === this.state.token)
    }
  }

  componentDidMount () {
    if (!this.props.isConnected) {
      this.props.dispatch(setupWeb3())
    } else {
      this.getGrantContract()
    }
  }

  async getGrantContract () {
    const fundraiserContract = new this.props.web3.eth.Contract(Fundraiser, this.state.address)
    const grantAddress = await fundraiserContract.methods.grant().call()

    this.setState({grantAddress})
  }

  transferFunds = () => {
    const web3 = this.props.web3
    if (this.state.amount > 0) {
      if (this.state.token === 'ETH') {
        web3.eth.sendTransaction({
          from: this.props.account,
          to: this.state.grantAddress,
          value: web3.utils.toWei(this.state.amount)
        })
        this.setState({thankyou: true})
      } else if(this.token && this.token.token === this.state.token){
        const tokenAddress = this.token.tokenAddress
        const tokenDecimals = this.token.decimals
        const tokenContract = new web3.eth.Contract(IERC20, tokenAddress);
        tokenContract.methods.transfer(this.state.grantAddress, this.state.amount * Math.pow(10, tokenDecimals))
          .send({
            from: this.props.account
          })
        this.setState({thankyou: true})
      }
    }
  }

  onEthValueChange = (e) => {
    const val = e.target.value
    this.setState({amount: val, amountError: !(parseFloat(val) > 0)})
  }

  render () {
    const {address, networkId, color, theme, token} = this.state
    if (parseInt(this.props.networkId, 10) === parseInt(networkId, 10)) {
      return (
        <div>
          <h1 className="subtitle">Manage your fundraiser</h1>
          <h2 className="subtitle">Transfer the matching grant to this address:</h2>
          <p className="big strong">{this.state.grantAddress}</p>
          <Link to={makeClientUrl('details', address, networkId, color, theme, token)} className={styles.backLink}>Back
            to fundraiser</Link>
          {!this.state.thankyou && this.props.account && this.state.grantAddress && (<div>
            <p>or</p>
            <Input name="ethvalue" label="Amount" placeHolder="1" value={this.state.amount}
                   onChange={this.onEthValueChange} error={this.state.amountError}
                   errorLabel="Please enter a correct amount"/>
            <span>{token}</span>
            <Button onClick={this.transferFunds}>Transfer funds from here!</Button>
          </div>)}
        </div>
      )
    } else {
      return (
        <div>
          <h2 className="subtitle">You are on a different network than this fundraiser!</h2>
        </div>
      )
    }
  }
}

const mapStateToProps = state => ({
  web3: state.web3Connect.web3,
  isConnected: state.web3Connect.isConnected,
  networkId: state.web3Connect.networkId,
  account: state.web3Connect.accounts && state.web3Connect.accounts[0]
})

export default connect(mapStateToProps)(AddFund)
