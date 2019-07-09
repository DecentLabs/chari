import { h } from 'preact'
import { connect } from 'unistore/preact'
import { Link } from 'preact-router/match'
export default connect(['fundraiserAddress'])(({fundraiserAddress}) => (
  <div class="contribution" data-view="donation">
    <div>Contribute to:</div>
    <div>{fundraiserAddress}</div>
    <hr/>
    <Link href="/">Back</Link>
  </div>
))
