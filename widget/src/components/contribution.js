import { h } from 'preact'
import { connect } from 'unistore/preact'
import { Link } from 'preact-router/match'
import CopyToClipboard from './copyToClipboard.js'
import copyIcon from '../assets/copy.svg'
import Network from './network.js'

export default connect(['fundraiserAddress','qrcode', 'selectedToken'])(({fundraiserAddress, qrcode, selectedToken}) => (

  <div class="contribution">
    <Network />
    <h1>Send {selectedToken.token} to:</h1>
    <div>
      <span class="address">{fundraiserAddress}</span>
    </div>
    <div><img src={qrcode} class="qrcode" /></div>
    <hr/>
    <div class="buttonbar">
      <Link href="/" class="secondary">Back</Link>
      <CopyToClipboard text={fundraiserAddress}>
        Copy address<img class="copyicon" src={copyIcon} style="height:0.8em; vertical-align: middle"/>
      </CopyToClipboard>
    </div>
  </div>
))
