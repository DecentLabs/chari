import React from "react"
import  { Route, Switch, withRouter} from "react-router-dom"
import styles from './../styles/NewCampaign.module.css'

import CreateCampaignNav from './../components/createCampaignNav.js'

import WidgetEditor from './WidgetEditor.js'
import AddFund from './AddFund.js'
import DeployCampaign from './DeployCampaign.js'

function NewCampaign () {

  return (
    <div className={styles.newCampaign}>
      <CreateCampaignNav></CreateCampaignNav>
      <Switch>
        <Route path="/new/deploy" component={DeployCampaign} />
        <Route path="/new/widget" component={WidgetEditor} />
        <Route path="/new/fund" component={AddFund} />
      </Switch>
    </div>
  )
}

export default NewCampaign
