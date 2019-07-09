import { h } from 'preact'
import { connect } from 'unistore/preact'

export default connect([])(({}) => {
  return (<div>
    <h1>Campaign has expired!</h1>
  </div>)
})
