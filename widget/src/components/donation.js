import { h } from 'preact'
import { connect } from 'unistore/preact'
import { Link } from 'preact-router/match'
import Expiration from './expiration.js'
import {ROUTES} from '../constants.js'

const THEMES = ['light', 'dark']

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
  let progress = null

  if (matched && matched.value !== null && grantBalance && grantBalance.value) {
    progress = (
      <div class="progressCont">
        <p>Sponsor offered {grantBalance.value} {grantBalance.token} for matching</p>
        <progress value={matched.value} max={grantBalance.value}></progress>
      </div>
    )
  } else {
    progress = (
      <div class="progressCont">
        <p>Waiting for sponsorship grant.</p>
      </div>
    )
  }

  return (
    <div>
      <Expiration at={expiration}/>

      <div class="matchDetails">
        <p class="offer">Sponsor doubles every {selectedToken.token} you give.</p>

        {raised && (raised.value !== null) && (
          <div class="raisedCont">
            <div class="raised">
              <h1>{raised.value} {raised.token}</h1>
              <p>Raised so far</p>
            </div>
          </div>
        )}
      </div>

      {progress}

      {fundraiserContract && (
        <Link href={ROUTES.CONTRIBUTION}>DONATE!</Link>
      )}
    </div>
  )
})
