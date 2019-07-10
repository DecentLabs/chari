import { h } from 'preact'
import { connect } from 'unistore/preact'
import { Link } from 'preact-router/match'
import Expiration from './expiration.js'
import {ROUTES} from '../constants.js'
import {NETWORKS} from 'shared/constants.js'
import Network from './network.js'

export default connect([
  'fundraiserContract',
  'grantBalance',
  'expiration',
  'raised',
  'matched',
  'selectedToken'
])(({
  fundraiserContract,
  expiration,
  raised,
  matched,
  grantBalance,
  selectedToken
}) => {
  const showProgress = !!(matched && matched.value)

  return (
    <div class="container">
      <div>
        <Network />
        <Expiration at={expiration}/>

        <div class="matchDetails">
          <p class="offer">The sponsor matches every {selectedToken.token} you give, up to {grantBalance ? grantBalance.value : 0} {grantBalance.token}.</p>

          {raised && (raised.value !== null) && (
            <div class="raisedCont">
              <div class="raised">
                <h1>{raised.value} {raised.token}</h1>
                <p>raised so far</p>
              </div>
            </div>
          )}
        </div>

        {showProgress && (
          <div class="progressCont">
            <p>Sponsor matched {matched.value} {matched.token}.</p>
            <progress value={matched.value} max={grantBalance.value}></progress>
          </div>
        )}
      </div>

      {fundraiserContract && (
        <Link href={ROUTES.CONTRIBUTION}>DONATE!</Link>
      )}
    </div>
  )
})
