import { h } from 'preact'
import { connect } from 'unistore/preact'
import {NETWORKS} from 'shared/constants.js'


export default connect(['networkId'])(({networkId}) => {
  const networkName = NETWORKS.get(networkId).name

  if(networkId !== 1) {
    return (<div><div className="networkTitle">On {networkName}</div></div>)
  }
})
