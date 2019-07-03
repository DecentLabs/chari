import { h, Component } from 'preact'
import { donation } from './style.scss'
import { NODES, tokens, NETWORKS } from '../../constants.js'
import Web3 from 'Web3'
import Fundraiser from '../../../../deployments/Fundraiser.json'
import Grant from '../../../../deployments/Grant.json'
import Balance from '../balance'

export default class Donation extends Component {
  state = {
    web3: null,
    isReadonly: true,
    fundraiserContract: null,
    grantContract: null,
    donations: null,
    grants: null,
    tokens: []
  }

  componentDidMount () {
    const network = parseInt(this.props.network, 10)
    if (NETWORKS.has(network)) {
      const {url, tokens} = NETWORKS.get(network)
      const provider = new Web3.providers.HttpProvider(url)
      const web3 = new Web3(provider)
      const fundraiserAddress = this.props.fundraiser
      const fundraiserContract = new web3.eth.Contract(Fundraiser.abi, fundraiserAddress)

      fundraiserContract.methods.grant().call().then(grantAddress => {
        const grantContract = new web3.eth.Contract(Grant.abi, grantAddress)
        this.setState({grantContract})
      })

      this.setState({web3, fundraiserContract, tokens})
    }
  }

  render (props, {fundraiserContract, grantContract, tokens}) {
    return (
      <div className={donation}>
        <h1>fundraiser contract address: {fundraiserContract && fundraiserContract.address}</h1>
        <ul>{tokens.map(tokenInfo => (
          <Balance contract={fundraiserContract} token={tokenInfo.token} tokenAddress={tokenInfo.tokenAddress} decimals={tokenInfo.decimals}/>
        ))}</ul>
        <h1>grant contract address: {grantContract && grantContract.address}</h1>
        <ul>{tokens.map(tokenInfo => (
          <Balance contract={grantContract} token={tokenInfo.token} tokenAddress={tokenInfo.tokenAddress} decimals={tokenInfo.decimals}/>
        ))}</ul>
      </div>
    )
  }
}
