import { h } from 'preact'
import { donation } from './style.scss'
import { connect } from 'unistore/preact'
import { Link } from 'preact-router/match'
import BalanceList from '../balanceList'
import Expiration from '../expiration'

export default connect(['fundraiserContract','fundraiserBalance', 'grantBalance', 'expiration'])(({fundraiserContract, fundraiserBalance, grantBalance, expiration}) => (
  <div className={donation} id="DonationWidget">
    <label>Current balance:</label>
    <BalanceList balanceList={fundraiserBalance}/>
    <label>Sponsor balance:</label>
    <BalanceList balanceList={grantBalance}/>
    <Expiration at={expiration}/>
    <hr/>
    {fundraiserContract && (<Link href="/contribution/">DONAT!</Link>)}
  </div>
))
