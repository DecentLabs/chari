import { h } from 'preact'
import { connect } from 'unistore/preact'
import { Link } from 'preact-router/match'
import Expiration from './expiration.js'
import {ROUTES} from '../constants.js'
import {NETWORKS} from 'shared/constants.js'
import Network from './network.js'
import Raised from './raised.js'
import Footer from './footer.js'

export default connect([
  'fundraiserContract',
  'expiration',
  'matched',
  'selectedToken',
  'sponsored'
])(({
  fundraiserContract,
  expiration,
  matched,
  selectedToken,
  sponsored
}) => {
  const showProgress = !!(matched && matched.value)

  return (
    <div class="container">
      <div>
        <Network />
        <Expiration at={expiration}/>

        <div class="matchDetails">
          <p class="offer">The sponsor matches every {selectedToken.token} you give,<br/>up to {sponsored ? sponsored.value : 0} {sponsored ? sponsored.token : selectedToken.token}.</p>
          <Raised><p>raised together</p></Raised>
          <hr />
        </div>

        {showProgress && (
          <div class="progressCont">
            <p>Sponsor matched {matched.value} {matched.token}.</p>
            <progress value={matched.value} max={(sponsored && sponsored.value) ? sponsored.value : matched.value}></progress>
          </div>
        )}
      </div>
      <div>
        {fundraiserContract && (
          <Link href={ROUTES.CONTRIBUTION} class="button">Contribute to fundraiser</Link>
        )}
        <Footer />
      </div>
    </div>
  )
})
