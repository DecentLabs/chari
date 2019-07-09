import { h } from 'preact'
import { connect } from 'unistore/preact'
import { Link } from 'preact-router/match'
import Expiration from './expiration.js'
import {ROUTES} from '../constants.js'

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
<<<<<<< HEAD
              <h1>{raised.value} {raised.token}</h1>
              <p>Raised so far</p>
=======
              <h1>{_raised.value} {_raised.token}</h1>
              <p>raised so far</p>
>>>>>>> b394d839f84fe854d839077e403275aa53ff01a8
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
