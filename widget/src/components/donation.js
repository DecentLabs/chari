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
  matched
}) => {
  const token = "ETH"
  const _raised = raised ? raised.find((item) => item.token === token) : null
  const _matched = matched ? matched.find((item) => item.token === token) : null

  return (
    <div>
      <Expiration at={expiration}/>

      {_raised && (_raised.value !== null) && (
        <div class="raised">{_raised.value} {_raised.token}</div>
      )}
      {_matched && (_matched.value !== null) && (
        <div class="matched">{_matched.value} {_matched.token}</div>
      )}

      <hr/>
      {fundraiserContract && (
        <Link href={ROUTES.CONTRIBUTION}>DONATE!</Link>
      )}
    </div>
  )
})
