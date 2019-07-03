import React from 'react'
import styles from './../styles/confirmDeploy.module.css'

import Button from './button.js'
import DeployButton from './DeployButton.js'

function ConfirmDeploy (props) {
  return (
    <div className={styles.confirmDeploy}>
      <header>
        <h3>You are about to create your campaign</h3>
      </header>
      <div className={styles.content}>
        <p>In a second you are going to sign the transaction with your wallet.</p>
        <p>After you create your campaign, you cannot edit the charity address or choose new expiration date.</p>
      </div>
      <footer>
        <p>Are you sure want to proceed?</p>
        <DeployButton></DeployButton>
        <Button onClick={props.hide} naked>No, I'm not ready yet.</Button>
      </footer>
    </div>
  )
}

export default ConfirmDeploy
