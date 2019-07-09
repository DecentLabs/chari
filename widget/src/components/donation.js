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

  if (_matched && _matched.value && grant && grant.value) {
    progress = (
      <div class="progressCont">
        <p>Sponsor matches each donated tokens.</p>
        <progress value={_matched.value} max={grant.value}></progress>
        <p className="progressInfo">{_matched.value} {_matched.token} matched</p>
        <p>{_matched.value} {_matched.token} from donors & {_matched.value} {_matched.token} from sponsors</p>
      </div>
    )
  } else if (grant && grant.value && !_matched && !_matched.value ) {
      progress = (
        <div class="progressCont">
          <p>Sponsor donated {grant.value} {grant.token} ...todo text.</p>
          <progress value={grant.value} max={grant.value}></progress>
          <p>{_matched.value} {_matched.token} matched. Donate to double your money. TODO TEXT</p>
        </div>
      )
  } else {
    progress = (
      <div class="progressCont">
        <p>Campaign is not ready.</p>
      </div>
    )
  }

  return (
    <div>
      <Expiration at={expiration}/>

      <div class="matchDetails">
        {progress}

        {_raised && (_raised.value !== null) && (
          <div class="raisedCont">
            <div class="raised">{_raised.value} {_raised.token}</div>
            <p>Raised together</p>
          </div>
        )}

      </div>

      <hr/>

      {fundraiserContract && (
        <Link href={ROUTES.CONTRIBUTION}>DONATE!</Link>
      )}
    </div>
  )
})
