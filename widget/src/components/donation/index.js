import { h } from 'preact'
import { connect } from 'unistore/preact'
import { Link } from 'preact-router/match'
import BalanceList from '../balanceList'
import Expiration from '../expiration'
import {ROUTES} from '../../constants.js'

const THEMES = ['light', 'dark']

export default connect(['fundraiserContract','fundraiserBalance', 'grantBalance', 'expiration', 'theme'])(({fundraiserContract, fundraiserBalance, grantBalance, expiration, theme}) => {
  return (
    <div>
      <Expiration at={expiration}/>

      <label>Current balance:</label>
      <BalanceList balanceList={fundraiserBalance}/>
      <label>Sponsor balance:</label>
      <BalanceList balanceList={grantBalance}/>
      <hr/>
      {fundraiserContract && (
        <Link href={ROUTES.CONTRIBUTION}>DONATE!</Link>
      )}
    </div>
  )
})
