import React from 'react'
import {connect} from 'react-redux'
import styles from './../styles/deploySucces.module.css'

function DeploySucces (props) {
  
  return (
    <div styles.deploySucces>
      <div className={styles.icon}></div>
      <h1>Congrats</h1>
      <p>Your campaign has ben succesfully created on blockchain.</p>
      <h2></h2>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    web3Connect: state.web3Connect
  }
}

export default connect(mapStateToProps)(DeploySucces)
