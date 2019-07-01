import React from 'react'
import styles from './../styles/createCampaignNav.module.css'
import {NavLink} from "react-router-dom"

const DEPLOY = 'deploy'
const FUND = 'fund'
const WIDGET = 'widget'
const steps = [DEPLOY, FUND, WIDGET]

const uiSteps = {
  deploy: 'Deploy contract',
  fund: 'Add fund',
  widget: 'Edit & share widget'
}

function CreateCampaignNav () {
  return (
    <ul className={styles.createCampaignNav}>
      {steps.map(step => (
        <li key={step}>
          <NavLink to={`/new/${step}`}>{uiSteps[step]}</NavLink>
        </li>)
      )}
    </ul>
  )
}

export default CreateCampaignNav
