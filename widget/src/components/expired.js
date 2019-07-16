import { h } from 'preact'
import { connect } from 'unistore/preact'
import Raised from './raised.js'
import Network from './network.js'
import Footer from './footer.js'

export default connect(['matched', 'grantBalance', 'fundraiserBalance', 'selectedToken'])(({matched, grantBalance, fundraiserBalance, selectedToken}) => {
  const matchedValue = matched && matched.value ? matched.value : 0
  const fundraiserValue = fundraiserBalance && fundraiserBalance.value ? fundraiserBalance.value : 0
  const grantValue = grantBalance && grantBalance.value ? grantBalance.value : 0
  const token = selectedToken || 'ETH'
  return (<div class="container">
    <div>
      <Network />
      <h1>Fundraiser has ended</h1>
      <Raised><p>Raised together</p></Raised>
      <p class="offer">{fundraiserValue} {token} from donors and {matchedValue} {token} from sponsor.</p>
      <p>Sponsor offered {grantValue} {token} to match donations.</p>
    </div>
    <Footer />
  </div>)
})
