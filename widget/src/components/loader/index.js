import { h } from 'preact'
import { connect } from 'unistore/preact'
import { route } from 'preact-router';
import {ROUTES} from '../../constants.js'

export default connect(['hasExpired'])(({hasExpired}) => {
  if (hasExpired !== null) {
    if(hasExpired) {
      route(ROUTES.EXPIRED)
    } else {
      route(ROUTES.DONATION)
    }
  } else {
    return (<div>
      <h1>LOADING ...</h1>
    </div>)
  }
})
