import React, { Component } from 'react';
import store from "./store.js";
import { setupWeb3 } from "./reducers/web3Connect";
import  { Route, Switch, withRouter} from "react-router-dom"

import Navigation from './components/navigation.js'

import Home from './views/Home.js'
import Featured from './views/Featured.js'
import LearnMore from './views/LearnMore.js'
import Contact from './views/Contact.js'
import NewCampaign from './views/NewCampaign.js'
import WidgetEditor from './views/WidgetEditor.js'
import AddFund from './views/AddFund.js'

import "./App.css";

class App extends Component {

  componentDidMount = async () => {
    try {
        store.dispatch(setupWeb3())
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  render() {
    return (
      <div className="App">
        <Navigation></Navigation>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/featured" exact component={Featured} />
            <Route path="/learn-more" exact component={LearnMore} />
            <Route path="/contact" exact component={Contact} />
            <Route path="/new" exact component={NewCampaign} />
            <Route path="/new/widget/:contract" component={WidgetEditor} />
            <Route path="/new/fund/:contract" component={AddFund} />
          </Switch>
      </div>
    );
  }
}

App = withRouter(App)
export default App
