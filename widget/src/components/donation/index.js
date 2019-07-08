import { h } from 'preact'
import { connect } from 'unistore/preact'
import { Link } from 'preact-router/match'
import BalanceList from '../balanceList'
import Expiration from '../expiration'

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
  fundraiserBalance,
  grantBalance,
  expiration,
  theme,
  fundraiserAddress,
  hasExpired,
  raised,
  matched
}) => {
  const widgetTheme = THEMES.includes(theme) ? theme : 'light'

  return (
    <div class="donation" id="DonationWidget" data-theme={widgetTheme} data-view="donation">
      <Expiration at={expiration}/>

      {raised && (raised.value !== null) && (
        <div class="raised">{raised.value} {raised.token}</div>
      )}
      <hr/>
      {fundraiserContract && (
        <Link href="/contribution/">DONATE!</Link>
      )}
    </div>
  )
})
