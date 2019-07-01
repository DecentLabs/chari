import React from "react"
import  { Route, Switch, withRouter} from "react-router-dom"

import CreateCampaignNav from './../components/createCampaignNav.js'

import WidgetEditor from './WidgetEditor.js'
import AddFund from './AddFund.js'
import DeployCampaign from './DeployCampaign.js'

function NewCampaign () {

  return (
    <div>
      <CreateCampaignNav></CreateCampaignNav>
      <section>
        <Switch>
          <Route path="/new/deploy" component={DeployCampaign} />
          <Route path="/new/widget" component={WidgetEditor} />
          <Route path="/new/fund" component={AddFund} />
        </Switch>
      </section>
    </div>
  )
}

export default NewCampaign
