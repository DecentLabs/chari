import React from 'react'
import styles from './../styles/createCampaignNav.module.css'
import {NavLink, withRouter} from "react-router-dom"
import classnames from 'classnames'

const DEPLOY = 'deploy'
const FUND = 'fund'
const WIDGET = 'widget'
const steps = [DEPLOY, FUND, WIDGET]
const uiSteps = {
  deploy: '1. Deploy contract',
  fund: '2. Add fund',
  widget: '3. Edit & share widget'
}

function CreateCampaignNav (props) {
  const deployed = props.deployed

  function isDisabled (step) {
    if ((deployed && step === DEPLOY) || (!deployed && step !== DEPLOY)) {
      return 'disabled'
    } else {
      return null
    }
  }

  function isActive (step) {
    return props.location.pathname === step ? 'active' : null
  }

  const handleClick = (e, step) => {
    if (isDisabled(step)) {
      e.preventDefault()
    }
  }

  return (
    <ul className={styles.createCampaignNav}>
        {steps.map((step) => {
          const stepTo = `/new/${step}`
          const _isDisabled = isDisabled(step)
          const _isActive = isActive(stepTo)
          return (
            <li key={step}>
              <NavLink onClick={e => handleClick(e, step)}
                     className={classnames(styles[_isDisabled], styles[_isActive])}
                     to={stepTo}>{uiSteps[step]}</NavLink>
            </li>
          )
        })}
    </ul>
  )
}

export default withRouter(CreateCampaignNav)
