import { h } from 'preact'
import { connect } from 'unistore/preact'
import { Link } from 'preact-router/match'
import Expiration from './expiration.js'
import {ROUTES} from '../constants.js'

const THEMES = ['light', 'dark']

export default connect([
  'fundraiserContract',
  'fundraiserBalance',
  'grantBalance',
  'expiration',
  'theme',
  'fundraiserAddress',
  'hasExpired',
  'raised',
  'matched'
])(({
  fundraiserContract,
  expiration,
  raised,
  matched,
  grantBalance
}) => {
  const token = "ETH"
  const _raised = raised ? raised.find((item) => item.token === token) : null
  const _matched = matched ? matched.find((item) => item.token === token) : null
  const grant = grantBalance ? grantBalance.find((item) => item.token === token) : null

  let progress = null

  if (_matched && _matched.value !== null && grant && grant.value) {
    progress = (
      <div class="progressCont">
        <p>Sponsor offered {grant.value} {grant.token} for matching</p>
        <progress value={_matched.value} max={grant.value}></progress>
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
        <p class="offer">Sponsor doubles every {token} you give.</p>

        {_raised && (_raised.value !== null) && (
          <div class="raisedCont">
            <div class="raised">
              <h1>{_raised.value} {_raised.token}</h1>
              <p>raised so far</p>
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
