import { h, Component } from 'preact'
import { connect } from 'unistore/preact'
import { Link } from 'preact-router/match'
import CopyToClipboard from './copyToClipboard.js'
import Network from './network.js'
import Footer from './footer.js'
import { transferEth, transferToken } from '../writableWeb3.js'
import CopyIcon from './copyIcon.js'

class Contribution extends Component {
  state = { thankyou:false}

  submitHandler = (e) => {
    const {selectedToken, fundraiserAddress, networkId} = this.props
    const form = e.target
    const input = form.querySelector('input')
    const value = parseFloat(input.value)
    const isValid = value > 0;
    if(isValid) {
      let result;
      if(selectedToken.token === 'ETH') {
        result = transferEth(networkId,fundraiserAddress,value)
      } else {
        result = transferToken(networkId, fundraiserAddress, value, selectedToken)
      }
      result.then(() => this.setState({thankyou:true}))
    }
  }

  render({fundraiserAddress, qrcode, selectedToken},{thankyou}) {
    return (
      <div class="contribution container">
        <div>
          <Link class="button secondary link" href="/">‹</Link>
          <Network />
          <h1>Send {selectedToken.token} to:</h1>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <CopyToClipboard text={fundraiserAddress} _class="copy">
              <CopyIcon/>
            </CopyToClipboard>
            <span class="address">{fundraiserAddress}</span>
          </div>
          <div><img src={qrcode} class="qrcode" /></div>
          <hr/>
          {thankyou && (
            <p class="donationThankyou">Thank you!</p>
          )}
          {!thankyou ? (
            <form onSubmit={this.submitHandler} action="javascript:;">
              <input type="text" placeholder="0"/>
              <div class="space"></div>
              <button>Transfer {selectedToken.token}</button>
            </form>) : undefined}
        </div>
          <Footer />
      </div>
    )
  }
}


export default connect([
  'fundraiserAddress',
  'qrcode',
  'selectedToken',
  'networkId'
])(Contribution)
