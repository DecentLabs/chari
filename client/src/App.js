import React, { Component } from 'react';
import  { Route, Switch, withRouter} from "react-router-dom"

import Navigation from './components/navigation.js'
import Home from './views/Home.js'
import Featured from './views/Featured.js'
import LearnMore from './views/LearnMore.js'
import Contact from './views/Contact.js'
import NewCampaign from './views/NewCampaign.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation></Navigation>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/featured" exact component={Featured} />
            <Route path="/learn-more" exact component={LearnMore} />
            <Route path="/contact" exact component={Contact} />
            <Route path="/campaign" component={NewCampaign} />
          </Switch>
      </div>
    )
  }
}

App = withRouter(App)
export default App
