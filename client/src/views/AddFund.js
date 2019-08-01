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
import LoaderComp from './../components/loaderComp.js'
import tick from './../assets/tick.svg';

class AddFund extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            grantAddress: null,
            color: this.props.match.params.color,
            theme: this.props.match.params.theme,
            token: this.props.match.params.token,
            address: this.props.match.params.address,
            networkId: this.props.match.params.networkId,
            thankyou: false,
            amount: '',
            amountError: false,
            loading: false,
            accepted: false
        };

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
    if (!this.state.amountError && this.props.accounts) {
      if (this.state.token === 'ETH') {
        web3.eth.sendTransaction({
          from: this.props.accounts[0],
          to: this.state.grantAddress,
          gas:40000,
          value: web3.utils.toWei(this.state.amount)
        }).on('transactionHash', () => {
          this.setState({
            accepted: true
          })
        }).then((res) => {
          this.setState({thankyou: true})
          this.setState({loading: false})
        })
        this.setState({loading: true})
      } else if(this.token && this.token.token === this.state.token){
        const tokenAddress = this.token.tokenAddress
        const tokenContract = new web3.eth.Contract(IERC20, tokenAddress);
        tokenContract.methods.transfer(this.state.grantAddress, this.getTokenVal(this.state.amount))
          .send({
            from: this.props.accounts[0]
          }).on('transactionHash', () => {
            this.setState({
              accepted: true
            })
          }).then((res) => {
            this.setState({thankyou: true})
            this.setState({loading: false})
          })
        this.setState({loading: true})
      }
    }
  }

  getTokenVal = (val) => {
    const tokenDecimals = this.token.decimals
    return Math.floor(val * Math.pow(10, tokenDecimals))
  }

  amountChange = (e) => {
    const val = e.target.value
    let amount
    if (this.token.token === 'ETH') {
      amount = this.state.amount
    } else {
      amount = this.getTokenVal(val)
    }
    this.setState({amount: val, amountError: !(amount > 0)})
  }

  render () {
    const {address, networkId, color, theme, token} = this.state
    const placeholder = '0.'.padEnd(Math.min(this.token.decimals, 5)+2,0)

    if (parseInt(this.props.networkId, 10) === parseInt(networkId, 10)) {
      return (
        <div>
          <h1 className="subtitle">Manage your fundraiser</h1>
          <h2 className="subtitle">Transfer the matching grant to this address:</h2>
          <p className="big strong">{this.state.grantAddress}</p>

          {!this.state.thankyou && this.props.accounts && this.props.accounts[0] && this.state.grantAddress && !this.state.loading && (
            <div className={styles.transferCont}>
              <p>or</p>
              <div className={styles.transfer}>
                <Input name="ethvalue" label="" placeHolder={placeholder} value={this.state.amount}
                       onChange={this.amountChange} error={this.state.amountError}
                       errorLabel="Please enter a correct amount"/>
                     <Button onClick={this.transferFunds} disabled={this.state.amountError}>Transfer {token}</Button>
              </div>
            </div>)}
            {this.state.loading && (
              <LoaderComp subtitle={this.state.accepted ? 'Grant is being trasferred...' : null} />
            )}
            {this.state.thankyou && (
              <div className={styles.thankyou}>
                  <img src={tick} alt="success"/>
                  <p>Thank you!</p>
              </div>
            )}
          <Link to={makeClientUrl('details', address, networkId, color, theme, token)} className={styles.backLink}>Back
            to fundraiser</Link>
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
  accounts: state.web3Connect.accounts
})

export default connect(mapStateToProps)(AddFund)
