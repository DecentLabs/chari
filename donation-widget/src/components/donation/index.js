import { h, Component } from 'preact'
import { donation } from './style.scss'
import { NODES, tokens } from '../../constants.js'
import Web3 from 'Web3'
import Fundraiser from '../../../../deployments/Fundraiser.json'
import Grant from '../../../../deployments/Grant.json'

export default class Donation extends Component {
  state = {web3: null, fundraiserContract: null, grantContract: null, donations: null, grants:null}

  componentDidMount () {
    const network = parseInt(this.props.network, 10)
    const url = NODES[network]
    const provider = new Web3.providers.HttpProvider(url)
    const web3 = new Web3(provider)
    const fundraiserAddress = this.props.fundraiser
    const fundraiserContract = new web3.eth.Contract(Fundraiser.abi, fundraiserAddress)
    fundraiserContract.methods.grant().call().then(grantAddress => {
      const grantContract = new web3.eth.Contract(Grant.abi, grantAddress);
      this.setState({grantContract})
    })
    this.setState({web3, fundraiserContract})
  }

  componentDidUpdate() {
    const {web3, fundraiserContract, grantContract} = this.state
  }

  render (props, {fundraiserContract, grantContract}) {
    return (
      <div className={donation}>
        <h1>fundraiser contract address: {fundraiserContract && fundraiserContract.address}</h1>
        <h1>grant contract address: {grantContract && grantContract.address}</h1>
        <h1></h1>
      </div>
    )
  }
}
