import { h } from 'preact'
import { connect } from 'unistore/preact'

export default connect([
  'raised'
])(({
      raised,
      children
    }) => {
  if (raised && raised.value !== null) {
    return (<div className="raisedCont">
        <div className="raised">
          <h1>{raised.value} {raised.token}</h1>
          {children}
        </div>
      </div>
    )
  }
})
