import React from "react"
import  { Route, Switch, withRouter} from "react-router-dom"

import WidgetEditor from './WidgetEditor.js'
import AddFund from './AddFund.js'
import DeployCampaign from './DeployCampaign.js'

function NewCampaign () {

  return (
    <div>
      <p>create new campaign</p>
      <section>
        <Switch>
          <Route path="/new/create" component={DeployCampaign} />
          <Route path="/new/widget/:contract" component={WidgetEditor} />
          <Route path="/new/fund/:contract" component={AddFund} />
        </Switch>
      </section>
    </div>
  )
}

export default NewCampaign
