import React from 'react'
import styles from './../styles/createCampaignNav.module.css'
import {NavLink} from "react-router-dom"

const DEPLOY = 'deploy'
const FUND = 'fund'
const WIDGET = 'widget'
export const steps = [DEPLOY, FUND, WIDGET]

const uiSteps = {
  deploy: '1. Deploy contract',
  fund: '2. Add fund',
  widget: '3. Edit & share widget'
}

function CreateCampaignNav () {
  return (
    <ul className={styles.createCampaignNav}>
      {steps.map((step, i) => (
        <li key={step}>
          <NavLink to={`/new/${step}`}>{uiSteps[step]}</NavLink>
        </li>)
      )}
    </ul>
  )
}

export default CreateCampaignNav
