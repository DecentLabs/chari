import { h } from 'preact'
import { connect } from 'unistore/preact'
import { Link } from 'preact-router/match'

export default connect(['fundraiserAddress'])(({fundraiserAddress}) => (
  <div>
    <div>Contribute to: {fundraiserAddress}</div>
    <Link href="/">Back</Link>
  </div>
))
