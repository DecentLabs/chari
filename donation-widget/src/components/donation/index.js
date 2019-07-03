import { h, Component } from 'preact'
import { donation } from './style.scss'
import { NETWORKS } from '../../constants.js'
import Web3 from 'Web3'
import Fundraiser from '../../../../deployments/Fundraiser.json'
import Grant from '../../../../deployments/Grant.json'
import Balance from '../balance'
import Expiration from '../expiration'

export default class Donation extends Component {
  state = {
    web3: null,
    isReadonly: true,
    fundraiserContract: null,
    grantContract: null,
    donations: null,
    grants: null,
    tokens: [],
    expiration: 0
  }

  constructor() {
    super();
    console.log('alma')
  }


  componentDidMount () {
    console.log('hello',location.search)
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

      fundraiserContract.methods.expiration().call().then(expiration =>{
        this.setState({expiration: expiration.toNumber()})
      })

      this.setState({web3, fundraiserContract, tokens})
    }
  }

  render (props, {fundraiserContract, grantContract, tokens, expiration}) {
    return (
      <div class={donation} id="DonationWidget">
        <label>Current balance:</label>
        <ul>{tokens.map(tokenInfo => (
          <Balance contract={fundraiserContract} token={tokenInfo.token} tokenAddress={tokenInfo.tokenAddress} decimals={tokenInfo.decimals}/>
        ))}</ul>
        <label>Sponsor balance:</label>
        <ul>{tokens.map(tokenInfo => (
          <Balance contract={grantContract} token={tokenInfo.token} tokenAddress={tokenInfo.tokenAddress} decimals={tokenInfo.decimals}/>
        ))}</ul>
        <Expiration at={expiration}/>
        <hr />
        {fundraiserContract && (<button>DONAT!</button>)}
      </div>
    )
  }
}
