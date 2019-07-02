import React from "react"
import CreateContractForm from './../components/createContractForm.js'
import styles from './../styles/NewCampaign.module.css'

function DeployCampaign () {
  return (
    <div className={styles.deployCampaign}>
      <h1>Hi! You are creating a new campaign as the Sponsor</h1>
      <CreateContractForm></CreateContractForm>
    </div>
  )
}

export default DeployCampaign
