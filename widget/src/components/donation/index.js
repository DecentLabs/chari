import { h } from 'preact'
import { connect } from 'unistore/preact'
import { Link } from 'preact-router/match'
import BalanceList from '../balanceList'
import Expiration from '../expiration'

const THEMES = ['theme-light', 'theme-dark']

export default connect(['fundraiserContract','fundraiserBalance', 'grantBalance', 'expiration', 'theme'])(({fundraiserContract, fundraiserBalance, grantBalance, expiration, theme}) => {
  const widgetTheme = THEMES.includes(theme) ? theme : 'theme-light'
  return (
    <div class="donation" id="DonationWidget" data-theme={widgetTheme} data-view="donation">
      <Expiration at={expiration}/>

      <label>Current balance:</label>
      <BalanceList balanceList={fundraiserBalance}/>
      <label>Sponsor balance:</label>
      <BalanceList balanceList={grantBalance}/>
      <hr/>
      {fundraiserContract && (
        <Link href="/contribution/">DONATE!</Link>
      )}
    </div>
  )
})
