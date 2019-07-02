import { h, Component } from 'preact'
import { donation } from './style.scss'
import { NODES } from '../../constants.js'
import Web3 from 'Web3'
import Fundraiser from '../../../../deployments/Fundraiser.json'
import Grant from '../../../../deployments/Grant.json'

export default class Donation extends Component {
  state = {web3: null, fundraiserContract: null}
  componentDidMount () {
    const network = parseInt(this.props.network, 10)
    const url = NODES[network]
    const provider = new Web3.providers.HttpProvider(url)
    const web3 = new Web3(provider)
    const fundraiserAddress = this.props.fundraiser
    const fundraiserContract = new web3.eth.Contract(Fundraiser.abi, fundraiserAddress)

    this.setState({web3, fundraiserContract})
  }

  render (props, {fundraiserContract}) {
    return (
      <div className={donation}>
        <h1>fundraiser contract address: {fundraiserContract && fundraiserContract.address}</h1>
      </div>
    )
  }
}
