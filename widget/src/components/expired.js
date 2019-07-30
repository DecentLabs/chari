import { h } from 'preact'
import { connect } from 'unistore/preact'
import Raised from './raised.js'
import Network from './network.js'
import Footer from './footer.js'

export default connect(['matched', 'selectedToken', 'sponsored', 'raised'])(({matched, selectedToken, sponsored, raised}) => {
  const token = selectedToken ? selectedToken.token : 'ETH'
  const matchedValue = matched ? matched.value : 0
  const raisedValue = raised ? raised.value : 0
  const sponsoredValue = sponsored ? sponsored.value : 0
  const donorsValue = (raisedValue - matchedValue > 0) ? (raisedValue - matchedValue) : 0

  return (<div class="container">
    <div>
      <Network />
      <h1>Fundraiser has ended</h1>
      <Raised><p>Raised together</p></Raised>
      <p class="offer">{donorsValue} {token} from donors and {matchedValue} {token} from sponsor.</p>
      <p>Sponsor offered {sponsoredValue} {token} to match donations.</p>
    </div>
    <Footer />
  </div>)
})
